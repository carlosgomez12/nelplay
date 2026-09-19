import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area.jsx';
import { Search, CalendarDays, Loader2, Trophy, Target, Lock, Star } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import GroupHeader from '@/components/GroupHeader.jsx';
import PredictionRow from '@/components/PredictionRow.jsx';

const KNOCKOUT_STAGES = ['Dieciseisavos de Final', 'Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'];
// Detecta si un partido es amistoso
const isFriendlyMatch = (m) => {
  return m?.stage && String(m.stage).toLowerCase().indexOf('amistoso') !== -1;
};

const MatchesPage = () => {
  const { currentUser } = useAuth();

  const [matches, setMatches]         = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [searchTerm, setSearchTerm]   = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab]     = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const [matchesRes, predsRes] = await Promise.all([
        pb.collection('matches').getList(1, 500, {
          sort: 'match_date,match_time',
          requestKey: null
        }),
        currentUser
          ? pb.collection('predictions').getList(1, 300, {
              filter: pb.filter('user_id = {:uid}', { uid: currentUser.id }),
              requestKey: null
            })
          : Promise.resolve({ items: [] })
      ]);

      setMatches(matchesRes.items);
      setPredictions(predsRes.items);

      // Tab inicial: si hay amistosos pr\u00f3ximos, mostrar Amistosos primero
      const hasFriendlies = matchesRes.items.some(m => isFriendlyMatch(m) && m.status !== 'completed');
      const hasGroups = matchesRes.items.some(m => m.stage?.startsWith('Grupo'));
      if (hasFriendlies) {
        setActiveTab('friendly');
      } else if (hasGroups) {
        setActiveTab('all');
      } else {
        setActiveTab('knockout');
      }
    } catch (err) {
      toast.error('Error al cargar el calendario');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const predictionMap = useMemo(() => {
    const m = new Map();
    predictions.forEach(p => m.set(p.match_id, p));
    return m;
  }, [predictions]);

  const groups = useMemo(() => {
    const set = new Set();
    matches.forEach(m => {
      if (m.stage?.startsWith('Grupo')) set.add(m.stage);
    });
    return Array.from(set).sort();
  }, [matches]);

  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const matchesSearch = searchTerm === '' ||
        match.home_team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.away_team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (match.stadium_name && match.stadium_name.toLowerCase().includes(searchTerm.toLowerCase()));

      const hasPrediction = predictionMap.has(match.id);
      const passesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'predicted' && hasPrediction) ||
        (statusFilter === 'pending' && !hasPrediction && match.status === 'upcoming');

      return matchesSearch && passesStatus;
    });
  }, [matches, searchTerm, statusFilter, predictionMap]);

  // Particionar por categor\u00eda
  const friendlyMatchesFiltered = filteredMatches.filter(isFriendlyMatch);
  const groupMatchesFiltered    = filteredMatches.filter(m => !isFriendlyMatch(m) && !KNOCKOUT_STAGES.includes(m.stage));
  const knockoutMatchesFiltered = filteredMatches.filter(m =>  KNOCKOUT_STAGES.includes(m.stage));

  const groupedMatches = useMemo(() => {
    const grouped = {};
    groupMatchesFiltered.forEach(match => {
      const stage = match.stage || 'Fase de Grupos';
      if (!grouped[stage]) grouped[stage] = [];
      grouped[stage].push(match);
    });
    return grouped;
  }, [groupMatchesFiltered]);

  const knockoutByStage = useMemo(() => {
    const grouped = {};
    KNOCKOUT_STAGES.forEach(s => { grouped[s] = []; });
    knockoutMatchesFiltered.forEach(m => {
      if (grouped[m.stage]) grouped[m.stage].push(m);
    });
    return grouped;
  }, [knockoutMatchesFiltered]);

  // Estad\u00edsticas (solo cuentan partidos del Mundial, no amistosos)
  const nonFriendlyMatches = matches.filter(m => !isFriendlyMatch(m));
  const nonFriendlyPredictions = predictions.filter(p => {
    const match = matches.find(m => m.id === p.match_id);
    return match && !isFriendlyMatch(match);
  });
  const totalPredicted = nonFriendlyPredictions.length;
  const progress       = nonFriendlyMatches.length === 0 ? 0 : Math.round((totalPredicted / nonFriendlyMatches.length) * 100);

  // Disponibles para pron\u00f3stico de amistosos
  const upcomingFriendlies = matches.filter(m => isFriendlyMatch(m) && m.status !== 'completed');
  const hasAnyFriendly     = upcomingFriendlies.length > 0;

  const renderGroupContent = (groupName) => {
    const groupMatches = groupedMatches[groupName];
    if (!groupMatches || groupMatches.length === 0) {
      return (
        <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed mt-6">
          <p className="text-muted-foreground font-medium">No hay partidos que coincidan con los filtros en este grupo.</p>
        </div>
      );
    }
    return (
      <div className="mt-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <GroupHeader groupName={groupName} matches={groupMatches} />
        <div className="flex flex-col gap-3">
          {groupMatches.map(match => (
            <PredictionRow
              key={match.id}
              match={match}
              prediction={predictionMap.get(match.id)}
              onSaved={fetchData}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderKnockoutContent = () => {
    const hasAny = Object.values(knockoutByStage).some(arr => arr.length > 0);
    if (!hasAny) {
      return (
        <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed mt-6">
          <Trophy className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">
            Las eliminatorias se mostrar&aacute;n cuando terminen las fases de grupos.
          </p>
        </div>
      );
    }
    return (
      <div className="space-y-10 mt-6">
        {KNOCKOUT_STAGES.map(stage => {
          const list = knockoutByStage[stage];
          if (list.length === 0) return null;
          return (
            <div key={stage}>
              <div className="flex items-center gap-3 mb-4 pb-2 border-b">
                <Trophy className="w-5 h-5 text-amber-600" />
                <h2 className="text-2xl font-black tracking-tight">{stage}</h2>
                <span className="text-sm text-muted-foreground font-medium">({list.length} partido{list.length > 1 ? 's' : ''})</span>
              </div>
              <div className="flex flex-col gap-3">
                {list.map(match => (
                  <PredictionRow
                    key={match.id}
                    match={match}
                    prediction={predictionMap.get(match.id)}
                    onSaved={fetchData}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderFriendlyContent = () => {
    if (friendlyMatchesFiltered.length === 0) {
      return (
        <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed mt-6">
          <Star className="w-12 h-12 text-amber-500/40 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">No hay amistosos disponibles en este momento.</p>
        </div>
      );
    }
    return (
      <div className="mt-6">
        {/* Banner explicativo */}
        <div className="bg-gradient-to-r from-amber-50 via-amber-50 to-orange-50 dark:from-amber-950/30 dark:via-amber-950/20 dark:to-orange-950/20 border-2 border-amber-300/60 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-lg text-amber-900 dark:text-amber-200 mb-1">
                Calentamiento previo al Mundial &mdash; No suma a la polla oficial
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                Estos son los partidos amistosos previos al Mundial 2026. Puedes pron&oacute;sticar
                para practicar y compararte con otros jugadores en un <strong>ranking aparte</strong>,
                pero los puntos <strong>NO suman a la polla oficial</strong>.
                &iexcl;Calienta motores para el torneo principal!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {friendlyMatchesFiltered.map(match => (
            <PredictionRow
              key={match.id}
              match={match}
              prediction={predictionMap.get(match.id)}
              onSaved={fetchData}
            />
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground font-bold tracking-widest uppercase">Cargando calendario...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Calendario Oficial - NelPlay 2026</title>
        <meta name="description" content="Pronostica todos los partidos del Mundial 2026 en NelPlay." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 py-8 md:py-12 relative">
          <div className="absolute inset-0 bg-pitch-pattern opacity-[0.02] pointer-events-none"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CalendarDays className="w-6 h-6 text-primary" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">Calendario de Pron&oacute;sticos</h1>
                </div>
                <p className="text-muted-foreground font-medium max-w-2xl">
                  Pronostica el marcador exacto de cada partido. Ganas puntos por cada acierto.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar equipo o estadio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-card border-muted-foreground/20 font-medium"
                  />
                </div>
                <div className="flex bg-card border border-muted-foreground/20 rounded-md p-1">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-sm transition-colors ${statusFilter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >Todos</button>
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-sm transition-colors ${statusFilter === 'pending' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >Sin pron&oacute;stico</button>
                  <button
                    onClick={() => setStatusFilter('predicted')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-sm transition-colors ${statusFilter === 'predicted' ? 'bg-emerald-600 text-white' : 'text-muted-foreground hover:text-foreground'}`}
                  >Pronosticados</button>
                </div>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="bg-card border rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {totalPredicted} de {nonFriendlyMatches.length} partidos del Mundial pronosticados
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Llevas {currentUser?.total_points || 0} puntos en la polla oficial
                    {(currentUser?.friendly_points || 0) > 0 && (
                      <> &middot; <span className="text-amber-600 font-bold">{currentUser.friendly_points} en amistosos</span></>
                    )}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-64 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {currentUser?.inscription_status !== 'approved' && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-500/40 rounded-xl p-4 mb-6 flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-900 dark:text-amber-200">
                  Tu cuenta a&uacute;n no est&aacute; activa. Los pron&oacute;sticos no podr&aacute;n guardarse hasta que el administrador valide tu inscripci&oacute;n.
                </p>
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="relative mb-8">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
                <ScrollArea className="w-full pb-2">
                  <TabsList className="h-auto p-0 bg-transparent border-none justify-start w-max min-w-full">
                    {hasAnyFriendly && (
                      <TabsTrigger
                        value="friendly"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none px-6 py-3 font-bold text-base transition-none flex items-center gap-2 text-amber-700 data-[state=active]:text-amber-700"
                      >
                        <Star className="w-4 h-4" /> Amistosos
                        <span className="ml-1 bg-amber-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                          {upcomingFriendlies.length}
                        </span>
                      </TabsTrigger>
                    )}
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-bold text-base transition-none"
                    >
                      Todos los Grupos
                    </TabsTrigger>
                    <TabsTrigger
                      value="knockout"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-bold text-base transition-none flex items-center gap-2 text-amber-600 data-[state=active]:text-amber-600"
                    >
                      <Trophy className="w-4 h-4" /> Fase Final
                    </TabsTrigger>
                    {groups.map(group => (
                      <TabsTrigger
                        key={group}
                        value={group}
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-bold text-base transition-none whitespace-nowrap"
                      >
                        {group}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
              </div>

              <div className="min-h-[50vh]">
                <TabsContent value="friendly" className="m-0 outline-none">
                  {renderFriendlyContent()}
                </TabsContent>

                <TabsContent value="all" className="m-0 outline-none">
                  {groups.length === 0 ? (
                    <div className="text-center py-24 bg-muted/30 rounded-3xl border-2 border-dashed">
                      <span className="text-5xl mb-4 block opacity-50">&#x1F50D;</span>
                      <h3 className="text-2xl font-bold mb-2">No se encontraron partidos</h3>
                      <p className="text-muted-foreground">Intenta ajustar tu b&uacute;squeda o filtros.</p>
                    </div>
                  ) : (
                    groups.map(group => (
                      <div key={group}>
                        {renderGroupContent(group)}
                      </div>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="knockout" className="m-0 outline-none">
                  {renderKnockoutContent()}
                </TabsContent>

                {groups.map(group => (
                  <TabsContent key={group} value={group} className="m-0 outline-none">
                    {renderGroupContent(group)}
                  </TabsContent>
                ))}
              </div>
            </Tabs>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MatchesPage;
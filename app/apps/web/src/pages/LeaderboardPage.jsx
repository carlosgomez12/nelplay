import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Trophy, Medal, Award, TrendingUp, Target, Star, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const LeaderboardPage = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('official');

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      const records = await pb.collection('users').getList(1, 200, {
        filter: pb.filter('inscription_status = {:status}', { status: 'approved' }),
        sort: '-total_points,-exact_score_count,created',
        requestKey: null
      });
      setUsers(records.items);
    } catch (err) {
      toast.error('Error al cargar la clasificaci\u00f3n');
    } finally {
      setLoading(false);
    }
  };

  // Generar dos rankings ordenados de manera distinta
  const officialLeaderboard = [...users]
    .sort((a, b) => {
      if ((b.total_points || 0) !== (a.total_points || 0)) return (b.total_points || 0) - (a.total_points || 0);
      if ((b.exact_score_count || 0) !== (a.exact_score_count || 0)) return (b.exact_score_count || 0) - (a.exact_score_count || 0);
      return new Date(a.created) - new Date(b.created);
    })
    .map((u, i) => ({ ...u, rank: i + 1 }));

  const friendlyLeaderboard = [...users]
    .filter(u => (u.friendly_predictions_count || 0) > 0 || (u.friendly_points || 0) > 0)
    .sort((a, b) => {
      if ((b.friendly_points || 0) !== (a.friendly_points || 0)) return (b.friendly_points || 0) - (a.friendly_points || 0);
      if ((b.friendly_exact_score_count || 0) !== (a.friendly_exact_score_count || 0)) return (b.friendly_exact_score_count || 0) - (a.friendly_exact_score_count || 0);
      return new Date(a.created) - new Date(b.created);
    })
    .map((u, i) => ({ ...u, rank: i + 1 }));

  const hasAnyFriendlyData = friendlyLeaderboard.length > 0;

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-amber-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-700" />;
    return null;
  };

  const getRowClass = (rank, isCurrentUser) => {
    if (isCurrentUser) return 'bg-primary/5 border-primary/20';
    if (rank === 1) return 'bg-amber-50/40 dark:bg-amber-950/10';
    return '';
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  const renderPodium = (leaderboard, isOfficial) => {
    const top3 = leaderboard.slice(0, 3);
    const pointsField = isOfficial ? 'total_points' : 'friendly_points';
    const accent = isOfficial ? 'amber' : 'orange';

    if (top3.length === 0) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
        {/* 2do lugar */}
        <div className={`md:order-1 ${top3.length < 2 ? 'invisible' : ''}`}>
          {top3[1] && (
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 pb-5">
                <Medal className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">2do lugar</div>
                <p className="text-xl font-bold mb-2 truncate">{top3[1].name}</p>
                <p className={`text-3xl font-black ${isOfficial ? 'text-primary' : 'text-amber-600'}`}>{top3[1][pointsField] || 0}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">puntos</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 1er lugar */}
        <div className="md:order-2">
          <Card className={`text-center ring-2 ring-${accent}-500 shadow-xl shadow-${accent}-500/10 hover:shadow-${accent}-500/20 transition-shadow md:scale-105`}>
            <CardContent className="pt-7 pb-6">
              <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-2" />
              <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">1er lugar &#x1F451;</div>
              <p className="text-2xl font-bold mb-2 truncate">{top3[0].name}</p>
              <p className="text-4xl font-black bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                {top3[0][pointsField] || 0}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">puntos</p>
            </CardContent>
          </Card>
        </div>

        {/* 3er lugar */}
        <div className={`md:order-3 ${top3.length < 3 ? 'invisible' : ''}`}>
          {top3[2] && (
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 pb-5">
                <Award className="w-10 h-10 text-amber-700 mx-auto mb-2" />
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">3er lugar</div>
                <p className="text-xl font-bold mb-2 truncate">{top3[2].name}</p>
                <p className={`text-3xl font-black ${isOfficial ? 'text-primary' : 'text-amber-600'}`}>{top3[2][pointsField] || 0}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">puntos</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  const renderTable = (leaderboard, isOfficial) => {
    const pointsField = isOfficial ? 'total_points' : 'friendly_points';
    const exactField  = isOfficial ? 'exact_score_count' : 'friendly_exact_score_count';
    const countField  = isOfficial ? 'predictions_count' : 'friendly_predictions_count';

    if (leaderboard.length === 0) {
      return (
        <div className="py-16 text-center">
          {isOfficial ? (
            <>
              <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">A&uacute;n no hay clasificaci&oacute;n oficial</h3>
              <p className="text-muted-foreground">Los puntos se mostrar&aacute;n cuando inicie el Mundial.</p>
            </>
          ) : (
            <>
              <Star className="w-16 h-16 text-amber-500/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">A&uacute;n no hay ranking de amistosos</h3>
              <p className="text-muted-foreground">El ranking aparecer&aacute; cuando se jueguen los partidos amistosos.</p>
            </>
          )}
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Jugador</TableHead>
              <TableHead className="text-right">
                <span className="hidden sm:inline">Pron&oacute;sticos</span>
                <Target className="w-4 h-4 sm:hidden mx-auto" />
              </TableHead>
              <TableHead className="text-right">
                <span className="hidden sm:inline">Exactos</span>
                <Star className="w-4 h-4 sm:hidden mx-auto" />
              </TableHead>
              <TableHead className="text-right font-bold">Puntos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((entry) => {
              const isMe = entry.id === currentUser?.id;
              return (
                <TableRow key={entry.id} className={getRowClass(entry.rank, isMe)}>
                  <TableCell className="font-bold">
                    <div className="flex items-center gap-2">
                      {getRankIcon(entry.rank)}
                      <span>{entry.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{entry.name || 'An\u00f3nimo'}</span>
                      {isMe && (
                        <Badge variant="secondary" className="text-xs">T&uacute;</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {entry[countField] || 0}
                  </TableCell>
                  <TableCell className="text-right text-amber-600 font-semibold">
                    {entry[exactField] || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`text-lg font-black ${isOfficial ? 'text-primary' : 'text-amber-600'}`}>
                      {entry[pointsField] || 0}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  const currentList = activeTab === 'official' ? officialLeaderboard : friendlyLeaderboard;
  const isOfficial = activeTab === 'official';

  return (
    <>
      <Helmet>
        <title>{'Clasificaci\u00f3n - NelPlay'}</title>
        <meta name="description" content={'Tabla de posiciones de la polla mundialista NelPlay 2026.'} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Encabezado */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 font-bold text-sm tracking-wider uppercase mb-4">
                <Trophy className="w-4 h-4" /> Tabla de posiciones
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
                Clasificaci&oacute;n
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Los mejores pronosticadores ordenados por puntos acumulados.
              </p>
            </div>

            {/* Tabs Oficial / Amistosos */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="official" className="gap-2">
                  <Trophy className="w-4 h-4" /> Polla Oficial
                </TabsTrigger>
                <TabsTrigger value="friendly" className="gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  <Star className="w-4 h-4" /> Amistosos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="official" className="m-0 outline-none">
                {/* Banner explicativo oficial */}
                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 mb-8 flex items-center gap-3 max-w-3xl mx-auto">
                  <Trophy className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-sm">
                    <strong>Ranking oficial del Mundial 2026.</strong> Solo cuentan los partidos del torneo. El campe&oacute;n se lleva el premio mayor.
                  </p>
                </div>

                {renderPodium(officialLeaderboard, true)}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Polla Oficial - Mundial 2026 ({officialLeaderboard.length} {officialLeaderboard.length === 1 ? 'jugador' : 'jugadores'})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTable(officialLeaderboard, true)}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="friendly" className="m-0 outline-none">
                {/* Banner explicativo amistosos */}
                <div className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-orange-50 dark:from-amber-950/30 dark:via-amber-950/20 dark:to-orange-950/20 border-2 border-amber-300/60 rounded-xl p-4 mb-8 flex items-start gap-3 max-w-3xl mx-auto">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                      Ranking de Calentamiento &mdash; No oficial
                    </p>
                    <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                      Estos puntos corresponden a los partidos amistosos previos al Mundial. <strong>NO suman a la polla oficial</strong> ni al premio mayor.
                    </p>
                  </div>
                </div>

                {hasAnyFriendlyData ? (
                  <>
                    {renderPodium(friendlyLeaderboard, false)}

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-700">
                          <Star className="w-5 h-5" />
                          Ranking Amistosos ({friendlyLeaderboard.length} {friendlyLeaderboard.length === 1 ? 'jugador' : 'jugadores'})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderTable(friendlyLeaderboard, false)}
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardContent className="py-16 text-center">
                      <Star className="w-16 h-16 text-amber-500/30 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">A&uacute;n no hay ranking de amistosos</h3>
                      <p className="text-muted-foreground">El ranking aparecer&aacute; cuando se jueguen los partidos amistosos y haya pron&oacute;sticos evaluados.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LeaderboardPage;
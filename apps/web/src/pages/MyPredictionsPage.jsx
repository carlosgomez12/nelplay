import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Trophy, Target, Star, CheckCircle2, Clock, Lock, ChevronRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

// Banderas emoji
const FLAGS = {
  'Alemania': '\uD83C\uDDE9\uD83C\uDDEA', 'Arabia Saud\u00ed': '\uD83C\uDDF8\uD83C\uDDE6', 'Arabia Saudita': '\uD83C\uDDF8\uD83C\uDDE6',
  'Argelia': '\uD83C\uDDE9\uD83C\uDDFF', 'Argentina': '\uD83C\uDDE6\uD83C\uDDF7', 'Australia': '\uD83C\uDDE6\uD83C\uDDFA', 'Austria': '\uD83C\uDDE6\uD83C\uDDF9',
  'B\u00e9lgica': '\uD83C\uDDE7\uD83C\uDDEA', 'Bosnia y Herzegovina': '\uD83C\uDDE7\uD83C\uDDE6', 'Brasil': '\uD83C\uDDE7\uD83C\uDDF7',
  'Cabo Verde': '\uD83C\uDDE8\uD83C\uDDFB', 'Islas de Cabo Verde': '\uD83C\uDDE8\uD83C\uDDFB', 'Canad\u00e1': '\uD83C\uDDE8\uD83C\uDDE6',
  'Catar': '\uD83C\uDDF6\uD83C\uDDE6', 'Qatar': '\uD83C\uDDF6\uD83C\uDDE6', 'Chequia': '\uD83C\uDDE8\uD83C\uDDFF', 'Rep\u00fablica Checa': '\uD83C\uDDE8\uD83C\uDDFF',
  'Colombia': '\uD83C\uDDE8\uD83C\uDDF4', 'Corea del Sur': '\uD83C\uDDF0\uD83C\uDDF7', 'Rep\u00fablica de Corea': '\uD83C\uDDF0\uD83C\uDDF7',
  'Costa de Marfil': '\uD83C\uDDE8\uD83C\uDDEE', 'Costa Rica': '\uD83C\uDDE8\uD83C\uDDF7', 'Croacia': '\uD83C\uDDED\uD83C\uDDF7', 'Curazao': '\uD83C\uDDE8\uD83C\uDDFC',
  'Ecuador': '\uD83C\uDDEA\uD83C\uDDE8', 'Egipto': '\uD83C\uDDEA\uD83C\uDDEC', 'Escocia': '\uD83C\uDFF4', 'Espa\u00f1a': '\uD83C\uDDEA\uD83C\uDDF8',
  'Estados Unidos': '\uD83C\uDDFA\uD83C\uDDF8', 'EE. UU.': '\uD83C\uDDFA\uD83C\uDDF8', 'EE.UU.': '\uD83C\uDDFA\uD83C\uDDF8',
  'Francia': '\uD83C\uDDEB\uD83C\uDDF7', 'Ghana': '\uD83C\uDDEC\uD83C\uDDED', 'Hait\u00ed': '\uD83C\uDDED\uD83C\uDDF9', 'Inglaterra': '\uD83C\uDFF4',
  'Ir\u00e1n': '\uD83C\uDDEE\uD83C\uDDF7', 'RI de Ir\u00e1n': '\uD83C\uDDEE\uD83C\uDDF7', 'Irak': '\uD83C\uDDEE\uD83C\uDDF6',
  'Jap\u00f3n': '\uD83C\uDDEF\uD83C\uDDF5', 'Jordania': '\uD83C\uDDEF\uD83C\uDDF4', 'Marruecos': '\uD83C\uDDF2\uD83C\uDDE6', 'M\u00e9xico': '\uD83C\uDDF2\uD83C\uDDFD',
  'Noruega': '\uD83C\uDDF3\uD83C\uDDF4', 'Nueva Zelanda': '\uD83C\uDDF3\uD83C\uDDFF', 'Pa\u00edses Bajos': '\uD83C\uDDF3\uD83C\uDDF1',
  'Panam\u00e1': '\uD83C\uDDF5\uD83C\uDDE6', 'Paraguay': '\uD83C\uDDF5\uD83C\uDDFE', 'Portugal': '\uD83C\uDDF5\uD83C\uDDF9', 'RD Congo': '\uD83C\uDDE8\uD83C\uDDE9',
  'Senegal': '\uD83C\uDDF8\uD83C\uDDF3', 'Sud\u00e1frica': '\uD83C\uDDFF\uD83C\uDDE6', 'Suecia': '\uD83C\uDDF8\uD83C\uDDEA', 'Suiza': '\uD83C\uDDE8\uD83C\uDDED',
  'T\u00fanez': '\uD83C\uDDF9\uD83C\uDDF3', 'Turqu\u00eda': '\uD83C\uDDF9\uD83C\uDDF7', 'Uruguay': '\uD83C\uDDFA\uD83C\uDDFE', 'Uzbekist\u00e1n': '\uD83C\uDDFA\uD83C\uDDFF'
};
const getFlag = (team) => FLAGS[String(team || '').trim()] || '\u26BD';

const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const s = String(dateStr).trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10), 12, 0, 0);
  }
  try { return parseISO(s); } catch { return null; }
};

const isFriendlyMatch = (m) => {
  return m?.stage && String(m.stage).toLowerCase().indexOf('amistoso') !== -1;
};

// Resolver match_id como string, sea el SDK lo expanda o no
const getMatchIdFromPrediction = (pred) => {
  if (!pred) return null;
  if (typeof pred.match_id === 'string') return pred.match_id;
  if (pred.match_id && typeof pred.match_id === 'object' && pred.match_id.id) {
    return pred.match_id.id;
  }
  if (pred.expand?.match_id?.id) return pred.expand.match_id.id;
  return null;
};

const MyPredictionsPage = () => {
  const { currentUser } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('official');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  const fetchData = async () => {
    if (!currentUser) return;
    try {
      // FIX: cargar predicciones y matches por separado
      const [predsRes, matchesRes] = await Promise.all([
        pb.collection('predictions').getList(1, 300, {
          filter: pb.filter('user_id = {:uid}', { uid: currentUser.id }),
          sort: '-created',
          requestKey: null
        }),
        pb.collection('matches').getList(1, 200, {
          sort: 'match_date,match_time',
          requestKey: null
        })
      ]);
      setPredictions(predsRes.items);
      setMatches(matchesRes.items);
    } catch (err) {
      console.warn('[MyPredictionsPage] error:', err?.message);
      toast.error('Error al cargar tus pron\u00f3sticos');
    } finally {
      setLoading(false);
    }
  };

  // Map de matches por id (m\u00e1s eficiente que find() repetido)
  const matchesById = useMemo(() => {
    const map = new Map();
    matches.forEach(m => map.set(m.id, m));
    return map;
  }, [matches]);

  // Enriquecer cada predicci\u00f3n con su match resuelto
  const enrichedPredictions = useMemo(() => {
    return predictions.map(p => {
      const matchId = getMatchIdFromPrediction(p);
      const match = matchId ? matchesById.get(matchId) : null;
      return { ...p, _match: match };
    });
  }, [predictions, matchesById]);

  // Separar por categor\u00eda usando _match (no expand)
  const officialPredictions = useMemo(
    () => enrichedPredictions.filter(p => p._match && !isFriendlyMatch(p._match)),
    [enrichedPredictions]
  );
  const friendlyPredictions = useMemo(
    () => enrichedPredictions.filter(p => p._match && isFriendlyMatch(p._match)),
    [enrichedPredictions]
  );

  const PredictionCard = ({ prediction }) => {
    const match = prediction._match;
    if (!match) return null;

    const isFriendly = isFriendlyMatch(match);
    const isEvaluated = prediction.status === 'evaluated';
    const isMatchDone = match.status === 'completed';
    const isLocked = prediction.is_locked || isMatchDone || match.status === 'live';
    const points = prediction.points_awarded || 0;

    const localDate = parseLocalDate(match.match_date);
    const dateStr = localDate
      ? format(localDate, "EEE d MMM", { locale: es })
      : 'TBD';

    return (
      <Card className={`hover:shadow-md transition-shadow ${isFriendly ? 'border-amber-500/40 bg-amber-50/30 dark:bg-amber-950/10' : ''
        }`}>
        <CardContent className="p-5">
          {/* Header con fecha y estado */}
          <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {dateStr} &middot; {match.match_time}
            </span>
            <div className="flex items-center gap-1">
              {isFriendly && (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-[9px] uppercase font-black tracking-wider gap-1">
                  <Star className="w-2.5 h-2.5" /> Amistoso
                </Badge>
              )}
              {isEvaluated ? (
                <Badge
                  variant="secondary"
                  className={points > 0
                    ? (isFriendly ? 'bg-amber-500/15 text-amber-700 border-amber-500/20' : 'bg-emerald-500/15 text-emerald-700 border-emerald-500/20')
                    : ''}
                >
                  {points > 0 ? <CheckCircle2 className="w-3 h-3 mr-1" /> : null}
                  {points > 0 ? `+${points} ${isFriendly ? 'pts*' : 'pts'}` : '0 pts'}
                </Badge>
              ) : isLocked ? (
                <Badge variant="outline" className="text-muted-foreground">
                  <Lock className="w-3 h-3 mr-1" /> Cerrado
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  <Clock className="w-3 h-3 mr-1" /> Pendiente
                </Badge>
              )}
            </div>
          </div>

          {/* Stage / Grupo */}
          {match.stage && (
            <p className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${isFriendly ? 'text-amber-700/80' : 'text-muted-foreground/70'
              }`}>
              {match.stage}
            </p>
          )}

          {/* Equipos */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xl leading-none">{getFlag(match.home_team)}</span>
              <span className="font-bold text-sm truncate">{match.home_team}</span>
            </div>
            <span className="text-xs text-muted-foreground font-bold">VS</span>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <span className="font-bold text-sm truncate text-right">{match.away_team}</span>
              <span className="text-xl leading-none">{getFlag(match.away_team)}</span>
            </div>
          </div>

          {/* Pron\u00f3stico vs resultado */}
          <div className="bg-muted/40 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tu pron&oacute;stico</span>
              <div className={`font-black px-2.5 py-0.5 rounded text-base tracking-widest ${isFriendly ? 'bg-amber-500 text-white' : 'bg-primary text-primary-foreground'
                }`}>
                {prediction.predicted_home_score} - {prediction.predicted_away_score}
              </div>
            </div>
            {isMatchDone && (
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resultado real</span>
                <div className="bg-foreground text-background font-black px-2.5 py-0.5 rounded text-base tracking-widest">
                  {match.home_score} - {match.away_score}
                </div>
              </div>
            )}
          </div>

          {/* Nota de no oficial si es amistoso evaluado */}
          {isFriendly && isEvaluated && points > 0 && (
            <p className="text-[10px] text-amber-700 dark:text-amber-400 italic mt-2 text-right">
              * Puntos no oficiales (no suman a la polla)
            </p>
          )}
        </CardContent>
      </Card>
    );
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

  // Predicciones a mostrar seg\u00fan categor\u00eda activa
  const currentPredictions = activeCategory === 'official' ? officialPredictions : friendlyPredictions;
  const pendingPredictions = currentPredictions.filter(p => p.status !== 'evaluated');
  const evaluatedPredictions = currentPredictions.filter(p => p.status === 'evaluated');

  // Stats Mundial
  const officialPoints = currentUser?.total_points || 0;
  const officialCount = currentUser?.predictions_count || 0;
  const officialExacts = currentUser?.exact_score_count || 0;

  // Stats Amistosos
  const friendlyPoints = currentUser?.friendly_points || 0;
  const friendlyCount = currentUser?.friendly_predictions_count || 0;
  const friendlyExacts = currentUser?.friendly_exact_score_count || 0;

  const isViewingFriendly = activeCategory === 'friendly';

  // FIX: mostrar el tab siempre que haya predicciones de amistosos O que el usuario tenga stats de amistosos
  const showFriendlyTab = friendlyPredictions.length > 0 || friendlyCount > 0 || friendlyPoints > 0;

  return (
    <>
      <Helmet>
        <title>Mis Pron&oacute;sticos - NelPlay</title>
        <meta name="description" content="Tus pron\u00f3sticos y puntos en la polla mundialista NelPlay 2026." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Encabezado */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-black tracking-tight mb-2">Mis Pron&oacute;sticos</h1>
                <p className="text-muted-foreground font-medium">
                  Tu historial de aciertos y puntos acumulados
                </p>
              </div>
              <Button asChild size="lg" className="font-bold">
                <Link to="/matches">
                  Hacer m&aacute;s pron&oacute;sticos
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Selector de categor\u00eda (solo si hay amistosos) */}
            {showFriendlyTab && (
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="official" className="gap-2">
                    <Trophy className="w-4 h-4" /> Polla Oficial
                  </TabsTrigger>
                  <TabsTrigger value="friendly" className="gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    <Star className="w-4 h-4" /> Amistosos
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            {/* Banner para amistosos */}
            {isViewingFriendly && (
              <div className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-orange-50 dark:from-amber-950/30 dark:via-amber-950/20 dark:to-orange-950/20 border-2 border-amber-300/60 rounded-xl p-4 mb-6 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 dark:text-amber-200">
                  <strong>Estos pron&oacute;sticos son de calentamiento.</strong> Los puntos que ganes aqu&iacute; NO suman a la polla oficial del Mundial,
                  pero te ayudan a compararte con otros en un <strong>ranking aparte</strong>.
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {isViewingFriendly ? (
                <>
                  <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white/80 flex items-center gap-2">
                        <Star className="w-4 h-4" /> Puntos amistosos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-4xl font-black">{friendlyPoints}</span>
                      <p className="text-xs text-white/70 mt-1">No oficial</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Target className="w-4 h-4" /> Pron&oacute;sticos amistosos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-4xl font-black">{friendlyCount}</span>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500" /> Marcadores exactos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-4xl font-black text-amber-600">{friendlyExacts}</span>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card className="bg-gradient-to-br from-primary to-secondary text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-white/80 flex items-center gap-2">
                        <Trophy className="w-4 h-4" /> Puntos oficiales
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-4xl font-black">{officialPoints}</span>
                      <p className="text-xs text-white/70 mt-1">Polla Mundial 2026</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Target className="w-4 h-4" /> Pron&oacute;sticos hechos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-4xl font-black">{officialCount}</span>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" /> Marcadores exactos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-4xl font-black text-amber-600">{officialExacts}</span>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Tabs Pendientes / Evaluados */}
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="pending">
                  Pendientes ({pendingPredictions.length})
                </TabsTrigger>
                <TabsTrigger value="evaluated">
                  Evaluados ({evaluatedPredictions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-6">
                {pendingPredictions.length === 0 ? (
                  <Card>
                    <CardContent className="py-16 text-center">
                      <Clock className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">
                        No tienes pron&oacute;sticos pendientes
                        {isViewingFriendly ? ' de amistosos' : ' del Mundial'}
                      </h3>
                      <p className="text-muted-foreground mb-6">Ve al calendario y haz tus predicciones.</p>
                      <Button asChild>
                        <Link to="/matches">Ir al calendario</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendingPredictions.map(p => <PredictionCard key={p.id} prediction={p} />)}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="evaluated" className="mt-6">
                {evaluatedPredictions.length === 0 ? (
                  <Card>
                    <CardContent className="py-16 text-center">
                      <CheckCircle2 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">A&uacute;n no hay pron&oacute;sticos evaluados</h3>
                      <p className="text-muted-foreground">Cuando terminen los partidos ver&aacute;s aqu&iacute; tus puntos.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {evaluatedPredictions.map(p => <PredictionCard key={p.id} prediction={p} />)}
                  </div>
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

export default MyPredictionsPage;
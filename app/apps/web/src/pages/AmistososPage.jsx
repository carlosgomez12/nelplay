import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Beer, Trophy, Medal, Award, Star, Calendar, Clock, Target, ChevronRight, Sparkles, Crown, Lock, CheckCircle2, Users } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

// Banderas
const FLAGS = {
  'Colombia':   '\uD83C\uDDE8\uD83C\uDDF4',
  'Costa Rica': '\uD83C\uDDE8\uD83C\uDDF7',
  'Jordania':   '\uD83C\uDDEF\uD83C\uDDF4'
};
const getFlag = (team) => FLAGS[String(team || '').trim()] || '\u26BD';

const extractYMD = (rawDate) => {
  if (!rawDate) return null;
  const s = String(rawDate).trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
};

const parseLocalDate = (dateStr) => {
  const ymd = extractYMD(dateStr);
  if (!ymd) return null;
  return new Date(ymd[0], ymd[1] - 1, ymd[2], 12, 0, 0);
};

const getMatchIdFromPrediction = (pred) => {
  if (!pred) return null;
  if (typeof pred.match_id === 'string') return pred.match_id;
  if (pred.match_id && typeof pred.match_id === 'object' && pred.match_id.id) {
    return pred.match_id.id;
  }
  if (pred.expand?.match_id?.id) return pred.expand.match_id.id;
  return null;
};

const AmistososPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [myPredictions, setMyPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCurrentUserId = () => {
    if (currentUser?.id) return currentUser.id;
    if (pb.authStore?.record?.id) return pb.authStore.record.id;
    if (pb.authStore?.model?.id) return pb.authStore.model.id;
    return null;
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  const fetchData = async () => {
    try {
      const userId = getCurrentUserId();

      const [usersRes, matchesRes] = await Promise.all([
        pb.collection('users').getList(1, 200, {
          filter: pb.filter('inscription_status = {:status}', { status: 'approved' }),
          requestKey: null
        }),
        pb.collection('matches').getList(1, 50, {
          filter: 'stage = "Amistoso"',
          sort: 'match_date,match_time',
          requestKey: null
        })
      ]);

      setUsers(usersRes.items);
      setMatches(matchesRes.items);

      if (userId) {
        const predsRes = await pb.collection('predictions').getList(1, 100, {
          filter: pb.filter('user_id = {:uid}', { uid: userId }),
          requestKey: null
        });
        setMyPredictions(predsRes.items);
      } else {
        setMyPredictions([]);
      }
    } catch (err) {
      console.warn('[AmistososPage] error:', err?.message);
      toast.error('Error al cargar datos de amistosos');
    } finally {
      setLoading(false);
    }
  };

  // Ranking por puntos amistosos (solo usuarios CON puntos, ya jugados)
  const ranking = useMemo(() => {
    return users
      .filter(u => (u.friendly_predictions_count || 0) > 0 || (u.friendly_points || 0) > 0)
      .sort((a, b) => {
        if ((b.friendly_points || 0) !== (a.friendly_points || 0)) {
          return (b.friendly_points || 0) - (a.friendly_points || 0);
        }
        if ((b.friendly_exact_score_count || 0) !== (a.friendly_exact_score_count || 0)) {
          return (b.friendly_exact_score_count || 0) - (a.friendly_exact_score_count || 0);
        }
        return new Date(a.created) - new Date(b.created);
      })
      .map((u, i) => ({ ...u, rank: i + 1 }));
  }, [users]);

  // Map de predicciones por match_id
  const predictionsByMatchId = useMemo(() => {
    const map = new Map();
    myPredictions.forEach(p => {
      const matchId = getMatchIdFromPrediction(p);
      if (matchId) {
        map.set(matchId, p);
      }
    });
    return map;
  }, [myPredictions]);

  // Stats: contar participantes \u00fanicos sumando predictions_count de los matches amistosos.
  // Como un mismo usuario puede pron\u00f3sticar varios partidos, este conteo es
  // aproximado pero indica actividad. Para conteo \u00fanico exacto, se requerir\u00eda
  // ver todas las predicciones (restringido por permisos).
  const stats = useMemo(() => {
    const completedMatches = matches.filter(m => m.status === 'completed').length;
    // Suma total de pron\u00f3sticos en todos los partidos amistosos
    const totalPredictions = matches.reduce((sum, m) => sum + (m.predictions_count || 0), 0);
    return { completedMatches, totalPredictions, totalMatches: matches.length };
  }, [matches]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  const top3 = ranking.slice(0, 3);
  const winner = ranking[0];

  return (
    <>
      <Helmet>
        <title>Amistosos &mdash; NelPlay</title>
        <meta name="description" content="Polla de amistosos pre-Mundial 2026. Premio: six pack Michelob Ultra al primer lugar." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* HERO con premio Michelob */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 p-8 md:p-12 mb-10 shadow-2xl shadow-amber-500/20">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-yellow-200 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-bold tracking-wider uppercase mb-4">
                    <Sparkles className="w-3 h-3" /> Premio especial
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 drop-shadow-lg">
                    Polla de Amistosos
                  </h1>
                  <p className="text-xl md:text-2xl font-bold mb-2 drop-shadow">
                    El ganador se lleva un <span className="text-yellow-200">six pack</span>
                  </p>
                  <p className="text-3xl md:text-4xl font-black mb-4 drop-shadow">
                    de Cerveza Michelob <span className="text-yellow-200">Ultra</span> &#x1F37B;
                  </p>
                  <p className="text-amber-100 text-sm md:text-base max-w-md leading-relaxed">
                    Pron&oacute;stica los marcadores de los dos amistosos previos al Mundial.
                    Quien tenga m&aacute;s puntos al final se gana el premio.
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 text-sm font-bold">
                    <Star className="w-4 h-4 text-yellow-300" />
                    No suma a la polla del Mundial &mdash; juego independiente
                  </div>
                </div>

                <div className="flex justify-center md:justify-end">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-300 rounded-full blur-3xl opacity-30 animate-pulse" />
                    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-300 border-4 border-white/30 shadow-2xl flex flex-col items-center justify-center text-center p-4">
                      <Beer className="w-20 h-20 md:w-28 md:h-28 text-amber-900 mb-2" />
                      <div className="text-amber-950 font-black text-2xl md:text-3xl leading-tight">
                        MICHELOB
                      </div>
                      <div className="text-amber-900 font-bold text-base md:text-lg tracking-wider">
                        ULTRA
                      </div>
                      <div className="mt-2 px-3 py-1 bg-amber-900 text-amber-100 text-xs font-black rounded-full">
                        SIX PACK
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ganador actual destacado */}
            {winner && (
              <Card className="mb-8 border-2 border-amber-400 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-amber-950/30 shadow-lg">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 mb-1">
                        L&iacute;der actual
                      </p>
                      <p className="text-2xl font-black text-amber-900 dark:text-amber-100">
                        {winner.name || 'An\u00f3nimo'}
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                        {winner.friendly_points || 0} puntos &middot; {winner.friendly_exact_score_count || 0} marcadores exactos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-amber-500 text-white font-bold text-sm">
                    <Beer className="w-5 h-5" />
                    Va liderando el six pack
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <Card>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Partidos amistosos</p>
                    <p className="text-2xl font-black">{stats.completedMatches} / {stats.totalMatches}</p>
                    <p className="text-xs text-muted-foreground">completados</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Pron&oacute;sticos</p>
                    <p className="text-2xl font-black">{stats.totalPredictions}</p>
                    <p className="text-xs text-muted-foreground">enviados en total</p>
                  </div>
                </CardContent>
              </Card>

              {isAuthenticated && (
                <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-amber-600">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-amber-100">Tus puntos</p>
                      <p className="text-2xl font-black">{currentUser?.friendly_points || 0}</p>
                      <p className="text-xs text-amber-100">
                        {currentUser?.friendly_exact_score_count || 0} exactos &middot; {currentUser?.friendly_predictions_count || 0} pron&oacute;sticos
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* PODIO */}
            {top3.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  Podio actual
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <div className={`md:order-1 ${top3.length < 2 ? 'invisible' : ''}`}>
                    {top3[1] && (
                      <Card className="text-center hover:shadow-lg transition-shadow border-slate-300">
                        <CardContent className="pt-6 pb-5">
                          <Medal className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">2do lugar</div>
                          <p className="text-xl font-bold mb-2 truncate">{top3[1].name}</p>
                          <p className="text-3xl font-black text-amber-600">{top3[1].friendly_points || 0}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">puntos</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="md:order-2">
                    <Card className="text-center ring-2 ring-amber-500 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-shadow md:scale-105 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/30">
                      <CardContent className="pt-7 pb-6">
                        <div className="relative">
                          <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                          <Beer className="w-5 h-5 text-amber-700 absolute top-0 right-1/3" />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                          1er lugar &#x1F37B;
                        </div>
                        <p className="text-2xl font-bold mb-2 truncate">{top3[0].name}</p>
                        <p className="text-4xl font-black bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                          {top3[0].friendly_points || 0}
                        </p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">puntos</p>
                        <Badge className="mt-3 bg-amber-500 hover:bg-amber-500 text-white">
                          Gana el six pack
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  <div className={`md:order-3 ${top3.length < 3 ? 'invisible' : ''}`}>
                    {top3[2] && (
                      <Card className="text-center hover:shadow-lg transition-shadow border-amber-700/30">
                        <CardContent className="pt-6 pb-5">
                          <Award className="w-10 h-10 text-amber-700 mx-auto mb-2" />
                          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">3er lugar</div>
                          <p className="text-xl font-bold mb-2 truncate">{top3[2].name}</p>
                          <p className="text-3xl font-black text-amber-600">{top3[2].friendly_points || 0}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">puntos</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tabla */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <Trophy className="w-5 h-5" />
                  Tabla completa de amistosos ({ranking.length} {ranking.length === 1 ? 'jugador' : 'jugadores'} con puntos)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ranking.length === 0 ? (
                  <div className="py-16 text-center">
                    <Beer className="w-16 h-16 text-amber-500/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">A&uacute;n no hay clasificaci&oacute;n</h3>
                    <p className="text-muted-foreground mb-6">
                      El ranking aparecer&aacute; cuando se jueguen los amistosos y haya pron&oacute;sticos evaluados.
                      {stats.totalPredictions > 0 && (
                        <> Ya hay <strong className="text-amber-600">{stats.totalPredictions} pron&oacute;stico{stats.totalPredictions !== 1 ? 's' : ''} enviado{stats.totalPredictions !== 1 ? 's' : ''}</strong>.</>
                      )}
                    </p>
                    {isAuthenticated && (
                      <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white gap-2">
                        <Link to="/matches">
                          Ir a pron&oacute;sticar amistosos
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                ) : (
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
                          <TableHead className="text-center">Premio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ranking.map((entry) => {
                          const isMe = entry.id === currentUser?.id;
                          const isWinner = entry.rank === 1;
                          return (
                            <TableRow
                              key={entry.id}
                              className={`${isMe ? 'bg-amber-500/5 border-amber-500/20' : ''} ${isWinner ? 'bg-amber-50/60 dark:bg-amber-950/20' : ''}`}
                            >
                              <TableCell className="font-bold">
                                <div className="flex items-center gap-2">
                                  {entry.rank === 1 && <Trophy className="w-5 h-5 text-amber-500" />}
                                  {entry.rank === 2 && <Medal className="w-5 h-5 text-slate-400" />}
                                  {entry.rank === 3 && <Award className="w-5 h-5 text-amber-700" />}
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
                                {entry.friendly_predictions_count || 0}
                              </TableCell>
                              <TableCell className="text-right text-amber-600 font-semibold">
                                {entry.friendly_exact_score_count || 0}
                              </TableCell>
                              <TableCell className="text-right">
                                <span className="text-lg font-black text-amber-600">
                                  {entry.friendly_points || 0}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">
                                {isWinner ? (
                                  <Badge className="bg-amber-500 hover:bg-amber-500 text-white gap-1">
                                    <Beer className="w-3 h-3" /> Six Pack
                                  </Badge>
                                ) : (
                                  <span className="text-xs text-muted-foreground">&mdash;</span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lista de partidos amistosos */}
            <div className="mt-10">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-amber-500" />
                Partidos amistosos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.map(match => {
                  const myPred = predictionsByMatchId.get(match.id);
                  const localDate = parseLocalDate(match.match_date);
                  const dateStr = localDate ? format(localDate, "EEEE d 'de' MMMM", { locale: es }) : 'TBD';
                  const isCompleted = match.status === 'completed';
                  const matchPredCount = match.predictions_count || 0;

                  return (
                    <Card
                      key={match.id}
                      className={`border-2 ${isCompleted ? 'border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/10' : 'border-amber-500/40 bg-amber-50/30 dark:bg-amber-950/10'}`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground capitalize">
                            {dateStr}
                          </span>
                          <div className="flex items-center gap-2">
                            {matchPredCount > 0 && (
                              <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {matchPredCount}
                              </span>
                            )}
                            <Badge className={isCompleted ? 'bg-emerald-500 hover:bg-emerald-500 text-white' : 'bg-amber-500 hover:bg-amber-500 text-white'}>
                              {isCompleted ? 'Finalizado' : 'Pr\u00f3ximo'}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-3xl leading-none">{getFlag(match.home_team)}</span>
                            <span className="font-bold">{match.home_team}</span>
                          </div>
                          <div className="text-center">
                            {isCompleted ? (
                              <div className="bg-foreground text-background font-black px-3 py-1 rounded-md text-xl tracking-widest">
                                {match.home_score} - {match.away_score}
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span className="font-bold">{match.match_time}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-1 justify-end">
                            <span className="font-bold">{match.away_team}</span>
                            <span className="text-3xl leading-none">{getFlag(match.away_team)}</span>
                          </div>
                        </div>

                        {/* Mi pron\u00f3stico */}
                        {isAuthenticated && (
                          <div className="bg-muted/40 rounded-lg p-3 mt-3">
                            {myPred ? (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    Tu pron&oacute;stico
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="bg-amber-500 text-white font-black px-2.5 py-0.5 rounded text-base tracking-widest">
                                      {myPred.predicted_home_score} - {myPred.predicted_away_score}
                                    </span>
                                    {myPred.status === 'evaluated' && (
                                      <Badge className={myPred.points_awarded > 0 ? 'bg-emerald-500 hover:bg-emerald-500 text-white' : ''} variant={myPred.points_awarded > 0 ? 'default' : 'outline'}>
                                        {myPred.points_awarded > 0 ? `+${myPred.points_awarded} pts` : '0 pts'}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                {!isCompleted && (
                                  <p className="text-[10px] text-muted-foreground italic mt-2 flex items-center gap-1">
                                    <Lock className="w-2.5 h-2.5" />
                                    Pron&oacute;stico guardado &middot; no editable
                                  </p>
                                )}
                              </>
                            ) : !isCompleted ? (
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground mb-2">A&uacute;n no has pron&oacute;sticado este partido</p>
                                <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-white gap-1">
                                  <Link to="/matches">
                                    Pron&oacute;sticar ahora
                                    <ChevronRight className="w-3 h-3" />
                                  </Link>
                                </Button>
                              </div>
                            ) : (
                              <p className="text-sm text-center text-muted-foreground italic">
                                No pron&oacute;sticaste este partido
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            {isAuthenticated && (
              <div className="mt-10 text-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold shadow-lg shadow-amber-500/20 gap-2">
                  <Link to="/matches">
                    <Beer className="w-5 h-5" />
                    Ir a pron&oacute;sticar amistosos
                  </Link>
                </Button>
              </div>
            )}

            {/* Pie informativo */}
            <div className="mt-12 p-6 rounded-2xl bg-muted/40 border border-dashed text-center">
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                <strong className="text-foreground">\u00bfC\u00f3mo funciona?</strong> Solo los pron&oacute;sticos de los amistosos cuentan para esta clasificaci&oacute;n.
                Marcador exacto: 5 puntos. Ganador + diferencia: 3 puntos. Solo ganador: 1 punto. El primer lugar al final de los amistosos
                recibe un <strong className="text-amber-600">six pack de cerveza Michelob Ultra</strong> entregado en persona.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AmistososPage;
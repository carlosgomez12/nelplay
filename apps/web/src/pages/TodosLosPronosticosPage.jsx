import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
import { Trophy, Activity, CheckCircle2, AlertCircle, Users, LayoutList } from 'lucide-react';
import { toast } from 'sonner';

// Mapeo de banderas para visualización UI
const TEAM_FLAGS = {
  'Argentina': '🇦🇷', 'Brasil': '🇧🇷', 'Colombia': '🇨🇴', 'Uruguay': '🇺🇾',
  'Ecuador': '🇪🇨', 'Peru': '🇵🇪', 'Chile': '🇨🇱', 'Venezuela': '🇻🇪',
  'Paraguay': '🇵🇾', 'Bolivia': '🇧🇴', 'Mexico': '🇲🇽', 'Estados Unidos': '🇺🇸',
  'España': '🇪🇸', 'Francia': '🇫🇷', 'Alemania': '🇩🇪', 'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Italia': '🇮🇹', 'Portugal': '🇵🇹', 'Paises Bajos': '🇳🇱', 'Croacia': '🇭🇷',
  'Costa Rica': '🇨🇷', 'Jordania': '🇯🇴'
};

const getFlag = (teamName) => {
  return TEAM_FLAGS[teamName] || '🏳️';
};

const TodosLosPronosticosPage = () => {
  const { isAuthenticated } = useAuth();
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [matchData, setMatchData] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingPredictions, setLoadingPredictions] = useState(false);

  // Cargar lista de partidos (live / completed)
  useEffect(() => {
    if (!isAuthenticated) {
      setLoadingMatches(false);
      return;
    }

    const fetchMatches = async () => {
      setLoadingMatches(true);
      try {
        const records = await pb.collection('matches').getFullList({
          filter: "status = 'live' || status = 'completed'",
          sort: '-match_date,-match_time',
          $autoCancel: false
        });
        setMatches(records);
        if (records.length > 0) {
          setSelectedMatchId(records[0].id);
        }
      } catch (err) {
        console.error('Error fetching matches:', err);
        toast.error('No se pudieron cargar los partidos.');
      } finally {
        setLoadingMatches(false);
      }
    };
    fetchMatches();
  }, [isAuthenticated]);

  // Cargar predicciones del partido seleccionado vía endpoint custom
  useEffect(() => {
    if (!isAuthenticated || !selectedMatchId) {
      return;
    }

    const fetchPredictions = async () => {
      setLoadingPredictions(true);
      setPredictions([]);
      setMatchData(null);
      try {
        // FIX: usar el endpoint custom de PocketBase que valida que el match
        // ya inició y devuelve los pronósticos con user_name resuelto.
        const token = pb.authStore.token;
        const res = await fetch(
          `/hcgi/platform/api/public-predictions/${selectedMatchId}`,
          { headers: { 'Authorization': 'Bearer ' + token } }
        );

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error || 'No se pudieron cargar los pronósticos');
        }

        const body = await res.json();
        setPredictions(body.predictions || []);
        setMatchData(body.match || null);
      } catch (err) {
        console.error('Error fetching predictions:', err);
        toast.error('Error al cargar los pronósticos: ' + err.message);
      } finally {
        setLoadingPredictions(false);
      }
    };

    fetchPredictions();
  }, [isAuthenticated, selectedMatchId]);

  // El endpoint ya retorna user_name directamente
  const getUserName = (pred) => pred.user_name || 'Usuario Anónimo';

  // El endpoint NO retorna avatar (es info pública limitada). El AvatarFallback con la inicial es suficiente.
  const getUserAvatar = () => '';

  const selectedMatch = matches.find(m => m.id === selectedMatchId);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Pronósticos Públicos - NelPlay</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {/* Header Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
                  <LayoutList className="w-8 h-8 text-primary" />
                  Pronósticos Públicos
                </h1>
                <p className="text-muted-foreground mt-2">
                  Consulta las predicciones de todos los jugadores para los partidos en juego o finalizados.
                </p>
              </div>

              {/* Match Selector */}
              <div className="w-full md:w-80">
                {loadingMatches ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : matches.length > 0 ? (
                  <Select value={selectedMatchId} onValueChange={setSelectedMatchId}>
                    <SelectTrigger className="w-full bg-card border-border">
                      <SelectValue placeholder="Selecciona un partido" />
                    </SelectTrigger>
                    <SelectContent>
                      {matches.map((match) => (
                        <SelectItem key={match.id} value={match.id}>
                          {getFlag(match.home_team)} {match.home_team} vs {match.away_team} {getFlag(match.away_team)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-sm text-muted-foreground p-2 bg-muted rounded-md text-center">
                    No hay partidos disponibles.
                  </div>
                )}
              </div>
            </div>

            {/* Match Overview Card */}
            {selectedMatch && (
              <Card className="mb-8 border-primary/20 shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                  {selectedMatch.status === 'live' ? (
                    <Badge variant="destructive" className="animate-pulse flex items-center gap-1.5 px-3 py-1">
                      <Activity className="w-3.5 h-3.5" /> En Vivo
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-success/15 text-success border-success/30 flex items-center gap-1.5 px-3 py-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Finalizado
                    </Badge>
                  )}
                </div>

                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {/* Home Team */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="text-6xl mb-3 drop-shadow-sm">{getFlag(selectedMatch.home_team)}</div>
                      <h3 className="text-xl font-bold text-center">{selectedMatch.home_team}</h3>
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="text-4xl md:text-6xl font-black tabular-nums tracking-tighter bg-muted px-6 py-4 rounded-2xl border shadow-inner">
                        {selectedMatch.home_score ?? '-'} : {selectedMatch.away_score ?? '-'}
                      </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="text-6xl mb-3 drop-shadow-sm">{getFlag(selectedMatch.away_team)}</div>
                      <h3 className="text-xl font-bold text-center">{selectedMatch.away_team}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Predictions Table */}
            <Card>
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  Lista de Predicciones
                </CardTitle>
                <CardDescription>
                  Mostrando {predictions.length} pronósticos para este partido.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {loadingPredictions ? (
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                  </div>
                ) : predictions.length === 0 ? (
                  <div className="p-16 text-center text-muted-foreground flex flex-col items-center justify-center">
                    <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                    <h3 className="text-lg font-bold text-foreground mb-1">Sin pronósticos</h3>
                    <p>Nadie registró una predicción para este partido.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[300px]">Jugador</TableHead>
                          <TableHead className="text-center">Pronóstico</TableHead>
                          <TableHead className="text-right">Puntos Ganados</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {predictions.map((pred, idx) => {
                          const isExactMatch =
                            selectedMatch?.status === 'completed' &&
                            pred.predicted_home_score === selectedMatch.home_score &&
                            pred.predicted_away_score === selectedMatch.away_score;

                          const isWinnerMatch =
                            selectedMatch?.status === 'completed' &&
                            !isExactMatch &&
                            pred.points_awarded > 0;

                          return (
                            <TableRow key={pred.user_id || idx} className="transition-colors">
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9 border">
                                    <AvatarImage src={getUserAvatar()} alt={getUserName(pred)} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                      {getUserName(pred).charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-semibold text-foreground">
                                    {getUserName(pred)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-muted border font-bold tabular-nums text-lg">
                                  {pred.predicted_home_score} - {pred.predicted_away_score}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                {selectedMatch?.status === 'completed' ? (
                                  <div className="flex items-center justify-end gap-2">
                                    <span className={`text-xl font-black ${isExactMatch ? 'text-amber-500' :
                                        isWinnerMatch ? 'text-success' : 'text-muted-foreground'
                                      }`}>
                                      +{pred.points_awarded || 0}
                                    </span>
                                    {isExactMatch && <Trophy className="w-5 h-5 text-amber-500" />}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground text-sm font-medium">En espera</span>
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
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TodosLosPronosticosPage;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Receipt, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { format } from 'date-fns';

const MyBetsPage = () => {
  const { currentUser } = useAuth();
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBets();
  }, [currentUser]);

  const fetchBets = async () => {
    if (!currentUser) return;

    try {
      const records = await pb.collection('bets').getList(1, 100, {
        filter: `user_id = "${currentUser.id}"`,
        sort: '-created',
        $autoCancel: false
      });
      setBets(records.items);
    } catch (error) {
      toast.error('Error al cargar las apuestas');
    } finally {
      setLoading(false);
    }
  };

  const activeBets = bets.filter(b => b.status === 'pending');
  const wonBets = bets.filter(b => b.status === 'won');
  const lostBets = bets.filter(b => b.status === 'lost');

  const translateStatus = (status) => {
    if (status === 'pending') return 'Pendiente';
    if (status === 'won') return 'Ganada';
    if (status === 'lost') return 'Perdida';
    return status;
  };

  const BetCard = ({ bet }) => (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  bet.status === 'won' ? 'default' :
                  bet.status === 'lost' ? 'destructive' :
                  'secondary'
                }
                className={
                  bet.status === 'won' ? 'bg-success text-success-foreground' :
                  bet.status === 'lost' ? 'bg-destructive' :
                  'bg-muted'
                }
              >
                {translateStatus(bet.status)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {format(new Date(bet.created), 'dd MMM, yyyy HH:mm')}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              {bet.bet_type === 'match_winner' && 'Ganador del Partido'}
              {bet.bet_type === 'total_goals' && 'Total de Goles'}
              {bet.bet_type === 'parlay' && 'Apuesta Combinada'}
            </p>
            <p className="font-semibold text-lg">{bet.selected_outcome}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Cuota</p>
            <p className="text-2xl font-bold text-accent">{bet.odds.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Importe</p>
            <p className="font-semibold">${bet.amount.toLocaleString('es-CO')} COP</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">
              {bet.status === 'won' ? 'Ganancias' : 'Ganancia Potencial'}
            </p>
            <p className={`font-semibold ${bet.status === 'won' ? 'text-success' : ''}`}>
              ${(bet.status === 'won' ? bet.actual_winnings : bet.potential_winnings).toLocaleString('es-CO')} COP
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando sus apuestas...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mis Apuestas - NelPlay</title>
        <meta name="description" content="Vea su historial de apuestas y haga un seguimiento de sus apuestas activas en los partidos de la Copa Mundial 2026." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-balance">Mis Apuestas</h1>
              <p className="text-lg text-muted-foreground">
                Haga un seguimiento de su historial y apuestas activas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Apuestas Activas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-3xl font-bold">{activeBets.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Apuestas Ganadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <span className="text-3xl font-bold text-success">{wonBets.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Apuestas Perdidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                    <span className="text-3xl font-bold text-destructive">{lostBets.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="active">Activas</TabsTrigger>
                <TabsTrigger value="won">Ganadas</TabsTrigger>
                <TabsTrigger value="lost">Perdidas</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                {activeBets.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Receipt className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No hay apuestas activas</h3>
                      <p className="text-muted-foreground">Realice algunas apuestas para verlas aquí</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeBets.map(bet => <BetCard key={bet.id} bet={bet} />)}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="won" className="mt-6">
                {wonBets.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Aún no hay apuestas ganadas</h3>
                      <p className="text-muted-foreground">Siga apostando para ver sus victorias aquí</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wonBets.map(bet => <BetCard key={bet.id} bet={bet} />)}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="lost" className="mt-6">
                {lostBets.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <TrendingDown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No hay apuestas perdidas</h3>
                      <p className="text-muted-foreground">¡Excelente trabajo!</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lostBets.map(bet => <BetCard key={bet.id} bet={bet} />)}
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

export default MyBetsPage;
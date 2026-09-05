import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useBetSlip } from '@/contexts/BetSlipContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const BetPlacementPage = () => {
  const { currentUser, refreshUser } = useAuth();
  const { bets, totalStake, totalPotentialWinnings, clearBets } = useBetSlip();
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [placing, setPlacing] = useState(false);

  const handleConfirmBets = async () => {
    if (totalStake > (currentUser?.balance || 0)) {
      toast.error('Saldo insuficiente');
      return;
    }

    setPlacing(true);

    try {
      for (const bet of bets) {
        await pb.collection('bets').create({
          user_id: currentUser.id,
          match_id: bet.matchId,
          bet_type: bet.betType,
          amount: bet.amount,
          odds: bet.odds,
          potential_winnings: bet.amount * bet.odds,
          status: 'pending',
          selected_outcome: bet.selectedOutcome
        }, { $autoCancel: false });
      }

      const newBalance = (currentUser.balance || 0) - totalStake;
      await pb.collection('users').update(currentUser.id, {
        balance: newBalance
      }, { $autoCancel: false });

      await pb.collection('transactions').create({
        user_id: currentUser.id,
        type: 'bet_loss',
        amount: totalStake,
        status: 'completed'
      }, { $autoCancel: false });

      await refreshUser();
      clearBets();
      setShowConfirmDialog(false);
      toast.success('Apuestas realizadas exitosamente');
      navigate('/my-bets');
    } catch (error) {
      toast.error('Error al realizar las apuestas');
    } finally {
      setPlacing(false);
    }
  };

  if (bets.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No hay apuestas en el boleto</h3>
              <p className="text-muted-foreground mb-6">Añada algunas apuestas desde la página de partidos</p>
              <Button onClick={() => navigate('/matches')}>
                Explorar Partidos
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Realizar Apuesta - NelPlay</title>
        <meta name="description" content="Revise y confirme sus apuestas para los partidos de la Copa Mundial 2026." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <Button
              variant="ghost"
              onClick={() => navigate('/matches')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Partidos
            </Button>

            <h1 className="text-4xl font-bold mb-8 text-balance">Revisar sus Apuestas</h1>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Apuestas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bets.map((bet, index) => (
                    <div key={index} className="bg-muted rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{bet.matchName}</p>
                          <p className="text-sm text-muted-foreground">
                            {bet.betType === 'match_winner' && 'Ganador del Partido'}
                            {bet.betType === 'total_goals' && 'Total de Goles'}
                            {bet.betType === 'parlay' && 'Apuesta Combinada'}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-accent">{bet.odds.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-muted-foreground">
                          {bet.selectedOutcome}
                        </span>
                        <span className="font-semibold">
                          ${bet.amount.toLocaleString('es-CO')} COP
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Importe Total</span>
                    <span className="font-semibold text-lg">
                      ${totalStake.toLocaleString('es-CO')} COP
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Saldo Actual</span>
                    <span className="font-semibold">
                      ${(currentUser?.balance || 0).toLocaleString('es-CO')} COP
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="font-medium">Ganancias Potenciales</span>
                    <span className="text-2xl font-bold text-success">
                      ${totalPotentialWinnings.toLocaleString('es-CO')} COP
                    </span>
                  </div>
                </CardContent>
              </Card>

              {totalStake > (currentUser?.balance || 0) && (
                <Card className="border-destructive">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="w-5 h-5" />
                      <p className="font-medium">Saldo insuficiente. Por favor, añada fondos a su billetera.</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                onClick={() => setShowConfirmDialog(true)}
                disabled={totalStake > (currentUser?.balance || 0)}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                Confirmar y Realizar Apuestas
              </Button>
            </div>
          </div>
        </main>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar sus Apuestas</DialogTitle>
              <DialogDescription>
                Está a punto de realizar {bets.length} apuesta{bets.length > 1 ? 's' : ''} con un importe total de ${totalStake.toLocaleString('es-CO')} COP
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Importe Total</span>
                  <span className="font-semibold">${totalStake.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ganancias Potenciales</span>
                  <span className="font-semibold text-success">${totalPotentialWinnings.toLocaleString('es-CO')} COP</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)} disabled={placing}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmBets} disabled={placing} className="bg-primary hover:bg-primary/90">
                {placing ? 'Realizando...' : 'Confirmar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </>
  );
};

export default BetPlacementPage;
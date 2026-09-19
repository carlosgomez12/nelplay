import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBetSlip } from '@/contexts/BetSlipContext.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Receipt, X, TrendingUp, ArrowLeft, Trophy, Target, Layers } from 'lucide-react';
import { toast } from 'sonner';

const BetSlip = () => {
  const { 
    bets, removeBet, updateBetAmount, totalStake, totalPotentialWinnings,
    isSheetOpen, setIsSheetOpen, viewingMatch, closeSheet, addBet
  } = useBetSlip();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [localBetAmount, setLocalBetAmount] = useState(10000);

  const handlePlaceBets = () => {
    if (!isAuthenticated) {
      closeSheet();
      navigate('/login');
      return;
    }
    closeSheet();
    navigate('/place-bet');
  };

  const handleAddSpecificBet = (betType, outcome, odds) => {
    addBet({
      matchId: viewingMatch.id,
      matchName: `${viewingMatch.home_team} vs ${viewingMatch.away_team}`,
      betType,
      selectedOutcome: outcome,
      odds,
      amount: localBetAmount
    });
    closeSheet();
  };

  const renderMatchBettingView = () => {
    if (!viewingMatch) return null;

    return (
      <div className="flex flex-col h-full">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" onClick={() => closeSheet()} className="h-8 w-8 -ml-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <SheetTitle>Opciones de Apuesta</SheetTitle>
          </div>
          <div className="bg-muted/50 p-4 rounded-xl text-center">
            <div className="flex justify-center items-center gap-4 mb-2">
              <span className="font-bold text-lg">{viewingMatch.home_team}</span>
              <span className="text-muted-foreground text-sm">vs</span>
              <span className="font-bold text-lg">{viewingMatch.away_team}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {viewingMatch.match_date} • {viewingMatch.match_time} • {viewingMatch.stadium_name}
            </p>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 py-4">
          <Tabs defaultValue="winner" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="winner" className="text-xs"><Trophy className="w-3 h-3 mr-1"/> Ganador</TabsTrigger>
              <TabsTrigger value="goals" className="text-xs"><Target className="w-3 h-3 mr-1"/> Goles</TabsTrigger>
              <TabsTrigger value="parlay" className="text-xs"><Layers className="w-3 h-3 mr-1"/> Parlay</TabsTrigger>
            </TabsList>

            <TabsContent value="winner" className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Ganador del Partido</h4>
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="justify-between h-14 hover:border-primary hover:bg-primary/5" onClick={() => handleAddSpecificBet('match_winner', viewingMatch.home_team, viewingMatch.odds_match_winner?.home || 2.0)}>
                  <span className="font-medium">{viewingMatch.home_team}</span>
                  <span className="font-bold text-lg text-primary">{(viewingMatch.odds_match_winner?.home || 2.0).toFixed(2)}</span>
                </Button>
                <Button variant="outline" className="justify-between h-14 hover:border-primary hover:bg-primary/5" onClick={() => handleAddSpecificBet('match_winner', 'Empate', viewingMatch.odds_match_winner?.draw || 3.0)}>
                  <span className="font-medium">Empate</span>
                  <span className="font-bold text-lg text-primary">{(viewingMatch.odds_match_winner?.draw || 3.0).toFixed(2)}</span>
                </Button>
                <Button variant="outline" className="justify-between h-14 hover:border-primary hover:bg-primary/5" onClick={() => handleAddSpecificBet('match_winner', viewingMatch.away_team, viewingMatch.odds_match_winner?.away || 2.5)}>
                  <span className="font-medium">{viewingMatch.away_team}</span>
                  <span className="font-bold text-lg text-primary">{(viewingMatch.odds_match_winner?.away || 2.5).toFixed(2)}</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Total de Goles (2.5)</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex-col h-20 hover:border-primary hover:bg-primary/5" onClick={() => handleAddSpecificBet('total_goals', 'Más de 2.5', viewingMatch.odds_total_goals?.over_2_5 || 1.9)}>
                  <span className="text-sm text-muted-foreground mb-1">Más de 2.5</span>
                  <span className="font-bold text-lg text-primary">{(viewingMatch.odds_total_goals?.over_2_5 || 1.9).toFixed(2)}</span>
                </Button>
                <Button variant="outline" className="flex-col h-20 hover:border-primary hover:bg-primary/5" onClick={() => handleAddSpecificBet('total_goals', 'Menos de 2.5', viewingMatch.odds_total_goals?.under_2_5 || 1.85)}>
                  <span className="text-sm text-muted-foreground mb-1">Menos de 2.5</span>
                  <span className="font-bold text-lg text-primary">{(viewingMatch.odds_total_goals?.under_2_5 || 1.85).toFixed(2)}</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="parlay" className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Apuestas Combinadas</h4>
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="justify-between h-auto py-4 hover:border-primary hover:bg-primary/5" onClick={() => handleAddSpecificBet('parlay', `${viewingMatch.home_team} gana y Más de 2.5 goles`, viewingMatch.odds_parlay?.option1 || 3.5)}>
                  <span className="font-medium text-left text-balance pr-4">{viewingMatch.home_team} gana y Más de 2.5 goles</span>
                  <span className="font-bold text-lg text-primary shrink-0">{(viewingMatch.odds_parlay?.option1 || 3.5).toFixed(2)}</span>
                </Button>
                <Button variant="outline" className="justify-between h-auto py-4 hover:border-primary hover:bg-primary/5" onClick={() => handleAddSpecificBet('parlay', `${viewingMatch.away_team} gana y Menos de 2.5 goles`, viewingMatch.odds_parlay?.option2 || 4.2)}>
                  <span className="font-medium text-left text-balance pr-4">{viewingMatch.away_team} gana y Menos de 2.5 goles</span>
                  <span className="font-bold text-lg text-primary shrink-0">{(viewingMatch.odds_parlay?.option2 || 4.2).toFixed(2)}</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <div className="border-t pt-4 mt-auto">
          <div className="mb-4">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Importe por defecto (COP)</label>
            <Input 
              type="number" 
              value={localBetAmount} 
              onChange={(e) => setLocalBetAmount(Number(e.target.value))}
              className="text-lg font-bold"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSlipView = () => (
    <div className="flex flex-col h-full">
      <SheetHeader className="pb-4 border-b">
        <SheetTitle className="flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Boleto de Apuesta
        </SheetTitle>
      </SheetHeader>

      {bets.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <Receipt className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Su boleto está vacío</h3>
          <p className="text-sm text-muted-foreground max-w-[250px]">
            Añada apuestas desde el calendario de partidos para comenzar a jugar.
          </p>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 py-4 pr-4 -mr-4">
            <div className="space-y-4">
              {bets.map((bet, index) => (
                <div key={index} className="bg-card border rounded-xl p-4 shadow-sm relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBet(index)}
                    className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  <p className="font-semibold text-sm pr-6 leading-tight mb-1">{bet.matchName}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {bet.betType === 'match_winner' && 'Ganador'}
                      {bet.betType === 'total_goals' && 'Goles'}
                      {bet.betType === 'parlay' && 'Parlay'}
                    </Badge>
                    <span className="text-sm font-bold text-primary">{bet.selectedOutcome}</span>
                  </div>

                  <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg">
                    <div className="flex-1">
                      <Input
                        type="number"
                        min="1000"
                        step="1000"
                        value={bet.amount}
                        onChange={(e) => updateBetAmount(index, parseFloat(e.target.value) || 0)}
                        className="h-8 text-sm font-medium bg-background"
                      />
                    </div>
                    <div className="text-right min-w-[60px]">
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">Cuota</p>
                      <p className="text-base font-black text-foreground">{bet.odds.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <span className="text-xs font-medium text-muted-foreground">Ganancia Potencial</span>
                    <span className="font-bold text-success">
                      ${(bet.amount * bet.odds).toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t pt-4 mt-auto bg-background">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Importe Total</span>
                <span className="font-semibold">${totalStake.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">Ganancias Potenciales</span>
                <span className="text-xl font-black text-success">
                  ${totalPotentialWinnings.toLocaleString('es-CO')}
                </span>
              </div>
            </div>
            <Button
              onClick={handlePlaceBets}
              className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Realizar Apuestas
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-colors">
          <Receipt className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline font-semibold">Boleto</span>
          {bets.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground border-2 border-background px-1.5 min-w-[20px] h-5 flex items-center justify-center">
              {bets.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-6">
        {viewingMatch ? renderMatchBettingView() : renderSlipView()}
      </SheetContent>
    </Sheet>
  );
};

export default BetSlip;
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const BetSlipContext = createContext();

export const useBetSlip = () => {
  const context = useContext(BetSlipContext);
  if (!context) {
    throw new Error('useBetSlip must be used within a BetSlipProvider');
  }
  return context;
};

export const BetSlipProvider = ({ children }) => {
  const [bets, setBets] = useState(() => {
    const saved = localStorage.getItem('mundialbets_slip');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [viewingMatch, setViewingMatch] = useState(null);

  useEffect(() => {
    localStorage.setItem('mundialbets_slip', JSON.stringify(bets));
  }, [bets]);

  const addBet = (bet) => {
    setBets(prev => {
      // Check if bet already exists
      const exists = prev.findIndex(b => 
        b.matchId === bet.matchId && 
        b.betType === bet.betType && 
        b.selectedOutcome === bet.selectedOutcome
      );
      
      if (exists >= 0) {
        toast.info('Esta apuesta ya está en tu boleto');
        return prev;
      }
      
      toast.success('Añadido al boleto de apuesta');
      return [...prev, bet];
    });
  };

  const removeBet = (index) => {
    setBets(prev => prev.filter((_, i) => i !== index));
  };

  const updateBetAmount = (index, amount) => {
    setBets(prev => {
      const newBets = [...prev];
      newBets[index] = { ...newBets[index], amount };
      return newBets;
    });
  };

  const clearSlip = () => {
    setBets([]);
  };

  const openMatchBetting = (match) => {
    setViewingMatch(match);
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    setTimeout(() => setViewingMatch(null), 300); // Clear after animation
  };

  const totalStake = bets.reduce((sum, bet) => sum + (Number(bet.amount) || 0), 0);
  const totalPotentialWinnings = bets.reduce((sum, bet) => sum + ((Number(bet.amount) || 0) * bet.odds), 0);

  return (
    <BetSlipContext.Provider value={{
      bets,
      addBet,
      removeBet,
      updateBetAmount,
      clearSlip,
      totalStake,
      totalPotentialWinnings,
      isSheetOpen,
      setIsSheetOpen,
      viewingMatch,
      openMatchBetting,
      closeSheet
    }}>
      {children}
    </BetSlipContext.Provider>
  );
};
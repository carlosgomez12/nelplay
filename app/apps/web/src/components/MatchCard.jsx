import React from 'react';
import { useBetSlip } from '@/contexts/BetSlipContext.jsx';
import { useFootballTheme } from '@/hooks/useFootballTheme.js';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

const MatchCard = ({ match }) => {
  const { addBet } = useBetSlip();
  const { getTeamColor, getTeamFlag, getStageColor } = useFootballTheme();

  const handleAddBet = (betType, outcome, odds) => {
    const bet = {
      matchId: match.id,
      matchName: `${match.home_team} vs ${match.away_team}`,
      betType,
      selectedOutcome: outcome,
      odds,
      amount: 10000
    };
    addBet(bet);
    toast.success('Añadido al boleto de apuesta');
  };

  const translateStatus = (status) => {
    if (status === 'upcoming') return 'Próximo';
    if (status === 'live') return 'En Vivo';
    if (status === 'completed') return 'Finalizado';
    return status;
  };

  const homeColor = getTeamColor(match.home_team).primary;
  const awayColor = getTeamColor(match.away_team).primary;
  
  const homeFlag = getTeamFlag(match.home_team, match.team_flags, 'home');
  const awayFlag = getTeamFlag(match.away_team, match.team_flags, 'away');

  const isEmoji = (str) => {
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
    return emojiRegex.test(str) || str === '⚽';
  };

  const renderFlag = (flagStr) => {
    if (isEmoji(flagStr)) {
      return <span className="text-3xl leading-none">{flagStr}</span>;
    }
    return <img src={flagStr} alt="Flag" className="w-8 h-8 object-cover rounded-full border shadow-sm" />;
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-muted/60 group bg-card/50 backdrop-blur-sm">
      <div className="h-2 w-full flex">
        <div className="h-full flex-1" style={{ backgroundColor: homeColor }}></div>
        <div className="h-full flex-1" style={{ backgroundColor: awayColor }}></div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className={`px-2.5 py-0.5 border ${getStageColor(match.stage)}`}>
            {match.stage || 'Fase de Grupos'}
          </Badge>
          <Badge 
            variant={match.status === 'live' ? 'destructive' : 'secondary'} 
            className={match.status === 'live' ? 'animate-pulse' : ''}
          >
            {translateStatus(match.status)}
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center flex-1 gap-2">
            {renderFlag(homeFlag)}
            <span className="font-bold text-center text-balance leading-tight">{match.home_team}</span>
          </div>
          
          <div className="flex flex-col items-center px-4">
            <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full mb-1">
              {match.match_time}
            </div>
            <span className="text-xs text-muted-foreground font-medium">VS</span>
          </div>

          <div className="flex flex-col items-center flex-1 gap-2">
            {renderFlag(awayFlag)}
            <span className="font-bold text-center text-balance leading-tight">{match.away_team}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground mb-6 bg-muted/30 py-2 rounded-lg">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {match.match_date ? format(parseISO(match.match_date), "d 'de' MMMM", { locale: es }) : 'TBD'}
          </div>
          {match.stadium_name && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[120px]">{match.stadium_name}</span>
            </div>
          )}
        </div>

        {match.status !== 'completed' && match.odds_match_winner && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-center text-muted-foreground uppercase tracking-wider">
              Ganador del Partido
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex flex-col h-auto py-2 hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={() => handleAddBet('match_winner', match.home_team, match.odds_match_winner.home)}
              >
                <span className="text-[10px] text-muted-foreground mb-0.5">1</span>
                <span className="font-bold text-foreground">{match.odds_match_winner.home?.toFixed(2)}</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto py-2 hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={() => handleAddBet('match_winner', 'Empate', match.odds_match_winner.draw)}
              >
                <span className="text-[10px] text-muted-foreground mb-0.5">X</span>
                <span className="font-bold text-foreground">{match.odds_match_winner.draw?.toFixed(2)}</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto py-2 hover:border-primary hover:bg-primary/5 transition-colors"
                onClick={() => handleAddBet('match_winner', match.away_team, match.odds_match_winner.away)}
              >
                <span className="text-[10px] text-muted-foreground mb-0.5">2</span>
                <span className="font-bold text-foreground">{match.odds_match_winner.away?.toFixed(2)}</span>
              </Button>
            </div>
          </div>
        )}

        {match.status === 'completed' && (
          <div className="text-center py-4 bg-muted/50 rounded-lg mt-4">
            <div className="text-2xl font-black tracking-widest">
              {match.home_score} - {match.away_score}
            </div>
            <div className="text-xs text-muted-foreground mt-1 uppercase font-semibold">Resultado Final</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchCard;
import React from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { MapPin, Clock, CalendarDays, ChevronRight } from 'lucide-react';
import { useBetSlip } from '@/contexts/BetSlipContext.jsx';

const MatchRow = ({ match }) => {
  const { openMatchBetting } = useBetSlip();

  const isEmoji = (str) => {
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
    return emojiRegex.test(str) || str === '⚽';
  };

  let flags = {};
  try {
    flags = typeof match.team_flags === 'string' ? JSON.parse(match.team_flags) : (match.team_flags || {});
  } catch (e) {
    // ignore
  }

  const homeFlag = flags.home_flag_url || '⚽';
  const awayFlag = flags.away_flag_url || '⚽';

  const renderFlag = (flagStr) => {
    if (isEmoji(flagStr)) {
      return <span className="text-2xl leading-none">{flagStr}</span>;
    }
    return <img src={flagStr} alt="Flag" className="w-8 h-8 object-cover rounded-full border shadow-sm" />;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'live':
        return <Badge variant="destructive" className="animate-pulse uppercase text-[10px] font-bold tracking-wider">En Vivo</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="uppercase text-[10px] font-bold tracking-wider">Finalizado</Badge>;
      default:
        return <Badge variant="outline" className="uppercase text-[10px] font-bold tracking-wider bg-primary/5 text-primary border-primary/20">Próximo</Badge>;
    }
  };

  const formattedDate = match.match_date ? format(parseISO(match.match_date), "EEE, d MMM", { locale: es }) : 'TBD';

  return (
    <div className="group flex flex-col lg:flex-row items-center justify-between p-4 sm:p-5 bg-card border rounded-xl hover:shadow-md hover:border-primary/30 transition-all duration-200 gap-4 lg:gap-6">
      
      {/* Date & Time (Desktop: Left, Mobile: Top) */}
      <div className="flex lg:flex-col items-center lg:items-start gap-3 lg:gap-1 w-full lg:w-32 shrink-0 text-muted-foreground">
        <div className="flex items-center gap-1.5 text-sm font-semibold capitalize">
          <CalendarDays className="w-4 h-4 lg:hidden" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
          <Clock className="w-4 h-4 text-primary" />
          {match.match_time}
        </div>
        <div className="ml-auto lg:hidden">
          {getStatusBadge(match.status)}
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between w-full lg:flex-1 gap-4 bg-muted/30 p-3 rounded-lg lg:bg-transparent lg:p-0">
        <div className="flex items-center gap-3 flex-1 justify-end lg:justify-end">
          <span className="font-bold text-sm sm:text-base text-right leading-tight">{match.home_team}</span>
          {renderFlag(homeFlag)}
        </div>
        
        <div className="flex flex-col items-center px-2 shrink-0">
          {match.status === 'completed' ? (
            <div className="bg-foreground text-background font-black px-3 py-1 rounded-md text-lg tracking-widest">
              {match.home_score} - {match.away_score}
            </div>
          ) : (
            <span className="text-xs font-black text-muted-foreground/50 uppercase tracking-widest">VS</span>
          )}
        </div>

        <div className="flex items-center gap-3 flex-1 justify-start lg:justify-start">
          {renderFlag(awayFlag)}
          <span className="font-bold text-sm sm:text-base text-left leading-tight">{match.away_team}</span>
        </div>
      </div>

      {/* Stadium & Status (Desktop) */}
      <div className="hidden lg:flex flex-col items-center justify-center w-40 shrink-0 gap-2">
        {getStatusBadge(match.status)}
        {match.stadium_name && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground text-center">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate max-w-[120px]">{match.stadium_name}</span>
          </div>
        )}
      </div>

      {/* Odds & Action */}
      <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-4 mt-2 lg:mt-0">
        {match.status !== 'completed' && match.odds_match_winner && (
          <div className="hidden sm:flex items-center gap-1.5 bg-muted p-1 rounded-lg">
            <div className="flex flex-col items-center px-3 py-1 hover:bg-background rounded-md transition-colors cursor-default">
              <span className="text-[10px] text-muted-foreground font-semibold">1</span>
              <span className="font-bold text-sm">{match.odds_match_winner.home?.toFixed(2)}</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex flex-col items-center px-3 py-1 hover:bg-background rounded-md transition-colors cursor-default">
              <span className="text-[10px] text-muted-foreground font-semibold">X</span>
              <span className="font-bold text-sm">{match.odds_match_winner.draw?.toFixed(2)}</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex flex-col items-center px-3 py-1 hover:bg-background rounded-md transition-colors cursor-default">
              <span className="text-[10px] text-muted-foreground font-semibold">2</span>
              <span className="font-bold text-sm">{match.odds_match_winner.away?.toFixed(2)}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={() => openMatchBetting(match)}
          disabled={match.status === 'completed'}
          className="w-full sm:w-auto font-bold shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          variant={match.status === 'completed' ? "secondary" : "default"}
        >
          {match.status === 'completed' ? 'Ver Detalles' : 'Apostar'}
          <ChevronRight className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Button>
      </div>
    </div>
  );
};

export default MatchRow;
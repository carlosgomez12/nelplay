import React from 'react';
import { useBetSlip } from '@/contexts/BetSlipContext.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const KnockoutMatchCard = ({ match, stageClass }) => {
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
      return <span className="text-xl leading-none">{flagStr}</span>;
    }
    return <img src={flagStr} alt="Flag" className="w-6 h-6 object-cover rounded-full border shadow-sm" />;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'live':
        return <Badge variant="destructive" className="animate-pulse text-[10px] px-1.5 py-0">En Vivo</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Finalizado</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-primary/5 text-primary border-primary/20">Próximo</Badge>;
    }
  };

  const formattedDate = match.match_date ? format(parseISO(match.match_date), "d MMM", { locale: es }) : 'TBD';

  return (
    <Card className={`w-full overflow-hidden hover:shadow-lg transition-all duration-300 border-muted/60 bg-card/80 backdrop-blur-sm group ${stageClass}`}>
      <CardContent className="p-3">
        {/* Header: Date, Time, Status */}
        <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold flex items-center gap-1"><Calendar className="w-3 h-3"/> {formattedDate}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {match.match_time}</span>
          </div>
          {getStatusBadge(match.status)}
        </div>

        {/* Teams */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between bg-muted/30 p-1.5 rounded-md">
            <div className="flex items-center gap-2">
              {renderFlag(homeFlag)}
              <span className="font-bold text-sm">{match.home_team}</span>
            </div>
            {match.status === 'completed' && (
              <span className="font-black text-sm">{match.home_score}</span>
            )}
          </div>
          <div className="flex items-center justify-between bg-muted/30 p-1.5 rounded-md">
            <div className="flex items-center gap-2">
              {renderFlag(awayFlag)}
              <span className="font-bold text-sm">{match.away_team}</span>
            </div>
            {match.status === 'completed' && (
              <span className="font-black text-sm">{match.away_score}</span>
            )}
          </div>
        </div>

        {/* Stadium */}
        {match.stadium_name && (
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-3 truncate">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{match.stadium_name}</span>
          </div>
        )}

        {/* Action / Odds */}
        <div className="mt-auto">
          {match.status !== 'completed' && match.odds_match_winner ? (
            <div className="grid grid-cols-3 gap-1 mb-2">
              <div className="flex flex-col items-center bg-muted/50 rounded py-1">
                <span className="text-[9px] text-muted-foreground">1</span>
                <span className="font-bold text-xs">{match.odds_match_winner.home?.toFixed(2)}</span>
              </div>
              <div className="flex flex-col items-center bg-muted/50 rounded py-1">
                <span className="text-[9px] text-muted-foreground">X</span>
                <span className="font-bold text-xs">{match.odds_match_winner.draw?.toFixed(2)}</span>
              </div>
              <div className="flex flex-col items-center bg-muted/50 rounded py-1">
                <span className="text-[9px] text-muted-foreground">2</span>
                <span className="font-bold text-xs">{match.odds_match_winner.away?.toFixed(2)}</span>
              </div>
            </div>
          ) : null}
          
          <Button 
            onClick={() => openMatchBetting(match)}
            disabled={match.status === 'completed'}
            size="sm"
            className="w-full h-8 text-xs font-bold"
            variant={match.status === 'completed' ? "secondary" : "default"}
          >
            {match.status === 'completed' ? 'Ver Detalles' : 'Apostar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnockoutMatchCard;
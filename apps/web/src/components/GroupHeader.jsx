import React from 'react';

const GroupHeader = ({ groupName, matches }) => {
  // Extract unique teams and their flags from the matches
  const teamsMap = new Map();
  
  matches.forEach(match => {
    let flags = {};
    try {
      flags = typeof match.team_flags === 'string' ? JSON.parse(match.team_flags) : (match.team_flags || {});
    } catch (e) {
      // ignore
    }

    if (!teamsMap.has(match.home_team)) {
      teamsMap.set(match.home_team, flags.home_flag_url || '⚽');
    }
    if (!teamsMap.has(match.away_team)) {
      teamsMap.set(match.away_team, flags.away_flag_url || '⚽');
    }
  });

  const teams = Array.from(teamsMap.entries()).map(([name, flag]) => ({ name, flag }));
  
  // Determine group letter for CSS variable
  const groupLetter = groupName.replace('Grupo ', '').toLowerCase();
  const colorClass = `bg-group-${groupLetter}`;
  const textClass = `text-group-${groupLetter}`;

  const isEmoji = (str) => {
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
    return emojiRegex.test(str) || str === '⚽';
  };

  return (
    <div className="mb-6 rounded-2xl overflow-hidden border shadow-sm bg-card">
      <div className={`h-2 w-full ${colorClass}`}></div>
      <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-muted ${textClass} font-black text-2xl`}>
            {groupLetter.toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">{groupName}</h2>
            <p className="text-sm text-muted-foreground font-medium">Fase de Grupos • 6 Partidos</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {teams.map((team, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border/50 whitespace-nowrap">
              {isEmoji(team.flag) ? (
                <span className="text-lg leading-none">{team.flag}</span>
              ) : (
                <img src={team.flag} alt={team.name} className="w-5 h-5 rounded-full object-cover shadow-sm border border-border" />
              )}
              <span className="text-sm font-bold">{team.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
export const useFootballTheme = () => {
  const teamColors = {
    'Argentina': { primary: '#43A1D5', secondary: '#FFFFFF' },
    'Mexico': { primary: '#006847', secondary: '#CE1126' },
    'Poland': { primary: '#DC143C', secondary: '#FFFFFF' },
    'France': { primary: '#002395', secondary: '#ED2939' },
    'Netherlands': { primary: '#F36C21', secondary: '#AE1C28' },
    'Brazil': { primary: '#FFDF00', secondary: '#009B3A' },
    'Serbia': { primary: '#C6363C', secondary: '#0C4076' },
    'Germany': { primary: '#000000', secondary: '#FFCE00' },
    'Spain': { primary: '#AA151B', secondary: '#F1BF00' },
    'England': { primary: '#FFFFFF', secondary: '#CE1124' },
    'Senegal': { primary: '#00853F', secondary: '#FDEF42' },
    'Morocco': { primary: '#C1272D', secondary: '#006233' },
    'Saudi Arabia': { primary: '#006C35', secondary: '#FFFFFF' }
  };

  const teamEmojis = {
    'Argentina': '🇦🇷',
    'Mexico': '🇲🇽',
    'Poland': '🇵🇱',
    'France': '🇫🇷',
    'Netherlands': '🇳🇱',
    'Brazil': '🇧🇷',
    'Serbia': '🇷🇸',
    'Germany': '🇩🇪',
    'Spain': '🇪🇸',
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Senegal': '🇸🇳',
    'Morocco': '🇲🇦',
    'Saudi Arabia': '🇸🇦'
  };

  const getTeamColor = (teamName) => {
    return teamColors[teamName] || { primary: '#1e293b', secondary: '#cbd5e1' };
  };

  const getTeamFlag = (teamName, flagsJson, type = 'home') => {
    if (flagsJson) {
      try {
        const parsed = typeof flagsJson === 'string' ? JSON.parse(flagsJson) : flagsJson;
        if (type === 'home' && parsed.home_flag_url) return parsed.home_flag_url;
        if (type === 'away' && parsed.away_flag_url) return parsed.away_flag_url;
      } catch (e) {
        // Fallback to emoji
      }
    }
    return teamEmojis[teamName] || '⚽';
  };

  const getStageColor = (stage) => {
    if (!stage) return 'bg-muted text-muted-foreground';
    if (stage.startsWith('Grupo')) return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    if (stage === 'Octavos de Final') return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800';
    if (stage === 'Cuartos de Final') return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800';
    if (stage === 'Semifinales') return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
    if (stage === 'Final') return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700 font-bold';
    return 'bg-muted text-muted-foreground';
  };

  return {
    getTeamColor,
    getTeamFlag,
    getStageColor
  };
};
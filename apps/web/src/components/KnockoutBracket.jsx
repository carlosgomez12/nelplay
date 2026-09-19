import React, { useState, useMemo, useEffect } from 'react';
import KnockoutMatchCard from './KnockoutMatchCard.jsx';
import StageSelector from './StageSelector.jsx';
import './KnockoutBracketStyles.css';

const KnockoutBracket = ({ matches }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileStage, setActiveMobileStage] = useState('Octavos de Final');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Group matches by stage
  const bracketData = useMemo(() => {
    const stages = {
      'Octavos de Final': [],
      'Cuartos de Final': [],
      'Semifinales': [],
      'Final': []
    };

    matches.forEach(match => {
      if (stages[match.stage]) {
        stages[match.stage].push(match);
      }
    });

    // Sort matches within stages by date/time to maintain bracket order
    Object.keys(stages).forEach(key => {
      stages[key].sort((a, b) => {
        const dateA = new Date(`${a.match_date}T${a.match_time}`);
        const dateB = new Date(`${b.match_date}T${b.match_time}`);
        return dateA - dateB;
      });
    });

    return stages;
  }, [matches]);

  const stageConfig = [
    { id: 'Octavos de Final', name: 'Octavos', class: 'stage-octavos' },
    { id: 'Cuartos de Final', name: 'Cuartos', class: 'stage-cuartos' },
    { id: 'Semifinales', name: 'Semifinales', class: 'stage-semis' },
    { id: 'Final', name: 'Final', class: 'stage-final' }
  ];

  if (matches.length === 0) {
    return (
      <div className="text-center py-24 bg-muted/30 rounded-3xl border-2 border-dashed">
        <span className="text-5xl mb-4 block opacity-50">🏆</span>
        <h3 className="text-2xl font-bold mb-2">Fase Final no disponible</h3>
        <p className="text-muted-foreground">Los partidos de la fase final aún no se han definido o no coinciden con tu búsqueda.</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="animate-in fade-in duration-500">
        <StageSelector 
          stages={stageConfig} 
          activeStage={activeMobileStage} 
          onSelect={setActiveMobileStage} 
        />
        <div className="flex flex-col gap-4">
          {bracketData[activeMobileStage]?.map((match, index) => (
            <div key={match.id} className="animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <KnockoutMatchCard 
                match={match} 
                stageClass={stageConfig.find(s => s.id === activeMobileStage)?.class} 
              />
            </div>
          ))}
          {(!bracketData[activeMobileStage] || bracketData[activeMobileStage].length === 0) && (
            <p className="text-center text-muted-foreground py-8">No hay partidos en esta fase.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted/10 rounded-3xl border p-2 md:p-6 animate-in fade-in duration-700">
      <div className="bracket-container">
        {stageConfig.map((stage) => (
          <div key={stage.id} className="bracket-column">
            <div className="bracket-column-header">
              {stage.name}
            </div>
            {bracketData[stage.id]?.map((match) => (
              <div key={match.id} className="bracket-match-wrapper z-10">
                <KnockoutMatchCard match={match} stageClass={stage.class} />
              </div>
            ))}
            {/* Fill empty slots if data is missing to maintain layout structure */}
            {(!bracketData[stage.id] || bracketData[stage.id].length === 0) && (
              <div className="flex-1 flex items-center justify-center text-muted-foreground/50 text-sm font-medium border-2 border-dashed border-muted rounded-xl p-4">
                Por definir
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnockoutBracket;
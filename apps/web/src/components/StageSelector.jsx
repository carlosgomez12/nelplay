import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area.jsx';

const StageSelector = ({ stages, activeStage, onSelect }) => {
  return (
    <div className="w-full mb-6 border-b border-border">
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex w-max space-x-2 px-1">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => onSelect(stage.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                activeStage === stage.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {stage.name}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
};

export default StageSelector;
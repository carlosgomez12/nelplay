import React from 'react';
import { FEATURES } from '@/config/features.js';

/**
 * Banner de patrocinador. NO inventar sponsors: si no se pasa un `sponsor`
 * real (name obligatorio), el componente no renderiza nada.
 *
 * Props:
 *  - sponsor: { name, logo?, url?, tagline? }
 *  - label:   texto de contexto (ej: "Con el apoyo de")
 *  - className
 */
const SponsorBanner = ({ sponsor, label = 'Con el apoyo de', className = '' }) => {
  if (!FEATURES.SPONSORSHIPS) return null;
  if (!sponsor || !sponsor.name) return null;

  const Inner = (
    <div className="flex items-center justify-center gap-3">
      {sponsor.logo ? (
        <img src={sponsor.logo} alt={sponsor.name} className="h-7 w-auto object-contain" loading="lazy" />
      ) : (
        <span className="font-bold">{sponsor.name}</span>
      )}
      {sponsor.tagline && (
        <span className="text-sm text-muted-foreground hidden sm:inline">{sponsor.tagline}</span>
      )}
    </div>
  );

  return (
    <div
      className={`w-full rounded-xl border border-border bg-card/60 px-4 py-3 ${className}`}
      data-sponsor-slot={sponsor.name}
    >
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 text-center mb-1">
        {label}
      </div>
      {sponsor.url ? (
        <a href={sponsor.url} target="_blank" rel="sponsored noopener noreferrer" className="block">
          {Inner}
        </a>
      ) : (
        Inner
      )}
    </div>
  );
};

export default SponsorBanner;

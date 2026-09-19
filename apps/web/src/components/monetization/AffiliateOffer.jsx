import React from 'react';
import { FEATURES } from '@/config/features.js';

/**
 * Oferta de afiliado. Desactivada por defecto (AFFILIATES=false) y solo se
 * usará donde sea legal y apropiado. Los enlaces usan rel="sponsored nofollow".
 * No inventar ofertas: requiere un objeto `offer` real.
 *
 * Props: offer: { title, description?, url, cta? }, className
 */
const AffiliateOffer = ({ offer, className = '' }) => {
  if (!FEATURES.AFFILIATES) return null;
  if (!offer || !offer.title || !offer.url) return null;

  return (
    <div className={`rounded-xl border border-border bg-card p-4 ${className}`} data-affiliate-slot>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">
        Contenido de afiliado
      </div>
      <h4 className="font-bold">{offer.title}</h4>
      {offer.description && <p className="text-sm text-muted-foreground mt-1">{offer.description}</p>}
      <a
        href={offer.url}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="inline-flex mt-3 text-sm font-semibold text-primary hover:underline"
      >
        {offer.cta || 'Ver más'}
      </a>
    </div>
  );
};

export default AffiliateOffer;

import React from 'react';
import { FEATURES } from '@/config/features.js';

/**
 * Espacio publicitario reutilizable.
 *
 * - Se oculta por completo si la feature ADS está desactivada.
 * - No conecta ningún proveedor real todavía; renderiza los `children` (el
 *   anuncio real, cuando exista) o, opcionalmente, un placeholder de maquetación.
 * - Siempre etiqueta el espacio como "Publicidad" (transparencia).
 *
 * Props: id, format ('leaderboard'|'rectangle'|'inline'), placeholder, className, children
 */
const SIZES = {
  leaderboard: 'min-h-[90px]',
  rectangle: 'min-h-[250px]',
  inline: 'min-h-[120px]',
};

const AdSlot = ({ id, format = 'inline', placeholder = false, className = '', children }) => {
  if (!FEATURES.ADS) return null;
  if (!children && !placeholder) return null;

  return (
    <div
      data-ad-slot={id || format}
      className={`w-full ${className}`}
      role="complementary"
      aria-label="Publicidad"
    >
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 text-center mb-1">
        Publicidad
      </div>
      {children ? (
        children
      ) : (
        <div
          className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-xs text-muted-foreground/60 ${SIZES[format] || SIZES.inline}`}
        >
          Espacio reservado
        </div>
      )}
    </div>
  );
};

export default AdSlot;

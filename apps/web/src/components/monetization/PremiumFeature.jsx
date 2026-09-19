import React from 'react';
import { FEATURES } from '@/config/features.js';

/**
 * Gate de funcionalidad premium (NelPlay PRO). PREMIUM=false por defecto.
 *
 * - Si PREMIUM está activo, renderiza `children`.
 * - Si no, renderiza `fallback` (teaser de upsell) o nada.
 *
 * No implementa pagos: solo prepara la arquitectura freemium.
 *
 * Props: children, fallback
 */
const PremiumFeature = ({ children, fallback = null }) => {
  if (FEATURES.PREMIUM) return <>{children}</>;
  return fallback;
};

export default PremiumFeature;

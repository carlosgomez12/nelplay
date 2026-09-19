/**
 * Arquitectura de navegación de NelPlay 2.0.
 *
 * Fuente única para Header (desktop), BottomNav (móvil) y Footer.
 * Cada item puede requerir autenticación (`auth`) o una feature flag (`flag`).
 * `bottom` marca los items de la barra inferior móvil.
 */
import { Home, CalendarDays, Target, Trophy, Flame, Users, MessagesSquare } from 'lucide-react';

export const PRIMARY_NAV = [
  { path: '/', label: 'Inicio', icon: Home, bottom: true },
  { path: '/matches', label: 'Partidos', icon: CalendarDays, bottom: true },
  { path: '/my-predictions', label: 'Pronósticos', icon: Target, auth: true, bottom: true },
  { path: '/ranking', label: 'Ranking', icon: Trophy, bottom: true },
  { path: '/retos', label: 'Retos', icon: Flame, flag: 'CHALLENGES' },
  { path: '/ligas', label: 'Ligas', icon: Users, flag: 'PRIVATE_LEAGUES' },
  { path: '/comunidad', label: 'Comunidad', icon: MessagesSquare, flag: 'SOCIAL' },
];

/**
 * Filtra los items según estado de autenticación y feature flags.
 * @param {{isAuthenticated:boolean, features:object}} ctx
 */
export const visibleNav = ({ isAuthenticated = false, features = {} } = {}) =>
  PRIMARY_NAV.filter((item) => {
    if (item.auth && !isAuthenticated) return false;
    if (item.flag && !features[item.flag]) return false;
    return true;
  });

/** Items de la barra inferior móvil (máx. 5 visibles + Perfil dinámico). */
export const bottomNav = (ctx) => visibleNav(ctx).filter((i) => i.bottom).slice(0, 4);

export default PRIMARY_NAV;

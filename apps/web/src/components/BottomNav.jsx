import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { FEATURES } from '@/config/features.js';
import { bottomNav } from '@/config/navigation.js';

/**
 * Navegación inferior para móvil (mobile-first). Se oculta en >= md.
 * Muestra hasta 4 secciones + Perfil (dinámico según sesión).
 */
const BottomNav = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const items = bottomNav({ isAuthenticated, features: FEATURES });

  const profile = isAuthenticated
    ? { path: '/perfil', label: 'Perfil', icon: User }
    : { path: '/login', label: 'Entrar', icon: User };

  const all = [...items, profile];
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      aria-label="Navegación principal móvil"
    >
      <ul className="grid" style={{ gridTemplateColumns: `repeat(${all.length}, minmax(0, 1fr))` }}>
        {all.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <li key={item.path + item.label}>
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold transition-colors ${
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-primary' : ''}`} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;

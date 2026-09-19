import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { FEATURES } from '@/config/features.js';
import { visibleNav } from '@/config/navigation.js';
import { BRAND } from '@/config/brand.js';
import { Button } from '@/components/ui/button.jsx';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu.jsx';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.jsx';
import { Menu, User, LogOut, Shield, Eye, Trophy } from 'lucide-react';

const Header = () => {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = visibleNav({ isAuthenticated, features: FEATURES });
  const isActive = (path) => location.pathname === path;
  const points = currentUser?.total_points ?? 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group" aria-label={`${BRAND.name} inicio`}>
            <img
              src={BRAND.logo}
              alt={`${BRAND.name} logo`}
              width="140"
              height="56"
              className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 flex-1" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-all duration-200 relative py-2 whitespace-nowrap ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section: Auth & Menu */}
          <div className="flex items-center gap-3 shrink-0">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hover:bg-primary/5">
                    <Avatar className="w-8 h-8 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
                        {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-bold leading-none">{currentUser?.name || 'Usuario'}</span>
                      <span className="text-xs text-primary font-semibold mt-1 flex items-center gap-1">
                        <Trophy className="w-3 h-3" /> {points.toLocaleString('es-CO')} pts
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/my-predictions" className="flex items-center gap-2 cursor-pointer font-medium">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Mis pronósticos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/ranking" className="flex items-center gap-2 cursor-pointer font-medium">
                      <Trophy className="w-4 h-4 text-muted-foreground" />
                      Ranking
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/todos-los-pronosticos" className="flex items-center gap-2 cursor-pointer font-medium">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      Pronósticos públicos
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2 cursor-pointer font-medium text-blue-600 dark:text-blue-400">
                          <Shield className="w-4 h-4" />
                          Panel de administración
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer font-medium text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="hidden sm:inline-flex font-semibold">
                  <Link to="/login">Iniciar sesión</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 font-bold shadow-md shadow-primary/20 px-3 sm:px-4">
                  <Link to="/signup">
                    <span className="sm:hidden">Jugar</span>
                    <span className="hidden sm:inline">Empezar a jugar</span>
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex items-center gap-2 mb-8 mt-4">
                  <img src={BRAND.logo} alt={`${BRAND.name} logo`} className="h-12 w-auto" />
                </div>
                <nav className="flex flex-col gap-2" aria-label="Navegación móvil">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-semibold px-4 py-3 rounded-xl transition-colors duration-200 ${
                        isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/sobre-nelplay"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold px-4 py-3 rounded-xl text-foreground hover:bg-muted"
                  >
                    Sobre NelPlay
                  </Link>
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-semibold px-4 py-3 rounded-xl text-foreground hover:bg-muted mt-4 border border-border"
                    >
                      Iniciar sesión
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

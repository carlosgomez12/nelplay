import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu.jsx';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.jsx';
import { Menu, User, LogOut, Shield, Eye } from 'lucide-react';

const Header = () => {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/matches', label: 'Partidos' },
    { path: '/leaderboard', label: 'Clasificación' },
    { path: '/amistosos', label: 'Amistosos', highlight: true },
    ...(isAuthenticated ? [
      { path: '/my-predictions', label: 'Mis Pronósticos' },
      { path: '/todos-los-pronosticos', label: 'Pronósticos públicos' }
    ] : [])
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group">
            <img
              src="https://horizons-cdn.hostinger.com/0a7d41ef-5581-4585-a665-1220c41753a7/d13cfb0e7ec6eaddd40e8dcbaa47a732.png"
              alt="NelPlay Logo"
              className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 flex-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-all duration-200 relative py-2 whitespace-nowrap ${link.highlight
                    ? (isActive(link.path)
                      ? 'text-amber-600 dark:text-amber-500'
                      : 'text-amber-600/80 dark:text-amber-500/70 hover:text-amber-600 dark:hover:text-amber-500')
                    : (isActive(link.path)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary')
                  }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${link.highlight ? 'bg-amber-500' : 'bg-primary'
                    }`} />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section: Auth & Menu */}
          <div className="flex items-center gap-3 shrink-0">
            {isAuthenticated ? (
              <>
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
                        <span className="text-xs text-primary font-semibold mt-1">
                          ${(currentUser?.balance || 0).toLocaleString('es-CO')} COP
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/my-predictions" className="flex items-center gap-2 cursor-pointer font-medium">
                        <User className="w-4 h-4 text-muted-foreground" />
                        Mis Pronosticos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/todos-los-pronosticos" className="flex items-center gap-2 cursor-pointer font-medium">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        Pronosticos publicos
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center gap-2 cursor-pointer font-medium text-blue-600 dark:text-blue-400">
                            <Shield className="w-4 h-4" />
                            Panel de Administracion
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer font-medium text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="hidden sm:inline-flex font-semibold">
                  <Link to="/login">Iniciar Sesion</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 font-bold shadow-md shadow-primary/20">
                  <Link to="/signup">Registrarse</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex items-center gap-2 mb-8 mt-4">
                  <img
                    src="https://horizons-cdn.hostinger.com/0a7d41ef-5581-4585-a665-1220c41753a7/d13cfb0e7ec6eaddd40e8dcbaa47a732.png"
                    alt="NelPlay Logo"
                    className="h-12 w-auto"
                  />
                </div>
                <nav className="flex flex-col gap-2">
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-semibold px-4 py-3 rounded-xl transition-colors duration-200 ${link.highlight
                          ? (isActive(link.path)
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-500 border border-amber-500/30'
                            : 'text-amber-600 dark:text-amber-500 hover:bg-amber-500/10')
                          : (isActive(link.path)
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground hover:bg-muted')
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-semibold px-4 py-3 rounded-xl text-foreground hover:bg-muted mt-4 border border-border"
                    >
                      Iniciar Sesion
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
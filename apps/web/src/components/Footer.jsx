import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';

const Footer = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-secondary-foreground/10 relative overflow-hidden text-xs md:text-sm">
      {/* Official WC2026 Mascots background placed on the right via CSS */}
      <div className="footer-mascot-bg"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-3">
              <img 
                src="https://horizons-cdn.hostinger.com/0a7d41ef-5581-4585-a665-1220c41753a7/80cee056e7fb9b9d1747574f65555e93.png" 
                alt="NelPlay Logo"
                className="h-11 md:h-14 w-auto"
              />
            </div>
            <p className="text-secondary-foreground/70 leading-relaxed max-w-[250px]">
              Destino principal para apuestas del Mundial 2026. Emoción, cuotas competitivas y seguridad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-secondary-foreground mb-3 uppercase tracking-wider">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/matches" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors duration-200 font-medium">
                  Calendario de Partidos
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors duration-200 font-medium">
                  Clasificación Global
                </Link>
              </li>
              <li>
                <Link to="/my-bets" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors duration-200 font-medium">
                  Mis Apuestas
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-secondary-foreground mb-3 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors duration-200 font-medium">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors duration-200 font-medium">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <span className="text-secondary-foreground/70 font-medium">
                  Juego Responsable
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-secondary-foreground mb-3 uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-secondary-foreground/70">
                <Mail className="w-3.5 h-3.5 text-primary-foreground" />
                <span className="font-medium">soporte@nelplay.com</span>
              </li>
              <li className="flex items-center gap-2 text-secondary-foreground/70">
                <Phone className="w-3.5 h-3.5 text-primary-foreground" />
                <span className="font-medium">+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-secondary-foreground/70">
                <MapPin className="w-3.5 h-3.5 text-primary-foreground" />
                <span className="font-medium">Bogotá, Colombia</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-4 relative flex flex-col md:flex-row items-center justify-between">
          <p className="text-secondary-foreground/60 font-medium">
            © 2026 NelPlay. Apueste con responsabilidad. 18+ | OLC Tecnología
          </p>
          
          {currentUser?.email === 'carlos.gomez@olctecnologia.com' && (
            <button
              onClick={() => navigate('/admin')}
              className="mt-4 md:mt-0 p-1.5 text-secondary-foreground/40 hover:text-primary-foreground transition-colors duration-200 rounded-full hover:bg-secondary-foreground/10"
              title="Panel de Administración"
              aria-label="Panel de Administración"
            >
              <Shield className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, MapPin, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { BRAND } from '@/config/brand.js';

const Footer = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-secondary-foreground/10 relative overflow-hidden text-xs md:text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">

          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-3">
              <img src={BRAND.logoAlt} alt={`${BRAND.name} logo`} className="h-11 md:h-14 w-auto" />
            </div>
            <p className="text-secondary-foreground/70 leading-relaxed max-w-[250px]">
              {BRAND.definition}
            </p>
          </div>

          {/* Producto */}
          <div>
            <h3 className="font-bold text-secondary-foreground mb-3 uppercase tracking-wider">Producto</h3>
            <ul className="space-y-2">
              <li><Link to="/matches" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors font-medium">Partidos</Link></li>
              <li><Link to="/ranking" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors font-medium">Ranking</Link></li>
              <li><Link to="/retos" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors font-medium">Retos</Link></li>
              <li><Link to="/ligas" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors font-medium">Ligas privadas</Link></li>
              <li><Link to="/sobre-nelplay" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors font-medium">Sobre NelPlay</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-secondary-foreground mb-3 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terminos" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors font-medium">Términos de servicio</Link></li>
              <li><Link to="/privacidad" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors font-medium">Política de privacidad</Link></li>
              <li><Link to="/cookies" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors font-medium">Cookies</Link></li>
              <li><Link to="/juego-responsable" className="text-secondary-foreground/70 hover:text-primary-foreground transition-colors font-medium">Juego responsable</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-secondary-foreground mb-3 uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-secondary-foreground/70">
                <Mail className="w-3.5 h-3.5 text-primary-foreground" />
                <span className="font-medium">{BRAND.contactEmail}</span>
              </li>
              <li className="flex items-center gap-2 text-secondary-foreground/70">
                <MapPin className="w-3.5 h-3.5 text-primary-foreground" />
                <span className="font-medium">{BRAND.location}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-4 relative flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-secondary-foreground/60 font-medium text-center md:text-left">
            © {year} {BRAND.name}. Plataforma gratuita de pronósticos de fútbol. Juega con responsabilidad. | {BRAND.company}
          </p>

          {currentUser?.email === 'carlos.gomez@olctecnologia.com' && (
            <button
              onClick={() => navigate('/admin')}
              className="p-1.5 text-secondary-foreground/40 hover:text-primary-foreground transition-colors rounded-full hover:bg-secondary-foreground/10"
              title="Panel de administración"
              aria-label="Panel de administración"
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

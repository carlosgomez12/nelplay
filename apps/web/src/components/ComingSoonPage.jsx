import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Seo from '@/components/seo/Seo.jsx';
import { Button } from '@/components/ui/button.jsx';

/**
 * Página "próximamente" reutilizable para secciones cuya arquitectura ya existe
 * (nav/rutas) pero cuyo contenido llega en fases posteriores.
 *
 * Se marca noindex para NO indexar contenido thin (buena práctica SEO).
 *
 * Props: title, path, description, bullets[]
 */
const ComingSoonPage = ({ title, path, description, bullets = [] }) => (
  <>
    <Seo title={title} path={path} description={description} noindex />
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase mb-4">
              Muy pronto
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{title}</h1>
            <p className="text-muted-foreground mb-8">{description}</p>

            {bullets.length > 0 && (
              <ul className="text-left inline-block space-y-2 mb-8">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <div>
              <Button asChild variant="outline" className="font-semibold">
                <Link to="/"><ArrowLeft className="w-4 h-4 mr-1" /> Volver al inicio</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default ComingSoonPage;

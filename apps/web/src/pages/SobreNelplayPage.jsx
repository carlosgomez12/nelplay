import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Seo from '@/components/seo/Seo.jsx';
import { Button } from '@/components/ui/button.jsx';
import { BRAND } from '@/config/brand.js';
import { webPageJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/config/seo.js';

const FAQS = [
  { question: '¿Qué es NelPlay?', answer: BRAND.definition },
  { question: '¿Quién puede utilizar NelPlay?', answer: 'Cualquier persona aficionada al fútbol que quiera poner a prueba su conocimiento pronosticando partidos y compitiendo en rankings. El registro es gratuito.' },
  { question: '¿Cómo funciona el sistema de puntos?', answer: 'Se otorgan 5 puntos por marcador exacto, 3 por acertar el ganador y la diferencia de goles, y 1 por acertar solo el ganador. Las fases finales aplican multiplicadores.' },
  { question: '¿Cómo se monetiza NelPlay?', answer: 'NelPlay es gratuito para jugar. Se financia mediante publicidad, patrocinios y, en el futuro, funciones premium opcionales. No ofrece apuestas con dinero real.' },
];

const AVAILABLE = [
  'Registro gratuito e inicio de sesión',
  'Pronósticos de partidos con marcador exacto',
  'Sistema de puntos automático y server-side',
  'Ranking de participantes por puntos',
  'Pronósticos públicos de la comunidad tras el inicio del partido',
];

const COMING = [
  'Retos, rachas, niveles y logros (gamificación)',
  'Ligas privadas para competir con amigos',
  'Perfil de usuario con estadísticas avanzadas',
  'Contenido y estadísticas de fútbol',
  'Funciones premium opcionales (NelPlay PRO)',
];

const Section = ({ id, title, children }) => (
  <section aria-labelledby={id} className="mb-10">
    <h2 id={id} className="text-2xl md:text-3xl font-black tracking-tight mb-3">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </section>
);

const SobreNelplayPage = () => (
  <>
    <Seo
      title="Sobre NelPlay"
      path="/sobre-nelplay"
      description="Qué es NelPlay: plataforma gratuita de pronósticos de fútbol y comunidad futbolera. Cómo funcionan los puntos, el ranking y las ligas."
      jsonLd={[
        webPageJsonLd({ title: 'Sobre NelPlay', description: BRAND.definition, path: '/sobre-nelplay' }),
        breadcrumbJsonLd([{ name: 'Inicio', path: '/' }, { name: 'Sobre NelPlay', path: '/sobre-nelplay' }]),
        faqJsonLd(FAQS),
      ]}
    />

    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Ruta de navegación" className="text-xs text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Inicio</Link> <span className="mx-1">/</span> <span>Sobre NelPlay</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Sobre NelPlay</h1>
            <p className="text-lg text-muted-foreground mb-10">{BRAND.definition}</p>

            <Section id="que-es" title="¿Qué es NelPlay?">
              <p>{BRAND.name} es una plataforma de entretenimiento futbolístico centrada en los pronósticos deportivos. Los usuarios pronostican el resultado de los partidos, ganan puntos según sus aciertos y compiten en rankings con otros fanáticos. Es una experiencia <strong>gratuita (free-to-play)</strong>: no hay apuestas con dinero real.</p>
            </Section>

            <Section id="como-funciona" title="¿Cómo funciona?">
              <p>Te registras gratis, eliges los partidos que quieres pronosticar e ingresas el marcador que crees que tendrá cada uno antes de que empiece. Cuando el partido termina, NelPlay compara tu pronóstico con el resultado real y te asigna los puntos automáticamente.</p>
            </Section>

            <Section id="puntos" title="¿Cómo funcionan los puntos y el ranking?">
              <p>El sistema otorga <strong>5 puntos</strong> por acertar el marcador exacto, <strong>3</strong> por acertar el ganador y la diferencia de goles, y <strong>1</strong> por acertar solo el ganador. Las fases eliminatorias multiplican los puntos. Todos tus puntos suman a tu total y determinan tu posición en el ranking.</p>
            </Section>

            <Section id="ligas" title="¿Qué es una liga privada?">
              <p>Una liga privada te permite competir en un ranking exclusivo con las personas que invites —amigos, compañeros de trabajo o familia— usando un código de invitación. Esta función está en desarrollo.</p>
            </Section>

            <Section id="monetizacion" title="¿Cómo se monetiza NelPlay?">
              <p>NelPlay es gratuito para jugar. Se sostiene mediante publicidad, patrocinios y, en el futuro, funciones premium opcionales. <strong>No ofrece apuestas con dinero real</strong> ni promete ganancias económicas.</p>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              <div className="rounded-2xl border border-success/30 bg-card p-6">
                <h2 className="flex items-center gap-2 font-bold text-lg mb-4"><CheckCircle2 className="w-5 h-5 text-success" /> Disponible ahora</h2>
                <ul className="space-y-2">
                  {AVAILABLE.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" /><span>{i}</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-card p-6">
                <h2 className="flex items-center gap-2 font-bold text-lg mb-4"><Clock className="w-5 h-5 text-primary" /> Próximamente</h2>
                <ul className="space-y-2">
                  {COMING.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm"><Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" /><span>{i}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-muted/40 border border-border p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Empieza a jugar gratis</h2>
              <p className="text-sm text-muted-foreground mb-4">Crea tu cuenta y haz tu primer pronóstico hoy.</p>
              <Button asChild className="font-bold">
                <Link to="/signup">Crear cuenta gratis <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default SobreNelplayPage;

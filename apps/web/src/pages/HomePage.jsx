import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import {
  Trophy, Target, Zap, ArrowRight, Calendar, Users, Sparkles,
  Flame, Medal, ShieldCheck, ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Seo from '@/components/seo/Seo.jsx';
import AdSlot from '@/components/monetization/AdSlot.jsx';
import { BRAND } from '@/config/brand.js';
import { organizationJsonLd, websiteJsonLd, faqJsonLd } from '@/config/seo.js';

/** FAQ visible — el contenido debe coincidir EXACTO con el JSON-LD FAQPage. */
const FAQS = [
  {
    question: '¿Qué es NelPlay?',
    answer:
      'NelPlay es una plataforma de pronósticos y comunidad futbolera donde los usuarios pueden pronosticar partidos, obtener puntos y competir en rankings.',
  },
  {
    question: '¿Cómo funcionan los pronósticos?',
    answer:
      'Eliges el marcador que crees que tendrá cada partido antes de que empiece. Cuando el partido termina, el sistema compara tu pronóstico con el resultado real y te asigna puntos automáticamente.',
  },
  {
    question: '¿Es gratis participar?',
    answer:
      'Sí. NelPlay es una plataforma gratuita (free-to-play): puedes registrarte, pronosticar, sumar puntos y competir en el ranking sin costo.',
  },
  {
    question: '¿Cómo se obtienen puntos?',
    answer:
      'Sumas 5 puntos por acertar el marcador exacto, 3 por acertar el ganador y la diferencia de goles, y 1 por acertar solo el ganador. Las fases finales multiplican los puntos.',
  },
  {
    question: '¿Cómo funciona el ranking?',
    answer:
      'Cada punto que ganas suma a tu total. El ranking ordena a los participantes por puntos y puedes ver tu posición y compararte con otros fanáticos.',
  },
  {
    question: '¿Puedo competir con mis amigos?',
    answer:
      'Sí. Podrás crear ligas privadas e invitar a tus amigos con un código para competir entre ustedes. (Función en desarrollo.)',
  },
  {
    question: '¿NelPlay ofrece apuestas con dinero real?',
    answer:
      'No. NelPlay es una plataforma de entretenimiento y pronósticos gratuita. No ofrece apuestas con dinero real.',
  },
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [matches, setMatches] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  // Datos reales (matches es de lectura pública en PocketBase).
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await pb.collection('matches').getList(1, 6, {
          sort: 'match_date,match_time',
          filter: 'status != "completed" && status != "live"',
          requestKey: null,
        });
        if (active) setMatches(res?.items || []);
      } catch (_) { /* colección vacía o sin acceso: se oculta la sección */ }
    })();
    (async () => {
      try {
        const res = await pb.collection('users').getList(1, 5, {
          sort: '-total_points,-exact_score_count',
          requestKey: null,
        });
        if (active) setTopUsers(res?.items || []);
      } catch (_) { /* se oculta la sección */ }
    })();
    return () => { active = false; };
  }, []);

  const primaryCta = isAuthenticated
    ? { to: '/matches', label: 'Ir a los partidos' }
    : { to: '/signup', label: 'Empezar a jugar' };

  return (
    <>
      <Seo
        title="Pronósticos de fútbol y comunidad futbolera"
        description={BRAND.description}
        path="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(FAQS)]}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden flex items-center justify-center py-20 md:py-28">
            {/* Fondo sports-tech por degradado (sin imagen con branding de apuestas). */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/40 to-secondary/50"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.12) 0, transparent 40%)',
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs tracking-widest uppercase mb-6 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" /> {BRAND.slogan}
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-[1.08] text-white drop-shadow-lg">
                  Pronósticos de fútbol y{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                    comunidad futbolera
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Predice resultados, acumula puntos, escala posiciones y compite con otros fanáticos.
                  Gratis para jugar.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="font-bold text-base h-12 px-8 shadow-lg shadow-primary/20">
                    <Link to={primaryCta.to}>
                      {primaryCta.label}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-bold text-base h-12 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                    <Link to="/matches">Ver partidos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* PARTIDOS DESTACADOS (datos reales) */}
          {matches.length > 0 && (
            <section className="py-12 md:py-16" aria-labelledby="partidos-heading">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8 gap-4">
                  <div>
                    <h2 id="partidos-heading" className="text-3xl md:text-4xl font-black tracking-tight">Próximos partidos</h2>
                    <p className="text-muted-foreground mt-1">Elige un partido y haz tu pronóstico.</p>
                  </div>
                  <Button asChild variant="ghost" className="font-semibold shrink-0 hidden sm:inline-flex">
                    <Link to="/matches">Ver todos <ChevronRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matches.map((m) => (
                    <Card key={m.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-5">
                        {m.stage && (
                          <div className="text-[10px] uppercase tracking-widest font-bold text-primary mb-3">{m.stage}</div>
                        )}
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-bold text-sm truncate">{m.home_team}</span>
                          <span className="text-xs text-muted-foreground font-semibold">vs</span>
                          <span className="font-bold text-sm truncate text-right">{m.away_team}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{[m.match_date, m.match_time].filter(Boolean).join(' · ')}</span>
                        </div>
                        {m.stadium_name && (
                          <div className="mt-1 text-xs text-muted-foreground truncate">{m.stadium_name}</div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CÓMO FUNCIONA */}
          <section className="py-12 md:py-16 bg-muted/30" aria-labelledby="como-funciona-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 id="como-funciona-heading" className="text-3xl md:text-4xl font-black tracking-tight mb-3">¿Cómo funciona?</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">Tres pasos para empezar a competir con tu conocimiento del fútbol.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Users, iconWrap: 'bg-primary/10', iconColor: 'text-primary', stepColor: 'text-primary', step: 'Paso 1', title: 'Regístrate gratis', desc: 'Crea tu cuenta en segundos. NelPlay es gratuito: no necesitas pagar para jugar.' },
                  { icon: Target, iconWrap: 'bg-amber-500/10', iconColor: 'text-amber-600', stepColor: 'text-amber-600', step: 'Paso 2', title: 'Pronostica', desc: 'Ingresa el marcador que crees que tendrá cada partido. Puedes editarlo hasta que empiece.' },
                  { icon: Trophy, iconWrap: 'bg-success/10', iconColor: 'text-success', stepColor: 'text-success', step: 'Paso 3', title: 'Gana puntos y sube', desc: 'Por cada acierto sumas puntos y escalas en el ranking. El marcador exacto vale más.' },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <Card key={s.step} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className={`w-14 h-14 rounded-2xl ${s.iconWrap} flex items-center justify-center mx-auto mb-4`}>
                          <Icon className={`w-7 h-7 ${s.iconColor}`} />
                        </div>
                        <div className={`text-xs font-bold tracking-widest uppercase ${s.stepColor} mb-2`}>{s.step}</div>
                        <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SISTEMA DE PUNTOS (real) */}
          <section className="py-12 md:py-16" aria-labelledby="puntos-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h2 id="puntos-heading" className="text-3xl md:text-4xl font-black tracking-tight mb-3">Sistema de puntuación</h2>
                  <p className="text-muted-foreground">Mientras más preciso tu pronóstico, más puntos sumas.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { pts: '5', color: 'text-amber-500', title: 'Marcador exacto', desc: 'Pronosticaste 2-1 y el partido fue 2-1.' },
                    { pts: '3', color: 'text-slate-500', title: 'Ganador + diferencia', desc: 'Acertaste quién gana y por cuántos goles.' },
                    { pts: '1', color: 'text-amber-700', title: 'Solo ganador', desc: 'Acertaste quién gana pero con otro marcador.' },
                  ].map((p) => (
                    <Card key={p.title}>
                      <CardContent className="p-6 text-center">
                        <div className={`text-5xl font-black ${p.color} mb-2`}>{p.pts}</div>
                        <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2">puntos</div>
                        <h3 className="font-bold mb-1">{p.title}</h3>
                        <p className="text-xs text-muted-foreground">{p.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong>Multiplicadores por fase:</strong> las eliminatorias pagan <strong>×2</strong> y la final <strong>×3</strong>.
                    Un marcador exacto en la final vale <strong>15 puntos</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AdSlot id="home-inline" format="leaderboard" className="my-4" />
          </div>

          {/* RANKING (datos reales) */}
          {topUsers.length > 0 && (
            <section className="py-12 md:py-16 bg-muted/30" aria-labelledby="ranking-heading">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 id="ranking-heading" className="text-3xl md:text-4xl font-black tracking-tight mb-2">Los mejores del ranking</h2>
                    <p className="text-muted-foreground">Compite por llegar a la cima.</p>
                  </div>
                  <Card>
                    <CardContent className="p-4 divide-y divide-border">
                      {topUsers.map((u, i) => (
                        <div key={u.id} className="flex items-center gap-3 py-3">
                          <span className={`w-7 text-center font-black ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-amber-700' : 'text-muted-foreground'}`}>{i + 1}</span>
                          <Medal className={`w-4 h-4 ${i < 3 ? 'text-amber-500' : 'text-transparent'}`} />
                          <span className="flex-1 font-semibold truncate">{u.name || 'Jugador'}</span>
                          <span className="font-bold text-primary">{(u.total_points || 0).toLocaleString('es-CO')} pts</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  <div className="text-center mt-6">
                    <Button asChild variant="outline" className="font-semibold">
                      <Link to="/ranking">Ver ranking completo <ArrowRight className="w-4 h-4 ml-1" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* GAMIFICACIÓN + LIGAS + COMUNIDAD */}
          <section className="py-12 md:py-16" aria-labelledby="mas-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="mas-heading" className="sr-only">Más funcionalidades de NelPlay</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <Flame className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-lg font-bold mb-2">Retos y logros</h3>
                    <p className="text-sm text-muted-foreground">Completa retos, mantén tu racha y desbloquea logros a medida que subes de nivel. <span className="text-primary font-semibold">Muy pronto.</span></p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <Users className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-lg font-bold mb-2">Ligas privadas</h3>
                    <p className="text-sm text-muted-foreground">Crea una liga con tus amigos, la oficina o la familia, e invítalos con un código para competir. <span className="text-primary font-semibold">Muy pronto.</span></p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <Trophy className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-lg font-bold mb-2">Comunidad</h3>
                    <p className="text-sm text-muted-foreground">Descubre lo que pronostica la comunidad para cada partido una vez que empieza, y compárate con el resto.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ (visible + coincide con JSON-LD) */}
          <section className="py-12 md:py-16 bg-muted/30" aria-labelledby="faq-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 id="faq-heading" className="text-3xl md:text-4xl font-black tracking-tight mb-8 text-center">Preguntas frecuentes</h2>
                <div className="space-y-3">
                  {FAQS.map((f) => (
                    <details key={f.question} className="group rounded-xl border border-border bg-card p-4">
                      <summary className="flex items-center justify-between cursor-pointer font-bold list-none">
                        {f.question}
                        <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA FINAL */}
          {!isAuthenticated && (
            <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <ShieldCheck className="w-10 h-10 mx-auto mb-4 opacity-90" />
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Demuestra cuánto sabes de fútbol</h2>
                <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">Regístrate gratis, haz tu primer pronóstico y empieza a sumar puntos hoy.</p>
                <Button asChild size="lg" variant="secondary" className="font-bold text-base h-12 px-8 shadow-xl">
                  <Link to="/signup">Crear mi cuenta gratis <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;

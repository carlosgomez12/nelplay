import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Trophy, Target, Zap, CheckCircle2, ArrowRight, Calendar, Users, Sparkles } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PrizesCard from '@/components/PrizesCard.jsx';

const HomePage = () => {
  const { isAuthenticated, isInscriptionApproved } = useAuth();

  const primaryAction = isAuthenticated
    ? (isInscriptionApproved
        ? { to: '/matches',     label: 'Ir al calendario' }
        : { to: '/inscription', label: 'Completar inscripción' })
    : { to: '/signup', label: 'Regístrate ya' };

  return (
    <>
      <Helmet>
        <title>{'NelPlay - La gran polla del Mundial 2026'}</title>
        <meta name="description" content={'Pronóstica los marcadores del Mundial 2026 por solo $30.000 COP. Compite por el bote acumulado.'} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">

          {/* HERO */}
          <section className="relative overflow-hidden min-h-screen md:min-h-[100dvh] flex items-center justify-center">
            {/* Background Image */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url('https://horizons-cdn.hostinger.com/0a7d41ef-5581-4585-a665-1220c41753a7/2cb5994a71d24f046e4fc7181e98221c.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed'
              }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs tracking-widest uppercase mb-6 backdrop-blur-sm">
                  <Calendar className="w-3.5 h-3.5" /> Mundial 2026
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05] text-white drop-shadow-lg">
                  La gran <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">polla</span><br />
                  del Mundial 2026
                </h1>

                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Pronóstica los marcadores de cada partido, suma puntos por aciertos y compítete el bote acumulado por solo <strong className="text-white">$30.000 pesos</strong>.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="font-bold text-base h-12 px-8 shadow-lg shadow-primary/20">
                    <Link to={primaryAction.to}>
                      {primaryAction.label}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-bold text-base h-12 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                    <Link to="/leaderboard">
                      Ver clasificación
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* BOTE Y PREMIOS */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 font-bold text-[10px] tracking-widest uppercase mb-3">
                    <Sparkles className="w-3 h-3" /> Premios en juego
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                    El bote crece con cada inscripción
                  </h2>
                </div>
                <PrizesCard />
              </div>
            </div>
          </section>

          {/* CÓMO FUNCIONA */}
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                  ¿Cómo funciona?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Tres pasos simples para participar en la polla.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-xs font-bold tracking-widest uppercase text-primary mb-2">Paso 1</div>
                    <h3 className="text-xl font-bold mb-2">Regístrate</h3>
                    <p className="text-sm text-muted-foreground">
                      Crea tu cuenta y paga la inscripción de $30.000 vía Nequi. Sube el comprobante y espera la validación.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/30 ring-2 ring-amber-500/10 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                      <Target className="w-7 h-7 text-amber-600" />
                    </div>
                    <div className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-2">Paso 2</div>
                    <h3 className="text-xl font-bold mb-2">Pronóstica</h3>
                    <p className="text-sm text-muted-foreground">
                      Ingresa el marcador exacto que crees que tendrá cada partido. Puedes editar tu pronóstico hasta que comience el partido.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-success/30 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-7 h-7 text-success" />
                    </div>
                    <div className="text-xs font-bold tracking-widest uppercase text-success mb-2">Paso 3</div>
                    <h3 className="text-xl font-bold mb-2">Gana puntos</h3>
                    <p className="text-sm text-muted-foreground">
                      Por cada acierto sumas puntos. Marcador exacto vale más, y las fases finales multiplican el puntaje. ¡Sube en la clasificación!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* SISTEMA DE PUNTOS */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                    Sistema de puntuación
                  </h2>
                  <p className="text-muted-foreground">
                    Mientras más acertado el pronóstico, más puntos sumas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl font-black text-amber-500 mb-2">5</div>
                      <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2">puntos</div>
                      <h4 className="font-bold mb-1">Marcador exacto</h4>
                      <p className="text-xs text-muted-foreground">Pronosticaste 2-1 y el partido fue 2-1.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl font-black text-slate-500 mb-2">3</div>
                      <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2">puntos</div>
                      <h4 className="font-bold mb-1">Ganador + diferencia</h4>
                      <p className="text-xs text-muted-foreground">Acertaste quién gana y por cuántos goles.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl font-black text-amber-700 mb-2">1</div>
                      <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2">punto</div>
                      <h4 className="font-bold mb-1">Solo ganador</h4>
                      <p className="text-xs text-muted-foreground">Acertaste quién gana pero diferente marcador.</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Multiplicadores por fase:</strong> Octavos, cuartos y semis pagan <strong>×2</strong>. La final paga <strong>×3</strong>. Una predicción exacta en la final son <strong>15 puntos</strong>.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA FINAL */}
          {!isAuthenticated && (
            <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                  ¿Listo para jugar?
                </h2>
                <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
                  Únete a la polla mundialista más emocionante. Por solo $30.000 pesos puedes ganarte el bote.
                </p>
                <Button asChild size="lg" variant="secondary" className="font-bold text-base h-12 px-8 shadow-xl">
                  <Link to="/signup">
                    Crear mi cuenta
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
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
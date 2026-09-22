import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Target, Crosshair, Percent, Flame, Award, TrendingUp, ArrowRight, Loader2,
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Seo from '@/components/seo/Seo.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { getLevel } from '@/config/levels.js';
import { ACHIEVEMENTS } from '@/config/achievements.js';
import { fetchProfile } from '@/lib/profile.js';

const StatTile = ({ icon: Icon, label, value, accent = 'text-primary' }) => (
  <Card>
    <CardContent className="p-4 text-center">
      <Icon className={`w-5 h-5 mx-auto mb-1.5 ${accent}`} />
      <div className="text-2xl font-black leading-none">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground mt-1">{label}</div>
    </CardContent>
  </Card>
);

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const p = await fetchProfile();
        if (active) setData(p);
      } catch (_) {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const level = getLevel(data?.points || 0);

  return (
    <>
      <Seo title="Mi perfil" path="/perfil" description="Tu perfil de NelPlay: progresión, estadísticas y logros." noindex />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : error || !data ? (
                <Card><CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No pudimos cargar tu perfil.</p>
                  <Button asChild variant="outline"><Link to="/">Volver al inicio</Link></Button>
                </CardContent></Card>
              ) : (
                <>
                  {/* HERO / progresión */}
                  <Card className="mb-6 overflow-hidden">
                    <div className="bg-gradient-to-br from-primary/90 to-secondary/80 p-6 text-primary-foreground">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-2xl font-black shrink-0">
                          {data.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h1 className="text-2xl font-black truncate">{data.name}</h1>
                          <div className="flex items-center gap-2 mt-1 text-sm font-semibold">
                            <span>{level.icon} {level.name}</span>
                            {data.position && (
                              <span className="opacity-90">· #{data.position} del ranking</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-3xl font-black leading-none">{data.points.toLocaleString('es-CO')}</div>
                          <div className="text-[11px] uppercase tracking-wide opacity-90">puntos</div>
                        </div>
                      </div>

                      {/* progreso al siguiente nivel */}
                      <div className="mt-5">
                        <div className="flex justify-between text-xs font-semibold mb-1 opacity-95">
                          <span>{level.name}</span>
                          {level.next ? <span>{level.next.icon} {level.next.name}</span> : <span>Nivel máximo 👑</span>}
                        </div>
                        <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${level.progressPct}%` }} />
                        </div>
                        {level.next && (
                          <div className="text-[11px] mt-1 opacity-90">
                            Te faltan <strong>{level.pointsToNext}</strong> puntos para {level.next.name}.
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* STATS */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    <StatTile icon={Trophy} label="Posición" value={data.position ? `#${data.position}` : '—'} accent="text-amber-500" />
                    <StatTile icon={Target} label="Pronósticos" value={data.predictionsCount} />
                    <StatTile icon={Crosshair} label="Marcador exacto" value={data.exactCount} accent="text-amber-600" />
                    <StatTile icon={Percent} label="Precisión" value={data.accuracyPct != null ? `${data.accuracyPct}%` : '—'} accent="text-secondary" />
                    <StatTile icon={Flame} label="Racha actual" value={data.currentStreak} accent="text-primary" />
                    <StatTile icon={TrendingUp} label="Mejor racha" value={data.bestStreak} accent="text-success" />
                  </div>

                  {/* LOGROS */}
                  <section className="mb-8" aria-labelledby="logros-heading">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-primary" />
                      <h2 id="logros-heading" className="text-xl font-black">Logros</h2>
                      <span className="text-sm text-muted-foreground">
                        {data.earnedCodes.size}/{ACHIEVEMENTS.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {ACHIEVEMENTS.map((a) => {
                        const earned = data.earnedCodes.has(a.code);
                        return (
                          <div
                            key={a.code}
                            className={`rounded-xl border p-3 text-center transition-colors ${
                              earned ? 'border-primary/30 bg-card' : 'border-border bg-muted/30 opacity-60'
                            }`}
                          >
                            <div className={`text-3xl mb-1 ${earned ? '' : 'grayscale'}`}>{a.icon}</div>
                            <div className="text-sm font-bold leading-tight">{a.name}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{a.description}</div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* HISTORIAL */}
                  {data.history.length > 0 && (
                    <section aria-labelledby="historial-heading">
                      <h2 id="historial-heading" className="text-xl font-black mb-4">Historial reciente</h2>
                      <Card><CardContent className="p-0 divide-y divide-border">
                        {data.history.map((h) => (
                          <div key={h.id} className="flex items-center gap-3 p-3">
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold truncate">{h.home_team} vs {h.away_team}</div>
                              <div className="text-xs text-muted-foreground">
                                Tu pronóstico: {h.predicted}{h.actual ? ` · Resultado: ${h.actual}` : ''}
                              </div>
                            </div>
                            <span className={`text-sm font-black shrink-0 ${h.points > 0 ? 'text-success' : 'text-muted-foreground'}`}>
                              {h.points > 0 ? `+${h.points}` : '0'} pts
                            </span>
                          </div>
                        ))}
                      </CardContent></Card>
                    </section>
                  )}

                  <div className="text-center mt-8">
                    <Button asChild variant="outline" className="font-semibold">
                      <Link to="/matches">Hacer más pronósticos <ArrowRight className="w-4 h-4 ml-1" /></Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;

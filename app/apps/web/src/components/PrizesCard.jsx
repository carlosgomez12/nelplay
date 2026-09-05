import React, { useState, useEffect, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Trophy, Medal, Award, Users, TrendingUp, Sparkles, AlertCircle, RefreshCw, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const PrizesCard = () => {
  const { isAuthenticated } = useAuth();
  const [state, setState] = useState({
    settings: null,
    playersCount: 0,
    status: 'loading'
  });

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) {
      setState({ settings: null, playersCount: 0, status: 'unauthenticated' });
      return;
    }

    setState(s => ({ ...s, status: 'loading' }));
    let settings = null;
    let playersCount = 0;
    let anySuccess = false;

    try {
      const res = await pb.collection('payment_settings').getList(1, 1, {
        filter: 'is_active = true',
        $autoCancel: false
      });
      settings = res.items[0] || null;
      anySuccess = true;
    } catch (err) {
      console.warn('PrizesCard: error payment_settings', err?.message);
    }

    try {
      const res = await pb.collection('users').getList(1, 1, {
        filter: pb.filter('inscription_status = {:s}', { s: 'approved' }),
        fields: 'id',
        $autoCancel: false
      });
      playersCount = res.totalItems || 0;
      anySuccess = true;
    } catch (err) {
      console.warn('PrizesCard: error users', err?.message);
    }

    if (settings) {
      setState({ settings, playersCount, status: 'ok' });
    } else if (anySuccess) {
      setState({ settings: null, playersCount, status: 'no-settings' });
    } else {
      setState(s => ({ ...s, status: 'error' }));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isAuthenticated) return;

    let isSubscribed = true;
    
    const subscribeToUsers = async () => {
      try {
        await pb.collection('users').subscribe('*', (e) => {
          if (isSubscribed && (e.action === 'create' || e.action === 'update' || e.action === 'delete')) {
            // Re-fetch count when users change
            fetchData();
          }
        });
      } catch (err) {
        console.warn('Failed to subscribe to users:', err);
      }
    };

    subscribeToUsers();

    return () => {
      isSubscribed = false;
      pb.collection('users').unsubscribe('*').catch(() => {});
    };
  }, [isAuthenticated, fetchData]);

  if (!isAuthenticated) {
    return (
      <Card className="bg-muted/50 border-dashed border-2">
        <CardContent className="p-10 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">Inicia sesión para ver el bote</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            El bote acumulado y los premios son exclusivos para los participantes registrados.
          </p>
          <Button asChild>
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (state.status === 'loading') {
    return (
      <Card className="bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-amber-950/20 dark:via-background dark:to-amber-950/20 border-amber-200 dark:border-amber-900/40">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center justify-center mb-8 space-y-4">
            <Skeleton className="h-6 w-40 rounded-full" />
            <Skeleton className="h-16 w-64 rounded-lg" />
            <Skeleton className="h-5 w-32 rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state.status === 'error') {
    return (
      <Card className="bg-destructive/5 border-destructive/20">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
          <p className="font-bold mb-1">No se pudieron cargar los datos del bote</p>
          <p className="text-sm text-muted-foreground mb-4">
            Revisa tu conexión e intenta de nuevo.
          </p>
          <Button onClick={fetchData} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" /> Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (state.status === 'no-settings') {
    return (
      <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/40">
        <CardContent className="p-8 text-center">
          <Sparkles className="w-10 h-10 text-amber-600 mx-auto mb-3" />
          <p className="font-bold mb-1">Premios próximamente</p>
          <p className="text-sm text-muted-foreground">
            La configuración del bote se publicará en breve.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Null-safe property access with optional chaining and default values
  const s = state.settings;
  const amount = Math.max(0, s?.inscription_amount ?? 30000);
  const playersCount = Math.max(0, state.playersCount ?? 0);
  const total = Math.max(0, amount * playersCount);
  
  const firstPct = Math.max(0, s?.prize_first_pct ?? 60);
  const secondPct = Math.max(0, s?.prize_second_pct ?? 25);
  const thirdPct = Math.max(0, s?.prize_third_pct ?? 10);
  const reservePct = Math.max(0, s?.prize_reserve_pct ?? 5);
  
  const firstPrize = Math.max(0, Math.round(total * firstPct / 100));
  const secondPrize = Math.max(0, Math.round(total * secondPct / 100));
  const thirdPrize = Math.max(0, Math.round(total * thirdPct / 100));

  const fmt = (n) => '$' + Math.max(0, n).toLocaleString('es-CO');

  return (
    <Card className="bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-amber-950/20 dark:via-background dark:to-amber-950/20 border-amber-200 dark:border-amber-900/40 overflow-hidden relative">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

      <CardContent className="p-6 md:p-8 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700 dark:text-amber-400">
              Bote acumulado en vivo
            </span>
          </div>
          <div className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 bg-clip-text text-transparent">
            {fmt(total)}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>
              <strong className="text-foreground">{playersCount}</strong>{' '}
              {playersCount === 1 ? 'jugador inscrito' : 'jugadores inscritos'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-950/30 border-2 border-amber-400 rounded-xl p-4 text-center shadow-md md:scale-105 md:translate-y-[-4px] transition-transform">
            <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-1" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">
              1er lugar &middot; {Math.max(0, firstPct)}%
            </div>
            <div className="text-2xl font-black text-amber-700 dark:text-amber-300">
              {fmt(firstPrize)}
            </div>
          </div>

          <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
            <Medal className="w-7 h-7 text-slate-400 mx-auto mb-1" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
              2do lugar &middot; {Math.max(0, secondPct)}%
            </div>
            <div className="text-2xl font-black">
              {fmt(secondPrize)}
            </div>
          </div>

          <div className="bg-card border rounded-xl p-4 text-center shadow-sm">
            <Award className="w-7 h-7 text-amber-700 mx-auto mb-1" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
              3er lugar &middot; {Math.max(0, thirdPct)}%
            </div>
            <div className="text-2xl font-black">
              {fmt(thirdPrize)}
            </div>
          </div>
        </div>

        {reservePct > 0 && (
          <p className="text-[11px] text-center text-muted-foreground">
            * Se destina un {Math.max(0, reservePct)}% del total a costos operativos del torneo (hosting, gestión).
          </p>
        )}

        <div className="mt-6 pt-6 border-t border-amber-200 dark:border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="w-4 h-4 text-success" />
            <span>El bote crece con cada nuevo jugador.</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Inscripción: <strong className="text-foreground">{fmt(amount)}</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrizesCard;
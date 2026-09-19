import React, { useState, useEffect, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog.jsx';
import { Trophy, Clock, MapPin, Save, X, CheckCircle2, AlertCircle, Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';

// Banderas
const FLAGS = {
  'Alemania':'\uD83C\uDDE9\uD83C\uDDEA','Arabia Saud\u00ed':'\uD83C\uDDF8\uD83C\uDDE6','Arabia Saudita':'\uD83C\uDDF8\uD83C\uDDE6',
  'Argelia':'\uD83C\uDDE9\uD83C\uDDFF','Argentina':'\uD83C\uDDE6\uD83C\uDDF7','Australia':'\uD83C\uDDE6\uD83C\uDDFA','Austria':'\uD83C\uDDE6\uD83C\uDDF9',
  'B\u00e9lgica':'\uD83C\uDDE7\uD83C\uDDEA','Bosnia y Herzegovina':'\uD83C\uDDE7\uD83C\uDDE6','Brasil':'\uD83C\uDDE7\uD83C\uDDF7',
  'Cabo Verde':'\uD83C\uDDE8\uD83C\uDDFB','Islas de Cabo Verde':'\uD83C\uDDE8\uD83C\uDDFB','Canad\u00e1':'\uD83C\uDDE8\uD83C\uDDE6',
  'Catar':'\uD83C\uDDF6\uD83C\uDDE6','Qatar':'\uD83C\uDDF6\uD83C\uDDE6','Chequia':'\uD83C\uDDE8\uD83C\uDDFF','Rep\u00fablica Checa':'\uD83C\uDDE8\uD83C\uDDFF',
  'Colombia':'\uD83C\uDDE8\uD83C\uDDF4','Corea del Sur':'\uD83C\uDDF0\uD83C\uDDF7','Rep\u00fablica de Corea':'\uD83C\uDDF0\uD83C\uDDF7',
  'Costa de Marfil':'\uD83C\uDDE8\uD83C\uDDEE','Costa Rica':'\uD83C\uDDE8\uD83C\uDDF7','Croacia':'\uD83C\uDDED\uD83C\uDDF7','Curazao':'\uD83C\uDDE8\uD83C\uDDFC',
  'Ecuador':'\uD83C\uDDEA\uD83C\uDDE8','Egipto':'\uD83C\uDDEA\uD83C\uDDEC','Escocia':'\uD83C\uDFF4','Espa\u00f1a':'\uD83C\uDDEA\uD83C\uDDF8',
  'Estados Unidos':'\uD83C\uDDFA\uD83C\uDDF8','EE. UU.':'\uD83C\uDDFA\uD83C\uDDF8','EE.UU.':'\uD83C\uDDFA\uD83C\uDDF8',
  'Francia':'\uD83C\uDDEB\uD83C\uDDF7','Ghana':'\uD83C\uDDEC\uD83C\uDDED','Hait\u00ed':'\uD83C\uDDED\uD83C\uDDF9','Inglaterra':'\uD83C\uDFF4',
  'Ir\u00e1n':'\uD83C\uDDEE\uD83C\uDDF7','RI de Ir\u00e1n':'\uD83C\uDDEE\uD83C\uDDF7','Irak':'\uD83C\uDDEE\uD83C\uDDF6',
  'Jap\u00f3n':'\uD83C\uDDEF\uD83C\uDDF5','Jordania':'\uD83C\uDDEF\uD83C\uDDF4','Marruecos':'\uD83C\uDDF2\uD83C\uDDE6','M\u00e9xico':'\uD83C\uDDF2\uD83C\uDDFD',
  'Noruega':'\uD83C\uDDF3\uD83C\uDDF4','Nueva Zelanda':'\uD83C\uDDF3\uD83C\uDDFF','Pa\u00edses Bajos':'\uD83C\uDDF3\uD83C\uDDF1',
  'Panam\u00e1':'\uD83C\uDDF5\uD83C\uDDE6','Paraguay':'\uD83C\uDDF5\uD83C\uDDFE','Portugal':'\uD83C\uDDF5\uD83C\uDDF9','RD Congo':'\uD83C\uDDE8\uD83C\uDDE9',
  'Senegal':'\uD83C\uDDF8\uD83C\uDDF3','Sud\u00e1frica':'\uD83C\uDDFF\uD83C\uDDE6','Suecia':'\uD83C\uDDF8\uD83C\uDDEA','Suiza':'\uD83C\uDDE8\uD83C\uDDED',
  'T\u00fanez':'\uD83C\uDDF9\uD83C\uDDF3','Turqu\u00eda':'\uD83C\uDDF9\uD83C\uDDF7','Uruguay':'\uD83C\uDDFA\uD83C\uDDFE','Uzbekist\u00e1n':'\uD83C\uDDFA\uD83C\uDDFF'
};
const getFlag = (team) => FLAGS[String(team || '').trim()] || '\u26BD';

const isFriendlyMatch = (m) => {
  return m?.stage && String(m.stage).toLowerCase().indexOf('amistoso') !== -1;
};

const determineWinner = (homeScore, awayScore) => {
  if (homeScore > awayScore) return 'home_win';
  if (awayScore > homeScore) return 'away_win';
  return 'draw';
};

// Hoy en hora Colombia
const todayColombiaISO = () => {
  const now = new Date();
  const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
  const colombiaMs = utcMs - (5 * 3600000);
  const colombia = new Date(colombiaMs);
  const y = colombia.getFullYear();
  const m = String(colombia.getMonth() + 1).padStart(2, '0');
  const d = String(colombia.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const addDaysISO = (isoDate, days) => {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(y, m - 1, d, 12, 0, 0);
  dt.setDate(dt.getDate() + days);
  const ny = dt.getFullYear();
  const nm = String(dt.getMonth() + 1).padStart(2, '0');
  const nd = String(dt.getDate()).padStart(2, '0');
  return `${ny}-${nm}-${nd}`;
};

const extractYMD = (rawDate) => {
  if (!rawDate) return null;
  const s = String(rawDate).trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
};

const matchDateTime = (m) => {
  if (!m?.match_date || !m?.match_time) return null;
  const ymd = extractYMD(m.match_date);
  if (!ymd) return null;
  const tm = String(m.match_time).match(/^(\d{1,2}):(\d{2})/);
  if (!tm) return null;
  return new Date(ymd[0], ymd[1] - 1, ymd[2], parseInt(tm[1], 10), parseInt(tm[2], 10), 0);
};

const isMatchToday = (m, todayISO) => {
  const ymd = extractYMD(m?.match_date);
  if (!ymd) return false;
  const matchISO = `${ymd[0]}-${String(ymd[1]).padStart(2, '0')}-${String(ymd[2]).padStart(2, '0')}`;
  return matchISO === todayISO;
};

const TodayMatchesPopup = () => {
  const { isAuthenticated, isInscriptionApproved, currentUser } = useAuth();
  const [open, setOpen]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [matches, setMatches]   = useState([]);
  const [predictions, setPredictions] = useState({});

  const checkTodayMatches = useCallback(async () => {
    if (!isAuthenticated || !isInscriptionApproved || !currentUser?.id) return;
    setLoading(true);
    try {
      const today    = todayColombiaISO();
      const tomorrow = addDaysISO(today, 1);

      const matchesRes = await pb.collection('matches').getList(1, 50, {
        filter: pb.filter(
          'match_date >= {:start} && match_date < {:end} && status = {:s}',
          { start: today, end: tomorrow, s: 'upcoming' }
        ),
        sort: 'match_time',
        requestKey: null
      });

      const upcomingToday = matchesRes.items.filter(m => {
        if (!isMatchToday(m, today)) return false;
        const dt = matchDateTime(m);
        return dt && dt > new Date();
      });

      if (upcomingToday.length === 0) {
        setMatches([]);
        setOpen(false);
        setLoading(false);
        return;
      }

      const matchIds = upcomingToday.map(m => m.id);
      const orFilter = matchIds.map(id => `match_id = "${id}"`).join(' || ');
      const predsRes = await pb.collection('predictions').getList(1, 100, {
        filter: pb.filter(`user_id = {:u} && (${orFilter})`, { u: currentUser.id }),
        requestKey: null
      });
      const predictedIds = new Set(predsRes.items.map(p => p.match_id));

      const pendientes = upcomingToday.filter(m => !predictedIds.has(m.id));

      if (pendientes.length === 0) {
        setMatches([]);
        setOpen(false);
        setLoading(false);
        return;
      }

      const initialPreds = {};
      pendientes.forEach(m => {
        initialPreds[m.id] = { home: '', away: '', saving: false, saved: false };
      });

      setMatches(pendientes);
      setPredictions(initialPreds);
      setOpen(true);
    } catch (err) {
      console.warn('TodayMatchesPopup: error verificando partidos del d\u00eda', err?.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isInscriptionApproved, currentUser?.id]);

  useEffect(() => {
    const t = setTimeout(() => checkTodayMatches(), 1500);
    return () => clearTimeout(t);
  }, [checkTodayMatches]);

  const updatePred = (matchId, field, value) => {
    setPredictions(prev => ({
      ...prev,
      [matchId]: { ...prev[matchId], [field]: value }
    }));
  };

  const handleSave = async (match) => {
    const p = predictions[match.id];
    if (!p) return;
    const h = parseInt(p.home, 10);
    const a = parseInt(p.away, 10);
    if (Number.isNaN(h) || Number.isNaN(a) || h < 0 || a < 0) {
      toast.error('Ingresa marcadores v\u00e1lidos (>= 0)');
      return;
    }

    updatePred(match.id, 'saving', true);
    try {
      // FIX: enviar predicted_winner (required en schema) + status + is_locked
      await pb.collection('predictions').create({
        user_id:              currentUser.id,
        match_id:             match.id,
        predicted_home_score: h,
        predicted_away_score: a,
        predicted_winner:     determineWinner(h, a),
        status:               'pending',
        is_locked:            false
      });
      updatePred(match.id, 'saving', false);
      updatePred(match.id, 'saved', true);
      toast.success(`${match.home_team} ${h} - ${a} ${match.away_team} \u2713`);

      setTimeout(() => {
        const allSaved = matches.every(m => {
          const pp = predictions[m.id];
          return m.id === match.id || pp?.saved;
        });
        if (allSaved) setOpen(false);
      }, 1200);
    } catch (err) {
      updatePred(match.id, 'saving', false);
      const msg = err?.response?.message || err?.message || 'Error al guardar';
      const dataErrors = err?.response?.data;
      console.warn('[TodayMatchesPopup] error:', msg, dataErrors);
      toast.error(msg);
    }
  };

  const remainingCount = matches.filter(m => !predictions[m.id]?.saved).length;

  if (!open || matches.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-black">
                &iexcl;Partidos de hoy!
              </DialogTitle>
              <DialogDescription>
                Tienes <strong className="text-foreground">{remainingCount}</strong> {remainingCount === 1 ? 'partido pendiente' : 'partidos pendientes'} por pron&oacute;sticar.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg p-3 flex items-start gap-2 text-sm mb-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Si no pron&oacute;sticas antes del inicio del partido</strong>, no podr&aacute;s sumar puntos por ese juego. Puedes cerrar este aviso y volver a apostar desde la p&aacute;gina de Partidos hasta el kickoff.
          </div>
        </div>

        <div className="space-y-2">
          {matches.map(match => {
            const p = predictions[match.id] || { home: '', away: '', saving: false, saved: false };
            const dt = matchDateTime(match);
            const hasStarted = dt && dt <= new Date();
            const friendly = isFriendlyMatch(match);

            return (
              <div
                key={match.id}
                className={`border rounded-xl p-3 transition-all ${
                  p.saved
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : hasStarted
                      ? 'bg-muted/40 border-destructive/30'
                      : friendly
                        ? 'bg-amber-50/30 dark:bg-amber-950/10 border-amber-500/40'
                        : 'bg-card border-border hover:border-primary/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-3">

                  <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0.5 text-sm shrink-0 sm:w-24">
                    <div className="flex items-center gap-1 font-bold text-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {match.match_time}
                    </div>
                    {friendly && (
                      <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[9px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded">
                        <Star className="w-2 h-2" /> Amist.
                      </span>
                    )}
                    {match.stadium_name && (
                      <div className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground">
                        <MapPin className="w-2.5 h-2.5" />
                        <span className="truncate max-w-[80px]">{match.stadium_name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-center gap-2 flex-1 w-full">
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="font-bold text-sm text-right leading-tight">{match.home_team}</span>
                      <span className="text-2xl leading-none">{getFlag(match.home_team)}</span>
                    </div>
                    <span className="text-xs font-black text-muted-foreground/50 px-1">VS</span>
                    <div className="flex items-center gap-2 flex-1 justify-start">
                      <span className="text-2xl leading-none">{getFlag(match.away_team)}</span>
                      <span className="font-bold text-sm text-left leading-tight">{match.away_team}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {p.saved ? (
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-700 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Guardado
                      </div>
                    ) : hasStarted ? (
                      <div className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive font-bold text-xs uppercase tracking-wider">
                        Iniciado
                      </div>
                    ) : (
                      <>
                        <Input
                          type="number" min="0" max="50"
                          value={p.home}
                          disabled={p.saving}
                          onChange={(e) => updatePred(match.id, 'home', e.target.value)}
                          className="w-12 h-10 text-center text-lg font-black p-0"
                        />
                        <span className="font-black text-muted-foreground">-</span>
                        <Input
                          type="number" min="0" max="50"
                          value={p.away}
                          disabled={p.saving}
                          onChange={(e) => updatePred(match.id, 'away', e.target.value)}
                          className="w-12 h-10 text-center text-lg font-black p-0"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSave(match)}
                          disabled={p.saving || p.home === '' || p.away === ''}
                          className={`h-10 gap-1 ${friendly ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}`}
                        >
                          {p.saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-3 mt-2 border-t text-sm">
          <span className="text-xs text-muted-foreground">
            Puedes seguir pron&oacute;sticando desde <strong className="text-foreground">Partidos</strong> hasta el kickoff.
          </span>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="gap-1">
            <X className="w-3.5 h-3.5" /> Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TodayMatchesPopup;
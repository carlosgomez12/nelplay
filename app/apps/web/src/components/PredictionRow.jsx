import React, { useState, useEffect } from 'react';
import { format, parseISO, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { MapPin, Clock, CalendarDays, Save, Lock, CheckCircle2, Star } from 'lucide-react';
import { toast } from 'sonner';

// ────────────────────────────────────────────────────────────────────
// Banderas
// ────────────────────────────────────────────────────────────────────
const FLAGS = {
  'Alemania': '\uD83C\uDDE9\uD83C\uDDEA',
  'Arabia Saud\u00ed': '\uD83C\uDDF8\uD83C\uDDE6',
  'Arabia Saudita': '\uD83C\uDDF8\uD83C\uDDE6',
  'Argelia': '\uD83C\uDDE9\uD83C\uDDFF',
  'Argentina': '\uD83C\uDDE6\uD83C\uDDF7',
  'Australia': '\uD83C\uDDE6\uD83C\uDDFA',
  'Austria': '\uD83C\uDDE6\uD83C\uDDF9',
  'B\u00e9lgica': '\uD83C\uDDE7\uD83C\uDDEA',
  'Bosnia y Herzegovina': '\uD83C\uDDE7\uD83C\uDDE6',
  'Brasil': '\uD83C\uDDE7\uD83C\uDDF7',
  'Cabo Verde': '\uD83C\uDDE8\uD83C\uDDFB',
  'Islas de Cabo Verde': '\uD83C\uDDE8\uD83C\uDDFB',
  'Canad\u00e1': '\uD83C\uDDE8\uD83C\uDDE6',
  'Catar': '\uD83C\uDDF6\uD83C\uDDE6',
  'Qatar': '\uD83C\uDDF6\uD83C\uDDE6',
  'Chequia': '\uD83C\uDDE8\uD83C\uDDFF',
  'Rep\u00fablica Checa': '\uD83C\uDDE8\uD83C\uDDFF',
  'Colombia': '\uD83C\uDDE8\uD83C\uDDF4',
  'Corea del Sur': '\uD83C\uDDF0\uD83C\uDDF7',
  'Rep\u00fablica de Corea': '\uD83C\uDDF0\uD83C\uDDF7',
  'Costa de Marfil': '\uD83C\uDDE8\uD83C\uDDEE',
  'Costa Rica': '\uD83C\uDDE8\uD83C\uDDF7',
  'Croacia': '\uD83C\uDDED\uD83C\uDDF7',
  'Curazao': '\uD83C\uDDE8\uD83C\uDDFC',
  'Ecuador': '\uD83C\uDDEA\uD83C\uDDE8',
  'Egipto': '\uD83C\uDDEA\uD83C\uDDEC',
  'Escocia': '\uD83C\uDFF4',
  'Espa\u00f1a': '\uD83C\uDDEA\uD83C\uDDF8',
  'Estados Unidos': '\uD83C\uDDFA\uD83C\uDDF8',
  'EE. UU.': '\uD83C\uDDFA\uD83C\uDDF8',
  'EE.UU.': '\uD83C\uDDFA\uD83C\uDDF8',
  'Francia': '\uD83C\uDDEB\uD83C\uDDF7',
  'Ghana': '\uD83C\uDDEC\uD83C\uDDED',
  'Hait\u00ed': '\uD83C\uDDED\uD83C\uDDF9',
  'Inglaterra': '\uD83C\uDFF4',
  'Ir\u00e1n': '\uD83C\uDDEE\uD83C\uDDF7',
  'RI de Ir\u00e1n': '\uD83C\uDDEE\uD83C\uDDF7',
  'Irak': '\uD83C\uDDEE\uD83C\uDDF6',
  'Jap\u00f3n': '\uD83C\uDDEF\uD83C\uDDF5',
  'Jordania': '\uD83C\uDDEF\uD83C\uDDF4',
  'Marruecos': '\uD83C\uDDF2\uD83C\uDDE6',
  'M\u00e9xico': '\uD83C\uDDF2\uD83C\uDDFD',
  'Noruega': '\uD83C\uDDF3\uD83C\uDDF4',
  'Nueva Zelanda': '\uD83C\uDDF3\uD83C\uDDFF',
  'Pa\u00edses Bajos': '\uD83C\uDDF3\uD83C\uDDF1',
  'Panam\u00e1': '\uD83C\uDDF5\uD83C\uDDE6',
  'Paraguay': '\uD83C\uDDF5\uD83C\uDDFE',
  'Portugal': '\uD83C\uDDF5\uD83C\uDDF9',
  'RD Congo': '\uD83C\uDDE8\uD83C\uDDE9',
  'Senegal': '\uD83C\uDDF8\uD83C\uDDF3',
  'Sud\u00e1frica': '\uD83C\uDDFF\uD83C\uDDE6',
  'Suecia': '\uD83C\uDDF8\uD83C\uDDEA',
  'Suiza': '\uD83C\uDDE8\uD83C\uDDED',
  'T\u00fanez': '\uD83C\uDDF9\uD83C\uDDF3',
  'Turqu\u00eda': '\uD83C\uDDF9\uD83C\uDDF7',
  'Uruguay': '\uD83C\uDDFA\uD83C\uDDFE',
  'Uzbekist\u00e1n': '\uD83C\uDDFA\uD83C\uDDFF'
};

const getFlagEmoji = (teamName) => {
  if (!teamName) return '\u26BD';
  const clean = String(teamName).trim();
  return FLAGS[clean] || '\u26BD';
};

const isEmoji = (str) => {
  if (!str) return false;
  const re = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  return re.test(str) || str === '\u26BD';
};

const renderFlag = (flagFromDb, teamName) => {
  if (flagFromDb && !isEmoji(flagFromDb) && flagFromDb.length > 5 && flagFromDb.includes('/')) {
    return <img src={flagFromDb} alt="" className="w-8 h-8 object-cover rounded-full border shadow-sm" />;
  }
  if (flagFromDb && isEmoji(flagFromDb)) {
    return <span className="text-2xl leading-none">{flagFromDb}</span>;
  }
  const emoji = getFlagEmoji(teamName);
  return <span className="text-2xl leading-none">{emoji}</span>;
};

const extractYMD = (rawDate) => {
  if (!rawDate) return null;
  const s = String(rawDate).trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
};

const parseLocalDate = (dateStr) => {
  const ymd = extractYMD(dateStr);
  if (!ymd) {
    try { return parseISO(String(dateStr)); } catch { return null; }
  }
  return new Date(ymd[0], ymd[1] - 1, ymd[2], 12, 0, 0);
};

const buildMatchDateTime = (rawDate, rawTime) => {
  const ymd = extractYMD(rawDate);
  if (!ymd) return null;
  const timeStr = String(rawTime || '00:00').trim();
  const tm = timeStr.match(/^(\d{1,2}):(\d{2})/);
  if (!tm) return null;
  return new Date(ymd[0], ymd[1] - 1, ymd[2], parseInt(tm[1], 10), parseInt(tm[2], 10), 0);
};

const isFriendlyMatch = (match) => {
  return match?.stage && String(match.stage).toLowerCase().indexOf('amistoso') !== -1;
};

const determineWinner = (homeScore, awayScore) => {
  if (homeScore > awayScore) return 'home_win';
  if (awayScore > homeScore) return 'away_win';
  return 'draw';
};

/**
 * Una fila por partido con dos inputs de marcador.
 *
 * NUEVA REGLA: Una vez el usuario guarda un pron\u00f3stico, queda FIJO.
 * No se puede modificar aunque el partido a\u00fan no haya iniciado.
 */
const PredictionRow = ({ match, prediction, onSaved }) => {
  const { currentUser } = useAuth();
  const [home, setHome] = useState(prediction?.predicted_home_score ?? '');
  const [away, setAway] = useState(prediction?.predicted_away_score ?? '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setHome(prediction?.predicted_home_score ?? '');
    setAway(prediction?.predicted_away_score ?? '');
  }, [prediction?.id, prediction?.predicted_home_score, prediction?.predicted_away_score]);

  let flags = {};
  try {
    if (match.team_flags) {
      flags = typeof match.team_flags === 'string'
        ? JSON.parse(match.team_flags)
        : match.team_flags;
    }
  } catch { /* ignore */ }

  const localDate = parseLocalDate(match.match_date);
  const formattedDate = localDate
    ? format(localDate, "EEE, d MMM", { locale: es })
    : 'TBD';

  const matchDateTime = buildMatchDateTime(match.match_date, match.match_time);
  const hasStarted = matchDateTime ? !isBefore(new Date(), matchDateTime) : false;

  // NUEVA REGLA: existe predicci\u00f3n guardada \u2192 ya no editable
  const hasPrediction = !!prediction?.id;
  const isLocked = hasPrediction
                || match.status === 'live'
                || match.status === 'completed'
                || prediction?.is_locked
                || hasStarted;
  const isEvaluated = match.status === 'completed' && prediction?.status === 'evaluated';
  const isFriendly = isFriendlyMatch(match);

  const statusBadge = () => {
    if (match.status === 'live')
      return <Badge variant="destructive" className="animate-pulse uppercase text-[10px] font-bold tracking-wider">En vivo</Badge>;
    if (match.status === 'completed')
      return <Badge variant="secondary" className="uppercase text-[10px] font-bold tracking-wider">Finalizado</Badge>;
    if (hasStarted)
      return <Badge variant="outline" className="uppercase text-[10px] font-bold tracking-wider">Cerrado</Badge>;
    return <Badge variant="outline" className="uppercase text-[10px] font-bold tracking-wider bg-primary/5 text-primary border-primary/20">Pr&oacute;ximo</Badge>;
  };

  const handleSave = async () => {
    const h = parseInt(home, 10);
    const a = parseInt(away, 10);
    if (Number.isNaN(h) || Number.isNaN(a) || h < 0 || a < 0) {
      toast.error('Ingresa marcadores v\u00e1lidos (>= 0)');
      return;
    }
    if (hasPrediction) {
      toast.error('Ya guardaste un pron\u00f3stico para este partido. No se puede modificar.');
      return;
    }
    if (hasStarted) {
      toast.error('El partido ya inici\u00f3, no se puede pron\u00f3sticar');
      return;
    }

    setSaving(true);
    try {
      const data = {
        user_id: currentUser.id,
        match_id: match.id,
        predicted_home_score: h,
        predicted_away_score: a,
        predicted_winner: determineWinner(h, a),
        status: 'pending',
        is_locked: false
      };

      // Solo se permite CREATE. No update.
      await pb.collection('predictions').create(data);
      toast.success(`Pron\u00f3stico guardado: ${match.home_team} ${h} - ${a} ${match.away_team}`);
      onSaved?.();
    } catch (err) {
      const msg = err?.response?.message || err?.message || 'Error al guardar el pron\u00f3stico';
      const dataErrors = err?.response?.data;
      console.warn('[PredictionRow] error:', msg, dataErrors);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`group flex flex-col lg:flex-row items-center justify-between p-4 sm:p-5 bg-card border rounded-xl hover:shadow-md transition-all duration-200 gap-4 lg:gap-6 ${
      isFriendly
        ? 'border-amber-500/40 bg-amber-50/30 dark:bg-amber-950/10 hover:border-amber-500/60'
        : 'hover:border-primary/30'
    }`}>

      {/* Fecha y hora */}
      <div className="flex lg:flex-col items-center lg:items-start gap-3 lg:gap-1 w-full lg:w-32 shrink-0 text-muted-foreground">
        <div className="flex items-center gap-1.5 text-sm font-semibold capitalize">
          <CalendarDays className="w-4 h-4 lg:hidden" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
          <Clock className="w-4 h-4 text-primary" />
          {match.match_time}
        </div>
        {isFriendly && (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-[9px] uppercase font-black tracking-wider gap-1">
            <Star className="w-2.5 h-2.5" /> Amistoso
          </Badge>
        )}
        <div className="ml-auto lg:hidden">{statusBadge()}</div>
      </div>

      {/* Equipos + marcador real */}
      <div className="flex items-center justify-between w-full lg:flex-1 gap-4 bg-muted/30 p-3 rounded-lg lg:bg-transparent lg:p-0">
        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="font-bold text-sm sm:text-base text-right leading-tight">{match.home_team}</span>
          {renderFlag(flags.home_flag_url, match.home_team)}
        </div>
        <div className="flex flex-col items-center px-2 shrink-0 min-w-[80px]">
          {match.status === 'completed' ? (
            <>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Resultado</span>
              <div className="bg-foreground text-background font-black px-3 py-1 rounded-md text-lg tracking-widest">
                {match.home_score} - {match.away_score}
              </div>
            </>
          ) : (
            <span className="text-xs font-black text-muted-foreground/50 uppercase tracking-widest">VS</span>
          )}
        </div>
        <div className="flex items-center gap-3 flex-1 justify-start">
          {renderFlag(flags.away_flag_url, match.away_team)}
          <span className="font-bold text-sm sm:text-base text-left leading-tight">{match.away_team}</span>
        </div>
      </div>

      {/* Estadio */}
      <div className="hidden lg:flex flex-col items-center justify-center w-40 shrink-0 gap-2">
        {statusBadge()}
        {match.stadium_name && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground text-center">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate max-w-[120px]">{match.stadium_name}</span>
          </div>
        )}
      </div>

      {/* Inputs de predicci\u00f3n */}
      <div className="flex flex-col items-end gap-2 w-full lg:w-auto shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Local</span>
            <Input
              type="number" min="0" max="50"
              value={home}
              disabled={isLocked || saving}
              onChange={(e) => setHome(e.target.value)}
              className="w-16 h-12 text-center text-2xl font-black"
            />
          </div>
          <span className="text-2xl font-black text-muted-foreground mt-5">-</span>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Visit.</span>
            <Input
              type="number" min="0" max="50"
              value={away}
              disabled={isLocked || saving}
              onChange={(e) => setAway(e.target.value)}
              className="w-16 h-12 text-center text-2xl font-black"
            />
          </div>

          {hasPrediction ? (
            <div className="flex flex-col items-center justify-center w-24 h-12 ml-1 rounded-md bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Guardado</span>
            </div>
          ) : isLocked ? (
            <div className="flex flex-col items-center justify-center w-24 h-12 ml-1 rounded-md bg-muted text-muted-foreground">
              <Lock className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Cerrado</span>
            </div>
          ) : (
            <Button
              onClick={handleSave}
              disabled={saving || home === '' || away === ''}
              className={`ml-1 h-12 font-bold gap-1 ${isFriendly ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}`}
            >
              <Save className="w-4 h-4" />
              {saving ? '...' : 'Guardar'}
            </Button>
          )}
        </div>

        {/* Aviso de pron\u00f3stico fijo */}
        {hasPrediction && !isEvaluated && (
          <p className="text-[10px] text-muted-foreground italic flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" />
            Pron&oacute;stico guardado &middot; no editable
          </p>
        )}

        {/* Puntos si ya fue evaluado */}
        {isEvaluated && (
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 className={`w-4 h-4 ${prediction.points_awarded > 0 ? (isFriendly ? 'text-amber-600' : 'text-emerald-600') : 'text-muted-foreground'}`} />
            <span className="font-bold">
              {prediction.points_awarded > 0
                ? `+${prediction.points_awarded} ${isFriendly ? 'pts (no oficial)' : 'puntos'}`
                : 'Sin aciertos'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionRow;
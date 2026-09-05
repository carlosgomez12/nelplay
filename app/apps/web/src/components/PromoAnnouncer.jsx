import React, { useState, useEffect, useRef, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Mic, X, Volume2, VolumeX, Sparkles, Loader2 } from 'lucide-react';

const STORAGE_KEY = 'nelplay_cuchito_seen_v1';
const AVATAR_SRC  = '/cuchito.jpg';
const VOICE_ID    = 'aLA88pewYI8sJzecjzX0'; // Andr\u00e9s Jaramillo

/* ────────────────────────────────────────────────────────────
   Convierte n\u00fameros enteros (hasta 999.999) a palabras en espa\u00f1ol.
   ──────────────────────────────────────────────────────────── */
const numberToSpanishWords = (n) => {
  n = Math.floor(Math.abs(Number(n) || 0));
  if (n === 0) return 'cero';
  const units = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince',
                 'diecis\u00e9is', 'diecisiete', 'dieciocho', 'diecinueve'];
  const tens  = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
                 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const hund  = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos',
                 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
  if (n < 10)  return units[n];
  if (n < 20)  return teens[n - 10];
  if (n < 30)  {
    if (n === 20) return 'veinte';
    if (n === 21) return 'veintiuno';
    return 'veinti' + units[n % 10];
  }
  if (n < 100) {
    if (n % 10 === 0) return tens[Math.floor(n / 10)];
    return tens[Math.floor(n / 10)] + ' y ' + units[n % 10];
  }
  if (n === 100) return 'cien';
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const rest = n % 100;
    return rest === 0 ? hund[h] : hund[h] + ' ' + numberToSpanishWords(rest);
  }
  if (n < 1000000) {
    const thousands = Math.floor(n / 1000);
    const rest = n % 1000;
    const prefix = thousands === 1 ? 'mil' : numberToSpanishWords(thousands) + ' mil';
    return rest === 0 ? prefix : prefix + ' ' + numberToSpanishWords(rest);
  }
  return n.toString();
};


const PromoAnnouncer = () => {
  const { isAuthenticated } = useAuth();
  const [visible, setVisible]     = useState(false);
  const [expanded, setExpanded]   = useState(false);
  const [speaking, setSpeaking]   = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [script, setScript]       = useState('');
  const [imgError, setImgError]   = useState(false);
  const [supported, setSupported] = useState(true);
  const [audioMode, setAudioMode] = useState(null); // 'elevenlabs' | 'browser' | null

  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  // Decidir si mostrar al cargar
  useEffect(() => {
    const wasSeen = localStorage.getItem(STORAGE_KEY);
    if (!wasSeen) {
      const t = setTimeout(() => {
        setVisible(true);
        setExpanded(true);
      }, 1500);
      return () => clearTimeout(t);
    }
    setVisible(true);
  }, []);

  // Cargar configuraci\u00f3n y construir script
  useEffect(() => {
    const buildScript = async () => {
      try {
        const [settingsRes, usersRes] = await Promise.all([
          pb.collection('payment_settings').getList(1, 1, {
            filter: 'is_active = true',
            requestKey: null
          }),
          pb.collection('users').getList(1, 1, {
            filter: pb.filter('inscription_status = {:s}', { s: 'approved' }),
            fields: 'id',
            requestKey: null
          })
        ]);

        const settings = settingsRes.items[0];
        const players  = usersRes.totalItems || 0;
        const amount   = settings?.inscription_amount  || 30000;
        const first    = settings?.prize_first_pct     || 60;
        const second   = settings?.prize_second_pct    || 20;
        const third    = settings?.prize_third_pct     || 10;

        const amountWords  = numberToSpanishWords(amount);
        const firstWords   = numberToSpanishWords(first);
        const secondWords  = numberToSpanishWords(second);
        const thirdWords   = numberToSpanishWords(third);
        const playersWords = players > 0 ? numberToSpanishWords(players) : '';

        const text =
          '\u00a1Hola parcero! Soy Cuchito Futbolero, el comentarista oficial de Nel Play. ' +
          'La gran polla del Mundial dos mil veintis\u00e9is ya est\u00e1 abierta. ' +
          'Por solo ' + amountWords + ' pesos colombianos, ' +
          'pron\u00f3stica el marcador exacto de cada partido y compite por el bote acumulado. ' +
          'El primer lugar se lleva el ' + firstWords + ' por ciento del bote. ' +
          'El segundo el ' + secondWords + ' por ciento. ' +
          'Y el tercero el ' + thirdWords + ' por ciento. ' +
          (players > 0
            ? 'Ya somos ' + playersWords + (players === 1 ? ' jugador inscrito. ' : ' jugadores inscritos. ')
            : '\u00a1S\u00e9 el primero en inscribirte! ') +
          'Mientras m\u00e1s jugadores se unan, m\u00e1s grande es el premio. ' +
          '\u00a1Reg\u00edstrate ya y demuestra que t\u00fa sabes m\u00e1s de f\u00fatbol!';

        setScript(text);
      } catch (err) {
        setScript(
          '\u00a1Hola parcero! Soy Cuchito Futbolero, el comentarista oficial de Nel Play. ' +
          'La gran polla del Mundial dos mil veintis\u00e9is ya est\u00e1 abierta. ' +
          'Por solo treinta mil pesos colombianos, pron\u00f3stica el marcador de cada partido ' +
          'y compite por el bote acumulado. \u00a1Reg\u00edstrate ya!'
        );
      }
    };
    buildScript();
  }, []);

  // Limpiar al desmontar
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /* ─────────────────────────────────────────────────────────
     Reproducci\u00f3n con ElevenLabs (via backend)
     ───────────────────────────────────────────────────────── */
  const playWithElevenLabs = async () => {
    if (!isAuthenticated) {
      return false; // Solo autenticados
    }

    setLoadingAudio(true);
    try {
      const token = pb.authStore.token;
      const baseUrl = pb.baseUrl || '';

      const res = await fetch(`${baseUrl}/api/tts/speak`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          text: script,
          voice_id: VOICE_ID
        })
      });

      if (!res.ok) {
        console.warn('[Cuchito] backend TTS no disponible, usando fallback');
        return false;
      }

      const data = await res.json();
      if (!data.url) {
        return false;
      }

      // Construir URL completa del audio
      const audioUrl = data.url.startsWith('http')
        ? data.url
        : `${baseUrl}${data.url}`;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onplay  = () => { setSpeaking(true); setLoadingAudio(false); };
      audio.onended = () => { setSpeaking(false); audioRef.current = null; };
      audio.onerror = () => {
        setSpeaking(false);
        setLoadingAudio(false);
        audioRef.current = null;
      };

      await audio.play();
      setAudioMode('elevenlabs');
      return true;
    } catch (err) {
      console.warn('[Cuchito] error con ElevenLabs:', err?.message);
      setLoadingAudio(false);
      return false;
    }
  };

  /* ─────────────────────────────────────────────────────────
     Reproducci\u00f3n con Web Speech API (fallback)
     ───────────────────────────────────────────────────────── */
  const playWithBrowser = () => {
    if (!supported) return;

    const getSpanishVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return null;
      return voices.find(v => v.lang === 'es-CO')
          || voices.find(v => v.lang === 'es-MX')
          || voices.find(v => v.lang === 'es-US')
          || voices.find(v => v.lang === 'es-419')
          || voices.find(v => v.lang === 'es-ES')
          || voices.find(v => v.lang.startsWith('es'))
          || voices[0];
    };

    const startSpeaking = () => {
      const u = new SpeechSynthesisUtterance(script);
      const voice = getSpanishVoice();
      if (voice) u.voice = voice;
      u.lang = 'es-CO';
      u.rate = 1.0;
      u.pitch = 1.05;
      u.volume = 1.0;
      u.onstart = () => setSpeaking(true);
      u.onend   = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      utteranceRef.current = u;
      window.speechSynthesis.speak(u);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        startSpeaking();
        window.speechSynthesis.onvoiceschanged = null;
      };
      window.speechSynthesis.getVoices();
      setTimeout(() => { if (!speaking) startSpeaking(); }, 500);
    } else {
      startSpeaking();
    }
    setAudioMode('browser');
  };

  /* ─────────────────────────────────────────────────────────
     Handler principal: prueba ElevenLabs, cae a navegador
     ───────────────────────────────────────────────────────── */
  const handleSpeak = async () => {
    if (!script) return;

    // Si ya est\u00e1 hablando, detener
    if (speaking || loadingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setSpeaking(false);
      setLoadingAudio(false);
      return;
    }

    setExpanded(true);
    localStorage.setItem(STORAGE_KEY, '1');

    // 1. Intentar ElevenLabs si est\u00e1 autenticado
    if (isAuthenticated) {
      const ok = await playWithElevenLabs();
      if (ok) return;
    }

    // 2. Fallback: Web Speech API del navegador
    playWithBrowser();
  };

  const handleClose = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
    setLoadingAudio(false);
    setExpanded(false);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  const handleMinimize = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
    setLoadingAudio(false);
    setExpanded(false);
  };

  if (!visible) return null;

  /* ───── Versi\u00f3n minimizada ───── */
  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Abrir mensaje de Cuchito Futbolero"
      >
        <style>{`
          @keyframes cuchito-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        `}</style>
        <div className="relative" style={{ animation: 'cuchito-float 3s ease-in-out infinite' }}>
          <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity animate-pulse" />
          <div className="relative bg-gradient-to-br from-primary to-secondary p-1 rounded-full shadow-2xl ring-4 ring-white dark:ring-background hover:scale-110 transition-transform">
            <CuchitoAvatar size={56} speaking={false} imgError={imgError} setImgError={setImgError} />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
      </button>
    );
  }

  /* ───── Versi\u00f3n expandida ───── */
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="relative bg-card border-2 border-primary/20 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header con Cuchito */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
          <div className="relative shrink-0">
            <div className={`absolute inset-0 bg-primary rounded-full blur-md ${speaking ? 'opacity-60 animate-pulse' : 'opacity-20'}`} />
            <div className="relative">
              <CuchitoAvatar size={56} speaking={speaking} imgError={imgError} setImgError={setImgError} />
            </div>
            {speaking && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-0.5 bg-card border rounded-full px-1.5 py-1 shadow-md">
                <span className="w-0.5 bg-success rounded-full sw-bar" style={{ height: '6px',  animationDelay: '0ms'   }} />
                <span className="w-0.5 bg-success rounded-full sw-bar" style={{ height: '10px', animationDelay: '120ms' }} />
                <span className="w-0.5 bg-success rounded-full sw-bar" style={{ height: '8px',  animationDelay: '240ms' }} />
                <span className="w-0.5 bg-success rounded-full sw-bar" style={{ height: '12px', animationDelay: '360ms' }} />
                <span className="w-0.5 bg-success rounded-full sw-bar" style={{ height: '7px',  animationDelay: '480ms' }} />
              </div>
            )}
            <style>{`
              @keyframes sw-bounce { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
              .sw-bar { animation: sw-bounce 0.6s ease-in-out infinite; transform-origin: bottom; display: inline-block; }
            `}</style>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-black text-sm leading-tight">Cuchito Futbolero</p>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Mic className="w-2.5 h-2.5" />
              Comentarista oficial &middot; NelPlay
            </p>
          </div>

          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground rounded-full p-1 hover:bg-muted transition-colors shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Globo de di\u00e1logo */}
        <div className="p-4 max-h-64 overflow-y-auto">
          <p className="text-sm leading-relaxed text-foreground/90">
            {script}
          </p>
          {!isAuthenticated && (
            <p className="mt-3 text-[11px] text-muted-foreground italic">
              \u2728 <strong>Reg\u00edstrate</strong> para escuchar a Cuchito con voz humana en alta calidad.
            </p>
          )}
        </div>

        {/* Acciones */}
        <div className="p-3 border-t bg-muted/30 flex items-center justify-between gap-2">
          <button
            onClick={handleSpeak}
            disabled={loadingAudio}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              speaking
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : loadingAudio
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
            }`}
          >
            {loadingAudio ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Cargando voz...</>
            ) : speaking ? (
              <><VolumeX className="w-4 h-4" /> Silenciar</>
            ) : (
              <><Volume2 className="w-4 h-4" /> Escuchar a Cuchito</>
            )}
          </button>
          <button
            onClick={handleMinimize}
            className="text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            Minimizar
          </button>
        </div>
      </div>
    </div>
  );
};


/**
 * Avatar de Cuchito Futbolero.
 */
const CuchitoAvatar = ({ size = 48, speaking = false, imgError, setImgError }) => {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    animation: speaking ? 'cuchito-bob 0.5s ease-in-out infinite alternate' : 'none'
  };

  return (
    <div style={style} className="ring-2 ring-amber-400/40 shadow-md">
      <style>{`
        @keyframes cuchito-bob {
          0%   { transform: translateY(0)   scale(1); }
          100% { transform: translateY(-2px) scale(1.03); }
        }
      `}</style>
      {!imgError ? (
        <img
          src={AVATAR_SRC}
          alt="Cuchito Futbolero"
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 15%'
          }}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #f59e0b, #b45309)',
          color: 'white', fontWeight: 900, fontSize: size * 0.4
        }}>
          CF
        </div>
      )}
    </div>
  );
};

export default PromoAnnouncer;
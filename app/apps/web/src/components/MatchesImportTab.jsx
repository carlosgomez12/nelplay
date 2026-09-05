import React, { useState, useRef, useMemo } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2, Eye, Download, Loader2, Flag } from 'lucide-react';
import { toast } from 'sonner';

// Banderas emoji por pa\u00eds (48 selecciones del Mundial 2026)
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

const getFlag = (team) => FLAGS[team?.trim()] || '\u26BD';

// ────────────────────────────────────────────────────────────────────
// Conversi\u00f3n fecha espa\u00f1ol -> ISO
// ────────────────────────────────────────────────────────────────────
const MESES_ES = {
  'enero':'01','febrero':'02','marzo':'03','abril':'04','mayo':'05','junio':'06',
  'julio':'07','agosto':'08','septiembre':'09','octubre':'10','noviembre':'11','diciembre':'12'
};

const parseFechaEspanol = (str) => {
  if (!str) return '';
  const s = String(str).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const partes = s.split(/\s+/);
  const idx = partes.findIndex(p => /^\d{1,2}$/.test(p));
  if (idx === -1 || partes.length < idx + 3) return s;
  const dia = partes[idx].padStart(2, '0');
  const mes = MESES_ES[partes[idx + 1].toLowerCase()] || '00';
  const ano = partes[idx + 2];
  if (mes === '00' || !/^\d{4}$/.test(ano)) return s;
  return `${ano}-${mes}-${dia}`;
};

// ────────────────────────────────────────────────────────────────────
// Parsers
// ────────────────────────────────────────────────────────────────────
const parseCSV = (text) => {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const firstLine = lines[0];
  const sep = firstLine.includes(';') && !firstLine.includes(',') ? ';' : ',';

  const parseLine = (line) => {
    const out = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === sep && !inQuotes) { out.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    out.push(cur.trim());
    return out;
  };

  const headers = parseLine(lines[0]).map(h => h.toLowerCase().trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = values[idx] || ''; });
    rows.push(obj);
  }
  return rows;
};

const parseJSON = (text) => {
  const clean = text.replace(/^\uFEFF/, '').trim();
  let data;
  try { data = JSON.parse(clean); }
  catch (e) { throw new Error('JSON inv\u00e1lido: ' + e.message); }
  if (!Array.isArray(data)) {
    throw new Error('El JSON debe ser un array de partidos');
  }

  return data.map(item => {
    const obj = {};
    Object.keys(item).forEach(key => {
      const k = key.toLowerCase().trim();
      const value = item[key];
      if (['fecha', 'date', 'match_date'].includes(k))    obj.fecha = value;
      else if (['hora', 'time', 'match_time'].includes(k)) obj.hora = value;
      else if (['fase', 'grupo', 'stage', 'group'].includes(k)) obj.fase = value;
      else if (['equipo_local', 'equipo 1', 'equipo1', 'local', 'home', 'home_team'].includes(k)) obj.equipo_local = value;
      else if (['equipo_visitante', 'equipo 2', 'equipo2', 'visitante', 'away', 'away_team'].includes(k)) obj.equipo_visitante = value;
      else if (['estadio', 'stadium', 'stadium_name'].includes(k)) obj.estadio = value;
      else if (['ciudad', 'city'].includes(k)) obj.ciudad = value;
      else obj[k] = value;
    });
    return obj;
  });
};

const parseContent = (text) => {
  const trimmed = text.trim().replace(/^\uFEFF/, '');
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    return { rows: parseJSON(trimmed), format: 'JSON' };
  }
  return { rows: parseCSV(trimmed), format: 'CSV' };
};

const validateRow = (row, idx) => {
  const errors = [];
  if (!row.fecha) errors.push('falta fecha');
  if (!row.hora)  errors.push('falta hora');
  if (!row.fase && !row.grupo) errors.push('falta fase/grupo');
  if (!row.equipo_local)     errors.push('falta equipo local');
  if (!row.equipo_visitante) errors.push('falta equipo visitante');

  if (row.fecha) {
    const normalized = parseFechaEspanol(row.fecha);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
      errors.push(`fecha no se pudo interpretar: "${row.fecha}"`);
    } else {
      row.fecha = normalized;
    }
  }
  if (row.hora && !/^\d{1,2}:\d{2}$/.test(String(row.hora).trim())) {
    errors.push('formato de hora inv\u00e1lido (use HH:MM)');
  }
  return { rowNum: idx + 2, errors };
};

// ════════════════════════════════════════════════════════════════════
const MatchesImportTab = ({ onImported }) => {
  const [text, setText]         = useState('');
  const [preview, setPreview]   = useState(null);
  const [importing, setImporting] = useState(false);
  const [replaceMode, setReplaceMode] = useState(true);
  const [detectedFormat, setDetectedFormat] = useState('');
  const [assigningFlags, setAssigningFlags] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setText(ev.target.result);
    reader.readAsText(file, 'utf-8');
  };

  const handlePreview = () => {
    if (!text.trim()) { toast.error('Pega el contenido o sube un archivo'); return; }
    let rows, format;
    try {
      const result = parseContent(text);
      rows = result.rows;
      format = result.format;
    } catch (err) {
      toast.error(err.message); return;
    }
    if (rows.length === 0) { toast.error('El archivo no contiene filas v\u00e1lidas'); return; }
    const validations = rows.map((r, i) => validateRow(r, i));
    const withErrors  = validations.filter(v => v.errors.length > 0);
    setDetectedFormat(format);
    setPreview({ rows, total: rows.length, errors: withErrors, valid: rows.length - withErrors.length });
  };

  const handleImport = async () => {
    if (!preview || preview.errors.length > 0) {
      toast.error('Hay errores. Corr\u00edgelos antes de importar.'); return;
    }
    setImporting(true);
    let created = 0, failed = 0;
    try {
      if (replaceMode) {
        try {
          const existing = await pb.collection('matches').getFullList({ batch: 200, requestKey: null });
          for (const m of existing) await pb.collection('matches').delete(m.id);
          toast.info(`${existing.length} partidos existentes eliminados`);
        } catch (err) { /* continuar */ }
      }

      let useStringFmt = false;
      for (const row of preview.rows) {
        try {
          const homeTeam = String(row.equipo_local).trim();
          const awayTeam = String(row.equipo_visitante).trim();
          const stage    = String(row.fase || row.grupo || '').trim();
          const flagsObj = {
            home_flag_url: getFlag(homeTeam),
            away_flag_url: getFlag(awayTeam)
          };

          const baseData = {
            home_team:     homeTeam,
            away_team:     awayTeam,
            match_date:    String(row.fecha).trim(),
            match_time:    String(row.hora).trim().padStart(5, '0'),
            stage:         stage,
            stadium_name:  String(row.estadio || '').trim(),
            city:          String(row.ciudad  || '').trim(),
            status:        'upcoming',
            home_score:    null,
            away_score:    null
          };

          try {
            await pb.collection('matches').create({
              ...baseData,
              team_flags: useStringFmt ? JSON.stringify(flagsObj) : flagsObj
            });
            created++;
          } catch (e1) {
            // Si falla con team_flags como objeto, reintentar como string
            if (!useStringFmt && e1?.status === 400) {
              useStringFmt = true;
              try {
                await pb.collection('matches').create({
                  ...baseData,
                  team_flags: JSON.stringify(flagsObj)
                });
                created++;
              } catch (e2) {
                // Reintentar SIN team_flags (por si el campo no existe)
                try {
                  await pb.collection('matches').create(baseData);
                  created++;
                } catch (e3) {
                  console.error('Error creando partido:', row, e3);
                  failed++;
                }
              }
            } else {
              console.error('Error creando partido:', row, e1);
              failed++;
            }
          }
        } catch (err) {
          console.error('Error procesando fila:', row, err);
          failed++;
        }
      }

      if (failed === 0) toast.success(`\u00a1${created} partidos importados con \u00e9xito!`);
      else toast.warning(`Se importaron ${created}. Fallaron ${failed}.`);

      setPreview(null); setText(''); setDetectedFormat('');
      onImported?.();
    } catch (err) {
      toast.error('Error general: ' + (err.message || err));
    } finally {
      setImporting(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────
  // Asignar banderas a partidos que ya existen pero no las tienen
  // ──────────────────────────────────────────────────────────────────
  const handleAssignFlags = async () => {
    setAssigningFlags(true);
    let updated = 0, skipped = 0, failed = 0;
    let useStringFormat = false; // se setea a true si PocketBase rechaza el objeto
    try {
      const all = await pb.collection('matches').getFullList({ batch: 200, requestKey: null });
      if (all.length === 0) {
        toast.info('No hay partidos en la base de datos.');
        setAssigningFlags(false);
        return;
      }
      for (const m of all) {
        try {
          const newFlags = {
            home_flag_url: getFlag(m.home_team),
            away_flag_url: getFlag(m.away_team)
          };
          // Verificar si las banderas actuales ya son las correctas
          let currentFlags = {};
          try {
            currentFlags = typeof m.team_flags === 'string'
              ? JSON.parse(m.team_flags) : (m.team_flags || {});
          } catch { /* ignore */ }
          if (currentFlags.home_flag_url === newFlags.home_flag_url &&
              currentFlags.away_flag_url === newFlags.away_flag_url) {
            skipped++;
            continue;
          }

          // Intentar enviar como objeto (campo tipo JSON nativo).
          // Si falla con 400, reintentamos como string (campo tipo text).
          try {
            await pb.collection('matches').update(m.id, {
              team_flags: useStringFormat ? JSON.stringify(newFlags) : newFlags
            });
            updated++;
          } catch (e1) {
            if (!useStringFormat && e1?.status === 400) {
              // Cambiar formato y reintentar este registro
              useStringFormat = true;
              try {
                await pb.collection('matches').update(m.id, {
                  team_flags: JSON.stringify(newFlags)
                });
                updated++;
              } catch (e2) {
                console.error('Error actualizando partido (ambos formatos):', m, e2);
                failed++;
              }
            } else {
              console.error('Error actualizando partido:', m, e1);
              failed++;
            }
          }
        } catch (err) {
          console.error('Error procesando partido:', m, err);
          failed++;
        }
      }
      if (updated > 0) {
        toast.success(`\u00a1${updated} partidos actualizados con banderas! (${skipped} ya estaban OK)`);
      } else if (skipped > 0) {
        toast.info(`Todos los ${skipped} partidos ya ten\u00edan las banderas correctas.`);
      }
      if (failed > 0) {
        toast.warning(`${failed} partidos fallaron.`);
      }
      onImported?.();
    } catch (err) {
      toast.error('Error general: ' + (err.message || err));
    } finally {
      setAssigningFlags(false);
    }
  };

  const downloadTemplate = (fmt) => {
    let content, filename;
    if (fmt === 'json') {
      content = JSON.stringify([
        { fecha: '2026-06-11', hora: '14:00', fase: 'Grupo A', equipo_local: 'M\u00e9xico', equipo_visitante: 'Sud\u00e1frica', estadio: 'Estadio Azteca', ciudad: 'Ciudad de M\u00e9xico' },
        { fecha: '2026-06-11', hora: '21:00', fase: 'Grupo A', equipo_local: 'Corea del Sur', equipo_visitante: 'Chequia', estadio: 'Estadio Akron', ciudad: 'Guadalajara' }
      ], null, 2);
      filename = 'plantilla_partidos.json';
    } else {
      content = [
        'fecha,hora,fase,equipo_local,equipo_visitante,estadio,ciudad',
        '2026-06-11,14:00,Grupo A,M\u00e9xico,Sud\u00e1frica,Estadio Azteca,Ciudad de M\u00e9xico',
        '2026-06-11,21:00,Grupo A,Corea del Sur,Chequia,Estadio Akron,Guadalajara'
      ].join('\n');
      filename = 'plantilla_partidos.csv';
    }
    const blob = new Blob(['\uFEFF' + content], { type: fmt === 'json' ? 'application/json;charset=utf-8' : 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const summary = useMemo(() => {
    if (!preview) return null;
    const byStage = {};
    preview.rows.forEach(r => {
      const s = r.fase || r.grupo || 'Sin fase';
      byStage[s] = (byStage[s] || 0) + 1;
    });
    return byStage;
  }, [preview]);

  return (
    <div className="space-y-6">

      {/* ── Card de utilidad: asignar banderas a partidos existentes ── */}
      <Card className="border-amber-300 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
            <Flag className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold mb-1">Asignar banderas a partidos existentes</p>
            <p className="text-xs text-muted-foreground">
              Si los partidos ya cargados no muestran banderas, este bot&oacute;n recorre todos los partidos y les asigna la bandera emoji correspondiente seg&uacute;n el nombre del equipo.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleAssignFlags}
            disabled={assigningFlags}
            className="gap-1 shrink-0 border-amber-400/60 hover:bg-amber-100/50 dark:hover:bg-amber-900/20"
          >
            {assigningFlags ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Actualizando...</>
            ) : (
              <><Flag className="w-4 h-4" /> Asignar banderas</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* ── Card principal: importador ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" /> Importar Calendario de Partidos
          </CardTitle>
          <CardDescription>
            Pega o sube un archivo en formato <strong>CSV</strong> o <strong>JSON</strong>. El sistema detecta autom&aacute;ticamente el tipo y crea los partidos con sus banderas emoji.
          </CardDescription>
        </CardHeader>
        <CardContent>

          <div className="bg-muted/40 rounded-xl p-4 mb-4 text-sm">
            <p className="font-bold mb-2">Formato aceptado</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><strong>CSV</strong> con columnas: <code className="text-xs bg-muted px-1 rounded">fecha, hora, fase, equipo_local, equipo_visitante, estadio, ciudad</code></li>
              <li><strong>JSON</strong> como array de objetos con esas claves (acepta variantes como "Equipo 1", "Equipo 2", "Grupo")</li>
              <li>La fecha puede venir como <code className="text-xs bg-muted px-1 rounded">2026-06-11</code> o como <code className="text-xs bg-muted px-1 rounded">jueves 11 junio 2026</code></li>
            </ul>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="gap-1" onClick={() => downloadTemplate('csv')}>
                <Download className="w-3.5 h-3.5" /> Plantilla CSV
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => downloadTemplate('json')}>
                <Download className="w-3.5 h-3.5" /> Plantilla JSON
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-lg mb-4 bg-amber-50/40 dark:bg-amber-950/10">
            <input type="checkbox" id="replace-mode" checked={replaceMode}
              onChange={(e) => setReplaceMode(e.target.checked)} className="w-4 h-4" />
            <label htmlFor="replace-mode" className="text-sm flex-1 cursor-pointer">
              <span className="font-bold">Reemplazar partidos existentes</span>
              <span className="block text-xs text-muted-foreground">
                {replaceMode
                  ? 'Se borrar\u00e1n todos los partidos actuales antes de importar.'
                  : 'Los partidos del archivo se agregar\u00e1n a los existentes.'}
              </span>
            </label>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input ref={fileInputRef} type="file" accept=".csv,.json,text/csv,application/json" hidden onChange={handleFile} />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-1">
                <FileText className="w-4 h-4" /> Subir archivo CSV o JSON
              </Button>
              <span className="text-xs text-muted-foreground self-center">o pega el contenido abajo</span>
            </div>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Pega aqui CSV o JSON..."
              rows={8}
              className="font-mono text-xs"
            />

            <div className="flex gap-2">
              <Button onClick={handlePreview} variant="outline" className="gap-1">
                <Eye className="w-4 h-4" /> Previsualizar
              </Button>
              {text && (
                <Button onClick={() => { setText(''); setPreview(null); setDetectedFormat(''); }} variant="ghost" className="gap-1 text-muted-foreground">
                  <Trash2 className="w-4 h-4" /> Limpiar
                </Button>
              )}
            </div>
          </div>

          {preview && (
            <div className="mt-6 space-y-4">

              {detectedFormat && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary">Formato detectado: {detectedFormat}</Badge>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card border rounded-lg p-3 text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Total</p>
                  <p className="text-2xl font-black">{preview.total}</p>
                </div>
                <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
                  <p className="text-xs uppercase tracking-wider text-success">V&aacute;lidas</p>
                  <p className="text-2xl font-black text-success">{preview.valid}</p>
                </div>
                <div className={`border rounded-lg p-3 text-center ${preview.errors.length > 0 ? 'bg-destructive/10 border-destructive/20' : 'bg-card'}`}>
                  <p className={`text-xs uppercase tracking-wider ${preview.errors.length > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>Con errores</p>
                  <p className={`text-2xl font-black ${preview.errors.length > 0 ? 'text-destructive' : ''}`}>{preview.errors.length}</p>
                </div>
              </div>

              {preview.errors.length > 0 && (
                <Card className="border-destructive/40">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <p className="font-bold text-destructive">Errores encontrados</p>
                    </div>
                    <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
                      {preview.errors.slice(0, 20).map((err, i) => (
                        <li key={i}><strong>Fila {err.rowNum}:</strong> {err.errors.join(', ')}</li>
                      ))}
                      {preview.errors.length > 20 && (
                        <li className="text-muted-foreground italic">...y {preview.errors.length - 20} errores m&aacute;s.</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {summary && (
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(summary).map(([stage, count]) => (
                    <Badge key={stage} variant="outline" className="text-xs">{stage}: {count}</Badge>
                  ))}
                </div>
              )}

              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-80 overflow-y-auto">
                  <Table>
                    <TableHeader className="bg-muted sticky top-0">
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Fase</TableHead>
                        <TableHead>Partido</TableHead>
                        <TableHead>Estadio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preview.rows.slice(0, 50).map((row, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-xs">{row.fecha}</TableCell>
                          <TableCell className="text-xs font-mono">{row.hora}</TableCell>
                          <TableCell className="text-xs">{row.fase || row.grupo}</TableCell>
                          <TableCell className="text-xs">
                            <span className="font-medium">{getFlag(row.equipo_local)} {row.equipo_local}</span>
                            <span className="text-muted-foreground mx-1">vs</span>
                            <span className="font-medium">{getFlag(row.equipo_visitante)} {row.equipo_visitante}</span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{row.estadio || '\u2014'}</TableCell>
                        </TableRow>
                      ))}
                      {preview.rows.length > 50 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-xs text-muted-foreground italic">
                            ...y {preview.rows.length - 50} partidos m&aacute;s.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={handleImport} disabled={importing || preview.errors.length > 0} className="gap-1" size="lg">
                  {importing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Importando...</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Confirmar e importar {preview.valid} partidos</>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchesImportTab;
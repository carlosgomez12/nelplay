import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog.jsx';
import {
  Shield, Plus, Users, TrendingUp, Save, Loader2, CheckCircle2, XCircle,
  Clock, Eye, Upload, Trophy, Settings, FileText, DollarSign, Target
} from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MatchesImportTab from '@/components/MatchesImportTab.jsx';

// Parsea "YYYY-MM-DD" como FECHA LOCAL (no UTC).
const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const s = String(dateStr).trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    return new Date(
      parseInt(m[1], 10),
      parseInt(m[2], 10) - 1,
      parseInt(m[3], 10),
      12, 0, 0
    );
  }
  return new Date(s);
};

// Helper compatible con SDK viejo y nuevo de PocketBase
const getFileURL = (record, fileName) => {
  if (!record || !fileName) return '';
  if (pb.files && typeof pb.files.getURL === 'function') {
    return pb.files.getURL(record, fileName);
  }
  if (pb.files && typeof pb.files.getUrl === 'function') {
    return pb.files.getUrl(record, fileName);
  }
  return '';
};

const KNOCKOUT_STAGES = ['Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'];

const AdminDashboard = () => {
  const [matches, setMatches]     = useState([]);
  const [users, setUsers]         = useState([]);
  const [predictions, setPreds]   = useState([]);
  const [paymentSettings, setPaymentSettings] = useState(null);
  const [scoringRules, setScoringRules]       = useState(null);
  const [contactInfo, setContactInfo]         = useState(null);
  const [loadingAll, setLoadingAll] = useState(true);

  const [showAddMatch, setShowAddMatch] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultMatch, setResultMatch] = useState(null);
  const [resultScores, setResultScores] = useState({ home: 0, away: 0 });
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [proofUser, setProofUser] = useState(null);

  const fetchAll = useCallback(async () => {
    const [matchesRes, usersRes, predsRes, settingsRes, rulesRes, contactRes] = await Promise.all([
      pb.collection('matches').getList(1, 200, { sort: 'match_date,match_time', requestKey: null }),
      pb.collection('users').getList(1, 500, { sort: '-total_points', requestKey: null }),
      pb.collection('predictions').getList(1, 500, { sort: '-created', requestKey: null }),
      pb.collection('payment_settings').getList(1, 1, { requestKey: null }),
      pb.collection('scoring_rules').getList(1, 1, { requestKey: null }),
      pb.collection('contact_info').getList(1, 1, { requestKey: null })
    ]);

    setMatches(matchesRes.items);
    setUsers(usersRes.items);
    setPreds(predsRes.items);
    setPaymentSettings(settingsRes.items[0] || null);
    setScoringRules(rulesRes.items[0] || null);
    setContactInfo(contactRes.items[0] || null);
    setLoadingAll(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const pendingInscriptions = users.filter(u => u.inscription_status === 'submitted');
  const approvedUsers       = users.filter(u => u.inscription_status === 'approved');
  const rejectedUsers       = users.filter(u => u.inscription_status === 'rejected');
  const totalRevenue        = approvedUsers.length * (paymentSettings?.inscription_amount || 30000);

  if (loadingAll) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panel de Administraci&oacute;n - NelPlay</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-8 flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">Panel de Administraci&oacute;n</h1>
                <p className="text-muted-foreground">Gestiona inscripciones, partidos y configuraci&oacute;n.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <Users className="w-4 h-4" /> Jugadores activos
                  </div>
                  <p className="text-3xl font-black">{approvedUsers.length}</p>
                </CardContent>
              </Card>
              <Card className={pendingInscriptions.length > 0 ? 'border-amber-500/40 bg-amber-50/40 dark:bg-amber-950/10' : ''}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <Clock className="w-4 h-4" /> Inscripciones pendientes
                  </div>
                  <p className={`text-3xl font-black ${pendingInscriptions.length > 0 ? 'text-amber-600' : ''}`}>
                    {pendingInscriptions.length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <Target className="w-4 h-4" /> Pron&oacute;sticos totales
                  </div>
                  <p className="text-3xl font-black">{predictions.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <DollarSign className="w-4 h-4" /> Recaudado
                  </div>
                  <p className="text-3xl font-black text-emerald-600">
                    ${totalRevenue.toLocaleString('es-CO')}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="inscriptions" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-6">
                <TabsTrigger value="inscriptions" className="relative">
                  Inscripciones
                  {pendingInscriptions.length > 0 && (
                    <span className="ml-2 bg-amber-500 text-white text-[10px] font-bold rounded-full w-5 h-5 inline-flex items-center justify-center">
                      {pendingInscriptions.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="matches">Partidos</TabsTrigger>
                <TabsTrigger value="import">Importar</TabsTrigger>
                <TabsTrigger value="users">Usuarios</TabsTrigger>
                <TabsTrigger value="settings">Configuraci&oacute;n</TabsTrigger>
                <TabsTrigger value="contact">Contacto</TabsTrigger>
              </TabsList>

              <TabsContent value="inscriptions">
                <InscriptionsTab
                  pending={pendingInscriptions}
                  approved={approvedUsers}
                  rejected={rejectedUsers}
                  onView={(u) => { setProofUser(u); setShowProofDialog(true); }}
                  onRefresh={fetchAll}
                />
              </TabsContent>

              <TabsContent value="matches">
                <MatchesTab
                  matches={matches}
                  onAdd={() => setShowAddMatch(true)}
                  onSetResult={(m) => {
                    setResultMatch(m);
                    setResultScores({ home: m.home_score ?? 0, away: m.away_score ?? 0 });
                    setShowResultDialog(true);
                  }}
                />
              </TabsContent>

              <TabsContent value="import">
                <MatchesImportTab onImported={fetchAll} />
              </TabsContent>

              <TabsContent value="users">
                <UsersTab users={users} />
              </TabsContent>

              <TabsContent value="settings">
                <SettingsTab
                  paymentSettings={paymentSettings}
                  scoringRules={scoringRules}
                  onRefresh={fetchAll}
                />
              </TabsContent>

              <TabsContent value="contact">
                <ContactTab contact={contactInfo} onRefresh={fetchAll} />
              </TabsContent>

            </Tabs>
          </div>
        </main>

        <Footer />
      </div>

      <AddMatchDialog open={showAddMatch} onOpenChange={setShowAddMatch} onSaved={fetchAll} />
      <SetResultDialog
        open={showResultDialog}
        onOpenChange={setShowResultDialog}
        match={resultMatch}
        scores={resultScores}
        setScores={setResultScores}
        onSaved={fetchAll}
      />
      <PaymentProofDialog
        open={showProofDialog}
        onOpenChange={setShowProofDialog}
        user={proofUser}
        onAction={() => { fetchAll(); setShowProofDialog(false); }}
      />
    </>
  );
};

/* TAB: INSCRIPCIONES */
const InscriptionsTab = ({ pending, approved, rejected, onView, onRefresh }) => {
  const quickApprove = async (userId) => {
    await pb.collection('users').update(userId, {
      inscription_status: 'approved',
      inscription_paid_at: new Date().toISOString()
    }, { requestKey: null });
    toast.success('Inscripci\u00f3n aprobada');
    onRefresh();
  };

  const quickReject = async (userId) => {
    await pb.collection('users').update(userId, {
      inscription_status: 'rejected'
    }, { requestKey: null });
    toast.warning('Inscripci\u00f3n rechazada');
    onRefresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gesti&oacute;n de Inscripciones</CardTitle>
        <CardDescription>
          Revisa los comprobantes de pago enviados por los usuarios y aprueba o rechaza cada inscripci&oacute;n.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pendientes ({pending.length})</TabsTrigger>
            <TabsTrigger value="approved">Aprobadas ({approved.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rechazadas ({rejected.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            {pending.length === 0 ? (
              <EmptyState
                icon={<CheckCircle2 className="w-12 h-12 text-emerald-500/40" />}
                title="&iexcl;Est&aacute;s al d&iacute;a!"
                description="No hay inscripciones pendientes por revisar."
              />
            ) : (
              <UsersInscriptionTable
                users={pending}
                onView={onView}
                onApprove={quickApprove}
                onReject={quickReject}
                showActions
              />
            )}
          </TabsContent>

          <TabsContent value="approved" className="mt-4">
            <UsersInscriptionTable users={approved} onView={onView} />
          </TabsContent>

          <TabsContent value="rejected" className="mt-4">
            <UsersInscriptionTable
              users={rejected}
              onView={onView}
              onApprove={quickApprove}
              showActions
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

/* TABLA: INSCRIPCIONES (con botones Ver/Aprobar/Rechazar) */
const UsersInscriptionTable = ({ users, onView, onApprove, onReject, showActions }) => {
  if (users.length === 0) {
    return <p className="text-sm text-muted-foreground py-6 text-center">Sin registros.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Referencia</TableHead>
            <TableHead>Enviado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(u => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.name || '\u2014'}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{u.email || '\u2014'}</TableCell>
              <TableCell className="font-mono text-xs">{u.payment_reference || '\u2014'}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {u.updated ? format(parseISO(u.updated), "dd MMM HH:mm", { locale: es }) : '\u2014'}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2 flex-wrap">
                  {u.payment_proof && (
                    <Button size="sm" variant="outline" onClick={() => onView(u)} className="gap-1">
                      <Eye className="w-3.5 h-3.5" /> Ver
                    </Button>
                  )}
                  {showActions && onApprove && (
                    <Button
                      size="sm"
                      onClick={() => onApprove(u.id)}
                      className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Aprobar
                    </Button>
                  )}
                  {showActions && onReject && (
                    <Button size="sm" variant="destructive" onClick={() => onReject(u.id)} className="gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Rechazar
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

/* DIALOG: VER COMPROBANTE */
const PaymentProofDialog = ({ open, onOpenChange, user, onAction }) => {
  if (!user) return null;
  const proofUrl = user.payment_proof ? getFileURL(user, user.payment_proof) : null;
  const isPdf = user.payment_proof?.toLowerCase().endsWith('.pdf');

  const handleApprove = async () => {
    await pb.collection('users').update(user.id, {
      inscription_status: 'approved',
      inscription_paid_at: new Date().toISOString()
    }, { requestKey: null });
    toast.success(`Inscripci\u00f3n de ${user.name} aprobada`);
    onAction();
  };

  const handleReject = async () => {
    await pb.collection('users').update(user.id, { inscription_status: 'rejected' }, { requestKey: null });
    toast.warning(`Inscripci\u00f3n de ${user.name} rechazada`);
    onAction();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Comprobante de {user.name}</DialogTitle>
          <DialogDescription>
            Email: {user.email} &middot; Referencia: <span className="font-mono">{user.payment_reference || 'N/A'}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 max-h-[60vh] overflow-auto bg-muted rounded-lg flex items-center justify-center">
          {!proofUrl ? (
            <p className="text-muted-foreground p-8">Sin comprobante adjunto.</p>
          ) : isPdf ? (
            <iframe src={proofUrl} className="w-full h-[60vh]" title="Comprobante" />
          ) : (
            <img src={proofUrl} alt="Comprobante" className="max-w-full max-h-[60vh] object-contain" />
          )}
        </div>

        {user.inscription_status !== 'approved' && (
          <DialogFooter className="gap-2">
            <Button variant="destructive" onClick={handleReject} className="gap-1">
              <XCircle className="w-4 h-4" /> Rechazar
            </Button>
            <Button
              onClick={handleApprove}
              className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <CheckCircle2 className="w-4 h-4" /> Aprobar pago
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* TAB: PARTIDOS */
const MatchesTab = ({ matches, onAdd, onSetResult }) => {
  const statusBadge = (status) => {
    if (status === 'live')      return <Badge variant="destructive" className="text-[10px]">EN VIVO</Badge>;
    if (status === 'completed') return <Badge variant="secondary" className="text-[10px]">FINALIZADO</Badge>;
    return <Badge variant="outline" className="text-[10px]">PR&Oacute;XIMO</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Partidos del Mundial</CardTitle>
            <CardDescription>
              Carga los marcadores reales al final de cada partido. El sistema calcular&aacute; los puntos autom&aacute;ticamente.
            </CardDescription>
          </div>
          <Button onClick={onAdd} className="gap-1"><Plus className="w-4 h-4" /> A&ntilde;adir</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partido</TableHead>
                <TableHead>Fase</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Marcador</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map(m => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.home_team} vs {m.away_team}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.stage || '\u2014'}</TableCell>
                  <TableCell className="text-sm">
                    {m.match_date ? format(parseLocalDate(m.match_date), "dd MMM", { locale: es }) : '\u2014'} {m.match_time}
                  </TableCell>
                  <TableCell>{statusBadge(m.status)}</TableCell>
                  <TableCell className="text-center font-bold">
                    {m.status === 'completed' ? `${m.home_score} - ${m.away_score}` : '\u2014'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => onSetResult(m)} className="gap-1">
                      <Trophy className="w-3.5 h-3.5" />
                      {m.status === 'completed' ? 'Editar' : 'Resultado'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

/* DIALOG: REGISTRAR RESULTADO DE PARTIDO */
const SetResultDialog = ({ open, onOpenChange, match, scores, setScores, onSaved }) => {
  const [saving, setSaving] = useState(false);

  if (!match) return null;

  const handleSave = async () => {
    const h = parseInt(scores.home, 10);
    const a = parseInt(scores.away, 10);
    if (Number.isNaN(h) || Number.isNaN(a) || h < 0 || a < 0) {
      toast.error('Marcadores inválidos');
      return;
    }
    setSaving(true);

    let result = 'draw';
    if (h > a) result = 'home_win';
    if (h < a) result = 'away_win';

    try {
      if (match.status === 'completed') {
        await pb.collection('matches').update(match.id, {
          status: 'upcoming'
        }, { requestKey: null });
      }

      await pb.collection('matches').update(match.id, {
        home_score: h,
        away_score: a,
        result
      }, { requestKey: null });

      await pb.collection('matches').update(match.id, {
        status: 'completed'
      }, { requestKey: null });

      toast.success('Resultado registrado. Puntos calculados ✓');
      onSaved();
      onOpenChange(false);
    } catch (err) {
      console.error('[SetResultDialog] error guardando:', err);
      toast.error('Error al guardar: ' + (err?.message || 'desconocido'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar marcador final</DialogTitle>
          <DialogDescription>
            {match.home_team} vs {match.away_team} &middot; {match.stage}
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <Label className="text-xs uppercase tracking-wider">{match.home_team}</Label>
              <Input
                type="number" min="0"
                value={scores.home}
                onChange={(e) => setScores({ ...scores, home: e.target.value })}
                className="w-20 h-16 text-center text-3xl font-black mt-2"
              />
            </div>
            <span className="text-3xl font-black text-muted-foreground mt-6">&mdash;</span>
            <div className="text-center">
              <Label className="text-xs uppercase tracking-wider">{match.away_team}</Label>
              <Input
                type="number" min="0"
                value={scores.away}
                onChange={(e) => setScores({ ...scores, away: e.target.value })}
                className="w-20 h-16 text-center text-3xl font-black mt-2"
              />
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-4">
            Al guardar, el sistema calcular&aacute; y asignar&aacute; los puntos a todos los pron&oacute;sticos de este partido.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saving} className="gap-1">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar y calcular puntos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

/* DIALOG: AÑADIR PARTIDO */
const AddMatchDialog = ({ open, onOpenChange, onSaved }) => {
  const [data, setData] = useState({
    home_team: '', away_team: '', stage: '',
    match_date: '', match_time: '', stadium_name: '', status: 'upcoming'
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await pb.collection('matches').create(data, { requestKey: null });
    toast.success('Partido a\u00f1adido');
    onSaved();
    onOpenChange(false);
    setData({ home_team: '', away_team: '', stage: '', match_date: '', match_time: '', stadium_name: '', status: 'upcoming' });
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>A&ntilde;adir partido</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Equipo local</Label>
              <Input required value={data.home_team} onChange={(e) => setData({ ...data, home_team: e.target.value })} />
            </div>
            <div>
              <Label>Equipo visitante</Label>
              <Input required value={data.away_team} onChange={(e) => setData({ ...data, away_team: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Fase (ej: Grupo A, Octavos de Final, Final)</Label>
            <Input required value={data.stage} onChange={(e) => setData({ ...data, stage: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Fecha</Label>
              <Input type="date" required value={data.match_date} onChange={(e) => setData({ ...data, match_date: e.target.value })} />
            </div>
            <div>
              <Label>Hora</Label>
              <Input type="time" required value={data.match_time} onChange={(e) => setData({ ...data, match_time: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Estadio (opcional)</Label>
            <Input value={data.stadium_name} onChange={(e) => setData({ ...data, stadium_name: e.target.value })} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={saving} className="gap-1">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Crear partido
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

/* TAB: USUARIOS (con columnas Mundial + Amistosos) */
const UsersTab = ({ users }) => {
  const statusBadge = (status) => {
    switch(status) {
      case 'approved': return <Badge className="bg-emerald-600 text-white">Aprobado</Badge>;
      case 'rejected': return <Badge variant="destructive">Rechazado</Badge>;
      case 'submitted': return <Badge className="bg-blue-500 text-white">Enviado</Badge>;
      case 'pending':
      default: return <Badge className="bg-amber-500 text-white">Pendiente</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuarios registrados</CardTitle>
        <CardDescription>{users.length} usuarios en total</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Inscripci&oacute;n</TableHead>
                <TableHead className="text-right">Pron&oacute;sticos</TableHead>
                <TableHead className="text-right">Exactos</TableHead>
                <TableHead className="text-right">
                  <div className="flex flex-col items-end">
                    <span>Pts Mundial</span>
                    <span className="text-[10px] text-muted-foreground font-normal normal-case">Oficial</span>
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-amber-600">Pts Amistoso</span>
                    <span className="text-[10px] text-muted-foreground font-normal normal-case">No oficial</span>
                  </div>
                </TableHead>
                <TableHead>Rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name || '\u2014'}</TableCell>
                  <TableCell className="text-sm">{u.email}</TableCell>
                  <TableCell>{statusBadge(u.inscription_status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span>{u.predictions_count || 0}</span>
                      {(u.friendly_predictions_count || 0) > 0 && (
                        <span className="text-[10px] text-amber-600">
                          +{u.friendly_predictions_count} amist.
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-amber-600 font-semibold">
                    <div className="flex flex-col items-end">
                      <span>{u.exact_score_count || 0}</span>
                      {(u.friendly_exact_score_count || 0) > 0 && (
                        <span className="text-[10px] text-amber-500/70 font-normal">
                          +{u.friendly_exact_score_count} amist.
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary text-lg">{u.total_points || 0}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-bold text-lg ${(u.friendly_points || 0) > 0 ? 'text-amber-600' : 'text-muted-foreground/40'}`}>
                      {u.friendly_points || 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.role === 'admin' ? 'default' : 'outline'} className="text-[10px]">
                      {u.role || 'user'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

/* TAB: CONFIGURACIÓN */
const SettingsTab = ({ paymentSettings, scoringRules, onRefresh }) => {
  return (
    <div className="space-y-6">
      <PaymentSettingsCard settings={paymentSettings} onRefresh={onRefresh} />
      <ScoringRulesCard rules={scoringRules} onRefresh={onRefresh} />
    </div>
  );
};

const PaymentSettingsCard = ({ settings, onRefresh }) => {
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    inscription_amount: settings?.inscription_amount  || 30000,
    nequi_phone:        settings?.nequi_phone || '',
    account_holder_name: settings?.account_holder_name || '',
    instructions:       settings?.instructions || '',
    is_active:          settings?.is_active ?? true,
    prize_first_pct:    settings?.prize_first_pct  ?? 60,
    prize_second_pct:   settings?.prize_second_pct ?? 20,
    prize_third_pct:    settings?.prize_third_pct  ?? 10,
    prize_reserve_pct:  settings?.prize_reserve_pct ?? 10
  });
  const [qrFile, setQrFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm({
        inscription_amount:  settings.inscription_amount  || 30000,
        nequi_phone:         settings.nequi_phone || '',
        account_holder_name: settings.account_holder_name || '',
        instructions:        settings.instructions || '',
        is_active:           settings.is_active ?? true,
        prize_first_pct:     settings.prize_first_pct  ?? 60,
        prize_second_pct:    settings.prize_second_pct ?? 20,
        prize_third_pct:     settings.prize_third_pct  ?? 10,
        prize_reserve_pct:   settings.prize_reserve_pct ?? 10
      });
    }
  }, [settings]);

  const prizeSum = Number(form.prize_first_pct)  + Number(form.prize_second_pct) +
                   Number(form.prize_third_pct) + Number(form.prize_reserve_pct);
  const isValidSum = prizeSum === 100;

  const handleSave = async () => {
    if (!isValidSum) {
      toast.error(`La suma de los porcentajes de premios debe ser 100% (actualmente: ${prizeSum}%)`);
      return;
    }

    setSaving(true);
    const fd = new FormData();
    fd.append('inscription_amount',  form.inscription_amount);
    fd.append('nequi_phone',         form.nequi_phone);
    fd.append('account_holder_name', form.account_holder_name);
    fd.append('instructions',        form.instructions);
    fd.append('is_active',           form.is_active);
    fd.append('prize_first_pct',     form.prize_first_pct);
    fd.append('prize_second_pct',    form.prize_second_pct);
    fd.append('prize_third_pct',     form.prize_third_pct);
    fd.append('prize_reserve_pct',   form.prize_reserve_pct);
    if (qrFile) fd.append('nequi_qr_image', qrFile);

    if (settings?.id) {
      await pb.collection('payment_settings').update(settings.id, fd, { requestKey: null });
    } else {
      await pb.collection('payment_settings').create(fd, { requestKey: null });
    }
    toast.success('Configuraci\u00f3n de pago guardada');
    setQrFile(null);
    onRefresh();
    setSaving(false);
  };

  const qrUrl = settings?.nequi_qr_image ? getFileURL(settings, settings.nequi_qr_image) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5" /> Configuraci&oacute;n de Pago y Premios</CardTitle>
        <CardDescription>
          Datos de Nequi, monto de inscripci&oacute;n y c&oacute;mo se distribuyen los premios entre los ganadores.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <Label>Monto de inscripci&oacute;n (COP)</Label>
              <Input
                type="number"
                value={form.inscription_amount}
                onChange={(e) => setForm({ ...form, inscription_amount: parseInt(e.target.value, 10) || 0 })}
              />
            </div>
            <div>
              <Label>N&uacute;mero Nequi</Label>
              <Input
                value={form.nequi_phone}
                onChange={(e) => setForm({ ...form, nequi_phone: e.target.value })}
                placeholder="+57 300 123 4567"
              />
            </div>
            <div>
              <Label>A nombre de</Label>
              <Input
                value={form.account_holder_name}
                onChange={(e) => setForm({ ...form, account_holder_name: e.target.value })}
                placeholder="Juan P\u00e9rez"
              />
            </div>
            <div>
              <Label>Instrucciones</Label>
              <Textarea
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                rows={4}
                placeholder="Texto que ver\u00e1 el usuario al ir a inscribirse"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Imagen del c&oacute;digo QR Nequi</Label>
              <div className="mt-2 bg-muted rounded-lg p-4 flex items-center justify-center min-h-[250px]">
                {qrFile ? (
                  <div className="text-sm text-emerald-600 font-semibold">Nueva imagen seleccionada: {qrFile.name}</div>
                ) : qrUrl ? (
                  <img src={qrUrl} alt="QR" className="max-h-56 object-contain" />
                ) : (
                  <p className="text-sm text-muted-foreground">Sin QR configurado</p>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setQrFile(e.target.files?.[0] || null)}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2 gap-1"
                onClick={() => fileRef.current?.click()}
              >
                <Upload className="w-3.5 h-3.5" /> {qrUrl ? 'Cambiar QR' : 'Subir QR'}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 mt-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              <h4 className="font-bold">Distribuci&oacute;n del Bote (%)</h4>
            </div>
            <div className={`text-sm font-bold px-3 py-1 rounded-full ${isValidSum ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              Suma: {prizeSum}% {isValidSum ? '\u2713' : '(debe ser 100%)'}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Define qu&eacute; porcentaje del bote total se lleva cada lugar. La suma debe ser exactamente 100%.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-amber-700">1er lugar</Label>
              <Input
                type="number" min="0" max="100" step="1"
                className="h-14 text-2xl font-black text-center text-amber-600"
                value={form.prize_first_pct}
                onChange={(e) => setForm({ ...form, prize_first_pct: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">2do lugar</Label>
              <Input
                type="number" min="0" max="100" step="1"
                className="h-14 text-2xl font-black text-center"
                value={form.prize_second_pct}
                onChange={(e) => setForm({ ...form, prize_second_pct: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">3er lugar</Label>
              <Input
                type="number" min="0" max="100" step="1"
                className="h-14 text-2xl font-black text-center"
                value={form.prize_third_pct}
                onChange={(e) => setForm({ ...form, prize_third_pct: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Reserva organizador</Label>
              <Input
                type="number" min="0" max="100" step="1"
                className="h-14 text-2xl font-black text-center text-muted-foreground"
                value={form.prize_reserve_pct}
                onChange={(e) => setForm({ ...form, prize_reserve_pct: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} disabled={saving || !isValidSum} className="gap-1">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar configuraci&oacute;n
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ScoringRulesCard = ({ rules, onRefresh }) => {
  const [form, setForm] = useState({
    exact_score_points: 5, correct_winner_diff_points: 3, correct_winner_points: 1,
    group_stage_multiplier: 1, knockout_multiplier: 2, final_multiplier: 3
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (rules) setForm({ ...rules });
  }, [rules]);

  const handleSave = async () => {
    setSaving(true);
    const data = {
      exact_score_points:         parseInt(form.exact_score_points, 10),
      correct_winner_diff_points: parseInt(form.correct_winner_diff_points, 10),
      correct_winner_points:      parseInt(form.correct_winner_points, 10),
      group_stage_multiplier:     parseFloat(form.group_stage_multiplier),
      knockout_multiplier:        parseFloat(form.knockout_multiplier),
      final_multiplier:           parseFloat(form.final_multiplier)
    };
    if (rules?.id) {
      await pb.collection('scoring_rules').update(rules.id, data, { requestKey: null });
    } else {
      await pb.collection('scoring_rules').create(data, { requestKey: null });
    }
    toast.success('Reglas de puntuaci\u00f3n guardadas');
    onRefresh();
    setSaving(false);
  };

  const inputClass = "h-14 text-2xl font-black text-center";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5" /> Reglas de puntuaci&oacute;n</CardTitle>
        <CardDescription>
          Define cu&aacute;ntos puntos otorga cada tipo de acierto y los multiplicadores por fase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Puntos base</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Marcador exacto</Label>
                <Input type="number" min="0" className={inputClass}
                  value={form.exact_score_points}
                  onChange={(e) => setForm({ ...form, exact_score_points: e.target.value })} />
                <p className="text-xs text-muted-foreground mt-1">Ej: pron&oacute;stica 2-1, real 2-1</p>
              </div>
              <div>
                <Label>Ganador + diferencia</Label>
                <Input type="number" min="0" className={inputClass}
                  value={form.correct_winner_diff_points}
                  onChange={(e) => setForm({ ...form, correct_winner_diff_points: e.target.value })} />
                <p className="text-xs text-muted-foreground mt-1">Ej: pron&oacute;stica 2-1, real 3-2</p>
              </div>
              <div>
                <Label>Solo ganador</Label>
                <Input type="number" min="0" className={inputClass}
                  value={form.correct_winner_points}
                  onChange={(e) => setForm({ ...form, correct_winner_points: e.target.value })} />
                <p className="text-xs text-muted-foreground mt-1">Ej: pron&oacute;stica 2-1, real 1-0</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Multiplicadores por fase</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Fase de grupos &times;</Label>
                <Input type="number" step="0.5" min="1" className={inputClass}
                  value={form.group_stage_multiplier}
                  onChange={(e) => setForm({ ...form, group_stage_multiplier: e.target.value })} />
              </div>
              <div>
                <Label>Octavos / Cuartos / Semis &times;</Label>
                <Input type="number" step="0.5" min="1" className={inputClass}
                  value={form.knockout_multiplier}
                  onChange={(e) => setForm({ ...form, knockout_multiplier: e.target.value })} />
              </div>
              <div>
                <Label>Final &times;</Label>
                <Input type="number" step="0.5" min="1" className={inputClass}
                  value={form.final_multiplier}
                  onChange={(e) => setForm({ ...form, final_multiplier: e.target.value })} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} disabled={saving} className="gap-1">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar reglas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

/* TAB: CONTACTO */
const ContactTab = ({ contact, onRefresh }) => {
  const [form, setForm] = useState({
    phone: '', email: '', address: '', city: '', country: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contact) {
      setForm({
        phone: contact.phone || '',
        email: contact.email || '',
        address: contact.address || '',
        city: contact.city || '',
        country: contact.country || ''
      });
    }
  }, [contact]);

  const handleSave = async () => {
    setSaving(true);
    if (contact?.id) {
      await pb.collection('contact_info').update(contact.id, form, { requestKey: null });
    } else {
      await pb.collection('contact_info').create(form, { requestKey: null });
    }
    toast.success('Datos de contacto guardados');
    onRefresh();
    setSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos de Contacto</CardTitle>
        <CardDescription>Informaci&oacute;n mostrada en el footer del sitio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Tel&eacute;fono</Label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Label>Direcci&oacute;n</Label>
            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div>
            <Label>Ciudad</Label>
            <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </div>
          <div>
            <Label>Pa&iacute;s</Label>
            <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave} disabled={saving} className="gap-1">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ icon, title, description }) => (
  <div className="py-16 text-center">
    <div className="mx-auto mb-4 w-fit">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default AdminDashboard;
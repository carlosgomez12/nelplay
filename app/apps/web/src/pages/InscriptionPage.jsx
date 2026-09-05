import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx';
import { useToast } from '@/hooks/use-toast.js';
import { Upload, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';

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

export default function InscriptionPage() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();

  const [settings, setSettings]     = useState(null);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Estado optimista que sobreescribe el del context si acabamos de enviar
  // (evita que el formulario reaparezca mientras refreshUser refresca)
  const [optimisticStatus, setOptimisticStatus] = useState(null);

  const [reference, setReference] = useState('');
  const [file, setFile]           = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const record = await pb.collection('payment_settings').getFirstListItem('is_active=true', {
          requestKey: null
        });
        setSettings(record);
      } catch (err) {
        console.error("Error fetching payment settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reference || !file) {
      toast({
        title: "Faltan datos",
        description: "Por favor, ingresa la referencia y sube el comprobante.",
        variant: "destructive"
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Sesi\u00f3n expirada",
        description: "Por favor, vuelve a iniciar sesi\u00f3n.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('payment_reference', reference);
      formData.append('payment_proof', file);
      formData.append('inscription_status', 'submitted');

      await pb.collection('users').update(user.id, formData, { requestKey: null });

      // Marcar localmente como enviado de inmediato (el formulario desaparece
      // y el usuario ve "Pago en revisi\u00f3n" aunque refreshUser falle).
      setOptimisticStatus('submitted');

      toast({
        title: "Comprobante enviado",
        description: "Tu pago est\u00e1 ahora en revisi\u00f3n.",
      });

      // Intentar refrescar el usuario en el context, pero NO bloquear
      // ni romper la UI si falla. El estado optimista cubre la transici\u00f3n.
      if (typeof refreshUser === 'function') {
        try {
          await refreshUser();
        } catch (refreshErr) {
          console.warn('refreshUser fall\u00f3 pero el comprobante se envi\u00f3 correctamente:', refreshErr);
        }
      }

    } catch (err) {
      console.error('Error al enviar comprobante:', err);
      const msg = err?.response?.message || err?.message || 'Hubo un problema al enviar tu comprobante.';
      toast({
        title: "Error",
        description: msg,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  // Usar el estado optimista si est\u00e1 disponible, si no el del context
  const status = optimisticStatus || user?.inscription_status || 'pending';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Inscripci&oacute;n | NelPlay</title>
      </Helmet>

      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              Inscripci&oacute;n al Torneo
            </h1>
            <p className="text-muted-foreground text-lg max-w-[65ch]">
              Para participar y realizar predicciones, debes completar el pago de la inscripci&oacute;n y subir tu comprobante.
            </p>
          </div>

          {status === 'approved' && (
            <Alert className="bg-emerald-500/15 text-emerald-600 border-emerald-500/20">
              <CheckCircle2 className="h-5 w-5" />
              <AlertTitle className="text-lg font-bold">&iexcl;Inscripci&oacute;n Aprobada!</AlertTitle>
              <AlertDescription>
                Tu pago ha sido verificado exitosamente. Ya puedes comenzar a realizar tus predicciones y participar por los premios.
              </AlertDescription>
            </Alert>
          )}

          {status === 'submitted' && (
            <Alert className="bg-amber-500/15 text-amber-600 border-amber-500/20">
              <Clock className="h-5 w-5" />
              <AlertTitle className="text-lg font-bold">Pago en revisi&oacute;n</AlertTitle>
              <AlertDescription>
                Hemos recibido tu comprobante de pago. Un administrador lo est&aacute; revisando y te notificaremos pronto.
              </AlertDescription>
            </Alert>
          )}

          {status === 'rejected' && (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-bold">Pago Rechazado</AlertTitle>
              <AlertDescription>
                Hubo un problema verificando tu comprobante anterior. Por favor, revisa los datos, realiza el pago si no lo has hecho y vuelve a enviar el comprobante correcto.
              </AlertDescription>
            </Alert>
          )}

          {(status === 'pending' || status === 'rejected') && settings && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <Card className="shadow-lg border-primary/10">
                <CardHeader>
                  <CardTitle>Datos de Pago</CardTitle>
                  <CardDescription>
                    Realiza tu pago utilizando la siguiente informaci&oacute;n.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Monto a pagar</p>
                    <p className="text-3xl font-bold text-foreground">
                      ${settings.inscription_amount?.toLocaleString('es-CO') || '0'}
                    </p>
                  </div>

                  {settings.nequi_phone && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">N&uacute;mero Nequi / Cuenta</p>
                      <p className="text-xl font-medium">{settings.nequi_phone}</p>
                    </div>
                  )}

                  {settings.account_holder_name && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Titular</p>
                      <p className="text-lg">{settings.account_holder_name}</p>
                    </div>
                  )}

                  {settings.instructions && (
                    <div className="bg-muted p-4 rounded-xl text-sm leading-relaxed text-foreground">
                      {settings.instructions}
                    </div>
                  )}

                  {settings.nequi_qr_image && (
                    <div className="pt-4 flex flex-col items-center gap-4">
                      <p className="text-sm font-medium text-muted-foreground">Escanea para pagar</p>
                      <img
                        src={getFileURL(settings, settings.nequi_qr_image)}
                        alt="C\u00f3digo QR de Nequi"
                        className="w-48 h-48 rounded-xl shadow-sm border object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Reportar Pago</CardTitle>
                    <CardDescription>
                      Sube tu comprobante y el n&uacute;mero de referencia para validar tu inscripci&oacute;n.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="reference">N&uacute;mero de Referencia</Label>
                      <Input
                        id="reference"
                        placeholder="Ej. 123456789 o tel\u00e9fono de origen"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        required
                        className="text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="proof">Comprobante (Imagen o PDF)</Label>
                      <Input
                        id="proof"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        required
                        className="cursor-pointer file:cursor-pointer text-foreground"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Enviando comprobante...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Enviar Comprobante
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          )}

          {!settings && (status === 'pending' || status === 'rejected') && (
            <Alert>
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Configuraci&oacute;n no disponible</AlertTitle>
              <AlertDescription>
                Los datos de pago no est&aacute;n configurados actualmente. Por favor, contacta a un administrador para que habilite la configuraci&oacute;n de pagos.
              </AlertDescription>
            </Alert>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
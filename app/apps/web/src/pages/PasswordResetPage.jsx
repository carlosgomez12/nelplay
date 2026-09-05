import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Trophy, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const PasswordResetPage = () => {
  const { requestPasswordReset } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestPasswordReset(email);
      setEmailSent(true);
      toast.success('Correo de restablecimiento enviado');
    } catch (error) {
      toast.error(error.message || 'Error al enviar el correo de restablecimiento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Restablecer Contraseña - NelPlay</title>
        <meta name="description" content="Restablezca la contraseña de su cuenta de NelPlay." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Restablecer su contraseña</CardTitle>
            <CardDescription>
              {emailSent
                ? 'Revise su correo para ver las instrucciones'
                : 'Ingrese su correo para recibir las instrucciones'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="space-y-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-success-foreground">
                    Hemos enviado las instrucciones de restablecimiento a <strong>{email}</strong>
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Inicio de Sesión
                  </Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="usted@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Enlace'
                  )}
                </Button>

                <Button asChild variant="ghost" className="w-full">
                  <Link to="/login">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Inicio de Sesión
                  </Link>
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PasswordResetPage;
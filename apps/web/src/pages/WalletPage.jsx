import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { format } from 'date-fns';

const WalletPage = () => {
  const { currentUser, refreshUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [currentUser]);

  const fetchTransactions = async () => {
    if (!currentUser) return;

    try {
      const records = await pb.collection('transactions').getList(1, 50, {
        filter: `user_id = "${currentUser.id}"`,
        sort: '-created',
        $autoCancel: false
      });
      setTransactions(records.items);
    } catch (error) {
      toast.error('Error al cargar las transacciones');
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = () => {
    toast('Integración con Razorpay próximamente');
  };

  const getTransactionIcon = (type) => {
    if (type === 'deposit') return <ArrowDownCircle className="w-5 h-5 text-success" />;
    if (type === 'withdrawal') return <ArrowUpCircle className="w-5 h-5 text-primary" />;
    if (type === 'bet_winnings') return <ArrowDownCircle className="w-5 h-5 text-success" />;
    return <ArrowUpCircle className="w-5 h-5 text-destructive" />;
  };

  const getTransactionLabel = (type) => {
    if (type === 'deposit') return 'Depósito';
    if (type === 'withdrawal') return 'Retiro';
    if (type === 'bet_winnings') return 'Ganancias de Apuesta';
    return 'Pérdida de Apuesta';
  };

  const translateStatus = (status) => {
    if (status === 'completed') return 'Completado';
    if (status === 'pending') return 'Pendiente';
    if (status === 'failed') return 'Fallido';
    return status;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando billetera...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Billetera - NelPlay</title>
        <meta name="description" content="Gestione su billetera de NelPlay, vea su saldo y el historial de transacciones." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-balance">Billetera</h1>
              <p className="text-lg text-muted-foreground">
                Gestione su saldo y vea el historial de transacciones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-primary to-secondary text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Wallet className="w-5 h-5" />
                    Saldo Actual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4">
                    ${(currentUser?.balance || 0).toLocaleString('es-CO')} COP
                  </p>
                  <Button
                    onClick={handleDeposit}
                    variant="secondary"
                    className="w-full"
                  >
                    Añadir Fondos
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ganancias Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-success mb-4">
                    ${(currentUser?.total_winnings || 0).toLocaleString('es-CO')} COP
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ganancias de por vida de apuestas ganadoras
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historial de Transacciones</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="py-12 text-center">
                    <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Aún no hay transacciones</h3>
                    <p className="text-muted-foreground">Su historial de transacciones aparecerá aquí</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead className="text-right">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTransactionIcon(transaction.type)}
                              <span className="font-medium">{getTransactionLabel(transaction.type)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(transaction.created), 'dd MMM, yyyy HH:mm')}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            <span className={
                              transaction.type === 'deposit' || transaction.type === 'bet_winnings'
                                ? 'text-success'
                                : 'text-destructive'
                            }>
                              {transaction.type === 'deposit' || transaction.type === 'bet_winnings' ? '+' : '-'}
                              ${transaction.amount.toLocaleString('es-CO')} COP
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={
                                transaction.status === 'completed' ? 'default' :
                                transaction.status === 'failed' ? 'destructive' :
                                'secondary'
                              }
                              className={
                                transaction.status === 'completed' ? 'bg-success text-success-foreground' : ''
                              }
                            >
                              {translateStatus(transaction.status)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WalletPage;
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import { Toaster } from '@/components/ui/sonner.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import PasswordResetPage from '@/pages/PasswordResetPage.jsx';
import InscriptionPage from '@/pages/InscriptionPage.jsx';
import MatchesPage from '@/pages/MatchesPage.jsx';
import MyPredictionsPage from '@/pages/MyPredictionsPage.jsx';
import LeaderboardPage from '@/pages/LeaderboardPage.jsx';
import AmistososPage from '@/pages/AmistososPage.jsx';
import TodosLosPronosticosPage from '@/pages/TodosLosPronosticosPage.jsx';
import AdminDashboard from '@/pages/AdminDashboard.jsx';
import TodayMatchesPopup from '@/components/TodayMatchesPopup.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* P\u00fablicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/amistosos" element={<AmistososPage />} />

          {/* Inscripci\u00f3n */}
          <Route
            path="/inscription"
            element={
              <ProtectedRoute>
                <InscriptionPage />
              </ProtectedRoute>
            }
          />

          {/* Panel de pron\u00f3sticos: requiere inscripci\u00f3n aprobada */}
          <Route
            path="/matches"
            element={
              <ProtectedRoute requireInscription>
                <MatchesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-predictions"
            element={
              <ProtectedRoute requireInscription>
                <MyPredictionsPage />
              </ProtectedRoute>
            }
          />

          {/* Pron\u00f3sticos p\u00fablicos: requiere autenticaci\u00f3n */}
          <Route
            path="/todos-los-pronosticos"
            element={
              <ProtectedRoute>
                <TodosLosPronosticosPage />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
              <span className="text-6xl mb-4">&#x26BD;</span>
              <h1 className="text-4xl font-black mb-2">404 - Fuera de Juego</h1>
              <p className="text-muted-foreground mb-6">La p&aacute;gina que buscas no existe en este estadio.</p>
              <a href="/" className="text-primary font-bold hover:underline">Volver al Inicio</a>
            </div>
          } />
        </Routes>
        <TodayMatchesPopup />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
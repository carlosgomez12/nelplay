import React from 'react';
import { Route, Routes, BrowserRouter as Router, Link, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import { Toaster } from '@/components/ui/sonner.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import BottomNav from '@/components/BottomNav.jsx';
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
import SobreNelplayPage from '@/pages/SobreNelplayPage.jsx';
import ProfilePage from '@/pages/ProfilePage.jsx';
import { RetosPage, LigasPage, ComunidadPage } from '@/pages/UpcomingPages.jsx';
import { TerminosPage, PrivacidadPage, CookiesPage, JuegoResponsablePage, AfiliadosPage } from '@/pages/LegalPages.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
            {/* Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
            <Route path="/ranking" element={<LeaderboardPage />} />
            {/* URL canónica: /ranking. Se conserva /leaderboard como redirección. */}
            <Route path="/leaderboard" element={<Navigate to="/ranking" replace />} />
            <Route path="/amistosos" element={<AmistososPage />} />
            <Route path="/sobre-nelplay" element={<SobreNelplayPage />} />

            {/* Secciones en desarrollo (arquitectura preparada) */}
            <Route path="/retos" element={<RetosPage />} />
            <Route path="/ligas" element={<LigasPage />} />
            <Route path="/comunidad" element={<ComunidadPage />} />

            {/* Legal */}
            <Route path="/terminos" element={<TerminosPage />} />
            <Route path="/privacidad" element={<PrivacidadPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/juego-responsable" element={<JuegoResponsablePage />} />
            <Route path="/afiliados" element={<AfiliadosPage />} />

            {/* Perfil (cualquier usuario autenticado, free-to-play) */}
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Inscripción */}
            <Route
              path="/inscription"
              element={
                <ProtectedRoute>
                  <InscriptionPage />
                </ProtectedRoute>
              }
            />

            {/* Panel de pronósticos: requiere inscripción aprobada */}
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

            {/* Pronósticos públicos: requiere autenticación */}
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
                <Link to="/" className="text-primary font-bold hover:underline">Volver al Inicio</Link>
              </div>
            } />
        </Routes>
        <TodayMatchesPopup />
        <BottomNav />
        {/* Spacer para que la barra inferior móvil no tape el contenido */}
        <div className="h-14 md:hidden" aria-hidden="true" />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;

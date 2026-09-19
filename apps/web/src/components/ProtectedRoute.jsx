import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';

const ProtectedRoute = ({ children, adminOnly = false, requireInscription = false }) => {
  const {
    isAuthenticated, isAdmin, isInscriptionApproved, initialLoading
  } = useAuth();

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si la ruta requiere inscripción y el usuario no la tiene aprobada,
  // se le manda a la página de inscripción. (Los admins pasan siempre.)
  if (requireInscription && !isInscriptionApproved && !isAdmin) {
    return <Navigate to="/inscription" replace />;
  }

  return children;
};

export default ProtectedRoute;
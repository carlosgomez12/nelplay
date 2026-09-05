import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Helper compatible con SDK viejo y nuevo de PocketBase
// SDK viejo: pb.authStore.model
// SDK nuevo: pb.authStore.record
const getAuthRecord = () => {
  try {
    if (pb.authStore.record) return pb.authStore.record;
  } catch (_) { /* ignore */ }
  try {
    if (pb.authStore.model) return pb.authStore.model;
  } catch (_) { /* ignore */ }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser]       = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (pb.authStore.isValid) {
      setCurrentUser(getAuthRecord());
    }
    setInitialLoading(false);

    // onChange del SDK nuevo entrega (token, record), el SDK viejo (token, model).
    // En ambos casos el segundo parámetro es lo que necesitamos.
    const unsubscribe = pb.authStore.onChange((_, record) => {
      setCurrentUser(record || getAuthRecord());
    });

    return () => unsubscribe();
  }, []);

  // Realtime: si el admin aprueba la inscripción, el usuario lo ve sin recargar
  useEffect(() => {
    if (!currentUser?.id) return;
    let isMounted = true;

    const subscribe = async () => {
      try {
        await pb.collection('users').subscribe(currentUser.id, (e) => {
          if (isMounted && e.action === 'update' && e.record) {
            setCurrentUser(e.record);
          }
        });
      } catch (err) {
        // silently ignore
      }
    };
    subscribe();

    return () => {
      isMounted = false;
      pb.collection('users').unsubscribe(currentUser.id).catch(() => {});
    };
  }, [currentUser?.id]);

  // Polling de respaldo: si por alguna razón el realtime falla,
  // refresca el usuario cada 15s para detectar cambios desde el admin.
  useEffect(() => {
    if (!currentUser?.id) return;
    const interval = setInterval(async () => {
      try {
        const updated = await pb.collection('users').getOne(currentUser.id, {
          requestKey: null
        });
        if (updated && updated.inscription_status !== currentUser.inscription_status) {
          setCurrentUser(updated);
        }
      } catch (_) { /* ignorar */ }
    }, 15000);
    return () => clearInterval(interval);
  }, [currentUser?.id, currentUser?.inscription_status]);

  const login = async (email, password) => {
    const authData = await pb.collection('users').authWithPassword(email, password);
    setCurrentUser(authData.record || getAuthRecord());
    return authData;
  };

  const signup = async (email, password, name) => {
    const userData = {
      email,
      password,
      passwordConfirm: password,
      name,
      role: 'user',
      inscription_status: 'pending',
      total_points: 0,
      predictions_count: 0,
      exact_score_count: 0
    };
    await pb.collection('users').create(userData);
    try { await pb.collection('users').requestVerification(email); } catch (_) { /* no critical */ }
    const authData = await pb.collection('users').authWithPassword(email, password);
    setCurrentUser(authData.record || getAuthRecord());
    return authData;
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
  };

  const requestPasswordReset = (email) =>
    pb.collection('users').requestPasswordReset(email);

  const confirmPasswordReset = (token, password) =>
    pb.collection('users').confirmPasswordReset(token, password, password);

  /**
   * Refresca el usuario actual desde la base de datos.
   * Tolerante a errores: si falla, no lanza excepción, solo log y retorna null.
   */
  const refreshUser = async () => {
    if (!currentUser?.id) {
      console.warn('refreshUser: no hay usuario actual');
      return null;
    }
    try {
      const updated = await pb.collection('users').getOne(currentUser.id, {
        requestKey: null
      });
      if (updated) {
        setCurrentUser(updated);
        return updated;
      }
      return null;
    } catch (err) {
      console.warn('refreshUser fall\u00f3:', err?.message || err);
      return null;
    }
  };

  const isAdmin                = currentUser?.role === 'admin';
  const isAuthenticated        = !!currentUser;
  const isInscriptionApproved  = currentUser?.inscription_status === 'approved';
  const isInscriptionSubmitted = currentUser?.inscription_status === 'submitted';
  const isInscriptionRejected  = currentUser?.inscription_status === 'rejected';

  return (
    <AuthContext.Provider value={{
      // Exponemos el mismo objeto bajo DOS nombres para que cualquier
      // componente que use cualquiera de los dos funcione.
      currentUser,
      user: currentUser,

      isAuthenticated, isAdmin,
      isInscriptionApproved, isInscriptionSubmitted, isInscriptionRejected,
      login, signup, logout,
      requestPasswordReset, confirmPasswordReset,
      refreshUser,
      initialLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
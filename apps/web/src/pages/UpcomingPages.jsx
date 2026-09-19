import React from 'react';
import ComingSoonPage from '@/components/ComingSoonPage.jsx';

export const RetosPage = () => (
  <ComingSoonPage
    title="Retos"
    path="/retos"
    description="Completa retos semanales, mantén tu racha de aciertos y desbloquea logros mientras subes de nivel en NelPlay."
    bullets={[
      'Retos como "acierta 3 resultados" o "consigue un marcador exacto".',
      'Recompensas en puntos y logros al completarlos.',
      'Rachas que suman bonus por participar cada día.',
    ]}
  />
);

export const LigasPage = () => (
  <ComingSoonPage
    title="Ligas privadas"
    path="/ligas"
    description="Crea una liga con tus amigos, la oficina o la familia e invítalos con un código para competir entre ustedes."
    bullets={[
      'Crea tu liga y genera un código de invitación.',
      'Ranking exclusivo entre los miembros de la liga.',
      'Comparte el enlace por WhatsApp y compite.',
    ]}
  />
);

export const ComunidadPage = () => (
  <ComingSoonPage
    title="Comunidad"
    path="/comunidad"
    description="Descubre lo que pronostica la comunidad, celebra los aciertos y sigue la actividad de otros fanáticos del fútbol."
    bullets={[
      'Actividad estructurada: aciertos, rachas y subidas de nivel.',
      'Porcentajes de pronósticos de la comunidad por partido.',
      'Comparte tus resultados y reta a tus amigos.',
    ]}
  />
);

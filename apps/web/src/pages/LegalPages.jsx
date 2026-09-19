import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Seo from '@/components/seo/Seo.jsx';
import { BRAND } from '@/config/brand.js';
import { webPageJsonLd, breadcrumbJsonLd } from '@/config/seo.js';

const LAST_UPDATED = '2026-09-19';

const LegalLayout = ({ title, path, description, children }) => (
  <>
    <Seo
      title={title}
      path={path}
      description={description}
      jsonLd={[
        webPageJsonLd({ title, description, path }),
        breadcrumbJsonLd([{ name: 'Inicio', path: '/' }, { name: title, path }]),
      ]}
    />
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-3xl mx-auto">
            <nav aria-label="Ruta de navegación" className="text-xs text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Inicio</Link> <span className="mx-1">/</span> <span>{title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">{title}</h1>
            <p className="text-xs text-muted-foreground mb-8">Última actualización: {LAST_UPDATED}</p>
            <div className="prose-legal space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
              {children}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

const H2 = ({ children }) => <h2 className="text-lg md:text-xl font-bold text-foreground mt-6 mb-2">{children}</h2>;

export const TerminosPage = () => (
  <LegalLayout title="Términos de servicio" path="/terminos" description={`Términos de servicio de ${BRAND.name}, plataforma gratuita de pronósticos de fútbol.`}>
    <p>Al usar {BRAND.name} aceptas estos términos. Si no estás de acuerdo, por favor no utilices la plataforma.</p>
    <H2>1. Descripción del servicio</H2>
    <p>{BRAND.name} es una plataforma gratuita de entretenimiento que permite realizar pronósticos de partidos de fútbol, acumular puntos y competir en rankings. NelPlay <strong>no ofrece apuestas con dinero real</strong> ni transacciones económicas asociadas a los pronósticos.</p>
    <H2>2. Cuenta de usuario</H2>
    <p>Para participar debes crear una cuenta con datos veraces. Eres responsable de mantener la confidencialidad de tus credenciales y de la actividad de tu cuenta.</p>
    <H2>3. Uso aceptable</H2>
    <p>No está permitido el uso fraudulento, la manipulación de puntos o rankings, el uso de bots, ni cualquier conducta que afecte la integridad de la plataforma o a otros usuarios.</p>
    <H2>4. Propiedad intelectual</H2>
    <p>La marca, el diseño y el software de {BRAND.name} pertenecen a {BRAND.company}. No se permite su reproducción sin autorización.</p>
    <H2>5. Limitación de responsabilidad</H2>
    <p>El servicio se ofrece "tal cual". Los pronósticos son una actividad de entretenimiento y no constituyen asesoría ni garantía de resultados deportivos.</p>
    <H2>6. Cambios</H2>
    <p>Podemos actualizar estos términos. Publicaremos la versión vigente en esta página con su fecha de actualización.</p>
    <H2>7. Contacto</H2>
    <p>Para consultas: <a className="text-primary hover:underline" href={`mailto:${BRAND.contactEmail}`}>{BRAND.contactEmail}</a>.</p>
  </LegalLayout>
);

export const PrivacidadPage = () => (
  <LegalLayout title="Política de privacidad" path="/privacidad" description={`Cómo ${BRAND.name} recoge y protege tus datos personales.`}>
    <p>En {BRAND.name} respetamos tu privacidad. Esta política explica qué datos tratamos y con qué finalidad.</p>
    <H2>1. Datos que recogemos</H2>
    <p>Datos de cuenta (nombre y correo electrónico), tus pronósticos y estadísticas de juego, y datos técnicos de uso necesarios para el funcionamiento del servicio.</p>
    <H2>2. Finalidad</H2>
    <p>Usamos tus datos para gestionar tu cuenta, calcular puntos y rankings, mejorar el producto y comunicarnos contigo sobre el servicio.</p>
    <H2>3. Base y almacenamiento</H2>
    <p>El tratamiento se basa en tu consentimiento al registrarte. Los datos se almacenan en la infraestructura del proyecto con medidas de seguridad razonables.</p>
    <H2>4. Terceros</H2>
    <p>Podemos utilizar proveedores de publicidad y analítica que traten datos según sus propias políticas. Consulta también nuestra <Link className="text-primary hover:underline" to="/cookies">política de cookies</Link>.</p>
    <H2>5. Tus derechos</H2>
    <p>Puedes solicitar acceso, rectificación o eliminación de tus datos escribiendo a <a className="text-primary hover:underline" href={`mailto:${BRAND.contactEmail}`}>{BRAND.contactEmail}</a>.</p>
  </LegalLayout>
);

export const CookiesPage = () => (
  <LegalLayout title="Política de cookies" path="/cookies" description={`Uso de cookies en ${BRAND.name}.`}>
    <p>Utilizamos cookies y tecnologías similares para que la plataforma funcione y para mejorar tu experiencia.</p>
    <H2>1. Cookies esenciales</H2>
    <p>Necesarias para iniciar sesión y mantener tu sesión activa. Sin ellas la plataforma no funciona correctamente.</p>
    <H2>2. Cookies de publicidad y analítica</H2>
    <p>Podemos usar servicios de terceros (por ejemplo, publicidad) que emplean cookies para mostrar anuncios y medir su rendimiento, conforme a sus propias políticas.</p>
    <H2>3. Gestión</H2>
    <p>Puedes configurar o eliminar las cookies desde los ajustes de tu navegador. Deshabilitar las esenciales puede impedir el uso de tu cuenta.</p>
  </LegalLayout>
);

export const JuegoResponsablePage = () => (
  <LegalLayout title="Juego responsable" path="/juego-responsable" description={`${BRAND.name} es entretenimiento gratuito sin dinero real. Recomendaciones de uso saludable.`}>
    <p>{BRAND.name} es una plataforma de <strong>entretenimiento gratuita</strong>. No se apuesta ni se gana dinero real: se compite por puntos y por diversión.</p>
    <H2>Sin dinero real</H2>
    <p>NelPlay no ofrece apuestas monetarias ni premios en efectivo asociados a los pronósticos. Nuestro objetivo es la diversión y la competencia sana entre fanáticos del fútbol.</p>
    <H2>Uso saludable</H2>
    <p>Te recomendamos disfrutar de NelPlay con moderación, como un pasatiempo. Si el fútbol y los pronósticos dejan de ser divertidos, tómate un descanso.</p>
    <H2>Público</H2>
    <p>NelPlay está pensado como entretenimiento familiar en torno al fútbol. Recomendamos el uso por parte de personas mayores de edad o con supervisión de un adulto.</p>
    <H2>Contacto</H2>
    <p>¿Dudas o comentarios? Escríbenos a <a className="text-primary hover:underline" href={`mailto:${BRAND.contactEmail}`}>{BRAND.contactEmail}</a>.</p>
  </LegalLayout>
);

export const AfiliadosPage = () => (
  <LegalLayout title="Afiliados" path="/afiliados" description={`Información sobre el programa de afiliados y enlaces patrocinados de ${BRAND.name}.`}>
    <p>Esta página describe cómo {BRAND.name} podría utilizar enlaces de afiliado en el futuro, con total transparencia.</p>
    <H2>Transparencia</H2>
    <p>Si en algún momento incluimos enlaces de afiliado o contenido patrocinado, estarán claramente identificados como tales. Actualmente esta funcionalidad no está activa.</p>
    <H2>Independencia editorial</H2>
    <p>Cualquier contenido informativo que publiquemos se mantendrá independiente de acuerdos comerciales, y no comprometeremos la calidad de la información por ingresos de afiliación.</p>
    <H2>Contacto comercial</H2>
    <p>¿Marcas o partners interesados? Escríbenos a <a className="text-primary hover:underline" href={`mailto:${BRAND.contactEmail}`}>{BRAND.contactEmail}</a>.</p>
  </LegalLayout>
);

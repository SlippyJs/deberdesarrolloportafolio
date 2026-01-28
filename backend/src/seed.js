import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Limpiar datos anteriores
    await User.deleteMany({});
    await Post.deleteMany({});

    // Crear usuario admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@portfolio.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✓ Usuario admin creado');

    // Crear posts de ejemplo (Backend)
    const posts = [
      {
        title: 'Implementación de Autenticación con OAuth 2.0 en Node.js',
        slug: 'oauth2-autenticacion-nodejs',
        excerpt: 'Guía completa para implementar autenticación con Google y GitHub',
        content: `# Implementación de Autenticación con OAuth 2.0 en Node.js

La autenticación es uno de los componentes más críticos en cualquier aplicación web moderna. OAuth 2.0 se ha convertido en el estándar de facto para la autenticación descentralizada, permitiendo a los usuarios acceder a aplicaciones sin necesidad de crear nuevas credenciales.

## ¿Qué es OAuth 2.0?

OAuth 2.0 es un protocolo de autorización abierto que permite que usuarios de diferentes plataformas compartan acceso a sus recursos sin revelar sus contraseñas. Es ampliamente utilizado por Google, GitHub, Facebook y otras grandes empresas.

## Ventajas de OAuth 2.0

1. **Seguridad mejorada**: Los usuarios no necesitan compartir contraseñas
2. **Experiencia de usuario simplificada**: Un solo clic para iniciar sesión
3. **Acceso a datos del perfil**: Obtén información básica del usuario automáticamente
4. **Revocación de acceso**: Los usuarios pueden revocar acceso en cualquier momento

## Configuración básica con Google

### Paso 1: Crear las credenciales en Google Cloud Console

\`\`\`bash
# Instalar las dependencias necesarias
npm install passport passport-google-oauth20 express-session
\`\`\`

### Paso 2: Configurar Passport

\`\`\`javascript
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/User.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName,
            profileImage: profile.photos[0]?.value,
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
\`\`\`

### Paso 3: Crear las rutas

\`\`\`javascript
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Autenticación exitosa
    const token = generateJWT(req.user);
    res.redirect(\`\${process.env.FRONTEND_URL}?token=\${token}\`);
  }
);

export default router;
\`\`\`

## Implementación con GitHub

De manera similar a Google, puedes implementar OAuth con GitHub:

\`\`\`javascript
import { Strategy as GitHubStrategy } from 'passport-github2';

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });
        
        if (!user) {
          user = await User.create({
            githubId: profile.id,
            email: profile.emails[0]?.value,
            username: profile.username,
            profileImage: profile.photos[0]?.value,
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
\`\`\`

## Caso de uso: Plataforma de Servicios de Salud

Imagina que estás desarrollando una plataforma de telemedicina. Con OAuth 2.0, los médicos y pacientes pueden:

1. **Registrarse rápidamente** usando su cuenta de Google
2. **Acceder automáticamente** a sus calendarios de Google para programar citas
3. **Compartir información médica** de manera segura sin revelar contraseñas
4. **Integrar notificaciones** a través de Gmail

\`\`\`javascript
// Cuando un usuario se autentica, podríamos acceder a su Google Calendar
async function getSyncMedicalAppointments(user) {
  const { google } = require('googleapis');
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
  );

  oauth2Client.setCredentials({ access_token: user.accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return events.data.items;
}
\`\`\`

## Mejores prácticas

1. **Almacena los tokens de forma segura**: Usa variables de entorno
2. **Implementa refresh tokens**: Los tokens de acceso expiran, necesitas renovarlos
3. **Valida siempre en el backend**: Nunca confíes solo en tokens del frontend
4. **Usa HTTPS en producción**: Los tokens sensibles deben viajar cifrados
5. **Revoca accesos cuando sea necesario**: Implementa un mecanismo de logout

## Conclusión personal

La implementación de OAuth 2.0 me ha permitido crear aplicaciones más seguras y amigables con el usuario. Aunque al principio puede parecer complejo, los beneficios en seguridad y experiencia de usuario lo justifican completamente. En mis proyectos, siempre prefiero OAuth 2.0 sobre autenticación basada en contraseñas simples.

La integración con múltiples proveedores (Google, GitHub, Facebook) amplía el alcance de tu aplicación y mejora la tasa de registro de usuarios. Es una inversión de tiempo que definitivamente vale la pena.`,
        category: 'Backend',
        tags: ['OAuth', 'Autenticación', 'Node.js', 'Seguridad'],
        author: adminUser._id,
        published: true,
        featured: true,
        publishedAt: new Date('2024-01-15'),
      },
      {
        title: 'REST vs GraphQL: Comparativa en APIs Modernas',
        slug: 'rest-vs-graphql-apis',
        excerpt: 'Análisis detallado de las diferencias entre REST y GraphQL',
        content: `# REST vs GraphQL: Comparativa en APIs Modernas

En el desarrollo backend moderno, la elección entre REST y GraphQL es una decisión fundamental que impacta toda la arquitectura de tu aplicación. En este post, te presento un análisis detallado de ambas tecnologías.

## ¿Qué es REST?

REST (Representational State Transfer) es un estilo arquitectónico para diseñar sistemas distribuidos de red. Ha sido el estándar durante décadas y utiliza métodos HTTP estándar.

### Características de REST

- **Múltiples endpoints**: Cada recurso tiene su propio endpoint
- **Métodos HTTP claros**: GET, POST, PUT, DELETE
- **Caché nativa**: Los navegadores pueden cachear fácilmente
- **Simple de entender**: Curva de aprendizaje baja
- **Over-fetching**: A veces obtienes más datos de los que necesitas

## ¿Qué es GraphQL?

GraphQL es un lenguaje de consulta y manipulación de datos desarrollado por Facebook. Permite que el cliente especifique exactamente qué datos necesita.

### Características de GraphQL

- **Un único endpoint**: Toda la API en un solo lugar
- **Queries altamente flexible**: Especifica exactamente qué campos necesitas
- **Tipado fuertemente**: El servidor valida automáticamente
- **Introspección**: Documentación automática
- **Evita over-fetching**: Solo obtienes lo que pides

## Comparación práctica

### Ejemplo en REST

Para obtener información de un usuario con sus posts:

\`\`\`javascript
// Primero obtenemos el usuario
GET /api/users/1
// Respuesta
{
  "id": 1,
  "name": "Juan",
  "email": "juan@example.com",
  "profileImage": "url...",
  "phone": "123456789"
  // Recibimos más datos de los que necesitamos
}

// Luego obtenemos sus posts
GET /api/users/1/posts
// Respuesta
[
  {
    "id": 1,
    "title": "Mi primer post",
    "content": "...",
    "author": { "id": 1, "name": "Juan" },
    "comments": [ {...} ],
    // De nuevo, más datos de los necesarios
  }
]
\`\`\`

### Ejemplo en GraphQL

\`\`\`graphql
query GetUserWithPosts {
  user(id: 1) {
    name
    email
    posts {
      title
      publishedAt
    }
  }
}

# Respuesta (exactamente lo que pedimos)
{
  "data": {
    "user": {
      "name": "Juan",
      "email": "juan@example.com",
      "posts": [
        {
          "title": "Mi primer post",
          "publishedAt": "2024-01-15"
        }
      ]
    }
  }
}
\`\`\`

## Ventajas y Desventajas

### REST

**Ventajas:**
- Fácil de aprender y usar
- Caché HTTP bien soportado
- Depuración sencilla
- Amplia adopción

**Desventajas:**
- Over-fetching de datos
- Under-fetching (requiere múltiples requests)
- Versionamiento complicado

### GraphQL

**Ventajas:**
- Sin over-fetching
- Sin under-fetching
- Flexible y potente
- Documentación automática

**Desventajas:**
- Curva de aprendizaje más pronunciada
- Caché más complicado
- Puede resultar excesivo para APIs simples
- Seguridad requiere atención especial

## Caso de Uso: Sistema de Gestoría

Imagina un sistema para una oficina de gestión jurídica y contable:

### Con REST
\`\`\`javascript
// Obtener cliente y sus documentos
GET /api/clients/123
GET /api/clients/123/documents
GET /api/clients/123/fiscal-status

// Mínimo 3 requests
\`\`\`

### Con GraphQL
\`\`\`graphql
query GetClientInfo {
  client(id: 123) {
    name
    fiscalId
    documents(type: "fiscal") {
      name
      year
      status
    }
    taxStatus {
      declarationsMade
      pendingPayments
    }
  }
}

// Un único request con datos precisos
\`\`\`

## ¿Cuándo usar cada una?

### Usa REST cuando:
- Tu API es simple y bien definida
- Necesitas máxima compatibilidad
- El caché es importante
- Trabajas con equipos pequeños

### Usa GraphQL cuando:
- Tienes múltiples clientes con diferentes necesidades
- Necesitas flexibilidad en los datos
- Trabajas con datos relacionados complejos
- Tu equipo está dispuesto a aprender

## Conclusión personal

En mis proyectos, he utilizado ambas tecnologías con excelentes resultados. Para aplicaciones simples y bien definidas, REST sigue siendo la opción más práctica. Sin embargo, para sistemas complejos con múltiples clientes y requisitos variados, GraphQL ofrece una flexibilidad que REST simplemente no puede proporcionar.

La tendencia en la industria es hacia GraphQL, pero REST no desaparecerá. La clave es elegir la herramienta correcta para tu problema específico.`,
        category: 'Backend',
        tags: ['REST', 'GraphQL', 'API', 'Arquitectura'],
        author: adminUser._id,
        published: true,
        featured: false,
        publishedAt: new Date('2024-01-20'),
      },
    ];

    await Post.create(posts);
    console.log('✓ Posts de ejemplo creados');

    await mongoose.disconnect();
    console.log('✓ Base de datos seeded correctamente');
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
};

seedDatabase();

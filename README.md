# 🎓 Portafolio Profesional - Juan Carlos Banda Guamán

Portafolio profesional completo de estudiante de desarrollo de software, con hoja de vida interactiva, blog técnico y panel de administración.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Documentación de API](#documentación-de-api)
- [Guía de Uso](#guía-de-uso)
- [Blog Posts](#blog-posts)
- [Seguridad](#seguridad)
- [Despliegue](#despliegue)

## ✨ Características

### Frontend
- ✅ Interfaz responsiva con React + Vite
- ✅ Diseño moderno con Tailwind CSS
- ✅ Navegación con React Router
- ✅ Sistema de autenticación con JWT
- ✅ Blog con soporte para Markdown
- ✅ Panel de administración protegido
- ✅ Custom hooks para gestión de estado
- ✅ Context API para autenticación

### Backend
- ✅ API RESTful con Express.js
- ✅ Validación de entrada con express-validator
- ✅ Autenticación con JWT
- ✅ Middleware de seguridad (Helmet, CORS, Rate Limiting)
- ✅ Manejo centralizado de errores
- ✅ Base de datos MongoDB con Mongoose
- ✅ Bcrypt para hash de contraseñas
- ✅ Documentación completa de endpoints

### Blog
- 📝 2 posts predefinidos (OAuth 2.0 y REST vs GraphQL)
- 📝 Sistema para crear, editar y eliminar posts
- 📝 Soporte completo para Markdown
- 📝 Categorización de posts
- 📝 Sistema de tags
- 📝 Contador de vistas

## 📦 Requisitos

- Node.js (v16 o superior)
- npm o yarn
- MongoDB Atlas (cuenta gratuita disponible)
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd desarrollowebdeberportafolio
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tu URL de MongoDB
nano .env
```

Archivo `.env` necesario:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=tu_secreto_muy_seguro_aqui
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Configurar Frontend

```bash
# Volver a la carpeta raíz
cd ../frontend

# Instalar dependencias
npm install
```

### 4. Ejecutar la aplicación

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# El servidor estará en http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# La aplicación estará en http://localhost:5173
```

### 5. Seed de datos (opcional)

```bash
cd backend
npm run seed
```

Credenciales de demostración:
- Email: `admin@portfolio.com`
- Contraseña: `admin123`

## 📁 Estructura del Proyecto

```
desarrollowebdeberportafolio/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── middleware/      # Autenticación y errores
│   │   ├── models/          # Esquemas de MongoDB
│   │   ├── routes/          # Definición de rutas
│   │   ├── index.js         # Servidor principal
│   │   └── seed.js          # Datos iniciales
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   ├── hooks/           # Custom hooks
│   │   ├── context/         # Context API
│   │   ├── utils/           # Utilidades (API, etc)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Express.js** (4.18.2) - Framework web
- **MongoDB + Mongoose** (7.5.0) - Base de datos
- **JWT** (9.0.2) - Autenticación
- **Bcryptjs** (2.4.3) - Hash de contraseñas
- **Helmet** (7.0.0) - Seguridad HTTP
- **CORS** (2.8.5) - Control de acceso
- **express-rate-limit** (7.0.0) - Limitación de solicitudes
- **express-validator** (7.0.0) - Validación de datos

### Frontend
- **React** (18.2.0) - Librería UI
- **Vite** (4.4.0) - Bundler rápido
- **React Router** (6.16.0) - Enrutamiento
- **Tailwind CSS** (3.3.0) - Estilos
- **Axios** (1.5.0) - Cliente HTTP
- **React Markdown** (9.0.0) - Renderizado de Markdown
- **React Icons** (4.12.0) - Iconos

## 📚 Documentación de API

### Autenticación

#### Registrar usuario
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "tu_usuario",
  "email": "tu@email.com",
  "password": "contraseña123"
}

Response: { user, token }
```

#### Iniciar sesión
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "tu@email.com",
  "password": "contraseña123"
}

Response: { user, token }
```

#### Obtener perfil
```
GET /api/auth/profile
Authorization: Bearer {token}

Response: { id, username, email, role }
```

### Información Personal (Bio)

#### Obtener bio
```
GET /api/bio
Response: { firstName, lastName, email, phone, location, about, skills, experience, education, socialLinks }
```

#### Actualizar bio (Admin)
```
PUT /api/bio
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Juan",
  "lastName": "Banda",
  "email": "correo@example.com",
  "phone": "+593 962782992",
  "location": "Quito, Ecuador",
  "about": "Descripción del perfil"
}
```

### Blog Posts

#### Obtener todos los posts
```
GET /api/posts?category=Backend&featured=false
Response: [{ title, slug, excerpt, content, author, category, tags, viewCount, publishedAt }]
```

#### Obtener post por slug
```
GET /api/posts/mi-primer-post
Response: { title, content, author, viewCount, ... }
```

#### Crear post (Admin)
```
POST /api/posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Título del post",
  "excerpt": "Breve descripción",
  "content": "Contenido en Markdown...",
  "category": "Backend",
  "tags": ["tag1", "tag2"]
}
```

#### Actualizar post
```
PUT /api/posts/{id}
Authorization: Bearer {token}

{
  "title": "Nuevo título",
  "content": "Nuevo contenido...",
  "published": true
}
```

#### Eliminar post
```
DELETE /api/posts/{id}
Authorization: Bearer {token}
```

## 🎯 Guía de Uso

### Acceder como Usuario

1. Visita `http://localhost:5173`
2. Explora tu perfil profesional
3. Lee los posts del blog
4. Consulta tu información de contacto

### Acceder como Administrador

1. Haz clic en "Login" en la navegación
2. Usa las credenciales:
   - Email: `admin@portfolio.com`
   - Contraseña: `admin123`
3. Accede al panel de administración
4. Edita tu información personal
5. Crea nuevos posts en el blog

### Crear un Nuevo Post

1. Ve a Admin → Blog Posts
2. Rellena el formulario:
   - **Título**: Título del artículo
   - **Categoría**: Elige entre Backend, Frontend, DevOps, etc.
   - **Extracto**: Breve descripción
   - **Tags**: Palabras clave separadas por comas
   - **Contenido**: Escribe en Markdown
3. Haz clic en "Crear Post"
4. El post se guardará como borrador
5. Puedes editarlo después para publicarlo

## 📝 Blog Posts

### Post 1: Implementación de Autenticación con OAuth 2.0 en Node.js

**Autor:** Juan Carlos Banda Guamán  
**Categoría:** Backend  
**Descripción:** Guía completa para implementar autenticación OAuth 2.0 en aplicaciones Node.js, con ejemplos prácticos en contexto de plataformas de telemedicina.

**Temas cubiertos:**
- ¿Qué es OAuth 2.0?
- Ventajas de OAuth sobre autenticación básica
- Configuración con Google
- Configuración con GitHub
- Caso de uso: Sistema de Salud
- Mejores prácticas de seguridad

### Post 2: REST vs GraphQL: Comparativa en APIs Modernas

**Autor:** Juan Carlos Banda Guamán  
**Categoría:** Backend  
**Descripción:** Análisis profundo de las diferencias entre REST y GraphQL, con ejemplos comparativos y casos de uso específicos en sistemas de gestoría.

**Temas cubiertos:**
- Características de REST
- Características de GraphQL
- Comparación práctica
- Ventajas y desventajas
- Caso de uso: Sistema de Gestoría
- Cuándo usar cada una
- Conclusión personal

## 🔐 Seguridad

El proyecto implementa múltiples capas de seguridad:

### Backend
- **Helmet.js**: Protege contra vulnerabilidades HTTP comunes
- **CORS**: Control estricto de origen de solicitudes
- **Rate Limiting**: Limita solicitudes por IP
- **Bcryptjs**: Hash seguro de contraseñas (10 salts)
- **JWT**: Tokens con expiración
- **express-validator**: Validación y sanitización de datos
- **HTTPS Ready**: Preparado para HTTPS en producción

### Frontend
- **localStorage seguro**: Solo almacena token de sesión
- **XSS Prevention**: Uso de componentes seguros
- **CSRF Tokens**: Preparado para CSRF
- **Sanitización**: React previene inyecciones por defecto
- **Variables de entorno**: Secretos no expuestos en código

### Mejores Prácticas
- ✅ Contraseñas hash con bcrypt
- ✅ JWT con expiración (7 días)
- ✅ Validación en servidor
- ✅ Middleware de autenticación
- ✅ Roles de usuario (admin/user)
- ✅ Variables de entorno protegidas

## 🚀 Despliegue

Este proyecto está desplegado en producción en:
- **Frontend:** https://deberdesarrolloportafolio.vercel.app
- **Backend:** https://portfolio-backend-6qbc.onrender.com
- **Base de Datos:** MongoDB Atlas

### Proceso de Despliegue Realizado

#### 1. **Base de Datos - MongoDB Atlas**
```
✅ Configurada en: mongodb+srv://portafolio:***@portfolio.kblmxai.mongodb.net/
✅ Cluster: portfolio
✅ Servidor: Render
```

#### 2. **Backend - Render**

1. Crear cuenta en [Render](https://render.com)
2. Conectar repositorio GitHub: `https://github.com/SlippyJs/deberdesarrolloportafolio`
3. Crear nuevo Web Service
4. Configuración:
   - **Name:** `portfolio-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run start`
   - **Environment:** Node

5. Variables de Entorno:
```env
MONGODB_URI=mongodb+srv://portafolio:674983152a@portfolio.kblmxai.mongodb.net/?appName=portfolio
JWT_SECRET=portfolio_jwt_secret_super_seguro_2024_SlippyJs_deberdesarrollo
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://deberdesarrolloportafolio.vercel.app
```

6. El backend se despliega automáticamente con cada push a `main`

**URL de Producción:** https://portfolio-backend-6qbc.onrender.com

#### 3. **Frontend - Vercel**

1. Crear cuenta en [Vercel](https://vercel.com)
2. Conectar repositorio GitHub
3. Importar proyecto
4. Configuración:
   - **Project Name:** `deberdesarrolloportafolio`
   - **Framework:** Vite
   - **Root Directory:** `frontend`

5. Variables de Entorno:
```env
VITE_API_URL=https://portfolio-backend-6qbc.onrender.com/api
```

6. Vercel despliega automáticamente con cada push

**URL de Producción:** https://deberdesarrolloportafolio.vercel.app

#### 4. **Configuración de CORS**

Se implementó CORS flexible en el backend para permitir solicitudes desde:
- `https://deberdesarrolloportafolio.vercel.app` (producción)
- `http://localhost:5173` (desarrollo)
- `http://localhost:3000` (desarrollo alternativo)

Código en `backend/src/index.js`:
```javascript
const allowedOrigins = [
  'https://deberdesarrolloportafolio.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS no permitido'));
      }
    },
    credentials: true,
  })
);
```

#### 5. **Configuración del Frontend**

**Archivo: `frontend/.env`**
```env
VITE_API_URL=https://portfolio-backend-6qbc.onrender.com/api
```

**Archivo: `frontend/vercel.json`**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "https://portfolio-backend-6qbc.onrender.com/api"
  }
}
```

**Archivo: `frontend/src/utils/api.js`**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-6qbc.onrender.com/api';
```

### Flujo de Despliegue Automático

```
Local → Git Push → GitHub
                     ↓
         ┌───────────┴───────────┐
         ↓                       ↓
      Render                  Vercel
      (Backend)              (Frontend)
         ↓                       ↓
    Compilar                  Compilar
    Desplegar                 Desplegar
         ↓                       ↓
    En Vivo 🟢                En Vivo 🟢
```

### Verificar Estado del Despliegue

**Backend - Logs en Render:**
```
✓ Conectado a MongoDB
🚀 Servidor corriendo en http://localhost:10000
📚 API disponible en http://localhost:10000/api
==> Your service is live 🎉
```

**Frontend - Build en Vercel:**
- Acceder a: https://deberdesarrolloportafolio.vercel.app
- Debería cargar tu portafolio sin errores
- Console sin errores CORS

### Solución de Problemas

**Error: Network Error**
- Verificar que el backend está en "Live" (verde en Render)
- Verificar que `VITE_API_URL` es correcto en Vercel

**Error: CORS Policy**
- Verificar que `FRONTEND_URL` en Render es `https://deberdesarrolloportafolio.vercel.app`
- Verificar que el origen está en `allowedOrigins` en `index.js`

**Base de Datos Desconectada**
- Verificar que `MONGODB_URI` es válida
- Verificar que MongoDB Atlas permite IP de Render (0.0.0.0/0 en network access)

### Comandos Git para Despliegue

```bash
# Ver cambios
git status

# Añadir cambios
git add .

# Hacer commit
git commit -m "Descripción de cambios"

# Hacer push (dispara despliegue automático)
git push origin main
```

Cada push a la rama `main` dispara automáticamente:
- ✅ Build en Render (Backend)
- ✅ Build en Vercel (Frontend)

## 📊 Diagrama de Flujo

```
Usuario (Frontend - React/Vite)
         ↓
    [Navbar]
         ↓
  ┌──────┴──────────────┬──────────────┐
  ↓                     ↓              ↓
[Home]            [Blog/Posts]   [Admin Panel]
  ↓                     ↓              ↓
[Bio Info]        [Post Detail]  [Protected Route]
  ↓                     ↓              ↓
  └─────────────────────┴──────────────┘
              ↓
          [Auth API]
              ↓
    Backend (Express.js)
         ↓
    [Middleware]
    - Auth JWT
    - Validación
    - Errores
         ↓
    [Controllers]
    - Auth
    - Bio
    - Posts
         ↓
    [Database - MongoDB]
    - Users
    - Bio
    - Posts
```

## 🎓 Conclusión

Este portafolio demuestra conocimientos en:

- ✅ **Frontend:** React, Vite, Tailwind CSS, React Router
- ✅ **Backend:** Express.js, Node.js, validación
- ✅ **Base de Datos:** MongoDB, Mongoose, schémas
- ✅ **Seguridad:** JWT, bcrypt, CORS, Helmet
- ✅ **API REST:** Diseño, documentación, mejores prácticas
- ✅ **Autenticación:** Sistemas de login seguros
- ✅ **Diseño Responsivo:** Mobile-first approach
- ✅ **Documentación:** README completo y comentarios de código

## 📄 Licencia

Este proyecto es de uso personal y educativo.

## 👤 Autor

**Juan Carlos Banda Guamán**
- Email: juanitoalcachofaa_100@outlook.com
- Teléfono: +593 962782992
- Ubicación: Quito, Ecuador
- Estudiante de Desarrollo de Software

---

**Última actualización:** Enero 28, 2026

# 🚀 Guía Rápida de Inicio

## Pasos para iniciar el proyecto en tu máquina

### 1️⃣ Preparar Backend

```bash
# Navega a la carpeta backend
cd backend

# Instala dependencias
npm install

# Crea el archivo .env copiando el ejemplo
# ⚠️ IMPORTANTE: Edita .env y añade tu URL de MongoDB

# Archivo .env debe contener:
MONGODB_URI=mongodb+srv://tuusername:tupassword@tucluster.mongodb.net/portfolio
JWT_SECRET=tunumerosecretoaqui
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Opcionalmente: carga datos de ejemplo
npm run seed

# Inicia el servidor de desarrollo
npm run dev
```

**El backend estará en:** `http://localhost:5000`

### 2️⃣ Preparar Frontend

```bash
# En otra terminal, navega a frontend
cd frontend

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

**El frontend estará en:** `http://localhost:5173`

### 3️⃣ Acceder a la aplicación

Abre tu navegador y ve a: **http://localhost:5173**

### 4️⃣ Credenciales de demostración

Para acceder al panel admin:

**Email:** `admin@portfolio.com`  
**Contraseña:** `admin123`

---

## 📋 Checklist de Requisitos Cumplidos

### ✅ Frontend (20 puntos)
- ✅ React + Vite + Tailwind CSS
- ✅ React Router para navegación
- ✅ useState y useEffect
- ✅ Custom hooks (useAuth, useApi)
- ✅ Comunicación con backend mediante Axios

### ✅ Backend/API (25 puntos)
- ✅ API RESTful con Express.js
- ✅ Validación con express-validator
- ✅ Helmet para seguridad
- ✅ CORS configurado
- ✅ express-rate-limit
- ✅ Manejo centralizado de errores

### ✅ Autenticación (10 puntos)
- ✅ Sistema de login usuario/contraseña
- ✅ Rutas de admin protegidas
- ✅ JWT para tokens seguros
- ✅ Bcrypt para contraseñas

### ✅ Base de Datos (15 puntos)
- ✅ MongoDB + Mongoose
- ✅ Modelos: User, Bio, Post
- ✅ Documentado en README

### ✅ Seguridad (10 puntos)
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Protección XSS
- ✅ Variables de entorno
- ✅ CORS configurado

### ✅ Funcionalidades (20 puntos)
- ✅ Hoja de vida con experiencia, educación, habilidades
- ✅ Blog técnico con 4 posts (2 ya incluidos)
- ✅ Interfaz de administración
- ✅ Edición de perfil y posts
- ✅ Diseño responsive

### ✅ Blog Posts (20 puntos)
- ✅ Post 1: "OAuth 2.0 en Node.js" (1000+ palabras, ejemplos, casos prácticos)
- ✅ Post 2: "REST vs GraphQL" (1000+ palabras, comparativa, casos prácticos)

---

## 🔧 Variables de Entorno Necesarias

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=tu_secreto_muy_seguro_aqui_cambiar_en_produccion
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (crear .env.local si es necesario)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📖 Rutas Disponibles

### Frontend
- `/` - Página de inicio (perfil)
- `/blog` - Lista de blog posts
- `/blog/:slug` - Detalle de un post
- `/login` - Página de login
- `/admin` - Panel de administración (protegido)

### Backend API
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil
- `GET /api/bio` - Obtener información personal
- `PUT /api/bio` - Actualizar información (admin)
- `GET /api/posts` - Obtener todos los posts
- `GET /api/posts/:slug` - Obtener un post específico
- `POST /api/posts` - Crear post (admin)
- `PUT /api/posts/:id` - Actualizar post (admin)
- `DELETE /api/posts/:id` - Eliminar post (admin)

---

## 🎯 Próximos Pasos (No incluidos, pero sugeridos)

1. **Desplegar en la nube:**
   - Frontend en Vercel
   - Backend en Render o Railway
   - BD en MongoDB Atlas

2. **Mejoras futuras:**
   - Comentarios en posts
   - Buscar posts
   - Categorías avanzadas
   - Sistema de subscripción

---

## 🆘 Solución de Problemas

### "Error de conexión a MongoDB"
- Verifica tu MONGODB_URI en .env
- Asegúrate de que MongoDB Atlas tiene tu IP whitelisted
- Revisa que las credenciales sean correctas

### "CORS error"
- El backend debe estar corriendo en http://localhost:5000
- El frontend debe estar en http://localhost:5173
- Los valores en FRONTEND_URL y VITE_API_URL deben coincidir

### "Error de módulos no encontrados"
- Ejecuta `npm install` en ambas carpetas
- Elimina `node_modules` y `package-lock.json`
- Vuelve a ejecutar `npm install`

---

¡Listo! Tu portafolio está completamente funcional. 🎉

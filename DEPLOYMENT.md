# 🚀 Guía de Despliegue en Producción

## Backend en Render

### Paso 1: Conectar Render con GitHub
1. Ve a https://render.com
2. Haz clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Selecciona la rama `main`
5. Configura:
   - **Name**: `portfolio-backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`
   - **Environment**: `Node`

### Paso 2: Añadir Variables de Entorno
En Render, ve a **"Environment"** y añade:
```
MONGODB_URI=mongodb+srv://portafolio:674983152a@portfolio.kblmxai.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_muy_seguro_en_produccion_cambiar_esto
NODE_ENV=production
FRONTEND_URL=https://tu-dominio-vercel.vercel.app
```

### Paso 3: Deploy
Render desplegará automáticamente. Tu backend estará en:
```
https://portfolio-backend.onrender.com
```

---

## Frontend en Vercel

### Paso 1: Conectar Vercel con GitHub
1. Ve a https://vercel.com
2. Haz clic en **"New Project"**
3. Importa tu repositorio de GitHub
4. Selecciona como root directory: `./frontend`

### Paso 2: Configurar Variablees de Entorno
En Vercel, ve a **"Settings"** → **"Environment Variables"** y añade:
```
VITE_API_URL=https://portfolio-backend.onrender.com/api
```

### Paso 3: Deploy
Vercel desplegará automáticamente. Tu frontend estará en:
```
https://tu-proyecto.vercel.app
```

---

## Actualizar URLs después del Despliegue

Una vez tengas las URLs de producción:

1. **Backend**: Actualiza `FRONTEND_URL` en Render con tu URL de Vercel
2. **Frontend**: Actualiza `VITE_API_URL` en Vercel con tu URL de Render
3. Ambos se redespliegan automáticamente

---

## Verificar que todo funciona

1. Abre tu frontend en Vercel
2. Intenta cargar la página de inicio (debe cargar tu perfil)
3. Intenta iniciar sesión
4. Crea un post en el admin

¡Listo! Tu portafolio está en producción! 🎉

# Explora Cauca Portal

Portal web para exploración turística del departamento del Cauca, Colombia.

## 🚀 Despliegue en Vercel

### Configuración de Variables de Entorno

En tu proyecto de Vercel, configura las siguientes variables de entorno:

\`\`\`
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/explora-cauca
\`\`\`

### Pasos para Desplegar

1. **Conectar Repositorio:**
   - Conecta tu repositorio de GitHub con Vercel
   - Vercel detectará automáticamente que es un proyecto Next.js

2. **Configurar Variables de Entorno:**
   - Ve a Settings > Environment Variables
   - Agrega `MONGODB_URI` con tu string de conexión de MongoDB Atlas

3. **Desplegar:**
   - Vercel desplegará automáticamente en cada push
   - El proyecto funcionará con o sin base de datos (modo fallback)

## 🛠️ Desarrollo Local

\`\`\`bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
\`\`\`

## 📦 Características

- ✅ **Funciona sin base de datos** (modo demo para Vercel)
- ✅ **Optimizado para serverless** (Vercel Functions)
- ✅ **Autenticación con fallback** (usuarios mock)
- ✅ **Responsive design** para todos los dispositivos
- ✅ **Búsqueda avanzada** de municipios
- ✅ **Sistema de reservas** integrado

## 🔧 Tecnologías

- **Frontend:** Next.js 14, React 19, Tailwind CSS
- **Backend:** MongoDB con Mongoose
- **Autenticación:** JWT con bcrypt
- **UI:** Radix UI + shadcn/ui
- **Despliegue:** Vercel

## 📱 Funcionalidades

- 🏛️ **Portal Turístico** - Exploración de municipios del Cauca
- 🔍 **Búsqueda Avanzada** - Filtros por categoría, rating, dificultad
- 🗺️ **Mapas Interactivos** - Integración con Google Maps
- 🏨 **Sistema de Hoteles** - Gestión de alojamientos
- 📋 **Reservas** - Sistema completo de reservas turísticas
- 👤 **Autenticación** - Registro y login de usuarios
- ⚙️ **Configuración** - Preferencias personalizadas
- 📊 **Panel Admin** - Gestión administrativa

## 🌟 Demo

El proyecto incluye datos de ejemplo y funciona completamente sin configuración adicional.

**Usuarios de prueba:**
- Admin: `admin@example.com` / `password`
- Usuario: `juan@example.com` / `password`

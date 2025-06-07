# 🗄️ Configuración de MongoDB para Explora Cauca

## 🚀 Opción 1: MongoDB Atlas (Recomendado)

### Paso 1: Crear cuenta en MongoDB Atlas
1. Ve a [MongoDB Atlas](https://cloud.mongodb.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto llamado "Explora Cauca"

### Paso 2: Crear un cluster
1. Haz clic en "Build a Database"
2. Selecciona "M0 Sandbox" (gratis)
3. Elige una región cercana (ej: Virginia, N. Virginia)
4. Nombra tu cluster "explora-cauca"

### Paso 3: Configurar acceso
1. **Crear usuario de base de datos:**
   - Ve a "Database Access"
   - Haz clic en "Add New Database User"
   - Método: Password
   - Usuario: `exploracauca`
   - Contraseña: Genera una segura
   - Rol: "Atlas admin"

2. **Configurar IP Whitelist:**
   - Ve a "Network Access"
   - Haz clic en "Add IP Address"
   - Selecciona "Allow access from anywhere" (0.0.0.0/0)
   - O agrega tu IP específica

### Paso 4: Obtener string de conexión
1. Ve a "Database" → "Connect"
2. Selecciona "Connect your application"
3. Driver: Node.js, Version: 5.5 or later
4. Copia el string de conexión
5. Reemplaza `<password>` con tu contraseña real

### Paso 5: Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

\`\`\`env
MONGODB_URI=mongodb+srv://exploracauca:TU_CONTRASEÑA@explora-cauca.xxxxx.mongodb.net/explora-cauca
OPENAI_API_KEY=tu_openai_api_key
\`\`\`

---

## 🏠 Opción 2: MongoDB Local

### Paso 1: Instalar MongoDB
**Windows:**
1. Descarga MongoDB Community Server desde [mongodb.com](https://www.mongodb.com/try/download/community)
2. Ejecuta el instalador
3. Selecciona "Complete" setup
4. Instala MongoDB Compass (GUI opcional)

**macOS:**
\`\`\`bash
# Usando Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
\`\`\`

**Linux (Ubuntu):**
\`\`\`bash
# Importar clave pública
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Crear archivo de lista
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Actualizar e instalar
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar servicio
sudo systemctl start mongod
sudo systemctl enable mongod
\`\`\`

### Paso 2: Verificar instalación
\`\`\`bash
# Verificar que MongoDB esté ejecutándose
mongosh

# Deberías ver algo como:
# Current Mongosh Log ID: xxxxx
# Connecting to: mongodb://127.0.0.1:27017/?directConnection=true
\`\`\`

### Paso 3: Configurar variables de entorno
Crea un archivo `.env.local`:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/explora-cauca
OPENAI_API_KEY=tu_openai_api_key
\`\`\`

---

## 🧪 Verificar Conexión

### Paso 1: Instalar dependencias
\`\`\`bash
npm install mongoose bcryptjs
npm install -D @types/bcryptjs
\`\`\`

### Paso 2: Probar conexión
\`\`\`bash
npm run test-connection
\`\`\`

### Paso 3: Inicializar datos
\`\`\`bash
npm run seed
\`\`\`

---

## 🔧 Troubleshooting

### Error: "MongoServerSelectionError"
- **MongoDB Atlas:** Verifica IP whitelist y credenciales
- **MongoDB Local:** Asegúrate de que MongoDB esté ejecutándose

### Error: "Authentication failed"
- Verifica usuario y contraseña en MongoDB Atlas
- Asegúrate de que el usuario tenga permisos correctos

### Error: "Connection string is invalid"
- Verifica el formato de MONGODB_URI
- Asegúrate de escapar caracteres especiales en la contraseña

### MongoDB local no inicia
\`\`\`bash
# Windows
net start MongoDB

# macOS
brew services restart mongodb/brew/mongodb-community

# Linux
sudo systemctl restart mongod
\`\`\`

---

## 📊 Verificar que todo funciona

1. **Conexión exitosa:** Deberías ver "✅ Conexión exitosa a MongoDB!"
2. **Datos inicializados:** Ejecuta `npm run seed` sin errores
3. **Login funcional:** Prueba con `admin@example.com` / `123456`
4. **Chatbot con historial:** Las conversaciones se guardan entre sesiones

---

## 🔐 Seguridad

### Para producción:
1. **Nunca** uses "Allow access from anywhere" en Atlas
2. Usa contraseñas fuertes para usuarios de BD
3. Configura IP whitelist específica
4. Considera usar MongoDB Atlas con VPC peering
5. Habilita autenticación en MongoDB local

### Variables de entorno seguras:
- Nunca subas `.env.local` a Git
- Usa diferentes bases de datos para desarrollo/producción
- Rota credenciales regularmente
\`\`\`

Vamos a actualizar el package.json para incluir los scripts de MongoDB:

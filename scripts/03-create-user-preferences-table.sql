-- Crear tabla de preferencias de usuario
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  notifications_email BOOLEAN DEFAULT true,
  notifications_push BOOLEAN DEFAULT false,
  notifications_sms BOOLEAN DEFAULT false,
  privacy_profile_visible BOOLEAN DEFAULT true,
  privacy_activity_visible BOOLEAN DEFAULT false,
  language VARCHAR(10) DEFAULT 'es',
  theme VARCHAR(20) DEFAULT 'system',
  region VARCHAR(50) DEFAULT 'cauca',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_user_preferences_updated_at 
    BEFORE UPDATE ON user_preferences 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

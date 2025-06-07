-- Insertar usuarios de ejemplo (contraseña: 123456)
-- Hash generado con bcrypt para la contraseña "123456"
INSERT INTO users (email, password_hash, name, role, phone) VALUES
('juan@example.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqu', 'Juan Pérez', 'user', '+57 300 123 4567'),
('admin@example.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqu', 'María González', 'admin', '+57 301 987 6543')
ON CONFLICT (email) DO NOTHING;

-- Insertar preferencias por defecto para los usuarios
INSERT INTO user_preferences (user_id, notifications_email, privacy_profile_visible) 
SELECT id, true, true FROM users 
ON CONFLICT (user_id) DO NOTHING;

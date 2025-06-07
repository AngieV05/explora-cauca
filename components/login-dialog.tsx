"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { login, register, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Estados para login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Estados para registro
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!loginData.email || !loginData.password) {
      setError("Por favor completa todos los campos")
      return
    }

    const result = await login(loginData.email, loginData.password)
    if (result.success) {
      setSuccess("¡Inicio de sesión exitoso!")
      setTimeout(() => {
        onOpenChange(false)
        setLoginData({ email: "", password: "" })
        setSuccess("")
      }, 1000)
    } else {
      setError(result.error || "Error al iniciar sesión")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!registerData.name || !registerData.email || !registerData.password) {
      setError("Por favor completa todos los campos obligatorios")
      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (registerData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    const result = await register(registerData.email, registerData.password, registerData.name, registerData.phone)
    if (result.success) {
      setSuccess("¡Registro exitoso! Iniciando sesión...")
      setTimeout(() => {
        onOpenChange(false)
        setRegisterData({ name: "", email: "", phone: "", password: "", confirmPassword: "" })
        setSuccess("")
      }, 1000)
    } else {
      setError(result.error || "Error al registrar usuario")
    }
  }

  const resetForms = () => {
    setLoginData({ email: "", password: "" })
    setRegisterData({ name: "", email: "", phone: "", password: "", confirmPassword: "" })
    setError("")
    setSuccess("")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        if (!open) resetForms()
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Acceder a Explora Cauca</DialogTitle>
          <DialogDescription>
            Inicia sesión o crea una cuenta para acceder a todas las funcionalidades
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Correo electrónico</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              <p>Usuarios de prueba:</p>
              <p>admin@example.com / 123456</p>
              <p>juan@example.com / 123456</p>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nombre completo *</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Correo electrónico *</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Teléfono</Label>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Contraseña *</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirmar contraseña *</Label>
                <Input
                  id="register-confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  "Crear Cuenta"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

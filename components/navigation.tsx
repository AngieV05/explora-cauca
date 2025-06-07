"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { ModeToggle } from "./mode-toggle"
import { SearchDialog, useSearchShortcut } from "./search-dialog"

// Add imports for auth components
import { LoginDialog } from "./login-dialog"
import { UserMenu } from "./user-menu"
import { useAuth } from "./auth-provider"

// Actualizar las rutas para incluir las nuevas secciones
const routes = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Turismo",
    path: "/turismo",
  },
  {
    name: "Mapa",
    path: "/mapa",
  },
  {
    name: "Hoteles",
    path: "/hoteles",
  },
  {
    name: "Reservas",
    path: "/reservas",
  },
]

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  // Usar el hook para atajos de teclado
  useSearchShortcut()

  // Solo mostrar Archivos y Datos si el usuario está logueado
  const authenticatedRoutes = [
    {
      name: "Archivos",
      path: "/archivos",
    },
    {
      name: "Datos",
      path: "/datos",
    },
  ]

  const allRoutes = user ? [...routes, ...authenticatedRoutes] : routes

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setOpen(false)}>
                  <span>Explora Cauca</span>
                </Link>
                <div className="grid gap-3">
                  {allRoutes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      className={cn("flex items-center gap-2", pathname === route.path && "text-primary")}
                      onClick={() => setOpen(false)}
                    >
                      {route.name}
                    </Link>
                  ))}
                </div>
                {/* Búsqueda en móvil */}
                <div className="mt-4">
                  <SearchDialog />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span>Explora Cauca</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {allRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* Búsqueda en desktop */}
          <div className="hidden md:block" data-search-trigger>
            <SearchDialog />
          </div>
          <ModeToggle />
          {user ? <UserMenu /> : <LoginDialog />}
        </div>
      </div>
    </header>
  )
}

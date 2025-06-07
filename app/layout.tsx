import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Explora Cauca - Portal Turístico",
  description:
    "Portal web para exploración turística del Cauca, gestión de archivos y procesamiento de datos con chatbot IA",
  keywords: ["Cauca", "turismo", "Colombia", "viajes", "cultura", "naturaleza"],
  authors: [{ name: "Explora Cauca Team" }],
  openGraph: {
    title: "Explora Cauca - Portal Turístico",
    description: "Descubre los mejores destinos turísticos del Cauca con nuestro portal inteligente",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Explora Cauca. Todos los derechos reservados.
                  </p>
                  <p className="text-sm text-muted-foreground">Portal turístico inteligente del Cauca</p>
                </div>
              </footer>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

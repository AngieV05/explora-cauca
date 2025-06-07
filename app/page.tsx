import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Camera, BarChart3, Users, Palmtree, Mountain, Church } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section con la imagen principal */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/explora-cauca-hero.png"
            alt="Explora Cauca - Paisaje Cultural"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        {/* Contenido del Hero */}
        <div className="relative z-20 flex h-full items-center">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                Explora
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Cauca
                </span>
              </h1>
              <p className="mt-6 text-xl text-white/90 sm:text-2xl">
                Descubre la magia del departamento más diverso de Colombia. Desde sus montañas sagradas hasta su rica
                cultura ancestral.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0"
                >
                  <Link href="/turismo">
                    <Palmtree className="mr-2 h-5 w-5" />
                    Explorar Destinos
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/archivos">
                    <Camera className="mr-2 h-5 w-5" />
                    Gestionar Archivos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-6 w-4 rounded-full border-2 border-white/50">
            <div className="mx-auto mt-1 h-2 w-1 rounded-full bg-white/50"></div>
          </div>
        </div>
      </section>

      {/* Sección de características principales */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Un Portal Completo para el
              <span className="block text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
                Turismo Caucano
              </span>
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Conectamos la riqueza natural, cultural e histórica del Cauca con herramientas modernas de gestión y
              análisis de datos turísticos.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <Mountain className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Exploración Turística</CardTitle>
                <CardDescription>Descubre los tesoros naturales y culturales del Cauca</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <div className="h-full w-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                    <Church className="h-16 w-16 text-white/80" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Desde el Parque Nacional Natural Puracé hasta las calles coloniales de Popayán, explora cada rincón de
                  nuestra tierra sagrada.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <Link href="/turismo">
                    <MapPin className="mr-2 h-4 w-4" />
                    Explorar Destinos
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <Camera className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Gestión de Archivos</CardTitle>
                <CardDescription>Organiza y administra contenido multimedia</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <div className="h-full w-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-white/80" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sistema completo para la carga, organización y gestión de archivos relacionados con proyectos
                  turísticos y de desarrollo regional.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                >
                  <Link href="/archivos">
                    <Camera className="mr-2 h-4 w-4" />
                    Gestionar Archivos
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Análisis de Datos</CardTitle>
                <CardDescription>Visualiza y procesa información turística</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <div className="h-full w-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-white/80" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Herramientas avanzadas para el procesamiento, análisis y visualización de datos relacionados con el
                  turismo y desarrollo sostenible.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  <Link href="/datos">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analizar Datos
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección de estadísticas */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">El Cauca en Números</h2>
            <p className="text-xl opacity-90 mb-12">Descubre la riqueza de nuestro departamento</p>

            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">42</div>
                <div className="text-lg opacity-90">Municipios</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1.4M</div>
                <div className="text-lg opacity-90">Habitantes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">29,308</div>
                <div className="text-lg opacity-90">km² de territorio</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Atractivos turísticos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action final */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">¿Listo para Explorar el Cauca?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de viajeros que ya han descubierto la magia de nuestro departamento. Comienza tu aventura hoy
            mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Link href="/turismo">
                <Users className="mr-2 h-5 w-5" />
                Comenzar Exploración
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contacto">Contactar Soporte</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

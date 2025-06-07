import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Clock, Users, Mountain, Church, Waves, TreePine, Search } from "lucide-react"

// Lista completa de los 42 municipios del Cauca con slugs corregidos
const municipiosCauca = [
  {
    id: 1,
    nombre: "Popayán",
    slug: "popayan",
    descripcion: "Capital del departamento, Ciudad Blanca de Colombia con arquitectura colonial única.",
    imagen: "/images/popayan-centro-historico.png",
    categoria: "ciudad",
    rating: 4.9,
    tiempo: "1-2 días",
    dificultad: "Fácil",
    destacado: true,
    poblacion: "280,000",
    altitud: "1,760 msnm",
  },
  {
    id: 2,
    nombre: "Silvia",
    slug: "silvia",
    descripcion: "Pueblo guambiano famoso por su mercado indígena y cultura ancestral.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "cultura",
    rating: 4.7,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: true,
    poblacion: "35,000",
    altitud: "2,621 msnm",
  },
  {
    id: 3,
    nombre: "Puracé",
    slug: "purace",
    descripcion: "Hogar del Parque Nacional Natural Puracé con volcanes activos y aguas termales.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "naturaleza",
    rating: 4.8,
    tiempo: "2-3 días",
    dificultad: "Moderada",
    destacado: true,
    poblacion: "18,000",
    altitud: "3,200 msnm",
  },
  {
    id: 4,
    nombre: "Coconuco",
    slug: "coconuco",
    descripcion: "Famoso por sus termales naturales y paisajes de páramo.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "naturaleza",
    rating: 4.6,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "12,000",
    altitud: "2,400 msnm",
  },
  {
    id: 5,
    nombre: "Inzá",
    slug: "inza",
    descripcion: "Puerta de entrada al Parque Arqueológico de Tierradentro.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "cultura",
    rating: 4.5,
    tiempo: "2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "28,000",
    altitud: "1,720 msnm",
  },
  {
    id: 6,
    nombre: "Guapi",
    slug: "guapi",
    descripcion: "Puerto en la costa pacífica, cultura afrocolombiana y biodiversidad marina.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "costa",
    rating: 4.4,
    tiempo: "2-3 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "30,000",
    altitud: "5 msnm",
  },
  {
    id: 7,
    nombre: "Timbío",
    slug: "timbio",
    descripcion: "Conocido como la 'Villa de Leyva del Cauca' por su arquitectura colonial.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "ciudad",
    rating: 4.3,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "35,000",
    altitud: "1,710 msnm",
  },
  {
    id: 8,
    nombre: "Santander de Quilichao",
    slug: "santander-de-quilichao",
    descripcion: "Centro industrial y cultural del norte del Cauca.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "ciudad",
    rating: 4.2,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "95,000",
    altitud: "1,071 msnm",
  },
  {
    id: 9,
    nombre: "Caldono",
    slug: "caldono",
    descripcion: "Municipio con rica tradición indígena nasa y paisajes montañosos.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "cultura",
    rating: 4.1,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "38,000",
    altitud: "1,700 msnm",
  },
  {
    id: 10,
    nombre: "Toribío",
    slug: "toribio",
    descripcion: "Territorio indígena nasa con hermosos paisajes andinos.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "cultura",
    rating: 4.0,
    tiempo: "1-2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "32,000",
    altitud: "2,500 msnm",
  },
  {
    id: 11,
    nombre: "Cajibío",
    slug: "cajibio",
    descripcion: "Municipio agrícola con tradiciones campesinas y paisajes rurales.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.9,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "40,000",
    altitud: "1,500 msnm",
  },
  {
    id: 12,
    nombre: "Piendamó",
    slug: "piendamo",
    descripcion: "Conocido por su producción agrícola y cercanía a Popayán.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.8,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "45,000",
    altitud: "1,400 msnm",
  },
  {
    id: 13,
    nombre: "Morales",
    slug: "morales",
    descripcion: "Municipio del norte del Cauca con tradición ganadera.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.7,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "28,000",
    altitud: "1,100 msnm",
  },
  {
    id: 14,
    nombre: "Padilla",
    slug: "padilla",
    descripcion: "Pequeño municipio con encanto rural y tradiciones campesinas.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.6,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "8,000",
    altitud: "1,200 msnm",
  },
  {
    id: 15,
    nombre: "Puerto Tejada",
    slug: "puerto-tejada",
    descripcion: "Municipio del norte del Cauca con importante actividad comercial.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "ciudad",
    rating: 3.8,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "50,000",
    altitud: "970 msnm",
  },
  {
    id: 16,
    nombre: "Villa Rica",
    slug: "villa-rica",
    descripcion: "Municipio cafetero con hermosos paisajes montañosos.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 4.0,
    tiempo: "1-2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "15,000",
    altitud: "1,800 msnm",
  },
  {
    id: 17,
    nombre: "Corinto",
    slug: "corinto",
    descripcion: "Municipio del norte del Cauca con tradición agrícola.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.7,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "32,000",
    altitud: "1,050 msnm",
  },
  {
    id: 18,
    nombre: "Miranda",
    slug: "miranda",
    descripcion: "Municipio con rica biodiversidad y tradiciones campesinas.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.8,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "42,000",
    altitud: "1,450 msnm",
  },
  {
    id: 19,
    nombre: "Suárez",
    slug: "suarez",
    descripcion: "Municipio minero con paisajes únicos y tradición aurífera.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.6,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "22,000",
    altitud: "1,200 msnm",
  },
  {
    id: 20,
    nombre: "Buenos Aires",
    slug: "buenos-aires",
    descripcion: "Municipio del norte del Cauca con tradición agrícola y ganadera.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.7,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "25,000",
    altitud: "1,100 msnm",
  },
  {
    id: 21,
    nombre: "Caloto",
    slug: "caloto",
    descripcion: "Municipio con importante población afrocolombiana y tradición cultural.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "cultura",
    rating: 3.9,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "20,000",
    altitud: "1,050 msnm",
  },
  {
    id: 22,
    nombre: "Guachené",
    slug: "guachene",
    descripcion: "Municipio joven con tradición afrocolombiana y desarrollo agroindustrial.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.8,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "22,000",
    altitud: "1,000 msnm",
  },
  {
    id: 23,
    nombre: "Jambaló",
    slug: "jambalo",
    descripcion: "Territorio indígena nasa con tradiciones ancestrales y paisajes andinos.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "cultura",
    rating: 4.1,
    tiempo: "1-2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "18,000",
    altitud: "2,200 msnm",
  },
  {
    id: 24,
    nombre: "Páez (Belalcázar)",
    slug: "paez-belalcazar",
    descripcion: "Municipio indígena nasa con el nevado del Huila como telón de fondo.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "naturaleza",
    rating: 4.3,
    tiempo: "2-3 días",
    dificultad: "Difícil",
    destacado: false,
    poblacion: "40,000",
    altitud: "2,500 msnm",
  },
  {
    id: 25,
    nombre: "Sotará",
    slug: "sotara",
    descripcion: "Municipio con hermosos paisajes montañosos y tradición agrícola.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.9,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "15,000",
    altitud: "2,100 msnm",
  },
  {
    id: 26,
    nombre: "Totoró",
    slug: "totoro",
    descripcion: "Municipio indígena con tradiciones ancestrales y paisajes de páramo.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "cultura",
    rating: 4.0,
    tiempo: "1-2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "20,000",
    altitud: "2,800 msnm",
  },
  {
    id: 27,
    nombre: "Rosas",
    slug: "rosas",
    descripcion: "Municipio del macizo colombiano con paisajes montañosos únicos.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "naturaleza",
    rating: 4.1,
    tiempo: "1-2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "12,000",
    altitud: "2,300 msnm",
  },
  {
    id: 28,
    nombre: "La Sierra",
    slug: "la-sierra",
    descripcion: "Municipio montañoso con tradición cafetera y paisajes espectaculares.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 4.0,
    tiempo: "1-2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "11,000",
    altitud: "2,000 msnm",
  },
  {
    id: 29,
    nombre: "La Vega",
    slug: "la-vega",
    descripcion: "Municipio del macizo colombiano con biodiversidad única.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "naturaleza",
    rating: 3.9,
    tiempo: "1-2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "22,000",
    altitud: "1,800 msnm",
  },
  {
    id: 30,
    nombre: "Almaguer",
    slug: "almaguer",
    descripcion: "Municipio del macizo colombiano con tradición agrícola y paisajes montañosos.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.8,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "20,000",
    altitud: "2,100 msnm",
  },
  {
    id: 31,
    nombre: "Argelia",
    slug: "argelia",
    descripcion: "Municipio cafetero con hermosos paisajes y tradición agrícola.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 4.0,
    tiempo: "1-2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "25,000",
    altitud: "1,900 msnm",
  },
  {
    id: 32,
    nombre: "Balboa",
    slug: "balboa",
    descripcion: "Municipio del macizo colombiano con biodiversidad excepcional.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "naturaleza",
    rating: 4.1,
    tiempo: "2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "23,000",
    altitud: "1,700 msnm",
  },
  {
    id: 33,
    nombre: "Bolívar",
    slug: "bolivar",
    descripcion: "Municipio del macizo colombiano con tradición minera y agrícola.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.7,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "65,000",
    altitud: "1,500 msnm",
  },
  {
    id: 34,
    nombre: "Mercaderes",
    slug: "mercaderes",
    descripcion: "Municipio del macizo colombiano con tradición comercial histórica.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.8,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "20,000",
    altitud: "1,600 msnm",
  },
  {
    id: 35,
    nombre: "Patía (El Bordo)",
    slug: "patia-el-bordo",
    descripcion: "Municipio del valle del Patía con tradición agrícola y ganadera.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.6,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "38,000",
    altitud: "700 msnm",
  },
  {
    id: 36,
    nombre: "Piamonte",
    slug: "piamonte",
    descripcion: "Municipio amazónico con selva tropical y biodiversidad única.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "naturaleza",
    rating: 4.2,
    tiempo: "2-3 días",
    dificultad: "Difícil",
    destacado: false,
    poblacion: "12,000",
    altitud: "400 msnm",
  },
  {
    id: 37,
    nombre: "San Sebastián",
    slug: "san-sebastian",
    descripcion: "Municipio del macizo colombiano con tradición agrícola y paisajes montañosos.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.7,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "12,000",
    altitud: "2,200 msnm",
  },
  {
    id: 38,
    nombre: "Santa Rosa",
    slug: "santa-rosa",
    descripcion: "Municipio del macizo colombiano con tradición cafetera.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.9,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "8,000",
    altitud: "2,000 msnm",
  },
  {
    id: 39,
    nombre: "Sucre",
    slug: "sucre",
    descripcion: "Municipio del valle del Patía con tradición agrícola.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.5,
    tiempo: "1 día",
    dificultad: "Fácil",
    destacado: false,
    poblacion: "18,000",
    altitud: "800 msnm",
  },
  {
    id: 40,
    nombre: "Timbiquí",
    slug: "timbiqui",
    descripcion: "Municipio costero del Pacífico con cultura afrocolombiana y manglares.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "costa",
    rating: 4.0,
    tiempo: "2-3 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "20,000",
    altitud: "10 msnm",
  },
  {
    id: 41,
    nombre: "López de Micay",
    slug: "lopez-de-micay",
    descripcion: "Municipio costero con biodiversidad marina y tradición pesquera.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "costa",
    rating: 3.9,
    tiempo: "2 días",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "25,000",
    altitud: "15 msnm",
  },
  {
    id: 42,
    nombre: "Florencia",
    slug: "florencia",
    descripcion: "Municipio del macizo colombiano con paisajes montañosos y tradición agrícola.",
    imagen: "/images/explora-cauca-hero.png",
    categoria: "rural",
    rating: 3.8,
    tiempo: "1 día",
    dificultad: "Moderada",
    destacado: false,
    poblacion: "8,000",
    altitud: "2,100 msnm",
  },
]

const getCategoryIcon = (categoria: string) => {
  switch (categoria) {
    case "naturaleza":
      return <Mountain className="h-4 w-4" />
    case "ciudad":
      return <Church className="h-4 w-4" />
    case "cultura":
      return <Users className="h-4 w-4" />
    case "costa":
      return <Waves className="h-4 w-4" />
    case "rural":
      return <TreePine className="h-4 w-4" />
    default:
      return <TreePine className="h-4 w-4" />
  }
}

const getCategoryColor = (categoria: string) => {
  switch (categoria) {
    case "naturaleza":
      return "bg-green-500"
    case "ciudad":
      return "bg-orange-500"
    case "cultura":
      return "bg-purple-500"
    case "costa":
      return "bg-blue-500"
    case "rural":
      return "bg-yellow-600"
    default:
      return "bg-gray-500"
  }
}

export default function TurismoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-orange-50 dark:from-green-950/10 dark:via-blue-950/10 dark:to-orange-950/10">
      {/* Header con imagen de fondo */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/explora-cauca-hero.png"
            alt="Paisajes del Cauca"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-20 flex h-full items-center">
          <div className="container">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                42 Municipios
                <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                  del Cauca
                </span>
              </h1>
              <p className="mt-4 text-xl opacity-90">Descubre cada rincón del departamento más diverso de Colombia</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Buscador */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar municipio..." className="pl-10" />
          </div>
        </div>

        {/* Filtros y navegación */}
        <Tabs defaultValue="todos" className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold">Explora por Categoría</h2>
              <p className="text-muted-foreground">42 municipios únicos esperan por ti</p>
            </div>
            <TabsList className="grid w-full max-w-lg grid-cols-6">
              <TabsTrigger value="todos" className="text-xs">
                Todos
              </TabsTrigger>
              <TabsTrigger value="naturaleza" className="text-xs">
                Naturaleza
              </TabsTrigger>
              <TabsTrigger value="cultura" className="text-xs">
                Cultura
              </TabsTrigger>
              <TabsTrigger value="ciudad" className="text-xs">
                Ciudades
              </TabsTrigger>
              <TabsTrigger value="costa" className="text-xs">
                Costa
              </TabsTrigger>
              <TabsTrigger value="rural" className="text-xs">
                Rural
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Destinos destacados */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Destinos Destacados
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {municipiosCauca
                .filter((municipio) => municipio.destacado)
                .map((municipio) => (
                  <Card
                    key={municipio.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={municipio.imagen || "/placeholder.svg"}
                        alt={municipio.nombre}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(municipio.categoria)} text-white border-0`}>
                          {getCategoryIcon(municipio.categoria)}
                          <span className="ml-1 capitalize">{municipio.categoria}</span>
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-black/50 text-white border-0">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {municipio.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span>{municipio.nombre}</span>
                      </CardTitle>
                      <CardDescription>{municipio.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {municipio.tiempo}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {municipio.altitud}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        <Link href={`/turismo/${municipio.slug}`}>Explorar {municipio.nombre}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>

          {/* Todos los municipios */}
          <TabsContent value="todos" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {municipiosCauca.map((municipio) => (
                <Card key={municipio.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={municipio.imagen || "/placeholder.svg"}
                      alt={municipio.nombre}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(municipio.categoria)} text-white border-0`}>
                        {getCategoryIcon(municipio.categoria)}
                        <span className="ml-1 capitalize">{municipio.categoria}</span>
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{municipio.nombre}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{municipio.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{municipio.poblacion} hab.</span>
                      <span>{municipio.altitud}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button asChild className="w-full" variant="outline" size="sm">
                      <Link href={`/turismo/${municipio.slug}`}>Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Filtros por categoría */}
          {["naturaleza", "cultura", "ciudad", "costa", "rural"].map((categoria) => (
            <TabsContent key={categoria} value={categoria} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {municipiosCauca
                  .filter((municipio) => municipio.categoria === categoria)
                  .map((municipio) => (
                    <Card
                      key={municipio.id}
                      className="group overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={municipio.imagen || "/placeholder.svg"}
                          alt={municipio.nombre}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{municipio.nombre}</CardTitle>
                        <CardDescription className="text-sm line-clamp-2">{municipio.descripcion}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{municipio.poblacion} hab.</span>
                          <span>{municipio.altitud}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button asChild className="w-full" variant="outline" size="sm">
                          <Link href={`/turismo/${municipio.slug}`}>Ver Detalles</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

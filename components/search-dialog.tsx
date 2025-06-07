"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Search, MapPin, Users, Mountain, Church, Waves, TreePine } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Datos de municipios para búsqueda
const municipiosParaBusqueda = [
  {
    nombre: "Popayán",
    slug: "popayan",
    descripcion: "Capital del departamento, Ciudad Blanca de Colombia",
    categoria: "ciudad",
    imagen: "/images/popayan-centro-historico.png",
    keywords: ["ciudad blanca", "capital", "colonial", "gastronomia", "semana santa"],
  },
  {
    nombre: "Silvia",
    slug: "silvia",
    descripcion: "Pueblo guambiano famoso por su mercado indígena",
    categoria: "cultura",
    imagen: "/images/festival-cultural-cauca.jpeg",
    keywords: ["guambiano", "indigena", "mercado", "martes", "cultura", "misak"],
  },
  {
    nombre: "Puracé",
    slug: "purace",
    descripcion: "Parque Nacional Natural con volcanes activos",
    categoria: "naturaleza",
    imagen: "/placeholder.svg",
    keywords: ["volcan", "parque nacional", "termales", "montañismo", "aventura"],
  },
  {
    nombre: "Cajibío",
    slug: "cajibio",
    descripcion: "Municipio agrícola con tradiciones campesinas",
    categoria: "rural",
    imagen: "/images/represa-cauca-paisaje.jpeg",
    keywords: ["cafe", "agricultura", "rural", "campesino", "fincas"],
  },
  {
    nombre: "Coconuco",
    slug: "coconuco",
    descripcion: "Famoso por sus termales naturales",
    categoria: "naturaleza",
    imagen: "/placeholder.svg",
    keywords: ["termales", "aguas calientes", "paramo", "relajacion"],
  },
  {
    nombre: "Inzá",
    slug: "inza",
    descripcion: "Puerta de entrada a Tierradentro",
    categoria: "cultura",
    imagen: "/placeholder.svg",
    keywords: ["tierradentro", "arqueologia", "tumbas", "patrimonio"],
  },
  {
    nombre: "Guapi",
    slug: "guapi",
    descripcion: "Puerto en la costa pacífica",
    categoria: "costa",
    imagen: "/placeholder.svg",
    keywords: ["pacifico", "costa", "afrocolombiano", "puerto", "mar"],
  },
  {
    nombre: "Timbío",
    slug: "timbio",
    descripcion: "Villa de Leyva del Cauca",
    categoria: "ciudad",
    imagen: "/placeholder.svg",
    keywords: ["colonial", "arquitectura", "villa", "patrimonio"],
  },
  {
    nombre: "Santander de Quilichao",
    slug: "santander-de-quilichao",
    descripcion: "Centro industrial del norte del Cauca",
    categoria: "ciudad",
    imagen: "/placeholder.svg",
    keywords: ["industrial", "norte", "comercio", "desarrollo"],
  },
  {
    nombre: "Morales",
    slug: "morales",
    descripcion: "Municipio con infraestructura hidroeléctrica",
    categoria: "rural",
    imagen: "/images/morales-represa.jpeg",
    keywords: ["represa", "hidroelectrica", "energia", "ganaderia"],
  },
]

const getCategoryIcon = (categoria: string) => {
  switch (categoria) {
    case "naturaleza":
      return <Mountain className="h-4 w-4 text-green-500" />
    case "ciudad":
      return <Church className="h-4 w-4 text-orange-500" />
    case "cultura":
      return <Users className="h-4 w-4 text-purple-500" />
    case "costa":
      return <Waves className="h-4 w-4 text-blue-500" />
    case "rural":
      return <TreePine className="h-4 w-4 text-yellow-600" />
    default:
      return <MapPin className="h-4 w-4 text-gray-500" />
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

interface SearchDialogProps {
  trigger?: React.ReactNode
}

export function SearchDialog({ trigger }: SearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState(municipiosParaBusqueda)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults(municipiosParaBusqueda)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = municipiosParaBusqueda.filter((municipio) => {
      return (
        municipio.nombre.toLowerCase().includes(query) ||
        municipio.descripcion.toLowerCase().includes(query) ||
        municipio.categoria.toLowerCase().includes(query) ||
        municipio.keywords.some((keyword) => keyword.toLowerCase().includes(query))
      )
    })

    setFilteredResults(filtered)
  }, [searchQuery])

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const handleSelectMunicipio = (slug: string) => {
    setOpen(false)
    setSearchQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
          >
            <Search className="mr-2 h-4 w-4" />
            <span className="hidden lg:inline-flex">Buscar municipios...</span>
            <span className="inline-flex lg:hidden">Buscar...</span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Buscar Municipios del Cauca</DialogTitle>
          <DialogDescription>
            Encuentra información sobre los 42 municipios del departamento del Cauca
          </DialogDescription>
        </DialogHeader>

        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Buscar por nombre, categoría o características..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-[400px]">
            <CommandEmpty>
              <div className="text-center py-6">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No se encontraron municipios que coincidan con "{searchQuery}"
                </p>
              </div>
            </CommandEmpty>
            <CommandGroup heading={`${filteredResults.length} resultados encontrados`}>
              {filteredResults.map((municipio) => (
                <CommandItem key={municipio.slug} className="p-0">
                  <Link
                    href={`/turismo/${municipio.slug}`}
                    className="flex items-center gap-3 p-3 w-full hover:bg-accent rounded-md"
                    onClick={() => handleSelectMunicipio(municipio.slug)}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={municipio.imagen || "/placeholder.svg"}
                        alt={municipio.nombre}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{highlightText(municipio.nombre, searchQuery)}</h4>
                        <Badge className={`${getCategoryColor(municipio.categoria)} text-white border-0 text-xs`}>
                          {getCategoryIcon(municipio.categoria)}
                          <span className="ml-1 capitalize">{municipio.categoria}</span>
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {highlightText(municipio.descripcion, searchQuery)}
                      </p>
                    </div>
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        {searchQuery && (
          <div className="text-xs text-muted-foreground">
            <p>
              <strong>Sugerencias:</strong> Prueba buscar por "volcán", "termales", "indígena", "costa", "café" o
              "colonial"
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Hook para atajos de teclado
export function useSearchShortcut() {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // Trigger search dialog
        const searchButton = document.querySelector("[data-search-trigger]") as HTMLButtonElement
        if (searchButton) {
          searchButton.click()
        }
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
}

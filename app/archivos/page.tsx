"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileIcon, ImageIcon, FileTextIcon, FileArchiveIcon, Trash2Icon, DownloadIcon, SearchIcon } from "lucide-react"

// Datos de ejemplo para archivos
const archivosEjemplo = [
  {
    id: 1,
    nombre: "Informe_Turismo_2023.pdf",
    tipo: "pdf",
    tamaño: "2.4 MB",
    fechaSubida: "2023-12-15",
    categoria: "informes",
  },
  {
    id: 2,
    nombre: "Mapa_Rutas_Cauca.jpg",
    tipo: "imagen",
    tamaño: "3.8 MB",
    fechaSubida: "2023-11-20",
    categoria: "mapas",
  },
  {
    id: 3,
    nombre: "Datos_Visitantes_2023.xlsx",
    tipo: "excel",
    tamaño: "1.2 MB",
    fechaSubida: "2023-12-10",
    categoria: "datos",
  },
  {
    id: 4,
    nombre: "Presentacion_Proyecto.pptx",
    tipo: "powerpoint",
    tamaño: "5.7 MB",
    fechaSubida: "2023-10-05",
    categoria: "presentaciones",
  },
  {
    id: 5,
    nombre: "Recursos_Multimedia.zip",
    tipo: "zip",
    tamaño: "15.2 MB",
    fechaSubida: "2023-09-18",
    categoria: "multimedia",
  },
]

export default function ArchivosPage() {
  const [busqueda, setBusqueda] = useState("")
  const [archivosSubiendo, setArchivosSubiendo] = useState<File[]>([])
  const [progreso, setProgreso] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const nuevosArchivos = Array.from(e.target.files)
      setArchivosSubiendo(nuevosArchivos)

      // Simulación de carga
      setProgreso(0)
      const interval = setInterval(() => {
        setProgreso((prevProgreso) => {
          if (prevProgreso >= 100) {
            clearInterval(interval)
            return 100
          }
          return prevProgreso + 10
        })
      }, 500)
    }
  }

  const getIconoArchivo = (tipo: string) => {
    switch (tipo) {
      case "imagen":
        return <ImageIcon className="h-4 w-4" />
      case "pdf":
        return <FileTextIcon className="h-4 w-4" />
      case "excel":
        return <FileTextIcon className="h-4 w-4" />
      case "powerpoint":
        return <FileTextIcon className="h-4 w-4" />
      case "zip":
        return <FileArchiveIcon className="h-4 w-4" />
      default:
        return <FileIcon className="h-4 w-4" />
    }
  }

  const archivosFiltrados = archivosEjemplo.filter((archivo) =>
    archivo.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  )

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Gestión de Archivos</h1>
        <p className="text-muted-foreground">
          Carga, organiza y administra tus archivos relacionados con proyectos turísticos
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Mis Archivos</CardTitle>
            <CardDescription>Administra tus archivos subidos</CardDescription>
            <div className="mt-2 flex items-center gap-2">
              <Input
                placeholder="Buscar archivos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="max-w-sm"
              />
              <Button size="icon" variant="ghost">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todos">
              <TabsList className="mb-4">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="informes">Informes</TabsTrigger>
                <TabsTrigger value="mapas">Mapas</TabsTrigger>
                <TabsTrigger value="datos">Datos</TabsTrigger>
              </TabsList>
              <TabsContent value="todos">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Tamaño</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {archivosFiltrados.length > 0 ? (
                        archivosFiltrados.map((archivo) => (
                          <TableRow key={archivo.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {getIconoArchivo(archivo.tipo)}
                                {archivo.nombre}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{archivo.tipo}</Badge>
                            </TableCell>
                            <TableCell>{archivo.tamaño}</TableCell>
                            <TableCell>{archivo.fechaSubida}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="icon" variant="ghost">
                                  <DownloadIcon className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Trash2Icon className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No se encontraron archivos.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="informes">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Tamaño</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {archivosFiltrados
                        .filter((archivo) => archivo.categoria === "informes")
                        .map((archivo) => (
                          <TableRow key={archivo.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {getIconoArchivo(archivo.tipo)}
                                {archivo.nombre}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{archivo.tipo}</Badge>
                            </TableCell>
                            <TableCell>{archivo.tamaño}</TableCell>
                            <TableCell>{archivo.fechaSubida}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="icon" variant="ghost">
                                  <DownloadIcon className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Trash2Icon className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="mapas">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Tamaño</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {archivosFiltrados
                        .filter((archivo) => archivo.categoria === "mapas")
                        .map((archivo) => (
                          <TableRow key={archivo.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {getIconoArchivo(archivo.tipo)}
                                {archivo.nombre}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{archivo.tipo}</Badge>
                            </TableCell>
                            <TableCell>{archivo.tamaño}</TableCell>
                            <TableCell>{archivo.fechaSubida}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="icon" variant="ghost">
                                  <DownloadIcon className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Trash2Icon className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="datos">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Tamaño</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {archivosFiltrados
                        .filter((archivo) => archivo.categoria === "datos")
                        .map((archivo) => (
                          <TableRow key={archivo.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {getIconoArchivo(archivo.tipo)}
                                {archivo.nombre}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{archivo.tipo}</Badge>
                            </TableCell>
                            <TableCell>{archivo.tamaño}</TableCell>
                            <TableCell>{archivo.fechaSubida}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="icon" variant="ghost">
                                  <DownloadIcon className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Trash2Icon className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Subir Archivos</CardTitle>
              <CardDescription>Sube nuevos archivos al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="file-upload">Seleccionar archivos</Label>
                  <Input id="file-upload" type="file" multiple onChange={handleFileChange} />
                </div>
                {archivosSubiendo.length > 0 && (
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progreso</span>
                      <span>{progreso}%</span>
                    </div>
                    <Progress value={progreso} />
                    <div className="mt-2">
                      <p className="text-sm font-medium">Archivos seleccionados:</p>
                      <ul className="mt-1 space-y-1 text-sm">
                        {archivosSubiendo.map((archivo, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <FileIcon className="h-4 w-4" />
                            {archivo.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={archivosSubiendo.length === 0 || progreso === 100}>
                {progreso === 100 ? "Archivos subidos" : "Subir archivos"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Almacenamiento</CardTitle>
              <CardDescription>Espacio utilizado y disponible</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Espacio utilizado</span>
                  <span>28.3 GB / 50 GB</span>
                </div>
                <Progress value={56} />
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span>Imágenes</span>
                    </div>
                    <span>12.4 GB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span>Documentos</span>
                    </div>
                    <span>8.7 GB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Videos</span>
                    </div>
                    <span>5.2 GB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>Otros</span>
                    </div>
                    <span>2.0 GB</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ampliar almacenamiento
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

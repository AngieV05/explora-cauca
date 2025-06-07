"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Datos de ejemplo para gráficos
const datosVisitantes = [
  { mes: "Ene", visitantes: 1200 },
  { mes: "Feb", visitantes: 1900 },
  { mes: "Mar", visitantes: 2400 },
  { mes: "Abr", visitantes: 1800 },
  { mes: "May", visitantes: 2800 },
  { mes: "Jun", visitantes: 3500 },
  { mes: "Jul", visitantes: 4200 },
  { mes: "Ago", visitantes: 4800 },
  { mes: "Sep", visitantes: 3900 },
  { mes: "Oct", visitantes: 3100 },
  { mes: "Nov", visitantes: 2500 },
  { mes: "Dic", visitantes: 3200 },
]

const datosDestinos = [
  { nombre: "Popayán", valor: 35 },
  { nombre: "Puracé", valor: 25 },
  { nombre: "Silvia", valor: 20 },
  { nombre: "Tierradentro", valor: 15 },
  { nombre: "Otros", valor: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function DatosPage() {
  const [tipoAnalisis, setTipoAnalisis] = useState("visitantes")
  const [periodoTiempo, setPeriodoTiempo] = useState("anual")

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Procesamiento de Datos</h1>
        <p className="text-muted-foreground">Analiza y visualiza datos relacionados con el turismo en el Cauca</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Visualización de Datos</CardTitle>
            <CardDescription>Gráficos y estadísticas turísticas</CardDescription>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tipo-analisis">Tipo de análisis</Label>
                <Select value={tipoAnalisis} onValueChange={setTipoAnalisis}>
                  <SelectTrigger id="tipo-analisis" className="w-[180px]">
                    <SelectValue placeholder="Tipo de análisis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visitantes">Visitantes</SelectItem>
                    <SelectItem value="destinos">Destinos populares</SelectItem>
                    <SelectItem value="ingresos">Ingresos económicos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="periodo-tiempo">Periodo de tiempo</Label>
                <Select value={periodoTiempo} onValueChange={setPeriodoTiempo}>
                  <SelectTrigger id="periodo-tiempo" className="w-[180px]">
                    <SelectValue placeholder="Periodo de tiempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mensual">Mensual</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grafico-barras">
              <TabsList className="mb-4">
                <TabsTrigger value="grafico-barras">Gráfico de barras</TabsTrigger>
                <TabsTrigger value="grafico-circular">Gráfico circular</TabsTrigger>
              </TabsList>
              <TabsContent value="grafico-barras">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={datosVisitantes}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="visitantes" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="grafico-circular">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={datosDestinos}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="valor"
                        nameKey="nombre"
                      >
                        {datosDestinos.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <div className="text-sm text-muted-foreground">Datos actualizados: 01/06/2023</div>
              <div className="flex gap-2">
                <Button variant="outline">Exportar CSV</Button>
                <Button variant="outline">Exportar PDF</Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Procesar Datos</CardTitle>
              <CardDescription>Sube y procesa tus propios datos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="data-file">Archivo de datos</Label>
                  <Input id="data-file" type="file" accept=".csv,.xlsx,.json" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="data-type">Tipo de datos</Label>
                  <Select defaultValue="visitantes">
                    <SelectTrigger id="data-type">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visitantes">Datos de visitantes</SelectItem>
                      <SelectItem value="economicos">Datos económicos</SelectItem>
                      <SelectItem value="encuestas">Resultados de encuestas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="data-notes">Notas adicionales</Label>
                  <Textarea id="data-notes" placeholder="Añade notas sobre los datos..." />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Procesar datos</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen Estadístico</CardTitle>
              <CardDescription>Estadísticas clave del turismo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Total visitantes</div>
                    <div className="mt-1 text-2xl font-bold">35,400</div>
                    <div className="mt-1 text-xs text-green-500">+12.5% vs año anterior</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Ingresos</div>
                    <div className="mt-1 text-2xl font-bold">$2.4M</div>
                    <div className="mt-1 text-xs text-green-500">+8.3% vs año anterior</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Estancia promedio</div>
                    <div className="mt-1 text-2xl font-bold">3.2 días</div>
                    <div className="mt-1 text-xs text-green-500">+0.5 días vs año anterior</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Satisfacción</div>
                    <div className="mt-1 text-2xl font-bold">4.7/5</div>
                    <div className="mt-1 text-xs text-green-500">+0.2 vs año anterior</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver informe completo
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

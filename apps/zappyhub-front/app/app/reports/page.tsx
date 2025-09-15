"use client"

import { useState } from "react"
import { ClientLayout } from "@/components/layout/client-layout"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { AreaChartComponent } from "@/components/charts/area-chart"
import { BarChartComponent } from "@/components/charts/bar-chart"
import { PieChartComponent } from "@/components/charts/pie-chart"
import { BarChart3, TrendingUp, Clock, MessageSquare, Download, Calendar } from "lucide-react"
import type { DateRange } from "react-day-picker"

export default function ClientReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [showCustomDate, setShowCustomDate] = useState(false)

  const performanceData = [
    { agent: "Agente Vendas Pro", interactions: 1250, avgResponse: "45s", satisfaction: 4.8, conversions: 23 },
    { agent: "Suporte Bot", interactions: 980, avgResponse: "1.2min", satisfaction: 4.6, conversions: 15 },
    { agent: "Atendimento IA", interactions: 750, avgResponse: "2.1min", satisfaction: 4.7, conversions: 8 },
  ]

  const monthlyStats = [
    { month: "Jan", orders: 245, revenue: "R$ 12.5K", satisfaction: 4.6 },
    { month: "Fev", orders: 289, revenue: "R$ 15.2K", satisfaction: 4.7 },
    { month: "Mar", orders: 324, revenue: "R$ 18.9K", satisfaction: 4.8 },
    { month: "Abr", orders: 298, revenue: "R$ 16.7K", satisfaction: 4.7 },
  ]

  const conversationTrendsData = [
    { month: "Jan", conversations: 1850 },
    { month: "Fev", conversations: 2100 },
    { month: "Mar", conversations: 2450 },
    { month: "Abr", conversations: 2680 },
    { month: "Mai", conversations: 2980 },
  ]

  const satisfactionData = [
    { month: "Jan", satisfaction: 4.6 },
    { month: "Fev", satisfaction: 4.7 },
    { month: "Mar", satisfaction: 4.8 },
    { month: "Abr", satisfaction: 4.7 },
    { month: "Mai", satisfaction: 4.7 },
  ]

  const channelDistributionData = [
    { name: "WhatsApp", value: 63, color: "hsl(var(--chart-1))" },
    { name: "Website", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Telegram", value: 12, color: "hsl(var(--chart-3))" },
  ]

  const handlePeriodChange = (value: string) => {
    if (value === "custom") {
      setShowCustomDate(true)
    } else {
      setShowCustomDate(false)
      setDateRange(undefined)
    }
  }

  return (
    <ClientLayout title="Relatórios e Analytics" breadcrumbs={[{ label: "Dashboard" }, { label: "Relatórios" }]}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Select defaultValue="30days" onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Últimos 7 dias</SelectItem>
                <SelectItem value="30days">Últimos 30 dias</SelectItem>
                <SelectItem value="90days">Últimos 90 dias</SelectItem>
                <SelectItem value="1year">Último ano</SelectItem>
                <SelectItem value="custom">Período Customizado</SelectItem>
              </SelectContent>
            </Select>
            {showCustomDate && <DatePickerWithRange date={dateRange} onDateChange={setDateRange} className="w-auto" />}
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>

        {showCustomDate && dateRange?.from && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Período selecionado: {dateRange.from.toLocaleDateString("pt-BR")}
                    {dateRange.to && ` - ${dateRange.to.toLocaleDateString("pt-BR")}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCustomDate(false)
                    setDateRange(undefined)
                  }}
                >
                  Limpar filtro
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Atendimentos"
            value="2,980"
            description="Interações nos últimos 30 dias"
            icon={<MessageSquare className="h-4 w-4" />}
            trend={{ value: 18, isPositive: true }}
          />
          <StatCard
            title="Tempo Médio de Resposta"
            value="1.2min"
            description="Tempo médio de primeira resposta"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: -12, isPositive: true }}
          />
          <StatCard
            title="Taxa de Satisfação"
            value="4.7"
            description="Avaliação média dos clientes"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Taxa de Conversão"
            value="15.4%"
            description="Conversas que viraram pedidos"
            icon={<BarChart3 className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AreaChartComponent
            title="Evolução das Conversas"
            description="Número de conversas ao longo dos meses"
            data={conversationTrendsData}
            dataKey="conversations"
            xAxisKey="month"
            color="hsl(var(--chart-1))"
          />
          <BarChartComponent
            title="Satisfação dos Clientes"
            description="Avaliação média mensal"
            data={satisfactionData}
            dataKey="satisfaction"
            xAxisKey="month"
            color="hsl(var(--chart-2))"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PieChartComponent
            title="Distribuição por Canal"
            description="Percentual de conversas por plataforma"
            data={channelDistributionData}
          />

          {/* Performance by Agent */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Performance por Agente</CardTitle>
              <CardDescription>Métricas detalhadas de cada agente de IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((agent, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{agent.agent}</h3>
                      <Badge className="bg-accent text-accent-foreground">Ativo</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Interações</p>
                        <p className="text-lg font-semibold">{agent.interactions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tempo Médio</p>
                        <p className="text-lg font-semibold">{agent.avgResponse}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Satisfação</p>
                        <p className="text-lg font-semibold">★ {agent.satisfaction}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversões</p>
                        <p className="text-lg font-semibold">{agent.conversions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Tendências Mensais</CardTitle>
            <CardDescription>Evolução dos principais indicadores ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="font-semibold text-primary">{stat.month}</span>
                    </div>
                    <div>
                      <p className="font-medium">{stat.orders} pedidos</p>
                      <p className="text-sm text-muted-foreground">Faturamento: {stat.revenue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">★ {stat.satisfaction}</p>
                    <p className="text-sm text-muted-foreground">Satisfação</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analytics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Horários de Pico</CardTitle>
              <CardDescription>Quando seus clientes mais interagem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">08:00 - 12:00</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-16 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">12:00 - 18:00</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-20 h-2 bg-secondary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">18:00 - 22:00</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-12 h-2 bg-accent rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">22:00 - 08:00</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-4 h-2 bg-muted-foreground rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Canais de Atendimento</CardTitle>
              <CardDescription>Distribuição por plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 text-white">WhatsApp</Badge>
                    <span className="text-sm">1,890 conversas</span>
                  </div>
                  <span className="text-sm font-medium">63%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-primary text-primary-foreground">Website</Badge>
                    <span className="text-sm">745 conversas</span>
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-500 text-white">Telegram</Badge>
                    <span className="text-sm">345 conversas</span>
                  </div>
                  <span className="text-sm font-medium">12%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  )
}

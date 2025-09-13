import { ClientLayout } from "@/components/layout/client-layout"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChartComponent } from "@/components/charts/line-chart"
import { BarChartComponent } from "@/components/charts/bar-chart"
import { ShoppingCart, Bot, Clock, TrendingUp, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"

export default function ClientOverviewPage() {
  const todayOrders = [
    { id: "#001", customer: "João Silva", status: "entregue", time: "14:30", value: "R$ 89,90" },
    { id: "#002", customer: "Maria Santos", status: "preparando", time: "14:15", value: "R$ 156,50" },
    { id: "#003", customer: "Pedro Costa", status: "pendente", time: "13:45", value: "R$ 234,20" },
    { id: "#004", customer: "Ana Oliveira", status: "entregue", time: "13:20", value: "R$ 67,80" },
  ]

  const activeAgents = [
    { name: "Agente Vendas", status: "online", interactions: 45, satisfaction: 4.8 },
    { name: "Suporte Bot", status: "online", interactions: 32, satisfaction: 4.6 },
    { name: "Atendimento IA", status: "offline", interactions: 0, satisfaction: 4.7 },
  ]

  const ordersData = [
    { day: "Seg", orders: 18 },
    { day: "Ter", orders: 22 },
    { day: "Qua", orders: 19 },
    { day: "Qui", orders: 26 },
    { day: "Sex", orders: 24 },
    { day: "Sáb", orders: 31 },
    { day: "Dom", orders: 28 },
  ]

  const responseTimeData = [
    { hour: "08h", time: 1.8 },
    { hour: "10h", time: 1.2 },
    { hour: "12h", time: 0.9 },
    { hour: "14h", time: 1.1 },
    { hour: "16h", time: 1.4 },
    { hour: "18h", time: 1.6 },
    { hour: "20h", time: 2.1 },
  ]

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "entregue":
        return <Badge className="bg-accent text-accent-foreground">Entregue</Badge>
      case "preparando":
        return <Badge className="bg-secondary text-secondary-foreground">Preparando</Badge>
      case "pendente":
        return <Badge variant="outline">Pendente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAgentStatusBadge = (status: string) => {
    return status === "online" ? (
      <Badge className="bg-accent text-accent-foreground">Online</Badge>
    ) : (
      <Badge variant="secondary">Offline</Badge>
    )
  }

  return (
    <ClientLayout title="Visão Geral" breadcrumbs={[{ label: "Dashboard" }, { label: "Visão Geral" }]}>
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Pedidos Hoje"
            value="24"
            description="Pedidos recebidos hoje"
            icon={<ShoppingCart className="h-4 w-4" />}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Agentes Ativos"
            value="2"
            description="Agentes de IA funcionando"
            icon={<Bot className="h-4 w-4" />}
            trend={{ value: 0, isPositive: true }}
          />
          <StatCard
            title="Tempo Médio de Resposta"
            value="1.2min"
            description="Tempo médio de atendimento"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: -8, isPositive: true }}
          />
          <StatCard
            title="Taxa de Engajamento"
            value="94.5%"
            description="Satisfação dos clientes"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <LineChartComponent
            title="Pedidos da Semana"
            description="Evolução dos pedidos nos últimos 7 dias"
            data={ordersData}
            dataKey="orders"
            xAxisKey="day"
            color="hsl(var(--chart-1))"
          />
          <BarChartComponent
            title="Tempo de Resposta"
            description="Tempo médio de resposta por horário"
            data={responseTimeData}
            dataKey="time"
            xAxisKey="hour"
            color="hsl(var(--chart-2))"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Today's Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-heading">Pedidos de Hoje</CardTitle>
                <CardDescription>Últimos pedidos recebidos</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {order.id} - {order.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getOrderStatusBadge(order.status)}
                      <p className="text-sm font-medium mt-1">{order.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Agents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-heading">Agentes Ativos</CardTitle>
                <CardDescription>Status dos seus agentes de IA</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Gerenciar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAgents.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Bot className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.interactions} interações hoje</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getAgentStatusBadge(agent.status)}
                      <p className="text-xs text-muted-foreground mt-1">★ {agent.satisfaction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as funcionalidades principais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <Bot className="h-6 w-6" />
                <span>Criar Agente</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <MessageSquare className="h-6 w-6" />
                <span>Ver Conversas</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <ShoppingCart className="h-6 w-6" />
                <span>Novo Pedido</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <span>Relatórios</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg">Pedidos Concluídos</CardTitle>
              <CardDescription>Últimas 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold">18</div>
                  <div className="text-sm text-muted-foreground">de 24 pedidos</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg">Conversas Ativas</CardTitle>
              <CardDescription>Atendimentos em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm text-muted-foreground">clientes online</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg">Alertas</CardTitle>
              <CardDescription>Itens que precisam de atenção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-8 w-8 text-secondary" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">pendências</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  )
}

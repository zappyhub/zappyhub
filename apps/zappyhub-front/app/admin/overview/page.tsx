import { AdminLayout } from "@/components/layout/admin-layout"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChartComponent } from "@/components/charts/area-chart"
import { BarChartComponent } from "@/components/charts/bar-chart"
import { PieChartComponent } from "@/components/charts/pie-chart"
import { Building2, DollarSign, Bot, TrendingUp, Activity } from "lucide-react"

export default function AdminOverviewPage() {
  const recentCompanies = [
    { name: "TechCorp Ltda", status: "ativo", plan: "Pro", joinedAt: "2024-01-15" },
    { name: "StartupXYZ", status: "pendente", plan: "Basic", joinedAt: "2024-01-14" },
    { name: "E-commerce Plus", status: "ativo", plan: "Enterprise", joinedAt: "2024-01-13" },
    { name: "Consultoria ABC", status: "suspenso", plan: "Pro", joinedAt: "2024-01-12" },
  ]

  const topPerformingAgents = [
    { name: "Agente Vendas Pro", company: "TechCorp", interactions: 1250, satisfaction: 4.8 },
    { name: "Suporte Bot", company: "E-commerce Plus", interactions: 980, satisfaction: 4.6 },
    { name: "Atendimento IA", company: "StartupXYZ", interactions: 750, satisfaction: 4.7 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 65000 },
    { month: "Fev", revenue: 72000 },
    { month: "Mar", revenue: 78000 },
    { month: "Abr", revenue: 85000 },
    { month: "Mai", revenue: 89400 },
  ]

  const companyGrowthData = [
    { month: "Jan", companies: 95 },
    { month: "Fev", revenue: 105 },
    { month: "Mar", companies: 115 },
    { month: "Abr", companies: 122 },
    { month: "Mai", companies: 127 },
  ]

  const planDistributionData = [
    { name: "Basic", value: 45, color: "hsl(var(--chart-3))" },
    { name: "Pro", value: 67, color: "hsl(var(--chart-1))" },
    { name: "Enterprise", value: 15, color: "hsl(var(--chart-2))" },
  ]

  return (
    <AdminLayout title="Visão Geral Administrativa" breadcrumbs={[{ label: "Admin" }, { label: "Visão Geral" }]}>
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Empresas Ativas"
            value="127"
            description="Total de empresas cadastradas"
            icon={<Building2 className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Faturamento Total"
            value="R$ 89.4K"
            description="Receita mensal recorrente"
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Automações Criadas"
            value="2,847"
            description="Total de automações ativas"
            icon={<Bot className="h-4 w-4" />}
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            title="Agentes Ativos"
            value="1,234"
            description="Agentes de IA em funcionamento"
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AreaChartComponent
            title="Crescimento da Receita"
            description="Evolução da receita mensal recorrente"
            data={revenueData}
            dataKey="revenue"
            xAxisKey="month"
            color="hsl(var(--chart-1))"
          />
          <BarChartComponent
            title="Crescimento de Empresas"
            description="Número de empresas ativas por mês"
            data={companyGrowthData}
            dataKey="companies"
            xAxisKey="month"
            color="hsl(var(--chart-2))"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Companies */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Empresas Recentes</CardTitle>
              <CardDescription>Últimas empresas cadastradas na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{company.name}</p>
                        <p className="text-xs text-muted-foreground">Plano {company.plan}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          company.status === "ativo"
                            ? "default"
                            : company.status === "pendente"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {company.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(company.joinedAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <PieChartComponent
            title="Distribuição de Planos"
            description="Proporção de empresas por tipo de plano"
            data={planDistributionData}
          />
        </div>

        {/* Top Performing Agents */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Agentes com Melhor Performance</CardTitle>
            <CardDescription>Agentes de IA com maior engajamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingAgents.map((agent, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Bot className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-3 w-3 text-accent" />
                      <span className="text-sm font-medium">{agent.interactions}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">★ {agent.satisfaction}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Estatísticas de Uso</CardTitle>
            <CardDescription>Volume de mensagens processadas por cliente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">45.2K</div>
                  <div className="text-sm text-muted-foreground">Mensagens hoje</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">1.2M</div>
                  <div className="text-sm text-muted-foreground">Mensagens este mês</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">98.5%</div>
                  <div className="text-sm text-muted-foreground">Taxa de sucesso</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

import { AdminLayout } from "@/components/layout/admin-layout"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, CreditCard, TrendingUp, AlertCircle, Download } from "lucide-react"

export default function AdminBillingPage() {
  const recentTransactions = [
    {
      id: "TXN-001",
      company: "TechCorp Ltda",
      plan: "Pro",
      amount: "R$ 299,00",
      status: "pago",
      date: "2024-01-20",
      method: "Cartão de Crédito",
    },
    {
      id: "TXN-002",
      company: "E-commerce Plus",
      plan: "Enterprise",
      amount: "R$ 899,00",
      status: "pago",
      date: "2024-01-19",
      method: "Boleto",
    },
    {
      id: "TXN-003",
      company: "StartupXYZ",
      plan: "Basic",
      amount: "R$ 99,00",
      status: "pendente",
      date: "2024-01-18",
      method: "PIX",
    },
    {
      id: "TXN-004",
      company: "Consultoria ABC",
      plan: "Pro",
      amount: "R$ 299,00",
      status: "vencido",
      date: "2024-01-15",
      method: "Cartão de Crédito",
    },
  ]

  const planDistribution = [
    { plan: "Basic", count: 45, revenue: "R$ 4.455,00", percentage: 35 },
    { plan: "Pro", count: 67, revenue: "R$ 20.033,00", percentage: 53 },
    { plan: "Enterprise", count: 15, revenue: "R$ 13.485,00", percentage: 12 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pago":
        return <Badge variant="default">Pago</Badge>
      case "pendente":
        return <Badge variant="secondary">Pendente</Badge>
      case "vencido":
        return <Badge variant="destructive">Vencido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminLayout title="Painel Financeiro" breadcrumbs={[{ label: "Admin" }, { label: "Faturamento" }]}>
      <div className="space-y-6">
        {/* Financial KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Receita Mensal"
            value="R$ 89.4K"
            description="Receita recorrente mensal"
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Assinaturas Ativas"
            value="127"
            description="Total de assinaturas pagas"
            icon={<CreditCard className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Taxa de Conversão"
            value="23.5%"
            description="Trials para assinaturas pagas"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Inadimplência"
            value="2.1%"
            description="Pagamentos em atraso"
            icon={<AlertCircle className="h-4 w-4" />}
            trend={{ value: -1.2, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Plan Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Distribuição por Plano</CardTitle>
              <CardDescription>Receita e quantidade de assinantes por plano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planDistribution.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            item.plan === "Enterprise" ? "secondary" : item.plan === "Pro" ? "default" : "outline"
                          }
                        >
                          {item.plan}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{item.count} assinantes</span>
                      </div>
                      <span className="font-medium">{item.revenue}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-heading">Transações Recentes</CardTitle>
                <CardDescription>Últimos pagamentos processados</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.slice(0, 4).map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{transaction.company}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.plan} • {transaction.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{transaction.amount}</p>
                      <div className="flex items-center space-x-2">{getStatusBadge(transaction.status)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Histórico de Transações</CardTitle>
            <CardDescription>Todas as transações financeiras da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    <TableCell>{transaction.company}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.plan === "Enterprise"
                            ? "secondary"
                            : transaction.plan === "Pro"
                              ? "default"
                              : "outline"
                        }
                      >
                        {transaction.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{transaction.amount}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString("pt-BR")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

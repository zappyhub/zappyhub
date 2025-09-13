import { ClientLayout } from "@/components/layout/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, Edit, Truck, Plus } from "lucide-react"

export default function ClientOrdersPage() {
  const orders = [
    {
      id: "#001",
      customer: "João Silva",
      items: "2x Pizza Margherita, 1x Coca-Cola",
      status: "entregue",
      total: "R$ 89,90",
      date: "2024-01-20",
      time: "14:30",
      delivery: "Rua das Flores, 123",
    },
    {
      id: "#002",
      customer: "Maria Santos",
      items: "1x Hambúrguer Artesanal, 1x Batata Frita",
      status: "preparando",
      total: "R$ 156,50",
      date: "2024-01-20",
      time: "14:15",
      delivery: "Av. Principal, 456",
    },
    {
      id: "#003",
      customer: "Pedro Costa",
      items: "3x Sushi Combo, 2x Temaki",
      status: "pendente",
      total: "R$ 234,20",
      date: "2024-01-20",
      time: "13:45",
      delivery: "Rua do Comércio, 789",
    },
    {
      id: "#004",
      customer: "Ana Oliveira",
      items: "1x Salada Caesar, 1x Suco Natural",
      status: "entregue",
      total: "R$ 67,80",
      date: "2024-01-20",
      time: "13:20",
      delivery: "Rua Verde, 321",
    },
    {
      id: "#005",
      customer: "Carlos Mendes",
      items: "2x Açaí com Granola",
      status: "cancelado",
      total: "R$ 45,00",
      date: "2024-01-20",
      time: "12:50",
      delivery: "Rua Azul, 654",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "entregue":
        return <Badge className="bg-accent text-accent-foreground">Entregue</Badge>
      case "preparando":
        return <Badge className="bg-secondary text-secondary-foreground">Preparando</Badge>
      case "pendente":
        return <Badge variant="outline">Pendente</Badge>
      case "cancelado":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <ClientLayout title="Gestão de Pedidos" breadcrumbs={[{ label: "Dashboard" }, { label: "Pedidos" }]}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar pedidos..." className="pl-10 w-80" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </div>

        {/* Order Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Hoje</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">24</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Entregues</p>
                  <p className="text-2xl font-bold text-accent">18</p>
                </div>
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-accent font-bold">18</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Preparando</p>
                  <p className="text-2xl font-bold text-secondary">3</p>
                </div>
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-secondary font-bold">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Faturamento</p>
                  <p className="text-2xl font-bold">R$ 1.2K</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-xs">R$</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Todos os Pedidos</CardTitle>
            <CardDescription>Gerencie todos os pedidos da sua empresa</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.delivery}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={order.items}>
                        {order.items}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="font-medium">{order.total}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(order.date).toLocaleDateString("pt-BR")}</div>
                        <div className="text-muted-foreground">{order.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Rastrear entrega
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}

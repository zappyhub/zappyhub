import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Edit, Trash2, Plus } from "lucide-react"

export default function AdminCompaniesPage() {
  const companies = [
    {
      id: 1,
      name: "TechCorp Ltda",
      email: "admin@techcorp.com",
      plan: "Pro",
      status: "ativo",
      agents: 5,
      messages: "12.5K",
      joinedAt: "2024-01-15",
      lastActive: "2024-01-20",
    },
    {
      id: 2,
      name: "StartupXYZ",
      email: "contato@startupxyz.com",
      plan: "Basic",
      status: "pendente",
      agents: 2,
      messages: "3.2K",
      joinedAt: "2024-01-14",
      lastActive: "2024-01-19",
    },
    {
      id: 3,
      name: "E-commerce Plus",
      email: "suporte@ecommerceplus.com",
      plan: "Enterprise",
      status: "ativo",
      agents: 12,
      messages: "45.8K",
      joinedAt: "2024-01-13",
      lastActive: "2024-01-20",
    },
    {
      id: 4,
      name: "Consultoria ABC",
      email: "info@consultoriaabc.com",
      plan: "Pro",
      status: "suspenso",
      agents: 3,
      messages: "8.1K",
      joinedAt: "2024-01-12",
      lastActive: "2024-01-18",
    },
    {
      id: 5,
      name: "Loja Virtual 123",
      email: "admin@lojavirtual123.com",
      plan: "Basic",
      status: "ativo",
      agents: 1,
      messages: "2.9K",
      joinedAt: "2024-01-11",
      lastActive: "2024-01-20",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge variant="default">Ativo</Badge>
      case "pendente":
        return <Badge variant="secondary">Pendente</Badge>
      case "suspenso":
        return <Badge variant="destructive">Suspenso</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-secondary text-secondary-foreground">Enterprise</Badge>
      case "Pro":
        return <Badge className="bg-primary text-primary-foreground">Pro</Badge>
      case "Basic":
        return <Badge variant="outline">Basic</Badge>
      default:
        return <Badge variant="outline">{plan}</Badge>
    }
  }

  return (
    <AdminLayout title="Gestão de Empresas" breadcrumbs={[{ label: "Admin" }, { label: "Empresas" }]}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar empresas..." className="pl-10 w-80" />
            </div>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Empresa
          </Button>
        </div>

        {/* Companies Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Empresas Cadastradas</CardTitle>
            <CardDescription>Gerencie todas as empresas clientes da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Agentes</TableHead>
                  <TableHead>Mensagens</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-muted-foreground">{company.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(company.plan)}</TableCell>
                    <TableCell>{getStatusBadge(company.status)}</TableCell>
                    <TableCell>{company.agents}</TableCell>
                    <TableCell>{company.messages}</TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(company.lastActive).toLocaleDateString("pt-BR")}</div>
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
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Suspender
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
    </AdminLayout>
  )
}

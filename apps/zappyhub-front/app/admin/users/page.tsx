import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, UserPlus, Edit, Trash2, Shield } from "lucide-react"

export default function AdminUsersPage() {
  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@zappyhub.com",
      role: "admin",
      status: "ativo",
      lastLogin: "2024-01-20",
      createdAt: "2023-06-15",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@zappyhub.com",
      role: "suporte",
      status: "ativo",
      lastLogin: "2024-01-19",
      createdAt: "2023-08-22",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@zappyhub.com",
      role: "analista",
      status: "ativo",
      lastLogin: "2024-01-18",
      createdAt: "2023-09-10",
    },
    {
      id: 4,
      name: "Ana Oliveira",
      email: "ana@zappyhub.com",
      role: "suporte",
      status: "inativo",
      lastLogin: "2024-01-10",
      createdAt: "2023-11-05",
    },
  ]

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-destructive text-destructive-foreground">Admin</Badge>
      case "suporte":
        return <Badge className="bg-primary text-primary-foreground">Suporte</Badge>
      case "analista":
        return <Badge className="bg-secondary text-secondary-foreground">Analista</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge variant="default">Ativo</Badge>
      case "inativo":
        return <Badge variant="secondary">Inativo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminLayout title="Gestão de Usuários" breadcrumbs={[{ label: "Admin" }, { label: "Usuários" }]}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar usuários..." className="pl-10 w-80" />
            </div>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Usuários Internos</CardTitle>
            <CardDescription>Gerencie usuários administrativos da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/diverse-user-avatars.png" alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(user.lastLogin).toLocaleDateString("pt-BR")}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(user.createdAt).toLocaleDateString("pt-BR")}</div>
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
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Permissões
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Desativar
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

        {/* Role Distribution */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg">Administradores</CardTitle>
              <CardDescription>Usuários com acesso total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">1</div>
              <p className="text-sm text-muted-foreground">Acesso completo ao sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg">Suporte</CardTitle>
              <CardDescription>Equipe de atendimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">2</div>
              <p className="text-sm text-muted-foreground">Atendimento aos clientes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg">Analistas</CardTitle>
              <CardDescription>Análise de dados e relatórios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">1</div>
              <p className="text-sm text-muted-foreground">Análise e insights</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

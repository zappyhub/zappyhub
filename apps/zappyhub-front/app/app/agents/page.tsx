import { ClientLayout } from "@/components/layout/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Bot, Play, Pause, Settings, BarChart3, MessageSquare } from "lucide-react"

export default function ClientAgentsPage() {
  const agents = [
    {
      id: 1,
      name: "Agente Vendas Pro",
      description: "Especializado em vendas e conversão de leads",
      status: "online",
      interactions: 1250,
      satisfaction: 4.8,
      integrations: ["WhatsApp", "Website"],
      createdAt: "2024-01-15",
      lastActive: "2024-01-20 14:30",
    },
    {
      id: 2,
      name: "Suporte Bot",
      description: "Atendimento ao cliente e resolução de dúvidas",
      status: "online",
      interactions: 980,
      satisfaction: 4.6,
      integrations: ["WhatsApp", "Telegram"],
      createdAt: "2024-01-10",
      lastActive: "2024-01-20 14:25",
    },
    {
      id: 3,
      name: "Atendimento IA",
      description: "Agente geral para atendimento básico",
      status: "offline",
      interactions: 750,
      satisfaction: 4.7,
      integrations: ["Website"],
      createdAt: "2024-01-08",
      lastActive: "2024-01-19 18:45",
    },
  ]

  const getStatusBadge = (status: string) => {
    return status === "online" ? (
      <Badge className="bg-accent text-accent-foreground">Online</Badge>
    ) : (
      <Badge variant="secondary">Offline</Badge>
    )
  }

  const getIntegrationBadges = (integrations: string[]) => {
    return integrations.map((integration, index) => (
      <Badge key={index} variant="outline" className="text-xs">
        {integration}
      </Badge>
    ))
  }

  return (
    <ClientLayout title="Agentes de IA" breadcrumbs={[{ label: "Dashboard" }, { label: "Agentes" }]}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar agentes..." className="pl-10 w-80" />
            </div>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Criar Agente
          </Button>
        </div>

        {/* Agent Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Agentes</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Bot className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Agentes Online</p>
                  <p className="text-2xl font-bold text-accent">2</p>
                </div>
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Play className="h-4 w-4 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Interações Hoje</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
                <MessageSquare className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Satisfação Média</p>
                  <p className="text-2xl font-bold">4.7</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">★</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/ai-robot-avatar.png" alt={agent.name} />
                      <AvatarFallback>
                        <Bot className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="font-heading text-lg">{agent.name}</CardTitle>
                      <CardDescription className="text-sm">{agent.description}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Configurar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Métricas
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {agent.status === "online" ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Ativar
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(agent.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Interações</span>
                    <span className="text-sm font-medium">{agent.interactions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Satisfação</span>
                    <span className="text-sm font-medium">★ {agent.satisfaction}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Integrações</span>
                  <div className="flex flex-wrap gap-1">{getIntegrationBadges(agent.integrations)}</div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    <p>Criado em: {new Date(agent.createdAt).toLocaleDateString("pt-BR")}</p>
                    <p>Última atividade: {agent.lastActive}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Setup Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Guia Rápido</CardTitle>
            <CardDescription>Como criar e configurar seus agentes de IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">1. Criar Agente</h3>
                <p className="text-sm text-muted-foreground">Defina nome, personalidade e função do agente</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-medium mb-2">2. Configurar</h3>
                <p className="text-sm text-muted-foreground">Conecte com WhatsApp, Telegram ou Website</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Play className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-medium mb-2">3. Ativar</h3>
                <p className="text-sm text-muted-foreground">Coloque o agente online e monitore performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  )
}

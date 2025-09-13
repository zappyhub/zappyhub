import { ClientLayout } from "@/components/layout/client-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save, Upload, Key, Bell, Shield, Smartphone, Globe, MessageSquare } from "lucide-react"

export default function ClientSettingsPage() {
  return (
    <ClientLayout title="Configurações" breadcrumbs={[{ label: "Dashboard" }, { label: "Configurações" }]}>
      <div className="space-y-6">
        {/* Company Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Perfil da Empresa
            </CardTitle>
            <CardDescription>Informações básicas da sua empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/generic-company-logo.png" alt="Logo da empresa" />
                <AvatarFallback className="text-2xl">TC</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Alterar Logo
                </Button>
                <p className="text-sm text-muted-foreground mt-1">PNG, JPG até 2MB</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input id="company-name" defaultValue="TechCorp Ltda" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-email">Email Principal</Label>
                <Input id="company-email" defaultValue="contato@techcorp.com" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-phone">Telefone</Label>
                <Input id="company-phone" defaultValue="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website">Website</Label>
                <Input id="company-website" defaultValue="https://techcorp.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address">Endereço</Label>
              <Textarea id="company-address" defaultValue="Rua das Flores, 123 - Centro - São Paulo/SP" rows={2} />
            </div>
          </CardContent>
        </Card>

        {/* API Keys & Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Key className="mr-2 h-5 w-5" />
              Integrações e API Keys
            </CardTitle>
            <CardDescription>Configure suas integrações externas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* WhatsApp Integration */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">WhatsApp Business</h3>
                  <p className="text-sm text-muted-foreground">Conecte sua conta do WhatsApp Business</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500 text-white">Conectado</Badge>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </div>

            {/* Telegram Integration */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Telegram Bot</h3>
                  <p className="text-sm text-muted-foreground">Configure seu bot do Telegram</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Desconectado</Badge>
                <Button variant="outline" size="sm">
                  Conectar
                </Button>
              </div>
            </div>

            {/* Website Chat */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Chat do Website</h3>
                  <p className="text-sm text-muted-foreground">Widget de chat para seu site</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-primary text-primary-foreground">Ativo</Badge>
                <Button variant="outline" size="sm">
                  Código
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">API Keys</h3>
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave da API</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" value="zph_live_••••••••••••••••••••••••••••••••" readOnly />
                  <Button variant="outline">Copiar</Button>
                  <Button variant="outline">Regenerar</Button>
                </div>
                <p className="text-sm text-muted-foreground">Use esta chave para integrar com sistemas externos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Configurações de Notificação
            </CardTitle>
            <CardDescription>Configure quando e como receber notificações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Novos Pedidos</Label>
                  <p className="text-sm text-muted-foreground">Notificar quando receber novos pedidos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Mensagens de Clientes</Label>
                  <p className="text-sm text-muted-foreground">Notificar sobre novas mensagens</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Relatórios Semanais</Label>
                  <p className="text-sm text-muted-foreground">Receber resumo semanal por email</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Alertas de Sistema</Label>
                  <p className="text-sm text-muted-foreground">Notificar sobre problemas técnicos</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Configurações de Segurança
            </CardTitle>
            <CardDescription>Gerencie a segurança da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" placeholder="Digite sua senha atual" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" placeholder="Digite a nova senha" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirme a nova senha" />
                </div>
              </div>
              <Button variant="outline">Alterar Senha</Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Information */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Informações do Plano</CardTitle>
            <CardDescription>Detalhes da sua assinatura atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground">Plano Pro</Badge>
                  <span className="text-sm text-muted-foreground">R$ 299,00/mês</span>
                </div>
                <p className="text-sm text-muted-foreground">Próxima cobrança: 20 de fevereiro de 2024</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Alterar Plano</Button>
                <Button variant="outline">Histórico</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg">
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </ClientLayout>
  )
}

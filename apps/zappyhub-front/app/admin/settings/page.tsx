import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, Globe, Mail, Bell, Shield, Database } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <AdminLayout title="Configurações do Sistema" breadcrumbs={[{ label: "Admin" }, { label: "Configurações" }]}>
      <div className="space-y-6">
        {/* System Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Branding do Sistema
            </CardTitle>
            <CardDescription>Configure a identidade visual da plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input id="company-name" defaultValue="Zappyhub" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-domain">Domínio</Label>
                <Input id="company-domain" defaultValue="zappyhub.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-description">Descrição</Label>
              <Textarea
                id="company-description"
                defaultValue="Plataforma completa para automação de atendimento com agentes de IA"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Logo da Empresa</Label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-bold text-2xl">Z</span>
                </div>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Alterar Logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Configurações de Email
            </CardTitle>
            <CardDescription>Configure o servidor SMTP para envio de emails</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Servidor SMTP</Label>
                <Input id="smtp-host" placeholder="smtp.gmail.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Porta</Label>
                <Input id="smtp-port" placeholder="587" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="smtp-user">Usuário</Label>
                <Input id="smtp-user" placeholder="noreply@zappyhub.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">Senha</Label>
                <Input id="smtp-password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="smtp-ssl" />
              <Label htmlFor="smtp-ssl">Usar SSL/TLS</Label>
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
            <CardDescription>Configure quando e como as notificações são enviadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações de Novo Cliente</Label>
                  <p className="text-sm text-muted-foreground">Notificar quando uma nova empresa se cadastra</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Alertas de Pagamento</Label>
                  <p className="text-sm text-muted-foreground">Notificar sobre pagamentos vencidos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Relatórios Semanais</Label>
                  <p className="text-sm text-muted-foreground">Enviar resumo semanal por email</p>
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
            <CardDescription>Configure políticas de segurança da plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
                <Input id="session-timeout" defaultValue="60" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-login-attempts">Máximo de Tentativas de Login</Label>
                <Input id="max-login-attempts" defaultValue="5" type="number" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">Exigir 2FA para usuários administrativos</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Logs de Auditoria</Label>
                  <p className="text-sm text-muted-foreground">Registrar todas as ações administrativas</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Status do Sistema
            </CardTitle>
            <CardDescription>Informações sobre o estado atual da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Badge variant="default" className="mb-2">
                  Online
                </Badge>
                <div className="text-sm text-muted-foreground">Status da API</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Badge variant="default" className="mb-2">
                  Conectado
                </Badge>
                <div className="text-sm text-muted-foreground">Banco de Dados</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Badge variant="default" className="mb-2">
                  Funcionando
                </Badge>
                <div className="text-sm text-muted-foreground">Servidor de Email</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Badge variant="secondary" className="mb-2">
                  v1.2.3
                </Badge>
                <div className="text-sm text-muted-foreground">Versão do Sistema</div>
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
    </AdminLayout>
  )
}

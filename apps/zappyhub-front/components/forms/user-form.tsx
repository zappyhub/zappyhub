"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface UserFormProps {
  onSubmit?: (data: any) => void
  onCancel?: () => void
  initialData?: any
}

export function UserForm({ onSubmit, onCancel, initialData }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "user",
    status: initialData?.status || true,
    permissions: initialData?.permissions || [],
    ...initialData,
  })

  const [selectedPermission, setSelectedPermission] = useState("")

  const availablePermissions = [
    "dashboard.view",
    "companies.view",
    "companies.create",
    "companies.edit",
    "companies.delete",
    "users.view",
    "users.create",
    "users.edit",
    "users.delete",
    "billing.view",
    "settings.view",
    "settings.edit",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const addPermission = () => {
    if (selectedPermission && !formData.permissions.includes(selectedPermission)) {
      setFormData((prev) => ({
        ...prev,
        permissions: [...prev.permissions, selectedPermission],
      }))
      setSelectedPermission("")
    }
  }

  const removePermission = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.filter((p: string) => p !== permission),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Editar Usuário" : "Novo Usuário"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="role">Função</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="viewer">Visualizador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="status"
                checked={formData.status}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, status: checked }))}
              />
              <Label htmlFor="status">Usuário Ativo</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Permissões</Label>
            <div className="flex gap-2">
              <Select value={selectedPermission} onValueChange={setSelectedPermission}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione uma permissão" />
                </SelectTrigger>
                <SelectContent>
                  {availablePermissions
                    .filter((perm) => !formData.permissions.includes(perm))
                    .map((permission) => (
                      <SelectItem key={permission} value={permission}>
                        {permission}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addPermission} variant="outline">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.permissions.map((permission: string) => (
                <Badge key={permission} variant="secondary" className="flex items-center gap-1">
                  {permission}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removePermission(permission)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">{initialData ? "Salvar Alterações" : "Criar Usuário"}</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface AgentFormProps {
  onSubmit?: (data: any) => void
  onCancel?: () => void
  initialData?: any
}

export function AgentForm({ onSubmit, onCancel, initialData }: AgentFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "vendas",
    description: initialData?.description || "",
    status: initialData?.status || true,
    platforms: initialData?.platforms || [],
    instructions: initialData?.instructions || "",
    maxConversations: initialData?.maxConversations || 10,
    ...initialData,
  })

  const [selectedPlatform, setSelectedPlatform] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const addPlatform = () => {
    if (selectedPlatform && !formData.platforms.includes(selectedPlatform)) {
      setFormData((prev) => ({
        ...prev,
        platforms: [...prev.platforms, selectedPlatform],
      }))
      setSelectedPlatform("")
    }
  }

  const removePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.filter((p: string) => p !== platform),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Editar Agente" : "Novo Agente"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Agente</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendas">Vendas</SelectItem>
                  <SelectItem value="suporte">Suporte</SelectItem>
                  <SelectItem value="atendimento">Atendimento</SelectItem>
                  <SelectItem value="cobranca">Cobrança</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição do agente..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Plataformas</Label>
            <div className="flex gap-2">
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione uma plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Telegram">Telegram</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={addPlatform} variant="outline">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.platforms.map((platform: string) => (
                <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                  {platform}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removePlatform(platform)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="maxConversations">Máximo de Conversas</Label>
              <Input
                id="maxConversations"
                type="number"
                value={formData.maxConversations}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, maxConversations: Number.parseInt(e.target.value) }))
                }
                min="1"
                max="100"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="status"
                checked={formData.status}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, status: checked }))}
              />
              <Label htmlFor="status">Agente Ativo</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instruções do Agente</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData((prev) => ({ ...prev, instructions: e.target.value }))}
              placeholder="Instruções específicas para o comportamento do agente..."
              rows={4}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">{initialData ? "Salvar Alterações" : "Criar Agente"}</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

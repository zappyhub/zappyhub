"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickRepliesProps {
  onSelectReply: (reply: string) => void
}

export function QuickReplies({ onSelectReply }: QuickRepliesProps) {
  const quickReplies = [
    "Olá! Como posso ajudar?",
    "Obrigado pelo contato!",
    "Vou verificar isso para você.",
    "Posso ajudar com mais alguma coisa?",
    "Tenha um ótimo dia!",
    "Vou transferir para um especialista.",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Respostas Rápidas</CardTitle>
        <CardDescription className="text-xs">Clique para usar uma resposta pré-definida</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start text-left h-auto p-2 text-xs bg-transparent"
              onClick={() => onSelectReply(reply)}
            >
              {reply}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

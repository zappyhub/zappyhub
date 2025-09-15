"use client"

import { useState } from "react"
import { ClientLayout } from "@/components/layout/client-layout"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ConversationList } from "@/components/chat/conversation-list"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatInput } from "@/components/chat/chat-input"
import { MessageSquare } from "lucide-react"

export default function ClientConversationsPage() {
  const [selectedConversationId, setSelectedConversationId] = useState("2")

  const conversations = [
    {
      id: "1",
      customer: "João Silva",
      lastMessage: "Obrigado pelo atendimento!",
      time: "14:30",
      unread: 0,
      status: "finalizada" as const,
      agent: "Agente Vendas Pro",
      platform: "WhatsApp" as const,
      starred: true,
    },
    {
      id: "2",
      customer: "Maria Santos",
      lastMessage: "Qual o prazo de entrega?",
      time: "14:15",
      unread: 2,
      status: "ativa" as const,
      agent: "Suporte Bot",
      platform: "Website" as const,
      priority: "high" as const,
    },
    {
      id: "3",
      customer: "Pedro Costa",
      lastMessage: "Gostaria de fazer um pedido",
      time: "13:45",
      unread: 1,
      status: "ativa" as const,
      agent: "Agente Vendas Pro",
      platform: "WhatsApp" as const,
    },
    {
      id: "4",
      customer: "Ana Oliveira",
      lastMessage: "Perfeito, muito obrigada!",
      time: "13:20",
      unread: 0,
      status: "finalizada" as const,
      agent: "Suporte Bot",
      platform: "Telegram" as const,
    },
  ]

  const currentConversation = conversations.find((c) => c.id === selectedConversationId)

  const messages = [
    {
      id: "1",
      sender: "customer" as const,
      content: "Olá, gostaria de saber sobre os produtos disponíveis",
      time: "14:10",
      type: "text" as const,
      status: "read" as const,
    },
    {
      id: "2",
      sender: "agent" as const,
      content: "Olá Maria! Temos uma grande variedade de produtos. Você está procurando algo específico?",
      time: "14:11",
      type: "text" as const,
    },
    {
      id: "3",
      sender: "customer" as const,
      content: "Estou interessada em pizzas. Vocês fazem entrega?",
      time: "14:12",
      type: "text" as const,
      status: "read" as const,
    },
    {
      id: "4",
      sender: "agent" as const,
      content: "Sim! Temos várias opções de pizza e fazemos entrega em toda a cidade. Qual o seu endereço?",
      time: "14:13",
      type: "text" as const,
    },
    {
      id: "5",
      sender: "customer" as const,
      content: "Av. Principal, 456 - Centro",
      time: "14:14",
      type: "text" as const,
      status: "delivered" as const,
    },
    {
      id: "6",
      sender: "system" as const,
      content: "Agente transferido para Suporte Bot",
      time: "14:14",
      type: "text" as const,
    },
    {
      id: "7",
      sender: "agent" as const,
      content: "Perfeito! Entregamos na sua região. O prazo de entrega é de 30-45 minutos.",
      time: "14:14",
      type: "text" as const,
    },
    {
      id: "8",
      sender: "customer" as const,
      content: "Qual o prazo de entrega?",
      time: "14:15",
      type: "text" as const,
      status: "sent" as const,
    },
  ]

  const handleSendMessage = (content: string, type: "text" | "image" | "file" = "text") => {
    console.log("Sending message:", { content, type })
    // In a real app, this would send the message to the backend
  }

  if (!currentConversation) {
    return (
      <ClientLayout title="Conversas" breadcrumbs={[{ label: "Dashboard" }, { label: "Conversas" }]}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
            <p className="text-muted-foreground">Escolha uma conversa da lista para começar</p>
          </div>
        </div>
      </ClientLayout>
    )
  }

  return (
    <ClientLayout title="Conversas" breadcrumbs={[{ label: "Dashboard" }, { label: "Conversas" }]}>
      <div className="flex flex-col gap-6 h-[calc(100vh-12rem)]">
        <div className="grid gap-6 lg:grid-cols-3 flex-1 min-h-0">
          {/* Conversations List */}
          <Card className="lg:col-span-1 flex flex-col min-h-0">
            <ConversationList
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={setSelectedConversationId}
              className="flex flex-col h-full"
            />
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col min-h-0">
            <ChatHeader
              customer={currentConversation.customer}
              platform={currentConversation.platform}
              agent={currentConversation.agent}
              status="online"
              lastSeen="há 2 minutos"
            />

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 min-h-0">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    showAvatar={true}
                    senderName={message.sender === "agent" ? currentConversation.agent : currentConversation.customer}
                  />
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              placeholder="Digite sua mensagem..."
              disabled={currentConversation.status === "finalizada"}
            />
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversas Ativas</p>
                  <p className="text-2xl font-bold text-accent">7</p>
                </div>
                <MessageSquare className="h-8 w-8 text-accent" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tempo Médio</p>
                  <p className="text-2xl font-bold">1.2min</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-xs">⏱</span>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Satisfação</p>
                  <p className="text-2xl font-bold">4.7</p>
                </div>
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-secondary text-sm">★</span>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Finalizadas Hoje</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-accent text-xs">✓</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ClientLayout>
  )
}

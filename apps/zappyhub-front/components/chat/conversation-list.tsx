"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Archive, Trash2, Star } from "lucide-react"

interface Conversation {
  id: string
  customer: string
  lastMessage: string
  time: string
  unread: number
  status: "ativa" | "finalizada" | "arquivada"
  agent: string
  platform: "WhatsApp" | "Website" | "Telegram"
  priority?: "high" | "normal" | "low"
  starred?: boolean
}

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversationId?: string
  onSelectConversation: (conversationId: string) => void
  className?: string
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  className,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all")

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && conv.status === "ativa") ||
      (filter === "archived" && conv.status === "arquivada")
    return matchesSearch && matchesFilter
  })

  const getPlatformBadge = (platform: string) => {
    const colors = {
      WhatsApp: "bg-green-500 text-white",
      Website: "bg-primary text-primary-foreground",
      Telegram: "bg-blue-500 text-white",
    }
    return <Badge className={`${colors[platform as keyof typeof colors]} text-xs`}>{platform}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return status === "ativa" ? (
      <Badge className="bg-accent text-accent-foreground text-xs">Ativa</Badge>
    ) : status === "finalizada" ? (
      <Badge variant="secondary" className="text-xs">
        Finalizada
      </Badge>
    ) : (
      <Badge variant="outline" className="text-xs">
        Arquivada
      </Badge>
    )
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "border-l-destructive"
      case "low":
        return "border-l-muted"
      default:
        return "border-l-transparent"
    }
  }

  return (
    <div className={className}>
      {/* Search and Filters */}
      <div className="p-4 border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Todas
          </Button>
          <Button variant={filter === "active" ? "default" : "outline"} size="sm" onClick={() => setFilter("active")}>
            Ativas
          </Button>
          <Button
            variant={filter === "archived" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("archived")}
          >
            Arquivadas
          </Button>
        </div>
      </div>

      {/* Conversations */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer border-l-2 ${getPriorityColor(conversation.priority)} ${
                selectedConversationId === conversation.id
                  ? "bg-muted border-border"
                  : "hover:bg-muted/50 border-transparent"
              }`}
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src="/diverse-user-avatars.png" alt={conversation.customer} />
                <AvatarFallback>{conversation.customer.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium truncate">{conversation.customer}</p>
                    {conversation.starred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                  </div>
                  <div className="flex items-center space-x-1">
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                        {conversation.unread}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground truncate mb-2">{conversation.lastMessage}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {getPlatformBadge(conversation.platform)}
                    {getStatusBadge(conversation.status)}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="mr-2 h-3 w-3" />
                        {conversation.starred ? "Remover estrela" : "Adicionar estrela"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-3 w-3" />
                        Arquivar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-3 w-3" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

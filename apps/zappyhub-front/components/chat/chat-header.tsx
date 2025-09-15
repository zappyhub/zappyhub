"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Phone, Video, MoreHorizontal, Archive, Trash2, UserPlus, Settings } from "lucide-react"

interface ChatHeaderProps {
  customer: string
  platform: string
  agent: string
  status: "online" | "offline" | "typing"
  lastSeen?: string
}

export function ChatHeader({ customer, platform, agent, status, lastSeen }: ChatHeaderProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "online":
        return <Badge className="bg-accent text-accent-foreground text-xs">Online</Badge>
      case "typing":
        return <Badge className="bg-secondary text-secondary-foreground text-xs">Digitando...</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            Offline
          </Badge>
        )
    }
  }

  const getPlatformBadge = (platform: string) => {
    const colors = {
      WhatsApp: "bg-green-500 text-white",
      Website: "bg-primary text-primary-foreground",
      Telegram: "bg-blue-500 text-white",
    }
    return <Badge className={`${colors[platform as keyof typeof colors]} text-xs`}>{platform}</Badge>
  }

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/diverse-user-avatars.png" alt={customer} />
          <AvatarFallback>{customer.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-medium">{customer}</h3>
            {getStatusBadge()}
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {getPlatformBadge(platform)}
            <span>•</span>
            <span>{agent}</span>
            {lastSeen && status === "offline" && (
              <>
                <span>•</span>
                <span>Visto por último: {lastSeen}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Configurações da conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Arquivar conversa
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir conversa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

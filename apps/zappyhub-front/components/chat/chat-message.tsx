"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, CheckCheck, Download, ImageIcon, FileText, Clock } from "lucide-react"

interface ChatMessageProps {
  message: {
    id: string
    sender: "customer" | "agent" | "system"
    content: string
    time: string
    status?: "sent" | "delivered" | "read"
    type?: "text" | "image" | "file"
    fileUrl?: string
    fileName?: string
    fileSize?: string
  }
  showAvatar?: boolean
  senderName?: string
}

export function ChatMessage({ message, showAvatar = true, senderName }: ChatMessageProps) {
  const isCustomer = message.sender === "customer"
  const isSystem = message.sender === "system"

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{message.content}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex gap-3 max-w-[80%]", isCustomer ? "ml-auto flex-row-reverse" : "mr-auto")}>
      {showAvatar && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={isCustomer ? "/diverse-user-avatars.png" : "/ai-robot-avatar.png"} />
          <AvatarFallback>{isCustomer ? "C" : "A"}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("flex flex-col", isCustomer ? "items-end" : "items-start")}>
        {senderName && <span className="text-xs text-muted-foreground mb-1 px-1">{senderName}</span>}
        <div
          className={cn(
            "rounded-lg px-3 py-2 max-w-sm break-words",
            isCustomer ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border",
          )}
        >
          {message.type === "image" && message.fileUrl && (
            <div className="space-y-2">
              <ImageIcon
                src={message.fileUrl || "/placeholder.svg"}
                alt="Shared image"
                className="rounded-md max-w-full h-auto"
              />
              {message.content && <p className="text-sm">{message.content}</p>}
            </div>
          )}

          {message.type === "file" && message.fileUrl && (
            <div className="flex items-center space-x-2 p-2 bg-background/10 rounded-md">
              <FileText className="h-4 w-4" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{message.fileName}</p>
                <p className="text-xs opacity-70">{message.fileSize}</p>
              </div>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <Download className="h-3 w-3" />
              </Button>
            </div>
          )}

          {message.type === "text" && <p className="text-sm">{message.content}</p>}
        </div>

        <div
          className={cn("flex items-center space-x-1 mt-1 px-1", isCustomer ? "flex-row-reverse space-x-reverse" : "")}
        >
          <span className="text-xs text-muted-foreground">{message.time}</span>
          {isCustomer && message.status && (
            <div className="text-muted-foreground">
              {message.status === "sent" && <Check className="h-3 w-3" />}
              {message.status === "delivered" && <CheckCheck className="h-3 w-3" />}
              {message.status === "read" && <CheckCheck className="h-3 w-3 text-accent" />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Send, Paperclip, ImageIcon, FileText, Smile, Mic } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string, type?: "text" | "image" | "file") => void
  placeholder?: string
  disabled?: boolean
}

export function ChatInput({ onSendMessage, placeholder = "Digite sua mensagem...", disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = (type: "image" | "file") => {
    if (type === "image") {
      imageInputRef.current?.click()
    } else {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file and get a URL
      onSendMessage(`Arquivo enviado: ${file.name}`, type)
    }
  }

  return (
    <div className="border-t bg-background p-4">
      <div className="flex items-end space-x-2">
        {/* Attachment Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" disabled={disabled}>
              <Paperclip className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleFileUpload("image")}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Imagem
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFileUpload("file")}>
              <FileText className="mr-2 h-4 w-4" />
              Arquivo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Message Input */}
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[40px] max-h-[120px] resize-none"
            rows={1}
          />
        </div>

        {/* Emoji Button */}
        <Button variant="ghost" size="sm" disabled={disabled}>
          <Smile className="h-4 w-4" />
        </Button>

        {/* Voice Message Button */}
        <Button
          variant="ghost"
          size="sm"
          disabled={disabled}
          onClick={() => setIsRecording(!isRecording)}
          className={isRecording ? "text-destructive" : ""}
        >
          <Mic className="h-4 w-4" />
        </Button>

        {/* Send Button */}
        <Button onClick={handleSend} disabled={!message.trim() || disabled} size="sm">
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileChange(e, "file")}
        accept=".pdf,.doc,.docx,.txt,.zip"
      />
      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileChange(e, "image")}
        accept="image/*"
      />
    </div>
  )
}

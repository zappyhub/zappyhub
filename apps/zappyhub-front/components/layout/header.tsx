"use client"

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "./mobile-nav"
import { Sidebar } from "./sidebar"

interface HeaderProps {
  title: string
  breadcrumbs?: { label: string; href?: string }[]
  isAdmin?: boolean
}

export function Header({ title, breadcrumbs, isAdmin = false }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-background">
      <div className="flex items-center gap-4">
        <MobileNav>
          <Sidebar isAdmin={isAdmin} />
        </MobileNav>

        <div className="flex-1">
          {breadcrumbs && (
            <nav className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground mb-1">
              {breadcrumbs.map((crumb, index) => (
                <span key={index}>
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-foreground transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    crumb.label
                  )}
                  {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-xl md:text-2xl font-heading font-semibold text-foreground text-balance">{title}</h1>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Search - Hidden on mobile */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." className="pl-10 w-48 xl:w-64 transition-all focus:w-56 xl:focus:w-72" />
        </div>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative hover:bg-accent transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse"></span>
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full hover:ring-2 hover:ring-accent transition-all"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-user-avatars.png" alt="Avatar" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Usuário</p>
                <p className="text-xs leading-none text-muted-foreground">usuario@empresa.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  ShoppingCart,
  Bot,
  MessageSquare,
  BarChart3,
  Settings,
  Building2,
  CreditCard,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  isAdmin?: boolean
}

const adminNavItems = [
  {
    title: "Visão Geral",
    href: "/admin/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Empresas",
    href: "/admin/companies",
    icon: Building2,
  },
  {
    title: "Faturamento",
    href: "/admin/billing",
    icon: CreditCard,
  },
  {
    title: "Usuários",
    href: "/admin/users",
    icon: UserCheck,
  },
  {
    title: "Configurações",
    href: "/admin/settings",
    icon: Settings,
  },
]

const clientNavItems = [
  {
    title: "Visão Geral",
    href: "/app/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Pedidos",
    href: "/app/orders",
    icon: ShoppingCart,
  },
  {
    title: "Agentes",
    href: "/app/agents",
    icon: Bot,
  },
  {
    title: "Conversas",
    href: "/app/conversations",
    icon: MessageSquare,
  },
  {
    title: "Relatórios",
    href: "/app/reports",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    href: "/app/settings",
    icon: Settings,
  },
]

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const navItems = isAdmin ? adminNavItems : clientNavItems

  return (
    <div
      className={cn(
        "relative hidden md:flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-heading font-bold text-sm">Z</span>
            </div>
            <span className="font-heading font-semibold text-sidebar-foreground">Zappyhub</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 group",
                    collapsed && "px-2",
                    isActive &&
                      "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 shadow-sm",
                  )}
                >
                  <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", !collapsed && "mr-3")} />
                  {!collapsed && <span className="font-medium">{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}

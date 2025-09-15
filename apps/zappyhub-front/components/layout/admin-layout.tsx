import type React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function AdminLayout({ children, title, breadcrumbs }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} breadcrumbs={breadcrumbs} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

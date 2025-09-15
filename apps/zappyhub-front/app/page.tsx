"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page by default
    router.push("/login")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-primary-foreground font-heading font-bold text-2xl">Z</span>
        </div>
        <h1 className="text-2xl font-heading font-semibold mb-2">Zappyhub</h1>
        <p className="text-muted-foreground">Redirecionando...</p>
      </div>
    </div>
  )
}

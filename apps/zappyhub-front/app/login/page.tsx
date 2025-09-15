"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login process
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication logic
      if (email === "admin@zappyhub.com") {
        router.push("/admin/overview")
      } else {
        router.push("/app/overview")
      }
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-heading font-bold text-2xl">Z</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Zappyhub</h1>
          <p className="text-muted-foreground mt-2">Entre na sua conta</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Fazer Login</CardTitle>
            <CardDescription>Digite suas credenciais para acessar sua conta</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/register" className="text-primary hover:text-primary/80 transition-colors">
                  Cadastre-se
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium text-muted-foreground mb-2">Credenciais de demonstração:</p>
          <div className="text-xs space-y-1">
            <p>
              <strong>Admin:</strong> admin@zappyhub.com
            </p>
            <p>
              <strong>Cliente:</strong> qualquer outro email
            </p>
            <p>
              <strong>Senha:</strong> qualquer senha
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

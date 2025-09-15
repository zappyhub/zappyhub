"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, FileText, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

const projects = [
  {
    id: "monorepo",
    name: "Monorepo",
    description: "Docs do monorepo",
    icon: <FileText className="h-6 w-6" />,
    status: "Ativo",
    version: "v1.0.0",
    color: "bg-blue-500",
  },
  {
    id: "api",
    name: "API",
    description: "Docs da API",
    icon: <FileText className="h-6 w-6" />,
    status: "Ativo",
    version: "v1.0.0",
    color: "bg-blue-500",
  },
  {
    id: "docs",
    name: "Docs",
    description: "Docs do docs",
    icon: <FileText className="h-6 w-6" />,
    status: "Ativo",
    version: "v1.0.0",
    color: "bg-blue-500",
  },
  {
    id: "crm",
    name: "CRM frontend",
    description: "Docs do CRM",
    icon: <FileText className="h-6 w-6" />,
    status: "Ativo",
    version: "v1.0.0",
    color: "bg-blue-500",
  },
];

const quickLinks = [
  {
    title: "Guia de Início Rápido",
    icon: <Zap className="h-5 w-5" />,
    href: "/docs/monorepo/@zappyhub-team-get-started-2025-09",
  },
  {
    title: "Referência da API",
    icon: <Code className="h-5 w-5" />,
    href: "/#",
  },
  {
    title: "Segurança",
    icon: <Shield className="h-5 w-5" />,
    href: "/#",
  },
  {
    title: "Changelog",
    icon: <BookOpen className="h-5 w-5" />,
    href: "/#",
  },
];

export default function DocumentationHome() {
  const router = useRouter();

  const handleProjectSelect = (projectId: string) => {
    router.push(`/docs/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-balance">
                  Documentação do Monorepo
                </h1>
              </div>
            </div>
            <div className="flex gap-4">
              <ThemeToggle />
              <Link href={"https://github.com/zappyhub/"} target="_blank">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <svg
                      role="img"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Bem-vindo à Documentação
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Explore a documentação completa da nossa plataforma de blogs com CRM
            integrado. Selecione um projeto específico para começar.
          </p>

          {/* Project Selector */}
          <div className="max-w-md mx-auto mb-8">
            <Select onValueChange={handleProjectSelect}>
              <SelectTrigger className="w-full h-12 text-left">
                <SelectValue placeholder="Selecione um projeto para explorar" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex items-center space-x-2">
                      {project.icon}
                      <span>{project.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Links Rápidos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-[currentColor]/30 rounded-lg text-[currentColor]">
                        {link.icon}
                      </div>
                    </div>
                    <h4 className="font-medium">{link.title}</h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">Projetos do Monorepo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${project.color} text-white`}
                      >
                        {project.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-accent transition-colors">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant={
                              project.status === "Ativo"
                                ? "default"
                                : project.status === "Beta"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {project.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {project.version}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pretty">
                    {project.description}
                  </CardDescription>
                  <Button
                    className="w-full mt-4 bg-transparent"
                    variant="outline"
                    onClick={() => handleProjectSelect(project.id)}
                  >
                    Ver Documentação
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Documentação</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/getting-started"
                    className="hover:text-foreground"
                  >
                    Começando
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="hover:text-foreground">
                    Tutoriais
                  </Link>
                </li>
                <li>
                  <Link href="/examples" className="hover:text-foreground">
                    Exemplos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">API</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/api/blog" className="hover:text-foreground">
                    Blog API
                  </Link>
                </li>
                <li>
                  <Link href="/api/crm" className="hover:text-foreground">
                    CRM API
                  </Link>
                </li>
                <li>
                  <Link href="/api/auth" className="hover:text-foreground">
                    Autenticação
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Comunidade</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/community" className="hover:text-foreground">
                    Fórum
                  </Link>
                </li>
                <li>
                  <Link href="/discord" className="hover:text-foreground">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="/github" className="hover:text-foreground">
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/support" className="hover:text-foreground">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-foreground">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 Blog & CRM Platform. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

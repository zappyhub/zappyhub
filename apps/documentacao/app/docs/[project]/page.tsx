import Link from "next/link";
import { BookOpen, ArrowLeft, FileText, Clock, Eye } from "lucide-react";
import { getAllPosts } from "@/app/actions/posts";
import { formatPublishDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

interface ProjectPageProps {
  params: {
    project: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projectName = await params.project;

  // Condicional para buscar posts apenas se for "monorepo"
  const posts = projectName === "monorepo" ? await getAllPosts() : [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity"
            >
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                Documentação do Monorepo
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para início
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {projectName} - Documentação
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore a documentação completa do projeto {projectName}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                </div>
                <CardTitle className="text-xl">
                  <Link
                    href={`/docs/${projectName}/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                {post.excerpt && (
                  <CardDescription className="text-muted-foreground">
                    {post.excerpt}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatPublishDate(post.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.viewCount}</span>
                  </div>
                  {post.readTime > 0 && <span>{post.readTime} min</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts?.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma documentação encontrada
            </h3>
            <p className="text-muted-foreground">
              Ainda não há documentação disponível para este projeto.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

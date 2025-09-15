import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Calendar, Eye, Share2, ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/app/actions/posts";
import { formatPublishDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface PostPageProps {
  params: {
    project: string;
    slug: string;
  };
}

// Gerar metadados dinâmicos baseados no post
export async function generateMetadata({ params }: PostPageProps) {
  const slug = await params.slug;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) {
    return {
      title: "Docs não encontrado | Documentação do Monorepo",
      description: "O artigo que você está procurando não foi encontrado.",
    };
  }

  return {
    title: `${post?.title} | Documentação`,
    description: post?.seoDescription,
    openGraph: {
      title: post?.seoTitle || post?.title,
      description: post?.seoDescription,
      type: "article",
      publishedTime: post?.publishDate,
      modifiedTime: post?.updatedDate,
      authors: [post?.authorId],
      images: [
        {
          url: post?.coverImage || "/documentation-stack.png",
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
      tags: post?.tags?.map((tag) => tag.tagId),
    },
    twitter: {
      card: "summary_large_image",
      title: post?.seoTitle || post?.title,
      description: post?.seoDescription,
      images: [post?.coverImage || "/documentation-stack.png"],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = await params.slug;
  const projectName = await params.project;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) {
    notFound();
  }

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
                Documentação do {projectName}
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href={`/docs/${projectName}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para {projectName}
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <header className="mb-8 pb-8 border-b border-border">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              {post?.title}
            </h1>

            {post?.excerpt && (
              <p className="text-xl text-muted-foreground mb-6 text-pretty">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatPublishDate(post?.publishDate || "")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post?.viewCount} visualizações</span>
              </div>
              {post?.readTime > 0 && (
                <div className="flex items-center gap-2">
                  <span>{post.readTime} min de leitura</span>
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-code:bg-muted prose-code:text-foreground prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-a:text-primary hover:prose-a:text-primary/80"
            dangerouslySetInnerHTML={{ __html: post?.content || "" }}
          />
        </article>

        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href={`/${projectName}`}>
              <Button variant="outline" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Voltar para {projectName}
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Compartilhar:
              </span>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

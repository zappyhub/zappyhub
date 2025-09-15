"use server";

// Tipos para os posts
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorId: string;
  blogId: string;
  publishDate: string;
  updatedDate: string;
  createdAt: string;
  deletedAt: string | null;
  status: string;
  coverImage: string;
  isFeatured: boolean;
  isFavorite: boolean;
  readTime: number;
  seoTitle: string;
  seoDescription: string;
  viewCount: number;
  shareCount: number;
  visibility: string;
  categories: Array<{
    postId: string;
    categoryId: string;
    assignedAt: string;
  }>;
  tags: Array<{
    postId: string;
    tagId: string;
    assignedAt: string;
  }>;
}

export interface PostsResponse {
  message: string;
  posts: Post[];
}

export interface PostResponse {
  message: string;
  posts: Post;
}

// URL base da API
const API_BASE_URL =
  "https://postly-backend-production.up.railway.app/api/posts/blog/api/71fa1fdf3bbf4756825395e994c609c117b6ffed8b4930037165516439be8765";

/**
 * Busca todos os posts do blog
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(API_BASE_URL, {
      next: {
        revalidate: 60 * 5, // 5 mins
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar posts: ${response.status}`);
    }

    const data: PostsResponse = await response.json();
    return data.posts;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
}

/**
 * Busca os posts em destaque (featured)
 */
export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  try {
    const allPosts = await getAllPosts();
    // Filtra os posts em destaque e limita ao número especificado
    return allPosts
      .filter((post) => post.isFeatured)
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )
      .slice(0, limit);
  } catch (error) {
    console.error("Erro ao buscar posts em destaque:", error);
    return [];
  }
}

/**
 * Busca um post específico pelo slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await fetch(`${API_BASE_URL}/${slug}`, {
    next: {
      revalidate: 60 * 5, // 5 mins
    },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch post: ${response.status}`,
      await response.text()
    );
    return null;
  }

  const data: PostResponse = await response.json();

  return data.posts;
}

/**
 * Busca um post específico pelo projeto
 */
export async function getPostsByProject(slug: string): Promise<Post[] | null> {
  const response = await fetch(`${API_BASE_URL}/${slug}`, {
    next: {
      revalidate: 60 * 5, // 5 mins
    },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch post: ${response.status}`,
      await response.text()
    );
    return null;
  }

  const data: PostResponse = await response.json();

  return data.posts as unknown as Post[];
}

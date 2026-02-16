const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  tag: string;
  tagColor: string;
  content?: string[];
}

export interface NewsItem {
  id: string;
  date: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Fetch all blog posts (without content) */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/api/blog`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API error');
    const json: ApiResponse<BlogPost[]> = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

/** Fetch a single blog post by slug (with content) */
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/api/blog/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json: ApiResponse<BlogPost> = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/** Fetch all news items */
export async function fetchNewsItems(): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${API_URL}/api/news`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API error');
    const json: ApiResponse<NewsItem[]> = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

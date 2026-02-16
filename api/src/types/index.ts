// Shared types for API responses

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'code' | 'image' | 'quote' | 'list';
  content: string;
  language?: string;   // for code blocks
  level?: 2 | 3;       // for headings
  url?: string;        // for images
  caption?: string;    // for images
  items?: string[];    // for lists
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  tag: string;
  tagColor: string;
  coverImage?: string;
  content?: ContentBlock[];
}

export interface NewsItem {
  id: string;
  slug: string;
  date: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  coverImage?: string;
  content?: ContentBlock[];
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

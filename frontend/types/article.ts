export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Array<{
    type: string;
    children: Array<{ type: string; text: string }>;
  }>;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImage?: {
    id: number;
    url: string;
    alternativeText: string | null;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  };
}

export interface StrapiResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

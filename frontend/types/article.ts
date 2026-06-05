import { BlocksContent } from "@strapi/blocks-react-renderer";

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlocksContent;
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

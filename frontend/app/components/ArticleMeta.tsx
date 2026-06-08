import { Article } from "@/types/article";

interface ArticleMetaProps {
  article: Article;
}

export default function ArticleMeta({ article }: ArticleMetaProps) {
  return (
    <div className="flex items-center space-x-2 text-sm text-slate-500 mb-3">
      <span>{article.readTime} min read</span>
      <span aria-hidden="true">•</span>
      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
    </div>
  );
}

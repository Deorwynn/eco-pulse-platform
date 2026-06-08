import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/article";
import ArticleMeta from "@/app/components/ArticleMeta";

export default function ArticleCard({ article }: { article: Article }) {
  const imageUrl = article.coverImage?.url
    ? `http://localhost:1338${article.coverImage.url}`
    : null;

  return (
    <article className="relative group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col md:flex-row">
      {/* Cover Image Section */}
      {imageUrl && (
        <div className="relative w-full md:w-64 h-48 md:h-auto min-h-[200px]">
          <Image
            src={imageUrl}
            alt={article.coverImage?.alternativeText || ""}
            fill
            className="object-cover"
            sizes="(max-w-768px) 100vw, 256px"
            unoptimized={true}
            priority
          />
        </div>
      )}

      {/* Text Details Section */}
      <div className="p-8 flex-1">
        <ArticleMeta article={article} />

        <h2 className="text-2xl font-bold text-slate-950">{article.title}</h2>

        <p className="mt-3 text-slate-600 leading-relaxed">{article.excerpt}</p>

        <div className="mt-6">
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 focus:outline-none focus:underline after:absolute after:inset-0"
          >
            <span>
              Read article
              <span className="sr-only"> about {article.title}</span>
            </span>
            <svg
              className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

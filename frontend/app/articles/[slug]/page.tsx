import { StrapiResponse } from "../../../types/article";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import EngagementCluster from "../../components/EngagementCluster";

async function getArticleBySlug(slug: string): Promise<StrapiResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338"}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch article details");
  }

  const rawJson = await res.json();

  return rawJson;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: articles } = await getArticleBySlug(resolvedParams.slug);
  const article = articles[0];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-800">Article not found</h1>
        <Link href="/" className="mt-4 text-emerald-600 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-8 group focus:outline-none focus:underline"
        >
          <svg
            className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to overview
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-slate-500 mb-3">
            <span>{article.readTime} min read</span>
            <span aria-hidden="true">•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-950 leading-tight">
            {article.title}
          </h1>
        </header>

        {/* Article Excerpt Banner */}
        <blockquote className="bg-slate-50 border-l-4 border-emerald-500 p-4 my-6 rounded-r-xl italic text-slate-700">
          <p>{article.excerpt}</p>
        </blockquote>

        {/* Rich Content Blocks Renderer */}
        <div className="mt-8 prose prose-slate max-w-none text-slate-800">
          {article.content && <BlocksRenderer content={article.content} />}
        </div>
        {/* Cross-Language Microservice Telemetry Node */}
        <aside
          className="mt-12 pt-8 border-t border-slate-100"
          aria-label="Article Engagement"
        >
          <EngagementCluster articleSlug={article.slug} />
        </aside>
      </div>
    </main>
  );
}

import { StrapiResponse } from "../types/article";
import Link from "next/link";
import Image from "next/image";

async function getArticles(): Promise<StrapiResponse> {
  const res = await fetch("http://127.0.0.1:1338/api/articles?populate=*", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch articles from Strapi");
  }

  return res.json();
}

export default async function Home() {
  const { data: articles } = await getArticles();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <header className="border-b border-slate-200 pb-8 mb-12">
          <hgroup>
            <p className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-1">
              EcoPulse Platform
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-950">
              Green Tech Hub & Insights
            </h1>
          </hgroup>
          <p className="mt-4 text-lg text-slate-600">
            Exploring digital sustainability and component-driven frontend
            architecture.
          </p>
        </header>

        <section className="space-y-10" aria-label="Latest Articles">
          {articles.length === 0 ? (
            <p className="text-slate-500">
              No articles found. Make sure they are published in Strapi!
            </p>
          ) : (
            articles.map((article) => {
              const imageUrl = article.coverImage?.url
                ? `http://localhost:1338${article.coverImage.url}`
                : null;

              return (
                <article
                  key={article.id}
                  className="relative group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col md:flex-row"
                >
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
                      />
                    </div>
                  )}

                  {/* Text Details Section */}
                  <div className="p-8 flex-1">
                    <div className="flex items-center space-x-2 text-sm text-slate-500 mb-3">
                      <span>{article.readTime} min read</span>
                      <span aria-hidden="true">•</span>
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-950">
                      {article.title}
                    </h2>

                    <p className="mt-3 text-slate-600 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="mt-6">
                      <Link
                        href={`/articles/${article.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 focus:outline-none focus:underline after:absolute after:inset-0"
                      >
                        <span>
                          Read article
                          <span className="sr-only">
                            {" "}
                            about {article.title}
                          </span>
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
            })
          )}
        </section>
      </div>
    </main>
  );
}

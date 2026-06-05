import { StrapiResponse } from "../types/article";

async function getArticles(): Promise<StrapiResponse> {
  const res = await fetch("http://127.0.0.1:1338/api/articles", {
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
          <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
            EcoPulse Platform
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mt-2 text-slate-950">
            Green Tech Hub & Insights
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Exploring digital sustainability and component-driven frontend
            architecture.
          </p>
        </header>

        <section className="space-y-10">
          {articles.length === 0 ? (
            <p className="text-slate-500">
              No articles found. Make sure they are published in Strapi!
            </p>
          ) : (
            articles.map((article) => (
              <article
                key={article.id}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-2 text-sm text-slate-500 mb-3">
                  <span>{article.readTime} min read</span>
                  <span>•</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-950 hover:text-emerald-600 transition-colors">
                  {article.title}
                </h2>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="mt-6">
                  <span className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                    Read article
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

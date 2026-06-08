import { StrapiResponse } from "@/types/article";
import ArticleCard from "@/app/components/ArticleCard";

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
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </section>
      </div>
    </main>
  );
}

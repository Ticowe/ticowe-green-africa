"use client";

import { useEffect, useMemo, useState } from "react";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  cover_image: string | null;
  category: string;
  published_at: string;
};

type Props = {
  searchQuery: string;
  activeCategory: string;
};

export default function NewsSection({
  searchQuery,
  activeCategory,
}: Props) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadNews() {
    try {
      const res = await fetch("/api/news");

      const data = await res.json();

      if (data.success) {
        setNews(data.news ?? []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  // FILTERING
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category === activeCategory;

      const query = searchQuery.toLowerCase();

      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        item.content?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [news, searchQuery, activeCategory]);

  if (loading) {
    return (
      <section className="bg-[#F5F1E6] px-6 py-24">
        <div className="text-center text-[#5a6a5a]">
          Loading news...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5F1E6] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {filteredNews.length === 0 ? (
          <div className="rounded-3xl bg-white px-8 py-16 text-center shadow-sm">
            <div className="mb-4 text-5xl">📰</div>

            <h3 className="text-2xl font-black text-[#1A2A22]">
              No Articles Found
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#5a6a5a]">
              Try changing your search or selecting another category.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[28px] bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {item.cover_image && (
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    className="h-60 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-[#F5F1E6] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0F4C4C]">
                      {item.category}
                    </span>

                    <span className="text-xs text-[#9a9a8a]">
                      {new Date(
                        item.published_at
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="mb-4 text-2xl font-black leading-snug text-[#1A2A22]">
                    {item.title}
                  </h2>

                  <p className="text-sm leading-7 text-[#5a6a5a]">
                    {item.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
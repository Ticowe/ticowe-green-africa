import { supabaseAdmin } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import NewsActions from "./NewsActions";

interface Article {
  id: string;
  title: string;
  category: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
}

async function getNews(): Promise<Article[]> {
  // Casting the client instance to 'any' stops it from strictly parsing the schema
  const { data } = await (supabaseAdmin as any).from("news").select("*").order("created_at", { ascending: false });
  return (data as Article[]) ?? [];
}

export async function publishNews(id: string) {
  "use server";
  // Force-casting the table reference fixes the 'parameter of type never' issue
  await (supabaseAdmin as any).from("news").update({ status: "published", published_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/admin/dashboard/news");
}

export async function unpublishNews(id: string) {
  "use server";
  await (supabaseAdmin as any).from("news").update({ status: "draft", published_at: null }).eq("id", id);
  revalidatePath("/admin/dashboard/news");
}

export async function deleteNews(id: string) {
  "use server";
  await (supabaseAdmin as any).from("news").delete().eq("id", id);
  revalidatePath("/admin/dashboard/news");
}

const categoryColors: Record<string, string> = {
  Agriculture: "bg-[#0F4C4C]/10 text-[#0F4C4C]",
  Education: "bg-blue-100 text-blue-700",
  Health: "bg-red-100 text-red-600",
  "Peace Building": "bg-purple-100 text-purple-700",
  "Women & Youth": "bg-pink-100 text-pink-700",
  Environment: "bg-green-100 text-green-700",
  Announcements: "bg-[#D7992E]/15 text-[#D7992E]",
};

export default async function NewsPage() {
  const articles = await getNews();
  const published = articles.filter((a) => a.status === "published").length;
  const drafts = articles.filter((a) => a.status === "draft").length;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">Content</p>
          <h1 className="mt-1 text-3xl font-black text-[#1A2A22]">News Articles</h1>
          <p className="mt-1 text-sm text-[#5a6a5a]">{published} published · {drafts} draft{drafts !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/news/new" className="rounded-2xl bg-[#0F4C4C] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#145B5B]">
          + New Article
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0ece0] bg-[#F5F1E6]">
                {["Title", "Category", "Status", "Published", "Created", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-[#5a6a5a]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ece0]">
              {articles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#9a9a8a]">
                    No articles yet.{" "}
                    <Link href="/admin/news/new" className="font-bold text-[#0F4C4C] underline">Write your first article</Link>
                  </td>
                </tr>
              )}
              {articles.map((article) => (
                <tr key={article.id} className="transition hover:bg-[#F5F1E6]/50">
                  <td className="px-6 py-4">
                    <Link href={`/admin/news/${article.id}/edit`} className="font-semibold text-[#1A2A22] hover:text-[#0F4C4C] hover:underline leading-snug line-clamp-2 max-w-xs block">
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryColors[article.category] ?? "bg-[#F5F1E6] text-[#5a6a5a]"}`}>{article.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${article.status === "published" ? "bg-green-100 text-green-700" : "bg-[#D7992E]/15 text-[#D7992E]"}`}>{article.status}</span>
                  </td>
                  <td className="px-6 py-4 text-[#5a6a5a]">{article.published_at ? new Date(article.published_at).toLocaleDateString() : "—"}</td>
                  <td className="px-6 py-4 text-[#5a6a5a]">{new Date(article.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <NewsActions id={article.id} status={article.status} publishNews={publishNews} unpublishNews={unpublishNews} deleteNews={deleteNews} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
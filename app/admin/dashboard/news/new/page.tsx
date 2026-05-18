// "use client";

// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase/client";

// const CATEGORIES = ["Agriculture", "Education", "Health", "Peace Building", "Women & Youth", "Environment", "Announcements"];

// export default function NewArticlePage() {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [form, setForm] = useState({ title: "", excerpt: "", content: "", category: "", cover_image: "" });
//   const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

//   function set(key: keyof typeof form, value: string) {
//     setForm((f) => ({ ...f, [key]: value }));
//   }

//   async function save(publish: boolean) {
//     if (!form.title || !form.excerpt || !form.content || !form.category) {
//       alert("Please fill in all required fields: Title, Excerpt, Content, and Category.");
//       return;
//     }
//     setSaveStatus("saving");

//     const { data: { user } } = await supabase.auth.getUser();

//     const { error } = await supabase.from("news").insert({
//       title: form.title,
//       excerpt: form.excerpt,
//       content: form.content,
//       category: form.category,
//       cover_image: form.cover_image || null,
//       author_id: user?.id ?? null,
//       status: publish ? "published" : "draft",
//       published_at: publish ? new Date().toISOString() : null,
//     });

//     if (error) {
//       setSaveStatus("error");
//       alert("Error saving: " + error.message);
//       return;
//     }

//     setSaveStatus("saved");
//     router.push("/admin/news");
//   }

//   const allValid = !!form.title && !!form.excerpt && form.content.length > 50 && !!form.category;

//   return (
//     <div className="p-8">
//       <div className="mb-8 flex items-start justify-between">
//         <div>
//           <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">Content</p>
//           <h1 className="mt-1 text-3xl font-black text-[#1A2A22]">New Article</h1>
//         </div>
//         <div className="flex gap-3">
//           <button disabled={isPending || saveStatus === "saving"} onClick={() => startTransition(() => save(false))}
//             className="rounded-2xl border border-[#e0d8c8] bg-white px-6 py-3 text-sm font-bold text-[#3a4a3a] transition hover:bg-[#F5F1E6] disabled:opacity-50"
//           >
//             Save as Draft
//           </button>
//           <button disabled={isPending || saveStatus === "saving"} onClick={() => startTransition(() => save(true))}
//             className="rounded-2xl bg-[#0F4C4C] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#145B5B] disabled:opacity-50"
//           >
//             {saveStatus === "saving" ? "Publishing…" : "Publish Now"}
//           </button>
//         </div>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
//         {/* editor */}
//         <div className="space-y-5">
//           <div className="rounded-2xl bg-white p-6 shadow-sm">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">Title *</label>
//             <input type="text" placeholder="Enter article title…" value={form.title} onChange={(e) => set("title", e.target.value)}
//               className="w-full rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-xl font-bold text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
//             />
//           </div>

//           <div className="rounded-2xl bg-white p-6 shadow-sm">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
//               Excerpt * <span className="normal-case font-normal tracking-normal text-[#9a9a8a]">— short summary shown in listings</span>
//             </label>
//             <textarea rows={3} placeholder="Write a short, compelling summary…" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)}
//               className="w-full resize-none rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm leading-7 text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
//             />
//           </div>

//           <div className="rounded-2xl bg-white p-6 shadow-sm">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">Article Content *</label>
//             <textarea rows={20} placeholder="Write the full article content here…" value={form.content} onChange={(e) => set("content", e.target.value)}
//               className="w-full resize-y rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm leading-8 text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15 font-mono"
//             />
//             <p className="mt-2 text-xs text-[#9a9a8a]">{form.content.split(/\s+/).filter(Boolean).length} words</p>
//           </div>
//         </div>

//         {/* sidebar */}
//         <div className="space-y-5">
//           <div className="rounded-2xl bg-white p-6 shadow-sm">
//             <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">Category *</label>
//             <div className="flex flex-wrap gap-2">
//               {CATEGORIES.map((cat) => (
//                 <button key={cat} onClick={() => set("category", cat)}
//                   className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${form.category === cat ? "bg-[#0F4C4C] text-white" : "bg-[#F5F1E6] text-[#3a4a3a] hover:bg-[#0F4C4C]/10"}`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white p-6 shadow-sm">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">Cover Image URL</label>
//             <input type="url" placeholder="https://… or /images/…" value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)}
//               className="w-full rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
//             />
//             {form.cover_image && (
//               // eslint-disable-next-line @next/next/no-img-element
//               <img src={form.cover_image} alt="Preview" className="mt-3 h-32 w-full rounded-xl object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
//             )}
//           </div>

//           <div className="rounded-2xl bg-white p-6 shadow-sm">
//             <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#C65D3A]">Publish Checklist</div>
//             <ul className="space-y-2">
//               {[
//                 { label: "Title added", done: !!form.title },
//                 { label: "Excerpt written", done: !!form.excerpt },
//                 { label: "Content written", done: form.content.length > 50 },
//                 { label: "Category selected", done: !!form.category },
//               ].map((item) => (
//                 <li key={item.label} className="flex items-center gap-2.5 text-sm">
//                   <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${item.done ? "bg-green-500 text-white" : "bg-[#F5F1E6] text-[#c0c0b0]"}`}>
//                     {item.done ? "✓" : "○"}
//                   </span>
//                   <span className={item.done ? "text-[#3a4a3a]" : "text-[#9a9a8a]"}>{item.label}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {saveStatus === "error" && (
//             <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">Failed to save. Please try again.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

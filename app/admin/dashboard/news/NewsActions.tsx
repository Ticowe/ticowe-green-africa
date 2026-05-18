"use client";

import { useTransition } from "react";
import Link from "next/link";

type Props = {
  id: string;
  status: "draft" | "published";
  publishNews: (id: string) => Promise<void>;
  unpublishNews: (id: string) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
};

export default function NewsActions({ id, status, publishNews, unpublishNews, deleteNews }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/news/${id}/edit`} className="rounded-lg border border-[#e0d8c8] px-3 py-1.5 text-xs font-bold text-[#3a4a3a] transition hover:bg-[#F5F1E6]">
        Edit
      </Link>
      {status === "draft" ? (
        <button disabled={isPending} onClick={() => startTransition(() => publishNews(id))} className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-green-700 disabled:opacity-50">
          Publish
        </button>
      ) : (
        <button disabled={isPending} onClick={() => startTransition(() => unpublishNews(id))} className="rounded-lg bg-[#D7992E] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#c08820] disabled:opacity-50">
          Unpublish
        </button>
      )}
      <button disabled={isPending}
        onClick={() => { if (confirm("Delete this article? This cannot be undone.")) startTransition(() => deleteNews(id)); }}
        className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}

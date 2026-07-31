"use client";

import {
  CalendarDays,
  Edit3,
  Eye,
  FileVideo,
  ImageIcon,
  Loader2,
  MapPin,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase/client";

type ActivityStatus = "draft" | "published";

type MediaItem = {
  id?: string;
  url: string;
  publicId?: string;
  type: "image" | "video";
  resourceType?: string;
  format?: string;
  duration?: number;
};

type ActivityItem = {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  activity_date: string;
  location: string | null;
  media: MediaItem[] | null;
  cover_media_url: string | null;
  cover_media_type: "image" | "video" | null;
  status: ActivityStatus;
  published_at: string | null;
  created_at: string;
  updated_at?: string;
};

type StatusFilter = "all" | ActivityStatus;

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  async function loadActivities() {
    try {
      setLoading(true);

      const { data, error } = await (supabase as any)
        .from("activities")
        .select(`
          id,
          title,
          excerpt,
          description,
          category,
          activity_date,
          location,
          media,
          cover_media_url,
          cover_media_type,
          status,
          published_at,
          created_at,
          updated_at
        `)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw new Error(error.message);
      }

      setActivities(data ?? []);
    } catch (error) {
      console.error("Failed to load activities:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to load activities.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadActivities();
  }, []);

  async function deleteActivity(activity: ActivityItem) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${activity.title}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(activity.id);

      const { error } = await (supabase as any)
        .from("activities")
        .delete()
        .eq("id", activity.id);

      if (error) {
        throw new Error(error.message);
      }

      setActivities((currentActivities) =>
        currentActivities.filter(
          (item) => item.id !== activity.id,
        ),
      );
    } catch (error) {
      console.error("Failed to delete activity:", error);

      alert(
        error instanceof Error
          ? `Failed to delete activity: ${error.message}`
          : "Failed to delete activity.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleStatus(activity: ActivityItem) {
    const nextStatus: ActivityStatus =
      activity.status === "published" ? "draft" : "published";

    try {
      const { data, error } = await (supabase as any)
        .from("activities")
        .update({
          status: nextStatus,
          published_at:
            nextStatus === "published"
              ? new Date().toISOString()
              : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", activity.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setActivities((currentActivities) =>
        currentActivities.map((item) =>
          item.id === activity.id ? data : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update status:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update activity status.",
      );
    }
  }

  const filteredActivities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesStatus =
        statusFilter === "all" ||
        activity.status === statusFilter;

      const matchesSearch =
        query === "" ||
        activity.title.toLowerCase().includes(query) ||
        activity.excerpt.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.category.toLowerCase().includes(query) ||
        activity.location?.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [activities, searchQuery, statusFilter]);

  const statistics = useMemo(() => {
    const published = activities.filter(
      (activity) => activity.status === "published",
    ).length;

    const drafts = activities.filter(
      (activity) => activity.status === "draft",
    ).length;

    return {
      total: activities.length,
      published,
      drafts,
    };
  }, [activities]);

  function formatDate(date: string | null) {
    if (!date) {
      return "Not provided";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-KE",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    );
  }

  function getCover(activity: ActivityItem) {
    if (activity.cover_media_url) {
      return {
        url: activity.cover_media_url,
        type: activity.cover_media_type ?? "image",
      };
    }

    const firstMedia = activity.media?.[0];

    if (firstMedia) {
      return {
        url: firstMedia.url,
        type: firstMedia.type,
      };
    }

    return null;
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={36}
            className="mx-auto animate-spin text-[#0F4C4C]"
          />

          <p className="mt-4 text-sm font-semibold text-[#68736C]">
            Loading activities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
              Content Management
            </p>

            <h1 className="mt-1 text-3xl font-black text-[#1A2A22]">
              Activities
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#68736C]">
              Manage published activities, drafts, photos, videos,
              and activity information.
            </p>
          </div>

          <Link
            href="/admin/dashboard/activities/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F4C4C] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#145B5B]"
          >
            <Plus size={18} />
            Add Activity
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatisticCard
            label="Total Activities"
            value={statistics.total}
          />

          <StatisticCard
            label="Published"
            value={statistics.published}
          />

          <StatisticCard
            label="Drafts"
            value={statistics.drafts}
          />
        </div>

        {/* Search and filters */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A918A]"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search activities..."
              className="w-full rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] py-3 pl-11 pr-4 text-sm text-[#1A2A22] outline-none focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "All",
                value: "all",
              },
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Drafts",
                value: "draft",
              },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setStatusFilter(
                    filter.value as StatusFilter,
                  )
                }
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  statusFilter === filter.value
                    ? "bg-[#0F4C4C] text-white"
                    : "bg-[#F5F1E6] text-[#3A4A3A] hover:bg-[#0F4C4C]/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activities */}
        {filteredActivities.length === 0 ? (
          <div className="rounded-3xl bg-white px-8 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0F4C4C]/10 text-[#0F4C4C]">
              <ImageIcon size={34} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-[#1A2A22]">
              No activities found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#68736C]">
              Create a new activity or change your search and
              filter options.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredActivities.map((activity) => {
              const cover = getCover(activity);
              const mediaCount = activity.media?.length ?? 0;

              return (
                <article
                  key={activity.id}
                  className="overflow-hidden rounded-[28px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-[#E9E3D8]">
                    {cover ? (
                      cover.type === "video" ? (
                        <div className="relative h-full">
                          <video
                            src={cover.url}
                            muted
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0F4C4C]">
                              <FileVideo size={22} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={cover.url}
                          alt={activity.title}
                          className="h-full w-full object-cover"
                        />
                      )
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#0F4C4C] to-[#145B5B] text-white">
                        <ImageIcon size={40} />

                        <span className="mt-3 text-sm font-bold">
                          No media uploaded
                        </span>
                      </div>
                    )}

                    <div className="absolute left-4 top-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wide ${
                          activity.status === "published"
                            ? "bg-green-500 text-white"
                            : "bg-amber-400 text-[#4A3500]"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>

                    {mediaCount > 0 && (
                      <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                        {mediaCount} media
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[#F5F1E6] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0F4C4C]">
                        {activity.category}
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs text-[#8A918A]">
                        <CalendarDays size={13} />
                        {formatDate(activity.activity_date)}
                      </span>
                    </div>

                    <h2 className="line-clamp-2 text-xl font-black leading-snug text-[#1A2A22]">
                      {activity.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#68736C]">
                      {activity.excerpt}
                    </p>

                    {activity.location && (
                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#7A827B]">
                        <MapPin
                          size={14}
                          className="text-[#C65D3A]"
                        />

                        <span className="truncate">
                          {activity.location}
                        </span>
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-2 gap-2">
                      <Link
                        href={`/admin/dashboard/activities/${activity.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5F1E6] px-3 py-2.5 text-xs font-bold text-[#0F4C4C] transition hover:bg-[#0F4C4C]/10"
                      >
                        <Edit3 size={15} />
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          void toggleStatus(activity)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C4C]/10 px-3 py-2.5 text-xs font-bold text-[#0F4C4C] transition hover:bg-[#0F4C4C]/20"
                      >
                        <Eye size={15} />

                        {activity.status === "published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void deleteActivity(activity)
                        }
                        disabled={deletingId === activity.id}
                        className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        {deletingId === activity.id ? (
                          <>
                            <Loader2
                              size={15}
                              className="animate-spin"
                            />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 size={15} />
                            Delete Activity
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatisticCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
        {label}
      </p>

      <p className="mt-3 text-4xl font-black text-[#1A2A22]">
        {value}
      </p>
    </div>
  );
}
"use client";

import {
  CalendarDays,
  ImageIcon,
  MapPin,
  Play,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type MediaItem = {
  id?: string;
  url: string;
  publicId?: string;
  type: "image" | "video";
  resourceType?: string;
  format?: string;
  width?: number;
  height?: number;
  duration?: number;
};

type ActivityItem = {
  id: string;
  title: string;
  excerpt: string;
  description?: string;
  category: string;
  activity_date: string;
  location: string | null;
  media: MediaItem[] | null;
  cover_media_url: string | null;
  cover_media_type: "image" | "video" | null;
  published_at: string | null;
  created_at?: string;
};

type Props = {
  searchQuery: string;
  activeCategory: string;
};

export default function ActivitiesSection({
  searchQuery,
  activeCategory,
}: Props) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadActivities() {
    try {
      setLoading(true);

      const response = await fetch("/api/activities", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load activities.",
        );
      }

      if (data.success) {
        setActivities(data.activities ?? []);
      }
    } catch (error) {
      console.error("Failed to load activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesCategory =
        activeCategory === "All" ||
        activity.category === activeCategory;

      const matchesSearch =
        normalizedQuery === "" ||
        activity.title.toLowerCase().includes(normalizedQuery) ||
        activity.excerpt.toLowerCase().includes(normalizedQuery) ||
        activity.description
          ?.toLowerCase()
          .includes(normalizedQuery) ||
        activity.location
          ?.toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activities, searchQuery, activeCategory]);

  function formatDate(date: string | null) {
    if (!date) {
      return "Date not provided";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-KE",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );
  }

  function getCoverMedia(activity: ActivityItem) {
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
      <section className="bg-[#F5F1E6] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[28px] bg-white shadow-sm"
              >
                <div className="h-60 animate-pulse bg-[#e8e1d4]" />

                <div className="space-y-4 p-6">
                  <div className="h-5 w-28 animate-pulse rounded-full bg-[#e8e1d4]" />
                  <div className="h-7 w-4/5 animate-pulse rounded-lg bg-[#e8e1d4]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#e8e1d4]" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-[#e8e1d4]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5F1E6] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {filteredActivities.length === 0 ? (
          <div className="rounded-3xl bg-white px-8 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#0F4C4C]/10 text-[#0F4C4C]">
              <ImageIcon size={34} />
            </div>

            <h3 className="text-2xl font-black text-[#1A2A22]">
              No Activities Found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#5a6a5a]">
              Try changing your search term or selecting a
              different activity category.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity) => {
              const coverMedia = getCoverMedia(activity);
              const mediaCount = activity.media?.length ?? 0;

              return (
                <article
                  key={activity.id}
                  className="group overflow-hidden rounded-[28px] bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative h-60 overflow-hidden bg-[#e8e1d4]">
                    {coverMedia ? (
                      coverMedia.type === "video" ? (
                        <>
                          <video
                            src={coverMedia.url}
                            muted
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#0F4C4C] shadow-lg backdrop-blur">
                              <Play
                                size={24}
                                className="ml-1"
                                fill="currentColor"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={coverMedia.url}
                          alt={activity.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      )
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0F4C4C] to-[#145B5B] text-white">
                        <ImageIcon size={42} />

                        <span className="mt-3 text-sm font-bold">
                          Activity
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#0F4C4C] shadow-sm backdrop-blur">
                      {activity.category}
                    </span>

                    {mediaCount > 1 && (
                      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                        <ImageIcon size={13} />
                        {mediaCount} media
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#7b857d]">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays
                          size={14}
                          className="text-[#C65D3A]"
                        />

                        {formatDate(activity.activity_date)}
                      </span>

                      {activity.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin
                            size={14}
                            className="text-[#C65D3A]"
                          />

                          <span className="max-w-[170px] truncate">
                            {activity.location}
                          </span>
                        </span>
                      )}
                    </div>

                    <h2 className="mb-4 text-2xl font-black leading-snug text-[#1A2A22] transition group-hover:text-[#0F4C4C]">
                      {activity.title}
                    </h2>

                    <p className="line-clamp-3 text-sm leading-7 text-[#5a6a5a]">
                      {activity.excerpt}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
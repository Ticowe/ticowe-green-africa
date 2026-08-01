"use client";

import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  MapPin,
  Play,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

type Activity = {
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
  published_at: string | null;
  created_at: string;
};

export default function ActivityDetailsPage() {
  const params = useParams();
  const activityId = params.id as string;

  const [activity, setActivity] = useState<Activity | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMediaIndex, setSelectedMediaIndex] =
    useState<number | null>(null);

  async function loadActivity() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/activities/${activityId}`,
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load activity.",
        );
      }

      setActivity(data.activity);
    } catch (err) {
      console.error("Failed to load activity:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load activity.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (activityId) {
      void loadActivity();
    }
  }, [activityId]);

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

  function getAllMedia(activity: Activity): MediaItem[] {
    if (activity.media?.length) {
      return activity.media;
    }

    if (activity.cover_media_url) {
      return [
        {
          id: "cover",
          url: activity.cover_media_url,
          type: activity.cover_media_type ?? "image",
        },
      ];
    }

    return [];
  }

  function showPreviousMedia() {
    if (
      selectedMediaIndex === null ||
      !activity
    ) {
      return;
    }

    const media = getAllMedia(activity);

    setSelectedMediaIndex(
      selectedMediaIndex === 0
        ? media.length - 1
        : selectedMediaIndex - 1,
    );
  }

  function showNextMedia() {
    if (
      selectedMediaIndex === null ||
      !activity
    ) {
      return;
    }

    const media = getAllMedia(activity);

    setSelectedMediaIndex(
      selectedMediaIndex === media.length - 1
        ? 0
        : selectedMediaIndex + 1,
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F1E6]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="animate-pulse">
            <div className="h-5 w-36 rounded bg-[#DDD6C9]" />

            <div className="mt-8 h-14 max-w-4xl rounded-xl bg-[#DDD6C9]" />

            <div className="mt-5 h-6 max-w-2xl rounded bg-[#DDD6C9]" />

            <div className="mt-10 h-[500px] rounded-[32px] bg-[#DDD6C9]" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !activity) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F1E6] px-6">
        <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0F4C4C]/10 text-[#0F4C4C]">
            <ImageIcon size={34} />
          </div>

          <h1 className="mt-5 text-3xl font-black text-[#1A2A22]">
            Activity Not Found
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#68736C]">
            {error ||
              "The activity may have been removed or unpublished."}
          </p>

          <Link
            href="/activities"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0F4C4C] px-5 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft size={17} />
            Back to Activities
          </Link>
        </div>
      </main>
    );
  }

  const media = getAllMedia(activity);
  const featuredMedia = media[0] ?? null;
  const selectedMedia =
    selectedMediaIndex !== null
      ? media[selectedMediaIndex]
      : null;

  return (
    <main className="min-h-screen bg-[#F5F1E6]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F4C4C] to-[#1E4E3F] px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/75 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Activities
          </Link>

          <div className="mt-10 max-w-4xl">
            <span className="inline-flex rounded-full bg-[#D7992E] px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
              {activity.category}
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              {activity.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
              {activity.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <CalendarDays
                  size={18}
                  className="text-[#D7992E]"
                />
                {formatDate(activity.activity_date)}
              </span>

              {activity.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin
                    size={18}
                    className="text-[#D7992E]"
                  />
                  {activity.location}
                </span>
              )}

              {media.length > 0 && (
                <span className="inline-flex items-center gap-2">
                  <ImageIcon
                    size={18}
                    className="text-[#D7992E]"
                  />
                  {media.length} media file
                  {media.length === 1 ? "" : "s"}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Featured media */}
          {featuredMedia && (
            <button
              type="button"
              onClick={() => setSelectedMediaIndex(0)}
              className="group relative block h-[300px] w-full overflow-hidden rounded-[32px] bg-[#DDD6C9] text-left shadow-xl sm:h-[450px] lg:h-[600px]"
            >
              {featuredMedia.type === "video" ? (
                <>
                  <video
                    src={featuredMedia.url}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-[#0F4C4C] shadow-xl">
                      <Play
                        size={34}
                        className="ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={featuredMedia.url}
                  alt={activity.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              )}

              <div className="absolute bottom-5 right-5 rounded-full bg-black/65 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                Click to view
              </div>
            </button>
          )}

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* Description */}
            <article className="rounded-[32px] bg-white p-6 shadow-sm sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C65D3A]">
                About This Activity
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#1A2A22]">
                Full Activity Description
              </h2>

              <div className="mt-7 whitespace-pre-line text-base leading-9 text-[#56635A]">
                {activity.description}
              </div>
            </article>

            {/* Activity information */}
            <aside className="h-fit rounded-[28px] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#1A2A22]">
                Activity Information
              </h2>

              <div className="mt-6 space-y-5">
                <div className="border-b border-[#EEE8DD] pb-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#9A9A8A]">
                    Category
                  </p>

                  <p className="mt-2 font-bold text-[#0F4C4C]">
                    {activity.category}
                  </p>
                </div>

                <div className="border-b border-[#EEE8DD] pb-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#9A9A8A]">
                    Activity Date
                  </p>

                  <p className="mt-2 flex items-center gap-2 font-semibold text-[#3A4A3A]">
                    <CalendarDays
                      size={17}
                      className="text-[#C65D3A]"
                    />
                    {formatDate(activity.activity_date)}
                  </p>
                </div>

                {activity.location && (
                  <div className="border-b border-[#EEE8DD] pb-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#9A9A8A]">
                      Location
                    </p>

                    <p className="mt-2 flex items-center gap-2 font-semibold text-[#3A4A3A]">
                      <MapPin
                        size={17}
                        className="text-[#C65D3A]"
                      />
                      {activity.location}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#9A9A8A]">
                    Media
                  </p>

                  <p className="mt-2 font-semibold text-[#3A4A3A]">
                    {media.length} uploaded file
                    {media.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Media gallery */}
          {media.length > 0 && (
            <section className="mt-16">
              <div className="mb-7">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C65D3A]">
                  Activity Gallery
                </p>

                <h2 className="mt-3 text-3xl font-black text-[#1A2A22]">
                  Photos and Videos
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#68736C]">
                  Click any image or video to view it in full size.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {media.map((item, index) => (
                  <button
                    key={item.id ?? `${item.url}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedMediaIndex(index)
                    }
                    className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#DDD6C9] shadow-sm"
                  >
                    {item.type === "video" ? (
                      <>
                        <video
                          src={item.url}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#0F4C4C] shadow-lg">
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
                        src={item.url}
                        alt={`${activity.title} image ${index + 1}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}

                    <div className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      {item.type} {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Full-screen media viewer */}
      {selectedMedia && selectedMediaIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Activity media viewer"
        >
          <button
            type="button"
            onClick={() => setSelectedMediaIndex(null)}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Close media viewer"
          >
            <X size={25} />
          </button>

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousMedia}
                className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:left-6"
                aria-label="Previous media"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                type="button"
                onClick={showNextMedia}
                className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-6"
                aria-label="Next media"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div className="flex h-full w-full max-w-7xl items-center justify-center">
            {selectedMedia.type === "video" ? (
              <video
                key={selectedMedia.url}
                src={selectedMedia.url}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] max-w-full rounded-xl"
              />
            ) : (
              <img
                src={selectedMedia.url}
                alt={`${activity.title} full view`}
                className="max-h-[85vh] max-w-full rounded-xl object-contain"
              />
            )}
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
            {selectedMediaIndex + 1} of {media.length}
          </div>
        </div>
      )}
    </main>
  );
}
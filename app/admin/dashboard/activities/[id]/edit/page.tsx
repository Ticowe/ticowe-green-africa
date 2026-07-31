"use client";

import {
  ArrowLeft,
  CalendarDays,
  FileVideo,
  ImageIcon,
  Loader2,
  MapPin,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

const CATEGORIES = [
  "Agriculture",
  "Education",
  "Health",
  "Peace Building",
  "Women & Youth",
  "Environment",
  "Community Outreach",
  "Training",
  "Other",
];

type MediaItem = {
  id: string;
  url: string;
  publicId?: string;
  type: "image" | "video";
  resourceType?: string;
  format?: string;
  duration?: number;
};

type ActivityForm = {
  title: string;
  excerpt: string;
  description: string;
  category: string;
  activity_date: string;
  location: string;
  status: "draft" | "published";
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

export default function EditActivityPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activityId = params.id as string;

  const [form, setForm] = useState<ActivityForm>({
    title: "",
    excerpt: "",
    description: "",
    category: "",
    activity_date: "",
    location: "",
    status: "draft",
  });

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  function setField<K extends keyof ActivityForm>(
    key: K,
    value: ActivityForm[K],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  }

  async function loadActivity() {
    try {
      setLoading(true);

      const { data, error } = await (supabase as any)
        .from("activities")
        .select("*")
        .eq("id", activityId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setForm({
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        description: data.description ?? "",
        category: data.category ?? "",
        activity_date: data.activity_date ?? "",
        location: data.location ?? "",
        status: data.status ?? "draft",
      });

      setMedia(data.media ?? []);
    } catch (error) {
      console.error("Failed to load activity:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to load activity.",
      );

      router.push("/admin/dashboard/activities");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (activityId) {
      void loadActivity();
    }
  }, [activityId]);

  async function uploadFile(file: File): Promise<MediaItem> {
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Cloudinary environment variables are missing.",
      );
    }

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      throw new Error("Only images and videos are allowed.");
    }

    if (isImage && file.size > MAX_IMAGE_SIZE) {
      throw new Error("Images must not exceed 5MB.");
    }

    if (isVideo && file.size > MAX_VIDEO_SIZE) {
      throw new Error("Videos must not exceed 50MB.");
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "ticowe/activities");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const uploaded = await response.json();

    if (!response.ok || !uploaded.secure_url) {
      throw new Error(
        uploaded?.error?.message || "Media upload failed.",
      );
    }

    return {
      id: crypto.randomUUID(),
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
      type:
        uploaded.resource_type === "video"
          ? "video"
          : "image",
      resourceType: uploaded.resource_type,
      format: uploaded.format,
      duration: uploaded.duration,
    };
  }

  async function handleMediaUpload(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    try {
      setUploading(true);
      setUploadError("");

      const uploadedMedia: MediaItem[] = [];

      for (const file of files) {
        const uploaded = await uploadFile(file);
        uploadedMedia.push(uploaded);
      }

      setMedia((currentMedia) => [
        ...currentMedia,
        ...uploadedMedia,
      ]);
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "Media upload failed.",
      );
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function removeMedia(id: string) {
    setMedia((currentMedia) =>
      currentMedia.filter((item) => item.id !== id),
    );
  }

  async function updateActivity() {
    if (
      !form.title.trim() ||
      !form.excerpt.trim() ||
      !form.description.trim() ||
      !form.category ||
      !form.activity_date
    ) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      setSaving(true);

      const cover = media[0] ?? null;

      const { error } = await (supabase as any)
        .from("activities")
        .update({
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          description: form.description.trim(),
          category: form.category,
          activity_date: form.activity_date,
          location: form.location.trim() || null,
          status: form.status,
          media,
          cover_media_url: cover?.url ?? null,
          cover_media_type: cover?.type ?? null,
          published_at:
            form.status === "published"
              ? new Date().toISOString()
              : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", activityId);

      if (error) {
        throw new Error(error.message);
      }

      router.push("/admin/dashboard/activities");
      router.refresh();
    } catch (error) {
      console.error("Failed to update activity:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update activity.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2
          size={36}
          className="animate-spin text-[#0F4C4C]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/admin/dashboard/activities"
              className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[#0F4C4C]"
            >
              <ArrowLeft size={17} />
              Back to Activities
            </Link>

            <h1 className="text-3xl font-black text-[#1A2A22]">
              Edit Activity
            </h1>
          </div>

          <button
            type="button"
            disabled={saving || uploading}
            onClick={() => void updateActivity()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F4C4C] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#145B5B] disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <FormCard label="Activity title *">
              <input
                value={form.title}
                onChange={(event) =>
                  setField("title", event.target.value)
                }
                className="form-input"
              />
            </FormCard>

            <FormCard label="Short summary *">
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(event) =>
                  setField("excerpt", event.target.value)
                }
                className="form-input resize-none"
              />
            </FormCard>

            <FormCard label="Full description *">
              <textarea
                rows={14}
                value={form.description}
                onChange={(event) =>
                  setField(
                    "description",
                    event.target.value,
                  )
                }
                className="form-input resize-y leading-8"
              />
            </FormCard>

            <FormCard label="Images and videos">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={uploading}
                className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#d9d1c2] bg-[#F8F5EE] px-5 py-10 text-center"
              >
                {uploading ? (
                  <Loader2
                    size={30}
                    className="animate-spin text-[#0F4C4C]"
                  />
                ) : (
                  <UploadCloud
                    size={30}
                    className="text-[#0F4C4C]"
                  />
                )}

                <span className="mt-3 text-sm font-bold text-[#1A2A22]">
                  {uploading
                    ? "Uploading media..."
                    : "Upload additional media"}
                </span>
              </button>

              {uploadError && (
                <p className="mt-3 text-sm font-semibold text-red-600">
                  {uploadError}
                </p>
              )}

              {media.length > 0 && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {media.map((item, index) => (
                    <div
                      key={item.id}
                      className="relative overflow-hidden rounded-2xl bg-[#E9E3D8]"
                    >
                      <div className="aspect-video">
                        {item.type === "video" ? (
                          <video
                            src={item.url}
                            controls
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={item.url}
                            alt={`Activity media ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      {index === 0 && (
                        <span className="absolute left-2 top-2 rounded-full bg-[#C65D3A] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                          Cover
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          removeMedia(item.id)
                        }
                        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#536057]">
                        {item.type === "video" ? (
                          <FileVideo size={14} />
                        ) : (
                          <ImageIcon size={14} />
                        )}

                        {item.type}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FormCard>
          </div>

          <div className="space-y-5">
            <FormCard label="Category *">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setField("category", category)
                    }
                    className={`rounded-xl px-3 py-2 text-xs font-bold ${
                      form.category === category
                        ? "bg-[#0F4C4C] text-white"
                        : "bg-[#F5F1E6] text-[#3A4A3A]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </FormCard>

            <FormCard label="Activity date *">
              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F4C4C]"
                />

                <input
                  type="date"
                  value={form.activity_date}
                  onChange={(event) =>
                    setField(
                      "activity_date",
                      event.target.value,
                    )
                  }
                  className="form-input pl-11"
                />
              </div>
            </FormCard>

            <FormCard label="Location">
              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F4C4C]"
                />

                <input
                  value={form.location}
                  onChange={(event) =>
                    setField(
                      "location",
                      event.target.value,
                    )
                  }
                  className="form-input pl-11"
                />
              </div>
            </FormCard>

            <FormCard label="Status">
              <select
                value={form.status}
                onChange={(event) =>
                  setField(
                    "status",
                    event.target.value as
                      | "draft"
                      | "published",
                  )
                }
                className="form-input"
              >
                <option value="draft">Draft</option>
                <option value="published">
                  Published
                </option>
              </select>
            </FormCard>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e0d8c8;
          background: #f5f1e6;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #1a2a22;
          outline: none;
        }

        .form-input:focus {
          border-color: #0f4c4c;
          box-shadow: 0 0 0 2px rgba(15, 76, 76, 0.15);
        }
      `}</style>
    </div>
  );
}

function FormCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
      <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
        {label}
      </label>

      {children}
    </section>
  );
}
"use client";

import {
  CalendarDays,
  Check,
  FileVideo,
  ImageIcon,
  Loader2,
  MapPin,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
  useTransition,
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

type MediaType = "image" | "video";

type UploadedMedia = {
  id: string;
  url: string;
  publicId: string;
  type: MediaType;
  resourceType: string;
  format?: string;
  width?: number;
  height?: number;
  duration?: number;
};

type ActivityForm = {
  title: string;
  excerpt: string;
  description: string;
  category: string;
  activity_date: string;
  location: string;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const MAX_MEDIA_FILES = 10;

export default function NewActivityPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<ActivityForm>({
    title: "",
    excerpt: "",
    description: "",
    category: "",
    activity_date: "",
    location: "",
  });

  const [media, setMedia] = useState<UploadedMedia[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  function setField<K extends keyof ActivityForm>(
    key: K,
    value: ActivityForm[K],
  ) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function getMediaType(file: File): MediaType | null {
    if (file.type.startsWith("image/")) {
      return "image";
    }

    if (file.type.startsWith("video/")) {
      return "video";
    }

    return null;
  }

  function validateFile(file: File): string | null {
    const mediaType = getMediaType(file);

    if (!mediaType) {
      return `${file.name} is not a supported image or video.`;
    }

    if (mediaType === "image" && file.size > MAX_IMAGE_SIZE) {
      return `${file.name} exceeds the 5MB image limit.`;
    }

    if (mediaType === "video" && file.size > MAX_VIDEO_SIZE) {
      return `${file.name} exceeds the 50MB video limit.`;
    }

    return null;
  }

  async function uploadSingleFile(file: File): Promise<UploadedMedia> {
    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!uploadPreset || !cloudName) {
      throw new Error(
        "Cloudinary environment variables have not been configured.",
      );
    }

    const mediaType = getMediaType(file);

    if (!mediaType) {
      throw new Error(`${file.name} is not a supported file.`);
    }

    const uploadData = new FormData();

    uploadData.append("file", file);
    uploadData.append("upload_preset", uploadPreset);
    uploadData.append("folder", "ticowe/activities");

    // "auto" lets Cloudinary determine whether the file is an image or video.
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: uploadData,
      },
    );

    const result = await response.json();

    if (!response.ok || !result.secure_url) {
      throw new Error(
        result?.error?.message || `Failed to upload ${file.name}.`,
      );
    }

    return {
      id: crypto.randomUUID(),
      url: result.secure_url,
      publicId: result.public_id,
      type: result.resource_type === "video" ? "video" : "image",
      resourceType: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
      duration: result.duration,
    };
  }

  async function uploadFiles(selectedFiles: File[]) {
    setUploadError("");

    if (!selectedFiles.length) {
      return;
    }

    const remainingSlots = MAX_MEDIA_FILES - media.length;

    if (remainingSlots <= 0) {
      setUploadError(
        `You can upload a maximum of ${MAX_MEDIA_FILES} media files.`,
      );
      return;
    }

    const files = selectedFiles.slice(0, remainingSlots);

    if (selectedFiles.length > remainingSlots) {
      setUploadError(
        `Only ${remainingSlots} more file${
          remainingSlots === 1 ? "" : "s"
        } can be uploaded.`,
      );
    }

    const validationErrors = files
      .map(validateFile)
      .filter((error): error is string => Boolean(error));

    if (validationErrors.length > 0) {
      setUploadError(validationErrors.join(" "));
      return;
    }

    setUploadingFiles(files.map((file) => file.name));

    const uploadedItems: UploadedMedia[] = [];
    const failedUploads: string[] = [];

    for (const file of files) {
      try {
        const uploadedFile = await uploadSingleFile(file);
        uploadedItems.push(uploadedFile);
      } catch (error) {
        failedUploads.push(
          error instanceof Error
            ? error.message
            : `Failed to upload ${file.name}.`,
        );
      } finally {
        setUploadingFiles((currentFiles) =>
          currentFiles.filter((name) => name !== file.name),
        );
      }
    }

    if (uploadedItems.length > 0) {
      setMedia((currentMedia) => [
        ...currentMedia,
        ...uploadedItems,
      ]);
    }

    if (failedUploads.length > 0) {
      setUploadError(failedUploads.join(" "));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);
    void uploadFiles(files);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files ?? []);
    void uploadFiles(files);
  }

  function removeMedia(mediaId: string) {
    setMedia((currentMedia) =>
      currentMedia.filter((item) => item.id !== mediaId),
    );
  }

  async function saveActivity(publish: boolean) {
    setSaveStatus("idle");

    if (
      !form.title.trim() ||
      !form.excerpt.trim() ||
      !form.description.trim() ||
      !form.category ||
      !form.activity_date
    ) {
      alert(
        "Please complete the title, summary, description, category, and activity date.",
      );
      return;
    }

    if (form.description.trim().length < 50) {
      alert(
        "The activity description should contain at least 50 characters.",
      );
      return;
    }

    if (uploadingFiles.length > 0) {
      alert("Please wait for all media files to finish uploading.");
      return;
    }

    try {
      setSaveStatus("saving");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw new Error(authError.message);
      }

      if (!user) {
        throw new Error(
          "Your login session has expired. Please sign in again.",
        );
      }

      const featuredMedia = media[0] ?? null;

      const { error } = await (supabase as any)
        .from("activities")
        .insert({
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          description: form.description.trim(),
          category: form.category,
          activity_date: form.activity_date,
          location: form.location.trim() || null,

          media,
          cover_media_url: featuredMedia?.url ?? null,
          cover_media_type: featuredMedia?.type ?? null,

          author_id: user.id,
          status: publish ? "published" : "draft",
          published_at: publish
            ? new Date().toISOString()
            : null,
        });

      if (error) {
        throw new Error(error.message);
      }

      setSaveStatus("saved");
      router.push("/admin/dashboard/activities");
      router.refresh();
    } catch (error) {
      console.error("Failed to save activity:", error);

      setSaveStatus("error");

      alert(
        error instanceof Error
          ? `Failed to save activity: ${error.message}`
          : "Failed to save activity. Please try again.",
      );
    }
  }

  const descriptionWords = form.description
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const titleAdded = Boolean(form.title.trim());
  const excerptAdded = Boolean(form.excerpt.trim());
  const descriptionAdded =
    form.description.trim().length >= 50;
  const categoryAdded = Boolean(form.category);
  const activityDateAdded = Boolean(form.activity_date);
  const mediaAdded = media.length > 0;

  const allValid =
    titleAdded &&
    excerptAdded &&
    descriptionAdded &&
    categoryAdded &&
    activityDateAdded;

  const isSaving =
    isPending ||
    saveStatus === "saving" ||
    uploadingFiles.length > 0;

  const checklist = [
    {
      label: "Activity title added",
      done: titleAdded,
    },
    {
      label: "Summary written",
      done: excerptAdded,
    },
    {
      label: "Description written",
      done: descriptionAdded,
    },
    {
      label: "Category selected",
      done: categoryAdded,
    },
    {
      label: "Activity date selected",
      done: activityDateAdded,
    },
    {
      label: "Media uploaded",
      done: mediaAdded,
      optional: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EE] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C65D3A]">
            Activities
          </p>

          <h1 className="mt-1 text-3xl font-black text-[#1A2A22]">
            Add New Activity
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68736C]">
            Share completed projects, community events, training
            sessions, outreach programs, and other activities.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => {
              startTransition(() => {
                void saveActivity(false);
              });
            }}
            className="rounded-2xl border border-[#e0d8c8] bg-white px-6 py-3 text-sm font-bold text-[#3a4a3a] transition hover:bg-[#F5F1E6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save as Draft
          </button>

          <button
            type="button"
            disabled={isSaving || !allValid}
            onClick={() => {
              startTransition(() => {
                void saveActivity(true);
              });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F4C4C] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#145B5B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saveStatus === "saving" ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Activity"
            )}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main form */}
        <div className="space-y-5">
          {/* Title */}
          <section className="rounded-3xl border border-black/[0.03] bg-white p-5 shadow-sm sm:p-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
              Activity title *
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(event) =>
                setField("title", event.target.value)
              }
              placeholder="For example: Community tree planting exercise"
              className="w-full rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-lg font-bold text-[#1A2A22] outline-none transition placeholder:font-normal placeholder:text-[#9a9a8a] focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15 sm:text-xl"
            />
          </section>

          {/* Summary */}
          <section className="rounded-3xl border border-black/[0.03] bg-white p-5 shadow-sm sm:p-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
              Short summary *
              <span className="ml-2 normal-case font-normal tracking-normal text-[#9a9a8a]">
                Shown on the activities listing page
              </span>
            </label>

            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(event) =>
                setField("excerpt", event.target.value)
              }
              placeholder="Provide a brief summary of what happened and who benefited..."
              className="w-full resize-none rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm leading-7 text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
            />

            <div className="mt-2 flex justify-end">
              <span className="text-xs text-[#9a9a8a]">
                {form.excerpt.length} characters
              </span>
            </div>
          </section>

          {/* Description */}
          <section className="rounded-3xl border border-black/[0.03] bg-white p-5 shadow-sm sm:p-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
              Full activity description *
            </label>

            <textarea
              rows={14}
              value={form.description}
              onChange={(event) =>
                setField("description", event.target.value)
              }
              placeholder="Describe the activity, its objectives, participants, achievements, challenges, and impact..."
              className="w-full resize-y rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm leading-8 text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
            />

            <div className="mt-2 flex items-center justify-between gap-4">
              <p
                className={`text-xs ${
                  descriptionAdded
                    ? "text-green-600"
                    : "text-[#9a9a8a]"
                }`}
              >
                Minimum 50 characters
              </p>

              <p className="text-xs text-[#9a9a8a]">
                {descriptionWords} words
              </p>
            </div>
          </section>

          {/* Media uploader */}
          <section className="rounded-3xl border border-black/[0.03] bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
                  Activity images and videos
                </label>

                <p className="mt-1 text-sm text-[#788079]">
                  Upload up to {MAX_MEDIA_FILES} images or videos.
                  The first file will be used as the cover.
                </p>
              </div>

              <span className="w-fit rounded-full bg-[#F5F1E6] px-3 py-1 text-xs font-bold text-[#0F4C4C]">
                {media.length}/{MAX_MEDIA_FILES} uploaded
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed px-5 py-10 text-center transition ${
                isDragging
                  ? "border-[#0F4C4C] bg-[#0F4C4C]/5"
                  : "border-[#d9d1c2] bg-[#F8F5EE] hover:border-[#0F4C4C]/60 hover:bg-[#0F4C4C]/[0.03]"
              }`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C4C]/10 text-[#0F4C4C]">
                <UploadCloud size={28} />
              </div>

              <p className="mt-4 text-sm font-bold text-[#1A2A22]">
                Drop images or videos here
              </p>

              <p className="mt-1 text-xs leading-5 text-[#8A918A]">
                Or click to browse files
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#68736C]">
                <span className="rounded-full bg-white px-3 py-1.5">
                  Images: maximum 5MB
                </span>

                <span className="rounded-full bg-white px-3 py-1.5">
                  Videos: maximum 50MB
                </span>
              </div>
            </div>

            {uploadingFiles.length > 0 && (
              <div className="mt-4 rounded-2xl border border-[#0F4C4C]/10 bg-[#0F4C4C]/5 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#0F4C4C]">
                  <Loader2 size={17} className="animate-spin" />
                  Uploading media
                </div>

                <div className="space-y-2">
                  {uploadingFiles.map((fileName) => (
                    <div
                      key={fileName}
                      className="flex items-center gap-2 text-xs text-[#68736C]"
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C65D3A]" />
                      <span className="truncate">{fileName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploadError && (
              <div className="mt-4 flex items-start justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                <span>{uploadError}</span>

                <button
                  type="button"
                  onClick={() => setUploadError("")}
                  aria-label="Close upload error"
                  className="flex-shrink-0"
                >
                  <X size={17} />
                </button>
              </div>
            )}

            {media.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {media.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-2xl border border-[#e5ded2] bg-[#F5F1E6]"
                  >
                    <div className="relative aspect-video bg-[#EDE8DD]">
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={`Activity media ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.url}
                          controls
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                      )}

                      <div className="absolute left-2 top-2 flex gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
                          {item.type === "image" ? (
                            <ImageIcon size={12} />
                          ) : (
                            <FileVideo size={12} />
                          )}

                          {item.type}
                        </span>

                        {index === 0 && (
                          <span className="rounded-full bg-[#C65D3A] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                            Cover
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeMedia(item.id)}
                        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white opacity-100 backdrop-blur transition hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                        aria-label="Remove media"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                      <span className="truncate text-xs font-semibold text-[#536057]">
                        {item.format?.toUpperCase() ||
                          item.type.toUpperCase()}
                      </span>

                      {item.duration != null && (
                        <span className="text-xs text-[#8A918A]">
                          {Math.round(item.duration)} sec
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Activity details */}
          <section className="rounded-3xl border border-black/[0.03] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
              Activity details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-bold text-[#3A4A3A]">
                  <CalendarDays size={15} className="text-[#0F4C4C]" />
                  Activity date *
                </label>

                <input
                  type="date"
                  value={form.activity_date}
                  onChange={(event) =>
                    setField(
                      "activity_date",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-bold text-[#3A4A3A]">
                  <MapPin size={15} className="text-[#0F4C4C]" />
                  Location
                </label>

                <input
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    setField("location", event.target.value)
                  }
                  placeholder="Town, village, county..."
                  className="w-full rounded-xl border border-[#e0d8c8] bg-[#F5F1E6] px-4 py-3 text-sm text-[#1A2A22] outline-none transition focus:border-[#0F4C4C] focus:ring-2 focus:ring-[#0F4C4C]/15"
                />
              </div>
            </div>
          </section>

          {/* Category */}
          <section className="rounded-3xl border border-black/[0.03] bg-white p-5 shadow-sm sm:p-6">
            <label className="mb-4 block text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
              Category *
            </label>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const isSelected =
                  form.category === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setField("category", category)
                    }
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#0F4C4C] text-white shadow-sm"
                        : "bg-[#F5F1E6] text-[#3a4a3a] hover:bg-[#0F4C4C]/10"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Checklist */}
          <section className="rounded-3xl border border-black/[0.03] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#C65D3A]">
              Publish checklist
            </h2>

            <ul className="space-y-3">
              {checklist.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <span
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                      item.done
                        ? "bg-green-500 text-white"
                        : "bg-[#F5F1E6] text-[#c0c0b0]"
                    }`}
                  >
                    {item.done ? (
                      <Check size={12} strokeWidth={3} />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                  </span>

                  <span
                    className={
                      item.done
                        ? "text-[#3a4a3a]"
                        : "text-[#9a9a8a]"
                    }
                  >
                    {item.label}

                    {item.optional && (
                      <span className="ml-1 text-xs">
                        (optional)
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={`mt-5 rounded-xl px-4 py-3 text-xs font-semibold ${
                allValid
                  ? "bg-green-50 text-green-700"
                  : "bg-[#F5F1E6] text-[#7A827B]"
              }`}
            >
              {allValid
                ? "The activity is ready to publish."
                : "Complete the required fields before publishing."}
            </div>
          </section>

          {saveStatus === "error" && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              Failed to save the activity. Please try again.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
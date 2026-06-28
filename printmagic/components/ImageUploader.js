"use client";

import { useRef, useState } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export default function ImageUploader({ value, onChange, label = "Image" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="font-body text-xs font-medium text-ink/60">
        {label}
      </span>
      <div className="mt-1.5 flex items-center gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink/5">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="font-body text-[10px] text-ink/30">No image</span>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-ink/15 px-3 py-1.5 font-body text-xs font-medium text-ink/70 hover:border-magenta hover:text-magenta disabled:opacity-50"
          >
            {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="ml-2 font-body text-xs text-ink/40 hover:text-red"
            >
              Remove
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          {error && (
            <p className="mt-1 max-w-xs font-body text-[11px] text-red">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

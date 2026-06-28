"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Modal from "@/components/Modal";
import ImageUploader from "@/components/ImageUploader";

const EMPTY_FORM = {
  id: null,
  title: "",
  subtitle: "",
  image_url: "",
  link_url: "",
  position: 0,
  is_active: true,
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadBanners() {
    setLoading(true);
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("position", { ascending: true });
    if (!error) setBanners(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadBanners();
  }, []);

  function openCreate() {
    setForm({ ...EMPTY_FORM, position: banners.length });
    setError("");
    setModalOpen(true);
  }

  function openEdit(banner) {
    setForm(banner);
    setError("");
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      image_url: form.image_url || null,
      link_url: form.link_url.trim() || null,
      position: Number(form.position) || 0,
      is_active: form.is_active,
    };

    const query = form.id
      ? supabase.from("banners").update(payload).eq("id", form.id)
      : supabase.from("banners").insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setModalOpen(false);
    loadBanners();
  }

  async function handleDelete(banner) {
    if (!confirm(`Delete banner "${banner.title || "untitled"}"?`)) return;
    const { error } = await supabase.from("banners").delete().eq("id", banner.id);
    if (!error) loadBanners();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Banners
          </h1>
          <p className="mt-1 font-body text-sm text-ink/50">
            Manage the rotating banner on the homepage.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-full bg-ink px-4 py-2 font-body text-sm font-semibold text-white hover:bg-magenta"
        >
          + Add banner
        </button>
      </div>

      {loading ? (
        <p className="mt-8 font-body text-sm text-ink/40">Loading…</p>
      ) : banners.length === 0 ? (
        <p className="mt-8 font-body text-sm text-ink/40">
          No banners yet — add one to feature an offer on the homepage.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {banners.map((b) => (
            <div
              key={b.id}
              className="overflow-hidden rounded-2xl border border-ink/5 bg-white"
            >
              <div className="relative h-32 w-full bg-ink/5">
                {b.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.image_url} alt="" className="h-full w-full object-cover" />
                )}
                <span
                  className={`absolute right-2 top-2 rounded-full px-2 py-0.5 font-body text-[11px] font-medium ${
                    b.is_active ? "bg-teal/90 text-white" : "bg-ink/40 text-white"
                  }`}
                >
                  {b.is_active ? "Live" : "Hidden"}
                </span>
              </div>
              <div className="p-3">
                <p className="font-body text-sm font-semibold text-ink line-clamp-1">
                  {b.title || "Untitled banner"}
                </p>
                <p className="font-body text-xs text-ink/50 line-clamp-1">
                  {b.subtitle}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-ticket text-xs text-ink/40">
                    Position {b.position}
                  </span>
                  <div>
                    <button
                      onClick={() => openEdit(b)}
                      className="font-body text-xs font-medium text-ink/60 hover:text-magenta"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b)}
                      className="ml-3 font-body text-xs font-medium text-ink/60 hover:text-red"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? "Edit banner" : "Add banner"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-xl border border-ink/10 px-3 py-2 font-body text-sm outline-none focus:border-magenta"
            />
          </Field>

          <Field label="Subtitle">
            <input
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full rounded-xl border border-ink/10 px-3 py-2 font-body text-sm outline-none focus:border-magenta"
            />
          </Field>

          <ImageUploader
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
            label="Banner image"
          />

          <Field label="Link (optional, e.g. /products?category=rakhis)">
            <input
              value={form.link_url}
              onChange={(e) => setForm({ ...form, link_url: e.target.value })}
              className="w-full rounded-xl border border-ink/10 px-3 py-2 font-body text-sm outline-none focus:border-magenta"
            />
          </Field>

          <Field label="Order (lower shows first)">
            <input
              type="number"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="w-full rounded-xl border border-ink/10 px-3 py-2 font-body text-sm outline-none focus:border-magenta"
            />
          </Field>

          <label className="flex items-center gap-2 font-body text-sm text-ink/70">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="h-4 w-4 rounded accent-magenta"
            />
            Visible on the live site
          </label>

          {error && <p className="font-body text-xs text-red">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-ink py-2.5 font-body text-sm font-semibold text-white hover:bg-magenta disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save banner"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-body text-xs font-medium text-ink/60">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

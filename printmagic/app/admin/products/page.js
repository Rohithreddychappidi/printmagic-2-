"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CATEGORIES } from "@/lib/constants";
import Modal from "@/components/Modal";
import ImageUploader from "@/components/ImageUploader";

const EMPTY_FORM = {
  id: null,
  name: "",
  category: CATEGORIES[0].slug,
  price: "",
  description: "",
  image_url: "",
  is_active: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function openCreate() {
    setForm(EMPTY_FORM);
    setError("");
    setModalOpen(true);
  }

  function openEdit(product) {
    setForm({ ...product, price: product.price ?? "" });
    setError("");
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: form.price === "" ? null : Number(form.price),
      description: form.description.trim(),
      image_url: form.image_url || null,
      is_active: form.is_active,
    };

    const query = form.id
      ? supabase.from("products").update(payload).eq("id", form.id)
      : supabase.from("products").insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setModalOpen(false);
    loadProducts();
  }

  async function handleDelete(product) {
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);
    if (!error) loadProducts();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Products
          </h1>
          <p className="mt-1 font-body text-sm text-ink/50">
            Add, edit, or remove what shows up in the catalogue.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-full bg-ink px-4 py-2 font-body text-sm font-semibold text-white hover:bg-magenta"
        >
          + Add product
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/5 bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-ink/5 font-body text-xs uppercase tracking-wide text-ink/40">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-body text-sm text-ink/40">
                  Loading…
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-body text-sm text-ink/40">
                  No products yet — add your first one.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b border-ink/5 last:border-0">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-ink/5">
                      {p.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image_url} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <span className="font-body text-sm font-medium text-ink">
                      {p.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-ink/60">
                    {CATEGORIES.find((c) => c.slug === p.category)?.label || p.category}
                  </td>
                  <td className="px-4 py-3 font-ticket text-sm text-ink/70">
                    {p.price ? `₹${p.price}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 font-body text-xs font-medium ${
                        p.is_active
                          ? "bg-teal/10 text-teal"
                          : "bg-ink/5 text-ink/40"
                      }`}
                    >
                      {p.is_active ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(p)}
                      className="font-body text-xs font-medium text-ink/60 hover:text-magenta"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="ml-3 font-body text-xs font-medium text-ink/60 hover:text-red"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? "Edit product" : "Add product"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Name">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-ink/10 px-3 py-2 font-body text-sm outline-none focus:border-magenta"
            />
          </Field>

          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-ink/10 px-3 py-2 font-body text-sm outline-none focus:border-magenta"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Price (₹, optional)">
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Leave blank for 'on request'"
              className="w-full rounded-xl border border-ink/10 px-3 py-2 font-body text-sm outline-none focus:border-magenta"
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-ink/10 px-3 py-2 font-body text-sm outline-none focus:border-magenta"
            />
          </Field>

          <ImageUploader
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
          />

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
            {saving ? "Saving…" : "Save product"}
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

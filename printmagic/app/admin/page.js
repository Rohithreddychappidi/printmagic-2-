"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ products: null, banners: null });

  useEffect(() => {
    async function load() {
      const [productsRes, bannersRes] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("banners").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        products: productsRes.count ?? 0,
        banners: bannersRes.count ?? 0,
      });
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">
        Dashboard
      </h1>
      <p className="mt-1 font-body text-sm text-ink/50">
        A quick look at what's live on the site.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Products"
          value={counts.products}
          href="/admin/products"
          accent="text-magenta"
        />
        <StatCard
          label="Homepage banners"
          value={counts.banners}
          href="/admin/banners"
          accent="text-teal"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-ink/5 bg-white p-6">
        <h2 className="font-display text-base font-semibold text-ink">
          Getting started
        </h2>
        <ul className="mt-3 list-inside list-disc space-y-1.5 font-body text-sm text-ink/60">
          <li>Add your first products under "Products".</li>
          <li>Upload a homepage banner under "Banners" to feature an offer.</li>
          <li>
            Changes appear on the live site immediately — no rebuild
            needed.
          </li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value, href, accent }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-ink/5 bg-white p-6 transition hover:shadow-glass"
    >
      <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/40">
        {label}
      </span>
      <div className={`mt-2 font-display text-4xl font-semibold ${accent}`}>
        {value === null ? "—" : value}
      </div>
      <span className="mt-1 inline-block font-body text-xs text-ink/40">
        Manage →
      </span>
    </Link>
  );
}

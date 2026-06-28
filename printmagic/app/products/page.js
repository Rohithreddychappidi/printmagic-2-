"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { SAMPLE_PRODUCTS } from "@/lib/sampleProducts";
import { CATEGORIES } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";
import PublicShell from "@/components/PublicShell";

export default function ProductsPage() {
  return (
    <PublicShell>
      <Suspense fallback={null}>
        <ProductsContent />
      </Suspense>
    </PublicShell>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingSamples, setUsingSamples] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error || !data || data.length === 0) {
          setProducts(SAMPLE_PRODUCTS);
          setUsingSamples(true);
        } else {
          setProducts(data);
          setUsingSamples(false);
        }
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const setCategory = (slug) => {
    if (slug === "all") {
      router.push("/products");
    } else {
      router.push(`/products?category=${slug}`);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-3 pb-16 pt-8 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          The catalogue
        </h1>
        <p className="mt-2 font-body text-sm text-ink/55 sm:text-base">
          Tap <span className="font-semibold text-magenta">+</span> to add a
          piece to your enquiry list, or send a quick WhatsApp straight from
          the card.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <PillButton
          active={activeCategory === "all"}
          onClick={() => setCategory("all")}
        >
          All
        </PillButton>
        {CATEGORIES.map((c) => (
          <PillButton
            key={c.slug}
            active={activeCategory === c.slug}
            onClick={() => setCategory(c.slug)}
          >
            {c.label}
          </PillButton>
        ))}
      </div>

      {usingSamples && !loading && (
        <p className="mx-auto mt-6 max-w-lg rounded-xl bg-amber/10 px-4 py-2.5 text-center font-body text-xs text-ink/60">
          Showing sample products — connect Supabase and add real products
          from the admin panel to replace these.
        </p>
      )}

      {loading ? (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-2xl bg-ink/5"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-16 text-center font-body text-sm text-ink/40">
          No products in this category yet — check back soon.
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

function PillButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 font-body text-sm font-medium transition ${
        active
          ? "bg-ink text-white"
          : "bg-ink/5 text-ink/60 hover:bg-ink/10"
      }`}
    >
      {children}
    </button>
  );
}

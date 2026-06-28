"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function BannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("banners")
      .select("*")
      .eq("is_active", true)
      .order("position", { ascending: true })
      .then(({ data, error }) => {
        if (!mounted) return;
        if (!error && data) setBanners(data);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (banners.length < 2) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % banners.length);
    }, 5000);
    return () => clearInterval(id);
  }, [banners.length]);

  if (loading || banners.length === 0) return null;

  const banner = banners[active];

  return (
    <section className="mx-auto mt-10 max-w-6xl px-3 sm:px-6">
      <Link
        href={banner.link_url || "/products"}
        className="relative block overflow-hidden rounded-3xl shadow-glass-lg"
      >
        <div className="relative aspect-[16/7] w-full sm:aspect-[16/5]">
          {banner.image_url && (
            <Image
              src={banner.image_url}
              alt={banner.title || "PrintMagic offer"}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 sm:p-8">
            {banner.title && (
              <h3 className="font-display text-xl font-semibold text-white sm:text-3xl">
                {banner.title}
              </h3>
            )}
            {banner.subtitle && (
              <p className="mt-1 max-w-md font-body text-sm text-white/80 sm:text-base">
                {banner.subtitle}
              </p>
            )}
          </div>
        </div>
      </Link>

      {banners.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {banners.map((b, i) => (
            <button
              key={b.id}
              aria-label={`Show banner ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-magenta" : "w-2.5 bg-ink/15"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

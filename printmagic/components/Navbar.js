"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useEnquiry } from "./EnquiryProvider";
import { CATEGORIES } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { items } = useEnquiry();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2 shadow-glass sm:px-6 sm:py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-icon.png"
            alt="PrintMagic"
            width={96}
            height={112}
            priority
            className="h-11 w-auto object-contain sm:h-14"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-ink sm:text-2xl">
            Print<span className="text-magenta">Magic</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="rounded-full px-3 py-1.5 font-body text-sm font-medium text-ink/70 transition hover:bg-ink/5 hover:text-ink"
            >
              {c.label}
            </Link>
          ))}
          <Link
            href="/about"
            className="rounded-full px-3 py-1.5 font-body text-sm font-medium text-ink/70 transition hover:bg-ink/5 hover:text-ink"
          >
            Visit &amp; contact
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="relative hidden rounded-full bg-ink px-4 py-2 font-body text-sm font-semibold text-white transition hover:bg-magenta sm:inline-flex"
          >
            Browse gifts
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-magenta text-[11px] font-bold text-white">
                {items.length}
              </span>
            )}
          </Link>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-ink/5 md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-3 shadow-glass md:hidden">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 font-body text-sm font-medium text-ink/80 hover:bg-ink/5"
            >
              {c.label}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-2.5 font-body text-sm font-medium text-ink/80 hover:bg-ink/5"
          >
            Visit &amp; contact
          </Link>
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl bg-ink px-3 py-2.5 text-center font-body text-sm font-semibold text-white"
          >
            Browse gifts
          </Link>
        </div>
      )}
    </header>
  );
}

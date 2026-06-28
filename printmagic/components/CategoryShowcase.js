import Link from "next/link";
import { CATEGORIES, CATEGORY_COLOR_MAP } from "@/lib/constants";

export default function CategoryShowcase() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-3 sm:px-6">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Shop by category
        </h2>
        <Link
          href="/products"
          className="font-body text-sm font-semibold text-magenta hover:underline"
        >
          See everything →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {CATEGORIES.map((c) => {
          const colors = CATEGORY_COLOR_MAP[c.slug];
          return (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className={`group flex flex-col items-start justify-between rounded-2xl glass p-5 shadow-glass transition hover:-translate-y-1 hover:shadow-glass-lg`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ${colors.bg} ${colors.text} font-display text-base font-bold`}
              >
                {c.label.charAt(0)}
              </span>
              <span className="mt-4 font-display text-base font-semibold text-ink sm:text-lg">
                {c.label}
              </span>
              <span className="mt-1 font-body text-xs text-ink/40 group-hover:text-ink/60">
                Customized for you
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

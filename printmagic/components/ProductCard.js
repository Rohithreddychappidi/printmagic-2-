"use client";

import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useEnquiry } from "./EnquiryProvider";
import { CATEGORY_COLOR_MAP, CATEGORIES } from "@/lib/constants";

export default function ProductCard({ product }) {
  const { isSelected, toggleItem } = useEnquiry();
  const selected = isSelected(product.id);
  const categoryMeta = CATEGORIES.find((c) => c.slug === product.category);
  const colors = CATEGORY_COLOR_MAP[product.category] || {
    bg: "bg-ink/5",
    text: "text-ink/70",
    ring: "ring-ink/20",
  };

  return (
    <div
      className="ticket group flex flex-col overflow-hidden rounded-2xl bg-white shadow-glass ring-1 ring-ink/5 transition hover:shadow-glass-lg"
      style={{ "--notch-top": "58%" }}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-ink/5">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-3xl text-ink/20">
            PM
          </div>
        )}
        {categoryMeta && (
          <span
            className={`absolute left-2 top-2 rounded-full px-2.5 py-1 font-body text-[11px] font-semibold ${colors.bg} ${colors.text}`}
          >
            {categoryMeta.label}
          </span>
        )}
      </div>

      <div className="ticket-perforation flex flex-1 flex-col justify-between gap-2 px-3 pb-3 pt-2.5">
        <div>
          <h3 className="font-display text-sm font-semibold leading-snug text-ink line-clamp-2 sm:text-base">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-0.5 font-body text-xs text-ink/50 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          {product.price ? (
            <span className="font-ticket text-sm font-bold text-ink">
              ₹{product.price}
            </span>
          ) : (
            <span className="font-ticket text-xs text-ink/40">On request</span>
          )}

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleItem(product)}
              aria-pressed={selected}
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition ${
                selected
                  ? "border-magenta bg-magenta text-white"
                  : "border-ink/15 text-ink/50 hover:border-magenta hover:text-magenta"
              }`}
              aria-label={selected ? "Remove from enquiry list" : "Add to enquiry list"}
              title={selected ? "Remove from enquiry list" : "Add to enquiry list"}
            >
              {selected ? "✓" : "+"}
            </button>
            <a
              href={buildWhatsAppLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
              title="Enquire on WhatsApp"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:opacity-90"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.2-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.6 1 2.6.7 3.1.6.5 0 1.6-.6 1.8-1.3.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
                <path d="M12 2.2A9.8 9.8 0 0 0 2.7 15.9L2 21.8l6-1.6A9.8 9.8 0 1 0 12 2.2Zm0 17.7c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3a8 8 0 1 1 7.4 4Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

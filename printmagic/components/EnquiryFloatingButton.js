"use client";

import { useState } from "react";
import { useEnquiry } from "./EnquiryProvider";
import { buildWhatsAppLink, buildGeneralEnquiryLink } from "@/lib/whatsapp";

export default function EnquiryFloatingButton() {
  const { items, removeItem, clear } = useEnquiry();
  const [open, setOpen] = useState(false);

  if (items.length === 0) {
    // Quiet single WhatsApp affordance when nothing is selected yet —
    // always reachable, never in the way.
    return (
      <a
        href={buildGeneralEnquiryLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with PrintMagic on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glass-lg transition hover:scale-105"
      >
        <WhatsAppIcon />
      </a>
    );
  }

  return (
    <>
      {open && (
        <div className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-md rounded-2xl glass-strong p-4 shadow-glass-lg sm:right-5 sm:left-auto">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-base font-semibold text-ink">
              Your enquiry list
            </h4>
            <button
              onClick={clear}
              className="font-body text-xs font-medium text-ink/50 hover:text-red"
            >
              Clear all
            </button>
          </div>
          <ul className="mt-3 max-h-52 space-y-2 overflow-y-auto">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-xl bg-white/70 px-3 py-2"
              >
                <span className="font-body text-sm text-ink/80 line-clamp-1">
                  {item.name}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ink/40 hover:bg-ink/5 hover:text-red"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <a
            href={buildWhatsAppLink(items)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 font-body text-sm font-semibold text-white transition hover:opacity-90"
          >
            <WhatsAppIcon size={16} />
            Send enquiry on WhatsApp
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open enquiry list"
        className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-white shadow-glass-lg transition hover:scale-105"
      >
        <WhatsAppIcon />
        <span className="font-body text-sm font-semibold">{items.length}</span>
      </button>
    </>
  );
}

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.2-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.6 1 2.6.7 3.1.6.5 0 1.6-.6 1.8-1.3.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
      <path d="M12 2.2A9.8 9.8 0 0 0 2.7 15.9L2 21.8l6-1.6A9.8 9.8 0 1 0 12 2.2Zm0 17.7c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3a8 8 0 1 1 7.4 4Z" />
    </svg>
  );
}

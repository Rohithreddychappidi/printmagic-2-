import Link from "next/link";
import Image from "next/image";
import { SHOP } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-20 px-3 pb-6 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-ink px-6 py-10 text-white sm:px-10">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Image
              src="/logo-cropped.png"
              alt="PrintMagic"
              width={953}
              height={614}
              className="h-16 w-auto object-contain sm:h-20"
            />
            <p className="mt-3 max-w-xs font-body text-sm text-white/70">
              {SHOP.tagline}. Every piece is made to order — tell us what you
              have in mind on WhatsApp.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={SHOP.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PrintMagic on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-sky"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
                </svg>
              </a>
              <a
                href={SHOP.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PrintMagic on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-magenta"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.06 1.97.24 2.43.41.61.24 1.05.52 1.51.98.46.46.74.9.98 1.51.17.46.35 1.26.41 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.24 1.97-.41 2.43-.24.61-.52 1.05-.98 1.51-.46.46-.9.74-1.51.98-.46.17-1.26.35-2.43.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.97-.24-2.43-.41a4.1 4.1 0 0 1-1.51-.98 4.1 4.1 0 0 1-.98-1.51c-.17-.46-.35-1.26-.41-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.06-1.17.24-1.97.41-2.43.24-.61.52-1.05.98-1.51.46-.46.9-.74 1.51-.98.46-.17 1.26-.35 2.43-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.74.07-.96.04-1.48.2-1.83.34-.46.18-.78.4-1.13.74-.34.35-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.83.18.46.4.78.74 1.13.35.34.67.56 1.13.74.35.14.87.3 1.83.34 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.83-.34.46-.18.78-.4 1.13-.74.34-.35.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.83a3.04 3.04 0 0 0-.74-1.13 3.04 3.04 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34-1.24-.06-1.59-.07-4.74-.07Zm0 3.65a4.35 4.35 0 1 1 0 8.7 4.35 4.35 0 0 1 0-8.7Zm0 1.8a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1Zm5.54-2a1.02 1.02 0 1 1-2.04 0 1.02 1.02 0 0 1 2.04 0Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wide text-white/50">
              Visit or call
            </h4>
            <ul className="mt-3 space-y-2 font-body text-sm text-white/80">
              <li>{SHOP.address}</li>
              <li>
                <a href={`tel:+91${SHOP.phone}`} className="hover:text-amber">
                  +91 {SHOP.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SHOP.email}`} className="hover:text-amber break-all">
                  {SHOP.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wide text-white/50">
              Hours
            </h4>
            <ul className="mt-3 space-y-1.5 font-ticket text-xs text-white/80">
              {SHOP.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="text-white/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 font-body text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} PrintMagic. All gifts handmade to order.</span>
          <Link href="/admin/login" className="hover:text-white/70">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

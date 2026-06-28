import Image from "next/image";
import Link from "next/link";
import { buildGeneralEnquiryLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-3 pt-8 pb-14 sm:px-6 sm:pt-14 sm:pb-24">
      {/* Soft prism-colour background photo, echoing the hexagon mark.
          Generated as a static image (not animated blurred divs) so the
          hero stays calm and cheap to paint while scrolling. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-4xl rounded-[28px] glass px-6 py-12 text-center shadow-glass-lg sm:px-12 sm:py-16">
        <span className="font-ticket inline-block rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-widest text-ink/50">
          Made to order · Eluru
        </span>

        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
          Gifts that look like
          <br />
          <span className="bg-gradient-to-r from-magenta via-coral to-orange bg-clip-text text-transparent">
            you thought about it.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl font-body text-base text-ink/60 sm:text-lg">
          Rakhis, phone covers, keychains and laser-engraved keepsakes —
          customized in Eluru and handed to you (or shipped) with care. No
          cart, no checkout. Just pick what you like and send it to us on
          WhatsApp.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="w-full rounded-full bg-ink px-7 py-3 font-body text-sm font-semibold text-white transition hover:bg-magenta sm:w-auto"
          >
            Browse the catalogue
          </Link>
          <a
            href={buildGeneralEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-ink/15 bg-white/70 px-7 py-3 font-body text-sm font-semibold text-ink transition hover:border-[#25D366] hover:text-[#1c9b51] sm:w-auto"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

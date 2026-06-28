import { SHOP } from "@/lib/constants";
import { buildGeneralEnquiryLink } from "@/lib/whatsapp";
import PublicShell from "@/components/PublicShell";

export default function AboutPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-4xl px-3 pb-16 pt-10 sm:px-6">
      <div className="text-center">
        <span className="font-ticket inline-block rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-widest text-ink/50">
          About the shop
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Customized gifts, made in Eluru
        </h1>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-ink/55 sm:text-base">
          PrintMagic prints and crafts rakhis, phone covers, keychains and
          laser-engraved keepsakes — every order personalised with your
          names, photos or message.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl glass p-6 shadow-glass">
          <h2 className="font-display text-lg font-semibold text-ink">
            Visit us
          </h2>
          <p className="mt-2 font-body text-sm text-ink/70">{SHOP.address}</p>

          <h2 className="mt-6 font-display text-lg font-semibold text-ink">
            Reach us
          </h2>
          <ul className="mt-2 space-y-1.5 font-body text-sm text-ink/70">
            <li>
              <a href={`tel:+91${SHOP.phone}`} className="hover:text-magenta">
                +91 {SHOP.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SHOP.email}`} className="break-all hover:text-magenta">
                {SHOP.email}
              </a>
            </li>
          </ul>

          <a
            href={buildGeneralEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-body text-sm font-semibold text-white transition hover:opacity-90"
          >
            Chat on WhatsApp
          </a>
        </div>

        <div className="rounded-2xl glass p-6 shadow-glass">
          <h2 className="font-display text-lg font-semibold text-ink">
            Business hours
          </h2>
          <ul className="mt-3 space-y-2 font-ticket text-sm text-ink/70">
            {SHOP.hours.map((h) => (
              <li
                key={h.days}
                className="flex items-center justify-between border-b border-ink/5 pb-2"
              >
                <span>{h.days}</span>
                <span
                  className={
                    h.time === "Holiday" ? "text-red" : "text-ink/50"
                  }
                >
                  {h.time}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 font-display text-lg font-semibold text-ink">
            Follow along
          </h2>
          <div className="mt-2 flex gap-3 font-body text-sm">
            <a
              href={SHOP.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 hover:text-sky"
            >
              Facebook
            </a>
            <a
              href={SHOP.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 hover:text-magenta"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
    </PublicShell>
  );
}

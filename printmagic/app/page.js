import PublicShell from "@/components/PublicShell";
import Hero from "@/components/Hero";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryShowcase from "@/components/CategoryShowcase";
import Gallery from "@/components/Gallery";

export default function HomePage() {
  return (
    <PublicShell>
      <Hero />
      <BannerCarousel />
      <CategoryShowcase />

      <section className="mx-auto mt-16 max-w-6xl px-3 pb-4 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <InfoTicket
            color="text-magenta"
            label="01"
            title="Pick what you like"
            body="Browse rakhis, covers, keychains and laser items — tap + to add a few to your enquiry list."
          />
          <InfoTicket
            color="text-teal"
            label="02"
            title="Tell us your customization"
            body="Names, photos, dates, colours — send WhatsApp a note about exactly how you want it."
          />
          <InfoTicket
            color="text-orange"
            label="03"
            title="We confirm & make it"
            body="We'll quote, confirm details, and get your order ready — pickup or shipping, your call."
          />
        </div>
      </section>

      <Gallery />
    </PublicShell>
  );
}

function InfoTicket({ label, title, body, color }) {
  return (
    <div className="rounded-2xl glass p-5 shadow-glass">
      <span className={`font-ticket text-xs font-bold ${color}`}>{label}</span>
      <h3 className="mt-2 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-1.5 font-body text-sm text-ink/55">{body}</p>
    </div>
  );
}

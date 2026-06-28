"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/banners", label: "Banners" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-ink/5 bg-white p-4 sm:p-5">
      <Link href="/" className="font-display text-lg font-semibold text-ink">
        Print<span className="text-magenta">Magic</span>
      </Link>
      <span className="mt-0.5 font-body text-[11px] uppercase tracking-wide text-ink/40">
        Admin panel
      </span>

      <nav className="mt-8 flex flex-col gap-1">
        {LINKS.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-3 py-2 font-body text-sm font-medium transition ${
                active
                  ? "bg-ink text-white"
                  : "text-ink/60 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 pt-8">
        <Link
          href="/"
          target="_blank"
          className="rounded-xl px-3 py-2 font-body text-sm text-ink/50 hover:bg-ink/5"
        >
          View live site ↗
        </Link>
        <button
          onClick={handleLogout}
          className="rounded-xl px-3 py-2 text-left font-body text-sm text-red/80 hover:bg-red/5"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

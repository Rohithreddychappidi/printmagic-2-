# PrintMagic — storefront + admin panel

A white-background, glassmorphism storefront for **PrintMagic** (customized
rakhis, phone covers, keychains and laser-engraved gifts), plus a React
admin panel to manage products and homepage banners — no purchased server
required. Built with **Next.js 14**, **Supabase** (database + admin auth),
and **Cloudinary** (image storage).

There is no cart or payment flow. Customers tap products they like and the
site builds a pre-filled WhatsApp message for you to take the conversation
from there.

---

## 1. What's inside

```
app/
  (site)/            → public storefront: home, /products, /about
  admin/              → admin panel: /admin, /admin/products, /admin/banners, /admin/login
components/           → shared UI (navbar, footer, product card, admin forms, etc.)
lib/                  → Supabase client, Cloudinary upload helper, WhatsApp link builder, shop constants
supabase/schema.sql   → run this once in your Supabase project
```

- **No backend server to host.** The Next.js app talks directly to
  Supabase (database + auth) and Cloudinary (images) from the browser.
  Deploy the app itself for free on Vercel.
- **Admin panel** lives at `/admin` on the same site, protected by
  Supabase Auth. It's not linked anywhere public except a small "Admin"
  link in the footer.

---

## 2. One-time setup

### A. Supabase (database + admin login)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and run it. This creates the `products` and
   `banners` tables with the right access rules (shoppers can read active
   items; only a signed-in admin can add/edit/delete).
3. Go to **Authentication → Users → Add user** and create yourself an
   admin login (any email + password — it doesn't need to be a real
   inbox unless you want password resets to work).
4. Go to **Project Settings → API** and copy:
   - **Project URL**
   - **anon public** key

### B. Cloudinary (image storage, free tier)

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Note your **Cloud name** on the dashboard home page.
3. Go to **Settings → Upload → Upload presets → Add upload preset**.
   - Set **Signing Mode** to **Unsigned**.
   - Give it a name, e.g. `printmagic_unsigned`, and save.
   - This lets the admin panel upload images straight from the browser
     with no secret key and no backend.

### C. Local environment file

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in the four values from steps A and B, plus
your WhatsApp number with country code (e.g. `918008363345` for the
number already on file, `8008363345`).

> **Heads up:** the email on the logo reads
> `PRINTMAGICSHOP@GMAIIL.COM` — that looks like a typo for `@gmail.com`.
> Double-check the real inbox address before this goes live; it's used
> in the footer and About page (`lib/constants.js`).

---

## 3. Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront,
and [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
to sign in with the admin user you created in Supabase.

Until you add real products, the catalogue shows sample placeholder
items so the site never looks empty — add your own from the admin panel
and they'll automatically replace the samples.

---

## 4. Deploy for free (no server purchase needed)

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the
   repo.
3. In the project's **Environment Variables**, add the same four values
   from your `.env.local`.
4. Deploy. Vercel's free tier is enough for a shop site like this.

Every time you add, edit, or remove a product or banner in `/admin`,
the live site reflects it immediately — no redeploy needed, since the
data lives in Supabase, not in the code.

---

## 5. Using the admin panel

- **Products** (`/admin/products`): add/edit/delete products, set
  category, price (or leave blank for "on request"), description, and
  upload a photo. Toggle "Visible on the live site" to hide something
  without deleting it.
- **Banners** (`/admin/banners`): manage the rotating homepage banner —
  image, title, subtitle, an optional link (e.g.
  `/products?category=rakhis`), and display order.
- **Logging in**: any user you create under Supabase's Authentication
  tab can sign in at `/admin/login`. There's no separate "admin role" —
  treat Supabase user creation as the gate-keeping step.

---

## 6. Design notes

- **Palette & type** are pulled from the PrintMagic hexagon mark —
  magenta, teal, orange, sky and amber accents on a white background,
  with a serif display face (Fraunces) for headings and a clean sans
  (Plus Jakarta Sans) for body text. A monospace face (Space Mono) is
  used for prices and tags, like a printed ticket stub.
- **Signature element**: product cards are styled like perforated
  raffle tickets (notch + dashed divider) — a small nod to "Print" in
  PrintMagic.
- Everything is mobile-first and uses glassmorphism (frosted, blurred
  panels) for the nav, hero, and category tiles, per the brief.

---

## 7. Categories seeded in the code

The four categories from the logo are wired in as defaults
(`lib/constants.js`): **Rakhis**, **Phone Covers**, **Keychains**,
**Laser Items**. Add or rename categories there if the catalogue grows.

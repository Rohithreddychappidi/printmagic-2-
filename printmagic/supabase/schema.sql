-- PrintMagic — Supabase schema
-- Run this once in Supabase: Dashboard > SQL Editor > New query > paste > Run.

-- ============ PRODUCTS ============

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,           -- 'rakhis' | 'phone-covers' | 'keychains' | 'laser-items'
  price numeric,                    -- null = "on request"
  description text default '',
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

-- Anyone (including logged-out shoppers) can read active products.
create policy "Public can view active products"
  on products for select
  using (is_active = true);

-- Only signed-in admins can create/update/delete.
create policy "Authenticated users can insert products"
  on products for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update products"
  on products for update
  to authenticated
  using (true);

create policy "Authenticated users can delete products"
  on products for delete
  to authenticated
  using (true);

-- Admins also need to see hidden ("is_active = false") products in the
-- admin panel's table, so give authenticated users full read access too.
create policy "Authenticated users can view all products"
  on products for select
  to authenticated
  using (true);


-- ============ BANNERS ============

create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  title text default '',
  subtitle text default '',
  image_url text,
  link_url text,
  position int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table banners enable row level security;

create policy "Public can view active banners"
  on banners for select
  using (is_active = true);

create policy "Authenticated users can insert banners"
  on banners for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update banners"
  on banners for update
  to authenticated
  using (true);

create policy "Authenticated users can delete banners"
  on banners for delete
  to authenticated
  using (true);

create policy "Authenticated users can view all banners"
  on banners for select
  to authenticated
  using (true);


-- ============ ADMIN USER ============
-- This schema assumes ANY authenticated Supabase user is an admin —
-- fine for a single-shop site with one or two trusted logins.
-- Create the admin login at:
--   Supabase Dashboard > Authentication > Users > Add user
-- Then sign in at yourdomain.com/admin/login with that email + password.

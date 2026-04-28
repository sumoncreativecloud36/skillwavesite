-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- SkillWave — Supabase Schema
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- 1) TABLES ────────────────────────────────────────────

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  instructor text,
  thumbnail_url text,
  sale_price numeric default 0,
  original_price numeric default 0,
  rating numeric default 5,
  review_count int default 0,
  is_featured boolean default false,
  is_bestseller boolean default false,
  course_url text,
  created_at timestamptz default now()
);

create table if not exists public.ebooks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  cover_url text,
  price numeric default 0,
  description text,
  is_featured boolean default true,
  purchase_url text,
  created_at timestamptz default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  course_name text,
  rating int default 5,
  review_text text,
  is_approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  section_key text unique not null,
  heading text,
  subtitle text,
  is_visible boolean default true
);

-- 2) ENABLE RLS ────────────────────────────────────────

alter table public.settings enable row level security;
alter table public.courses  enable row level security;
alter table public.ebooks   enable row level security;
alter table public.reviews  enable row level security;
alter table public.sections enable row level security;

-- 3) PUBLIC READ POLICIES ──────────────────────────────
-- Anonymous users can read everything they see on the homepage.

drop policy if exists "settings public read" on public.settings;
create policy "settings public read" on public.settings for select using (true);

drop policy if exists "courses public read" on public.courses;
create policy "courses public read" on public.courses for select using (true);

drop policy if exists "ebooks public read" on public.ebooks;
create policy "ebooks public read" on public.ebooks for select using (true);

drop policy if exists "reviews public read approved" on public.reviews;
create policy "reviews public read approved" on public.reviews for select using (is_approved = true);

drop policy if exists "sections public read" on public.sections;
create policy "sections public read" on public.sections for select using (true);

-- 4) AUTHENTICATED WRITE POLICIES ──────────────────────
-- Any logged-in user (your admin account) can write.
-- Tighten further if you onboard non-admin users.

do $$
declare
  t text;
begin
  foreach t in array array['settings','courses','ebooks','reviews','sections']
  loop
    execute format('drop policy if exists "%1$s auth all" on public.%1$s', t);
    execute format(
      'create policy "%1$s auth all" on public.%1$s for all to authenticated using (true) with check (true)',
      t
    );
    -- authenticated also needs to read non-approved reviews to manage them
  end loop;
end $$;

-- Authenticated users can read pending reviews too:
drop policy if exists "reviews auth read all" on public.reviews;
create policy "reviews auth read all" on public.reviews for select to authenticated using (true);

-- 5) STORAGE BUCKET ────────────────────────────────────
-- Create the public bucket "skillwave" (idempotent).

insert into storage.buckets (id, name, public)
values ('skillwave', 'skillwave', true)
on conflict (id) do update set public = true;

-- Storage policies on storage.objects (bucket-scoped)

drop policy if exists "skillwave public read" on storage.objects;
create policy "skillwave public read" on storage.objects
  for select using (bucket_id = 'skillwave');

drop policy if exists "skillwave auth write" on storage.objects;
create policy "skillwave auth write" on storage.objects
  for insert to authenticated with check (bucket_id = 'skillwave');

drop policy if exists "skillwave auth update" on storage.objects;
create policy "skillwave auth update" on storage.objects
  for update to authenticated using (bucket_id = 'skillwave');

drop policy if exists "skillwave auth delete" on storage.objects;
create policy "skillwave auth delete" on storage.objects
  for delete to authenticated using (bucket_id = 'skillwave');

-- 6) SEED SECTIONS (optional defaults) ─────────────────

insert into public.sections (section_key, heading, subtitle, is_visible) values
  ('top_selling',     'টপ সেলিং কোর্স',         'সবচেয়ে জনপ্রিয় কোর্সগুলো এক নজরে', true),
  ('featured_courses','ফিচার্ড কোর্স',           'এক্সপার্টদের নির্বাচিত সেরা কোর্স',  true),
  ('featured_ebooks', 'ফিচার্ড ই-বুক',           'আপনার পথচলার সঙ্গী সেরা বইগুলো',     true),
  ('reviews',         'শিক্ষার্থীদের মতামত',     'যারা আমাদের সাথে শিখছেন তাদের অভিজ্ঞতা', true)
on conflict (section_key) do nothing;

-- 7) SEED DEFAULT SETTINGS (optional) ──────────────────

insert into public.settings (key, value) values
  ('tagline',           'বাংলায় শিখুন। দক্ষ হয়ে উঠুন।'),
  ('hero_headline',     'বাংলায় শিখুন বিশ্বমানের স্কিল'),
  ('hero_description',  'SkillWave-এ পাবেন এক্সপার্টদের তৈরি কোর্স, ই-বুক ও লাইভ ক্লাস। আজই শুরু করুন আপনার ক্যারিয়ার যাত্রা।'),
  ('hero_badge_text',   '🔴 লাইভ ইভেন্ট'),
  ('hero_badge_visible','true'),
  ('hero_btn1_label',   'ফ্রি রেজিস্ট্রেশন করুন'),
  ('hero_btn1_url',     '#register'),
  ('hero_btn2_label',   'আরও জানুন'),
  ('hero_btn2_url',     '#about')
on conflict (key) do nothing;

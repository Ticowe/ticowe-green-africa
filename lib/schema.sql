-- ============================================================
-- TICOWE Admin Dashboard — Supabase SQL Schema
-- Run this in the Supabase SQL Editor (Database → SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── USERS ──────────────────────────────────────────────────────
create table if not exists public.users (
  id          uuid primary key default uuid_generate_v4(),
  email       text unique not null,
  full_name   text,
  phone       text,
  country     text,
  role        text not null default 'user' check (role in ('admin', 'user')),
  created_at  timestamptz not null default now(),
  last_seen   timestamptz
);

-- ── VOLUNTEERS ─────────────────────────────────────────────────
create table if not exists public.volunteers (
  id          uuid primary key default uuid_generate_v4(),
  full_name   text not null,
  email       text not null,
  phone       text,
  country     text not null,
  skills      text,
  motivation  text,
  duration    text,
  status      text not null default 'pending'
              check (status in ('pending', 'approved', 'rejected', 'active')),
  created_at  timestamptz not null default now()
);

-- ── MESSAGES ───────────────────────────────────────────────────
create table if not exists public.messages (
  id          uuid primary key default uuid_generate_v4(),
  full_name   text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  status      text not null default 'unread'
              check (status in ('unread', 'read', 'replied')),
  created_at  timestamptz not null default now()
);

-- ── NEWS ───────────────────────────────────────────────────────
create table if not exists public.news (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  excerpt       text not null,
  content       text not null,
  category      text not null,
  status        text not null default 'draft'
                check (status in ('draft', 'published')),
  author_id     uuid references public.users(id) on delete set null,
  cover_image   text,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at on news
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger news_updated_at
  before update on public.news
  for each row execute procedure update_updated_at();

-- ── DONATIONS ──────────────────────────────────────────────────
create table if not exists public.donations (
  id              uuid primary key default uuid_generate_v4(),
  donor_name      text,
  donor_email     text,
  amount          numeric(10, 2) not null,
  currency        text not null default 'USD',
  frequency       text not null default 'once'
                  check (frequency in ('once', 'monthly', 'annually')),
  payment_method  text,
  status          text not null default 'pending'
                  check (status in ('pending', 'completed', 'failed')),
  created_at      timestamptz not null default now()
);

-- ── ROW LEVEL SECURITY ─────────────────────────────────────────
-- Enable RLS on all tables
alter table public.users        enable row level security;
alter table public.volunteers   enable row level security;
alter table public.messages     enable row level security;
alter table public.news         enable row level security;
alter table public.donations    enable row level security;

-- Public can INSERT volunteers and messages (from public forms)
create policy "public_insert_volunteers" on public.volunteers
  for insert with check (true);

create policy "public_insert_messages" on public.messages
  for insert with check (true);

-- Published news is readable by anyone
create policy "public_read_published_news" on public.news
  for select using (status = 'published');

-- Admins (authenticated with service role key) can do everything
-- These are handled server-side with the service role key — no RLS needed there.

-- ── SAMPLE DATA (optional) ─────────────────────────────────────
insert into public.news (title, excerpt, content, category, status, published_at)
values (
  'TICOWE Farmer Network Surpasses 25,000 Beneficiaries',
  'A major milestone as our direct farmer support network crosses the 25,000 mark.',
  'Full article content goes here...',
  'Agriculture',
  'published',
  now()
) on conflict do nothing;

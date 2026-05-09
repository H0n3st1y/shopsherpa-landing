-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Waitlist signups
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'landing',
  created_at timestamptz default now()
);

-- Preorders (Stripe lifetime tier)
create table if not exists public.preorders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  stripe_session_id text unique not null,
  amount_cents integer,
  status text default 'paid',
  created_at timestamptz default now()
);

-- Index for faster lookups
create index if not exists waitlist_email_idx on public.waitlist (email);
create index if not exists preorders_email_idx on public.preorders (email);

-- Row Level Security
-- Lock both tables down. Only the service role (server-side) can read/write.
alter table public.waitlist enable row level security;
alter table public.preorders enable row level security;

-- No public policies = no anonymous access. The service role key bypasses RLS.

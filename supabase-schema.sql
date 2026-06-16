-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
create extension if not exists pgcrypto;

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

-- Application accounts. These are intentionally separate from Supabase Auth
-- because the current app does not use an auth provider.
create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  status text not null default 'unverified'
    check (status in ('unverified', 'verified', 'disabled')),
  email_verified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.email_verification_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  token_hash text unique not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.app_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  token_hash text unique not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Server-side rate-limit counters. Keys are SHA-256 hashes so raw IPs/emails
-- are not stored in this table.
create table if not exists public.rate_limits (
  key text primary key,
  count integer not null default 0,
  reset_at timestamptz not null,
  updated_at timestamptz not null default now()
);

-- Index for faster lookups
create index if not exists waitlist_email_idx on public.waitlist (email);
create index if not exists preorders_email_idx on public.preorders (email);
create index if not exists app_users_email_idx on public.app_users (email);
create index if not exists email_verification_tokens_user_id_idx on public.email_verification_tokens (user_id);
create index if not exists email_verification_tokens_token_hash_idx on public.email_verification_tokens (token_hash);
create index if not exists app_sessions_token_hash_idx on public.app_sessions (token_hash);
create index if not exists app_sessions_user_id_idx on public.app_sessions (user_id);
create index if not exists rate_limits_reset_at_idx on public.rate_limits (reset_at);

create or replace function public.check_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
returns table(allowed boolean, remaining integer, reset_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
  v_reset_at timestamptz;
begin
  insert into public.rate_limits as rl (key, count, reset_at, updated_at)
  values (p_key, 1, now() + make_interval(secs => p_window_seconds), now())
  on conflict (key) do update
    set
      count = case
        when rl.reset_at <= now() then 1
        else rl.count + 1
      end,
      reset_at = case
        when rl.reset_at <= now() then now() + make_interval(secs => p_window_seconds)
        else rl.reset_at
      end,
      updated_at = now()
  returning count, reset_at
  into v_count, v_reset_at;

  allowed := v_count <= p_limit;
  remaining := greatest(p_limit - v_count, 0);
  reset_at := v_reset_at;
  return next;
end;
$$;

-- Row Level Security
-- Lock both tables down. Only the service role (server-side) can read/write.
alter table public.waitlist enable row level security;
alter table public.preorders enable row level security;
alter table public.app_users enable row level security;
alter table public.email_verification_tokens enable row level security;
alter table public.app_sessions enable row level security;
alter table public.rate_limits enable row level security;

-- No public policies = no anonymous access. The service role key bypasses RLS.

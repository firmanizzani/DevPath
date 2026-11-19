-- ============================================================
-- DevPath — Autentikasi Supabase (profiles, user_progress, RLS)
-- Jalankan di Supabase SQL Editor, atau lewat API:
--   cd api && bun run db:policies
-- ============================================================

-- 1) Tabel (identik dengan api/src/db/schema.ts / Drizzle)
--    password_hash: salinan hash sandi (bcrypt milik Supabase Auth) — BUKAN teks polos,
--    diisi otomatis oleh trigger saat daftar & disinkronkan saat sandi diganti.
create table if not exists public.profiles (
	id uuid primary key,
	email text,
	password_hash text,
	full_name varchar(128),
	target_scope varchar(64),
	avatar_url text,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists password_hash text;

create table if not exists public.user_progress (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null,
	scope_id varchar(64) not null,
	bab_number integer not null,
	score integer not null default 0,
	xp integer not null default 0,
	is_completed boolean not null default false,
	completed_at timestamptz,
	updated_at timestamptz not null default now(),
	created_at timestamptz not null default now()
);

create unique index if not exists user_progress_user_scope_bab_uq
	on public.user_progress (user_id, scope_id, bab_number);

create index if not exists user_progress_user_idx on public.user_progress (user_id);
create index if not exists profiles_target_scope_idx on public.profiles (target_scope);

-- 1b) Relasi ke Supabase Auth (idempoten).
--     Kunci sandi TIDAK pernah disimpan di profiles/user_progress — password
--     berada di auth.users (encrypted_password) dan ditangani sepenuhnya Supabase.
do $$
begin
	if not exists (
		select 1 from pg_constraint
		where conname = 'profiles_id_auth_fk' and conrelid = 'public.profiles'::regclass
	) then
		alter table public.profiles
			add constraint profiles_id_auth_fk
			foreign key (id) references auth.users (id) on delete cascade;
	end if;

	if not exists (
		select 1 from pg_constraint
		where conname = 'user_progress_user_id_auth_fk' and conrelid = 'public.user_progress'::regclass
	) then
		alter table public.user_progress
			add constraint user_progress_user_id_auth_fk
			foreign key (user_id) references auth.users (id) on delete cascade;
	end if;
end $$;

-- 1c) Rentang bab mengikuti konten 7 bab per scope.
do $$
begin
	if not exists (
		select 1 from pg_constraint
		where conname = 'user_progress_bab_number_check' and conrelid = 'public.user_progress'::regclass
	) then
		alter table public.user_progress
			add constraint user_progress_bab_number_check check (bab_number between 1 and 7);
	end if;
end $$;

do $$
begin
	if not exists (
		select 1 from pg_constraint
		where conname = 'bab_modules_bab_number_check' and conrelid = 'public.bab_modules'::regclass
	) then
		alter table public.bab_modules
			add constraint bab_modules_bab_number_check check (bab_number between 1 and 7);
	end if;
end $$;

-- 2) Auto-buat profil saat user baru mendaftar (email/password maupun OAuth)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, password_hash, full_name, target_scope, avatar_url)
  values (
    new.id,
    new.email,
    nullif(new.encrypted_password, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'target_scope', ''),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update set
    email         = excluded.email,
    password_hash = coalesce(excluded.password_hash, public.profiles.password_hash),
    avatar_url    = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    updated_at    = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2b) Sinkronkan password_hash (dan email) bila sandi diubah lewat Supabase Auth
--     (reset password / ganti password / konfirmasi email).
create or replace function public.handle_auth_user_updated()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
     set password_hash = nullif(new.encrypted_password, ''),
         email         = new.email,
         updated_at    = now()
   where id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row
  when (old.encrypted_password is distinct from new.encrypted_password
        or old.email is distinct from new.email)
  execute function public.handle_auth_user_updated();

-- 3) Row Level Security
alter table public.profiles     enable row level security;
alter table public.user_progress enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "user_progress_select_own" on public.user_progress;
create policy "user_progress_select_own" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "user_progress_insert_own" on public.user_progress;
create policy "user_progress_insert_own" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "user_progress_update_own" on public.user_progress;
create policy "user_progress_update_own" on public.user_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "user_progress_delete_own" on public.user_progress;
create policy "user_progress_delete_own" on public.user_progress
  for delete using (auth.uid() = user_id);

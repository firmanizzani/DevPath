-- ============================================================
-- DevPath — Skema Supabase (PostgreSQL)
-- Selaras dengan Drizzle ORM (api/src/db/schema.ts).
-- Jalankan di Supabase SQL Editor, atau otomatis via:
--   cd api && bun run db:push
-- Lalu isi konten: bun run db:seed
-- ============================================================

create table if not exists scopes (
    id           varchar(64) primary key,
    title        varchar(128) not null,
    category     varchar(64)  not null,
    description  text         not null,
    icon_name    varchar(64)  not null,
    est_time     varchar(32)  not null default '~4 Jam',
    popularity   integer      not null default 0,
    difficulty   integer      not null default 3,
    created_at   timestamptz  not null default now()
);

create table if not exists bab_modules (
    id              serial primary key,
    scope_id        varchar(64) not null references scopes(id) on delete cascade,
    bab_number      integer     not null,
    title           varchar(255) not null,
    subtitle        varchar(128),
    explanation     text        not null,
    sections        jsonb,
    code_snippet    text,
    code_lang       varchar(32),
    code_caption    text,
    image_url       text,       -- URL aset dari Supabase Storage (learning-assets)
    diagram         varchar(32),
    diagram_caption text,
    key_points      jsonb       not null,
    created_at      timestamptz not null default now(),
    constraint bab_modules_scope_bab_key unique (scope_id, bab_number),
    constraint bab_modules_bab_number_check check (bab_number between 1 and 7)
);

create table if not exists quiz_questions (
    id                    serial primary key,
    question_key          varchar(96) not null unique,
    bab_id                integer not null references bab_modules(id) on delete cascade,
    position              integer not null default 0,
    question              text    not null,
    image_url             text,
    code                  text,
    code_lang             varchar(32),
    code_caption          text,
    options               jsonb   not null, -- ["Opsi A","Opsi B","Opsi C","Opsi D"]
    correct_answer_index  integer not null, -- 0..3
    explanation           text    not null,
    created_at            timestamptz not null default now()
);

create index if not exists bab_modules_scope_idx     on bab_modules (scope_id);
create index if not exists quiz_questions_bab_idx    on quiz_questions (bab_id);

-- Migrasi idempoten untuk database lama (rentang bab 1-7 + FK ke auth.users)
-- ada di auth.sql — diterapkan lewat `bun run db:policies`.
-- Catatan: indeks progres pengguna sudah tercakup oleh unique index
--   user_progress_user_scope_bab_uq (user_id, scope_id, bab_number)
-- di auth.sql.

-- ============================================================
-- Supabase Storage: buat bucket `learning-assets` (public)
-- lalu unggah diagram/soal, URL-nya:
--   https://<PROJECT-REF>.supabase.co/storage/v1/object/public/learning-assets/<nama-file>.png
-- ============================================================
-- insert into storage.buckets (id, name, public)
-- values ('learning-assets', 'learning-assets', true)
-- on conflict (id) do nothing;

-- Row Level Security: konten bersifat publik (baca saja, tanpa login)
alter table scopes        enable row level security;
alter table bab_modules   enable row level security;
alter table quiz_questions enable row level security;

create policy "public read scopes"        on scopes        for select using (true);
create policy "public read bab_modules"   on bab_modules   for select using (true);
create policy "public read quiz_questions" on quiz_questions for select using (true);

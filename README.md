# DevPath — Interactive IT Learning & Career Roadmap Platform

Platform belajar IT terbuka untuk pemula: **Pilih Scope → Baca Materi → Kerjakan Kuis (10 soal) → Lihat Skor → raih ≥ 70 untuk unlock Bab Berikutnya**.
100% gratis — mulai tanpa login (progres di LocalStorage), atau **buat akun gratis** supaya progres tersinkron ke semua perangkat.

![scope](devpath/src/lib/assets/favicon.svg)

## Fitur

- **7 Career Paths × 7 Bab = 49 modul** (Software Engineer, UI/UX Designer, Frontend, Backend, Data Analyst, Cloud, Network) dengan **490 soal kuis** (10 soal per bab).
- **Katalog interaktif**: hero + statistik, filter kategori (`All Scope / Engineering & Dev / Data & Network / Desain`), sorting, pencarian, progress bar per kartu.
- **Roadmap node view**: 7 node per alur, bab terbuka/terkunci otomatis — bab berikutnya terbuka bila kuis bab sebelumnya meraih **skor ≥ 70 (7 dari 10 benar)**; di bawah itu bab tetap terkunci dan kuis bisa diulang.
- **Material reader**: penjelasan ringkas, **1 visual SVG per bab** (49 diagram relevan dengan `alt` + caption “Gambar N.1”), blok kode dengan syntax highlighting (Prism.js), 3 poin kunci, tombol “Lanjut ke Kuis”.
- **Interactive quiz**: 10 soal pilihan ganda per bab dengan paginasi nomor 1–10, semua jawaban dikumpulkan sekaligus di akhir (kunci jawaban baru terlihat di halaman hasil), hitung XP & akurasi, navigasi keyboard (`Enter` / `1-4` / `←` `→`).
- **Hasil kuis**: ring skor, kartu statistik, lencana, **status unlock bab berikutnya** (lulus ≥ 70 vs terkunci), dan tinjauan lengkap tiap pertanyaan beserta pembahasan.
- **Dark/Light mode** di seluruh halaman termasuk `/login` & `/register`, responsif (mobile–desktop), animasi View Transitions antar halaman.
- **Auth & sinkronisasi progres** (opsional): Supabase Auth dengan email/password + **Login via Google**, halaman `/login`, `/register`, `/pengaturan` (edit profil, ganti password, target scope, zona berbahaya), state tamu/terautentikasi di Header, dan sinkronisasi dua arah LocalStorage ↔ tabel `user_progress` — tetap bisa dipakai tanpa akun.

## Tech Stack

| Lapisan | Teknologi |
|---|---|
| Frontend | **SvelteKit 2 + Svelte 5**, **Tailwind CSS 4**, **Lucide (Svelte)**, **Prism.js** |
| Backend API | **Elysia.js** di atas **Bun Runtime** |
| Database & Storage | **Supabase** (PostgreSQL + Storage) via **Drizzle ORM** (postgres-js) |
| Autentikasi | **Supabase Auth** (`@supabase/supabase-js` + `@supabase/ssr`) — email/password & Google OAuth |
| State/Progress | **LocalStorage** (tanpa wajib login) + **`user_progress` di Supabase** saat sudah masuk |
| Desain | Obsidian Synth — palet obsidian, aksen semantik emerald/cyan/amber/crimson, Geist + JetBrains Mono |

## Struktur Proyek

```
eduweb/
├── devpath/                  # Frontend SvelteKit
│   ├── scripts/              # validate-data.ts, visual-audit.ts + diagrams/{lib,specs}.ts, skrip QA
│   ├── static/diagrams/      # 49 visual SVG per bab (dihasilkan visual-audit.ts)
│   └── src/
│       ├── lib/components/   # Header, ScopeCard, CodeBlock, Diagram, RichText, dll.
│       ├── lib/data/         # 49 modul (7 file per scope, 490 soal) + tipe data
│       ├── lib/services/     # progress.ts (LocalStorage), progressSync.ts (cloud), content.ts, result.ts
│       ├── hooks.server.ts   # sesi Supabase (SSR) → locals.supabase / locals.user
│       └── routes/           # /, /progres, /tentang, /roadmap/[scope],
│                             # /belajar/[scope]/[bab], /kuis/[scope]/[bab], /hasil/[scope]/[bab],
│                             # /login, /register, /pengaturan, /auth/callback (OAuth)
├── api/                      # Backend Elysia (Bun) + Drizzle ORM
│   └── src/
│       ├── index.ts          # endpoint REST + /api/progress (butuh Bearer token)
│       ├── repository.ts     # Supabase (Drizzle) → fallback konten lokal
│       ├── db/schema.ts      # tabel scopes, bab_modules, quiz_questions,
│                             #          profiles, user_progress
│       └── seed.ts           # sinkronkan konten lokal ke Supabase
├── supabase/schema.sql       # DDL konten untuk Supabase SQL Editor
└── supabase/auth.sql         # DDL auth: profiles, user_progress, trigger, RLS
```

## Menjalankan

Prasyarat: Node.js 22.12+ (atau versi LTS lebih baru yang kompatibel), npm, dan Bun untuk API serta validasi data.
Gunakan `npm ci` di `devpath/` dan `bun install --frozen-lockfile` di `api/` untuk memasang dependency sesuai lockfile.

## Persiapan GitHub

Repository Git berada di root `eduweb/`, mencakup `devpath/`, `api/`, dan `supabase/`.
Folder `stitch/`, dependency, hasil build, file sementara `api/tmp-*`, dan seluruh `.env` lokal
diabaikan oleh `.gitignore`. Template `.env.example` dan kedua lockfile tetap disertakan.
Setelah clone, salin template `.env.example` ke `.env` pada masing-masing aplikasi bila diperlukan.

Sebelum commit, jalankan pemeriksaan berikut:

```sh
cd devpath
npm run check
npm run validate:data
npm run build
cd ../api
bun run typecheck
cd ..
git add .
git diff --cached --stat
git diff --cached --name-only
```

Periksa daftar file yang akan di-commit, lalu jalankan `git commit` dan hubungkan remote GitHub
sesuai repository tujuan. Jangan gunakan `git add -f` untuk file yang diabaikan.

## Setup lokal

### Pemeriksaan database otomatis (GitHub Actions)

Workflow `.github/workflows/supabase-health.yml` membaca maksimal satu ID dari masing-masing
tabel `scopes`, `bab_modules`, dan `quiz_questions`, setiap hari pukul **09.17 WIB (02.17 UTC)**.
Pemeriksaan ini memastikan Data API dan akses baca tabel berfungsi, serta menghasilkan aktivitas
database tanpa mengubah materi atau progres pengguna. Request yang gagal membuat workflow gagal.

Setelah repository di-push ke GitHub:

1. Buka **Settings → Secrets and variables → Actions → New repository secret**.
2. Tambahkan `SUPABASE_URL` dan `SUPABASE_ANON_KEY`, sesuai nilai pada `api/.env`
   (atau `PUBLIC_SUPABASE_URL` dan `PUBLIC_SUPABASE_ANON_KEY` pada `devpath/.env`).
   Gunakan anon/public key; tidak perlu password database atau service-role key.
3. Pastikan workflow ada di default branch, kemudian buka **Actions → Supabase database health → Run workflow**
   untuk verifikasi awal. Aktifkan GitHub Actions bila repository memintanya.

Workflow belum berjalan hanya dengan dibuat secara lokal. Jadwal aktif setelah push ke default branch
dan konfigurasi secrets selesai. Jadwal GitHub Actions dapat terlambat; pada repository publik,
workflow terjadwal dapat dinonaktifkan setelah 60 hari tanpa aktivitas repository.

Supabase Free menilai kecukupan aktivitas database selama tujuh hari; pemeriksaan ini tidak menjamin
proyek tidak akan di-pause. Jika proyek sudah di-pause, resume dahulu melalui Supabase Dashboard.
Lihat [aturan pausing Supabase](https://supabase.com/docs/guides/platform/free-project-pausing)
dan [aturan jadwal GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

### 1. Frontend

```bash
cd devpath
npm install
npm run dev          # http://localhost:5173
```

### 2. Backend API (Bun + Elysia)

```bash
cd api
bun install
bun run dev          # http://localhost:3001
```

Tanpa `DATABASE_URL`, API otomatis menyajikan konten lokal — frontend tetap berjalan penuh.

### 3. Supabase + Drizzle ORM

1. Buat project di [Supabase](https://supabase.com), salin **Database URI** (Settings → Database → Connection string).
2. Isi `api/.env` dari `api/.env.example`:

   ```env
   DATABASE_URL=postgresql://postgres.[REF]:[PASSWORD]@aws-0.xx.pooler.supabase.com:6543/postgres?sslmode=require
   PORT=3001
   ```

3. Buat tabel + isi konten:

   ```bash
   cd api
   bun run db:push      # buat tabel dari Drizzle schema  (atau jalankan supabase/schema.sql)
   bun run db:seed      # sinkronkan 49 modul & 490 soal (konten lama otomatis diganti)
   bun run dev
   ```

4. (Opsional) buat bucket Storage publik `learning-assets` untuk gambar/diagram, lalu isi kolom `image_url`.

Frontend memakai API jika `PUBLIC_API_URL` terisi (lihat `devpath/.env.example`); jika API mati, otomatis fallback ke konten lokal sehingga aplikasi tidak pernah blank.

### 4. Supabase Auth (login + sinkronisasi progres)

Semua fitur belajar tetap jalan **tanpa** langkah ini; dengan auth, pengguna bisa login dan progresnya tersinkron antar perangkat.

1. Isi `devpath/.env` dari `devpath/.env.example`:

   ```env
   PUBLIC_API_URL=http://localhost:3001
   PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
   PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...   # Settings → API → anon public
   ```

   dan di `api/.env` tambahkan `SUPABASE_URL` + `SUPABASE_ANON_KEY` (dipakai untuk memverifikasi token).

2. Buat tabel auth + RLS:

   ```bash
   cd api
   bun run db:policies      # menjalankan supabase/auth.sql
   ```

   Ini membuat tabel `profiles` (id ↔ `auth.users`, nama, target scope) dan `user_progress`
   (unik per `user_id + scope_id + bab_number`), trigger auto-profil saat signup, kebijakan RLS
   *read/write milik sendiri*, **FK `profiles.id` & `user_progress.user_id` → `auth.users(id)`**,
   serta CHECK rentang `bab_number 1–7` (migrasi idempoten untuk database lama).

   *Catatan sandi: sumber kebenaran tetap `auth.users.encrypted_password`; kolom
   `profiles.password_hash` hanya **salinan hash** yang diisi/di-sync otomatis oleh trigger
   `on_auth_user_created` & `on_auth_user_updated` (signup, ganti sandi, reset sandi).
   Form **Ganti Password** di `/pengaturan` memanggil `supabase.auth.updateUser({ password })`
   lalu hash-nya otomatis tercatat di `profiles.password_hash` — teks polos tidak pernah
   disimpan di database.*

3. Aktifkan **Login dengan Google** (dua langkah: buat kredensial dulu, baru aktifkan di Supabase):

   **A. Google Cloud Console** — buat OAuth Client ID

   1. Buka [Google Cloud Console](https://console.cloud.google.com) → buat/pilih project.
   2. **APIs & Services → OAuth consent screen**: pilih *External*, isi App name + Support email,
      simpan. Di **Scopes** tambahkan `email` dan `profile` (wajib), lalu di **Test users** tambahkan
      email Google kamu (selama status *Testing*, hanya user terdaftar yang boleh login).
   3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
      - Application type: **Web application**
      - Name: bebas (mis. `DevPath`)
      - **Authorized JavaScript origins**: `http://localhost:5173` (+ domain produksi bila ada)
      - **Authorized redirect URIs** (wajib persis, ini milik **Supabase**, bukan aplikasi):
        `https://[PROJECT-REF].supabase.co/auth/v1/callback`
        (untuk project ini: `https://kzichpxgptpgxzgqnclu.supabase.co/auth/v1/callback`)
      > Jangan memasukkan `http://localhost:5173/auth/callback` di sini — itu menyebabkan
      > error Google **400 redirect_uri_mismatch**. URI localhost didaftarkan di Supabase (langkah B.2).
   4. Salin **Client ID** dan **Client Secret**.

   **B. Supabase Dashboard** — aktifkan providernya

   1. [Dashboard Supabase](https://supabase.com/dashboard) → project kamu →
      **Authentication → Providers → Google**: toggle *Enable*, tempel Client ID & Client Secret, **Save**.
   2. **Authentication → URL Configuration** (di sinilah `localhost` didaftarkan):
      - Site URL: `http://localhost:5173`
      - Redirect URLs: tambahkan `http://localhost:5173/auth/callback` (+ URL produksi)
   3. Cek: `GET https://<REF>.supabase.co/auth/v1/settings` seharusnya menampilkan
      `"google": true` (sebelumnya `false`).

   *Sementara provider belum aktif, tombol “Masuk dengan Google” menampilkan pesan langkah
   aktivasinya alih-alih error mentah (`Unsupported provider`). Begitu diaktifkan, alur OAuth
   (PKCE → `/auth/callback` → redirect `?next=/progres`) langsung jalan tanpa perubahan kode.*

4. Catatan perilaku: pendaftaran email/password default masih menunggu konfirmasi email
   (sesi baru terbentuk setelah dikonfirmasi). Untuk menguji lokal, konfirmasi manual dari
   SQL Editor: `update auth.users set email_confirmed_at = now() where email = '...';`

5. Sinkronisasi: saat login, isinya LocalStorage di-*merge* dengan tabel `user_progress`
   (union, skor tertinggi menang), lalu tiap kuis yang selesai di-push ke API
   `POST /api/progress/complete` dengan `Bearer` token. Tanpa login — fallback LocalStorage murni.

## Visual Materi (49 Diagram SVG)

Setiap bab punya tepat satu visual di `devpath/static/diagrams/<scope>-b<bab>.svg`, dirujuk lewat
kolom `image_url` dan dirender sebagai `<figure>` + `<img alt>` + `<figcaption>` di halaman
`/belajar/[scope]/[bab]` (fallback ke komponen `Diagram` bila `image_url` kosong).

- **Spesifikasi**: `devpath/scripts/diagrams/specs.ts` — 49 entri (slug, caption “Gambar N.1”, isi diagram).
- **Renderer**: `devpath/scripts/diagrams/lib.ts` — flow, flowchart, ladder, matrix, arsitektur, ERD/kelas,
  states, tree, cards, structure, chart (curves/trio/gauges/bell), dan mockup (compare/grid/layout/devices/dashboard),
  semua palet gelap 960×540 agar konsisten di tema terang & gelap.
- **Generate + patch**: `bun run scripts/visual-audit.ts` (devpath) — menulis 49 file SVG lalu memperbarui
  `image_url` & `diagram_caption` di `src/lib/data/modules/*.ts`. Jalankan lagi bila spesifikasi diubah,
  lalu `npm run validate:data`, `npm run check`, dan `bun run db:seed` (api) untuk sinkron ke Supabase.
- **Validasi**: `npm run validate:data` mewajibkan tiap visual punya `diagram_caption` dan `image_url`
  berformat `/diagrams/<slug>.svg`.

## Endpoint API (Elysia)

| Method | Path | Keterangan |
|---|---|---|
| GET | `/health` | status + sumber data (`supabase(drizzle)` / `local`) |
| GET | `/api/scopes`, `/api/scopes/:id` | daftar scope |
| GET | `/api/scopes/:id/modules` | daftar bab satu scope (dengan `status` & `score` bila ada Bearer) |
| GET | `/api/scopes/:id/modules/:bab` | detail bab + kuis lengkap (rentang bab 1–7) |
| GET | `/api/modules/:babId/quiz` | kuis **tersanitasi** — tanpa `correct_answer_index` & `explanation` |
| POST | `/api/modules/:babId/submit` | `{ answers: number[] }` → `{ score, correct, total, passed, review }`; dengan token & skor ≥ 70 hasil disimpan ke `user_progress` |
| GET | `/api/search?q=` | pencarian scope |
| GET/POST/DELETE | `/api/progress*` | progres pengguna (wajib `Authorization: Bearer <supabase access token>`) |

Penilaian disimpan di server bila token valid dan skor ≥ 70; frontend tetap menilai lokal
sebagai fallback sehingga kuis tetap berfungsi saat API mati.

## Skrip Berguna

| Perintah | Fungsi |
|---|---|
| `npm run dev` (devpath) | jalankan frontend |
| `npm run build` / `preview` | build & preview produksi |
| `npm run check` | svelte-check (typecheck) |
| `npm run validate:data` | validasi struktur 49 modul & 490 soal (7 bab × 10 soal) + caption/`image_url` visual |
| `bun run scripts/visual-audit.ts` (devpath) | generate 49 SVG ke `static/diagrams/` + patch `image_url`/`diagram_caption` |
| `node scripts/shot-svg.mjs` (devpath, server menyala) | screenshot beberapa SVG ke folder sementara untuk QA visual |
| `node scripts/smoke-expansion.mjs` (devpath, server menyala) | E2E smoke: tema, roadmap 7 bab, kuis 10 soal, ambang ≥ 70 |
| `bun run dev` (api) | jalankan API (watch) |
| `bun run typecheck` | typecheck API |
| `bun run db:push` / `db:seed` | migrasi & seeding Supabase (seed mengganti seluruh konten bab/kuis) |
| `bun run db:policies` | jalankan `supabase/auth.sql` (profiles, user_progress, RLS, FK auth, CHECK bab 1–7) |

## Sumber Konten

Seluruh materi berada di `devpath/src/lib/data/modules/*.ts` — strukturnya identik dengan tabel
`scopes`, `bab_modules`, dan `quiz_questions` di Supabase, sehingga mudah diubah atau dipindah ke database.

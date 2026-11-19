# DevPath — Frontend

SvelteKit 2 + Svelte 5 + Tailwind CSS v4 + `@lucide/svelte` + Prism.js.

Setup lengkap, struktur folder, dan kontrak data ada di [README.md](../README.md) di root repo.

## Perintah

```sh
npm install
npm run dev        # http://localhost:5173
npm run check      # svelte-check (harus 0 error, 0 warning)
npm run build      # build produksi
npm run preview    # preview build
```

## Lingkungan

Salin `.env.example` menjadi `.env` bila perlu:

```
PUBLIC_API_URL=http://localhost:3001
```

Tanpa API yang berjalan, katalog & materi tetap tampil dari data lokal yang di-bundle.

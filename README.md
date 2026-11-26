# SmartLab Coding Library — Admin Edition

Versi permulaan: GitHub Pages + Supabase, satu akaun admin. Pelajar tidak memerlukan akaun. Website belum dihoskan dan perlu konfigurasi projek sendiri.

## 1 — Supabase
1. Daftar di https://supabase.com/dashboard dan buat projek baharu. Pilih pelan Free jika sesuai. Simpan password database secara peribadi.
2. Authentication > Users > Add user > Create user. Cipta akaun email/password admin, dan aktifkan auto-confirm jika ditawarkan. Salin User UID (UUID), bukan email. Jangan kongsi password.
3. Dalam tetapan Authentication, tutup pendaftaran pengguna awam (Allow new users to sign up). Admin tunggal dicipta secara manual melalui dashboard.
4. Buka setup.sql dan ganti `00000000-0000-0000-0000-000000000000` dengan User UID admin. Dalam SQL Editor > New query, tampal keseluruhan SQL dan tekan Run sekali sahaja. Ini untuk projek baharu; jangan jalankan semula pada jadual yang sudah wujud. Jadual experiments, RLS, fungsi semakan admin dan contoh LED akan dicipta.
5. Ambil Project URL daripada Connect atau tetapan projek, dan Publishable key daripada Settings > API Keys. Edit config.js. Jangan gunakan secret key atau service_role key dalam website. Publishable key memang boleh dilihat umum; RLS mengawal capaian data.

## 2 — GitHub Pages
1. Cipta repositori Public `smartlab-coding` di https://github.com/new atau gunakan repositori versi asas. Jika menggantikan versi asas, simpan backup terlebih dahulu.
2. Upload semua fail daripada folder ini ke root repositori (index.html, admin.html, config.js, style.css, public.js, admin.js; README dan SQL adalah opsyenal untuk upload). Pastikan fail tidak berada dalam subfolder tambahan. Commit changes.
3. Settings > Pages > Deploy from a branch > main > /(root) > Save. Tunggu status deployment berjaya.
4. Buka URL GitHub Pages yang diberikan. Contoh: https://USERNAME.github.io/smartlab-coding/ . Halaman pelajar di index.html, admin di admin.html.

## 3 — Guna admin
Login menggunakan email/password yang dicipta. Pilih Add, isi tajuk, board, kategori, penerangan, filename (contohnya LED_Blink.ino), dan coding. Tanda Publish untuk memberi akses awam; jika tidak, simpan sebagai draft. Selepas Save, QR dijana daripada URL website dan UUID coding. Download QR PNG. Edit rekod sedia ada untuk mengekalkan UUID. Padam rekod atau unpublish akan menyebabkan QR lama tidak dapat memaparkan coding.

## 4 — Ujian sebelum cetak QR
- Buka halaman pelajar dalam private/incognito: contoh LED muncul tanpa login.
- Login admin, tambah draft, semak draft tidak muncul dalam incognito.
- Publish draft, buka semula halaman pelajar, semak copy dan download.
- Scan QR melalui telefon lain menggunakan internet; URL mesti menggunakan HTTPS GitHub Pages sebenar.
- Edit tajuk/coding tanpa memadam rekod, kemudian scan QR lama.
- Unpublish, semak coding tidak boleh dibaca secara awam walaupun melalui URL terus.
- Jika menguji akaun bukan admin (dicipta secara manual), semak akaun itu tidak boleh login ke panel atau menulis jadual; hapus akaun ujian selepas selesai.

## Nota
- Semua coding published adalah awam, termasuk melalui API. QR bukan kawalan akses. Jangan simpan rahsia, password Wi-Fi atau API key peribadi dalam coding yang diterbitkan.
- Pelan Supabase Free boleh dipause selepas kira-kira seminggu aktiviti database yang tidak mencukupi. Semak dashboard sebelum kelas. Untuk modul yang mesti sentiasa tersedia, pertimbangkan pelan berbayar atau static export.
- Versi awal memuatkan senarai coding sekaligus dan sesuai untuk library kecil; jika menghampiri had respons Supabase (lazimnya 1000 rekod), tambah pagination dan muat kod secara on-demand.
- Library Supabase JS dan QRCodeJS dimuat dari CDN; sambungan internet diperlukan. Untuk deployment produksi, pin versi yang telah diuji dan pertimbangkan self-hosting aset.
- Fail JavaScript telah diperiksa sintaks dengan Node.js. Sambungan Supabase, polisi RLS sebenar, QR pada telefon dan deployment belum diuji end-to-end kerana projek/akaun pengguna belum dikonfigurasi.

Rujukan: https://supabase.com/docs/guides/getting-started/api-keys ; https://supabase.com/docs/guides/database/postgres/row-level-security ; https://docs.github.com/en/pages/quickstart

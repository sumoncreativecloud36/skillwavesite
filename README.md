# SkillWave — Bangla E-Learning Platform

Full-stack React + Tailwind + Supabase platform with a public homepage and protected admin CMS.

---

## 1. Local setup

```bash
npm install
cp .env.example .env       # then fill in your Supabase URL + anon key
npm run dev
```

Open http://localhost:5173 — homepage. Admin login at http://localhost:5173/admin/login

---

## 2. Supabase setup

1. Create a project at https://supabase.com
2. **SQL Editor → New Query**: paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and run.
   - Creates tables: `settings`, `courses`, `ebooks`, `reviews`, `sections`
   - Enables RLS with public-read / authenticated-write policies
   - Creates the public storage bucket `skillwave` with proper policies
   - Seeds default sections and hero text
3. **Authentication → Users → Add user** (email + password). This is your admin account.
4. **Project Settings → API**: copy
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

---

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial SkillWave commit"
git branch -M main
git remote add origin https://github.com/<you>/skillwave.git
git push -u origin main
```

---

## 4. Deploy to Vercel

1. https://vercel.com → **Add New Project** → import the GitHub repo.
2. Framework preset: **Vite** (auto-detected). Build cmd `npm run build`, output `dist`.
3. **Environment Variables** (add both for Production + Preview):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. The `vercel.json` SPA rewrite ensures `/admin/...` routes work.

---

## 5. First login as admin

Visit `https://your-app.vercel.app/admin/login` and sign in with the user you created in step 2.3. The sidebar gives you 6 panels:

| Panel | What it controls |
|---|---|
| ব্র্যান্ডিং | Logo + tagline |
| হিরো ব্যানার | Headline, description, image, badge, CTA buttons |
| কোর্স | Courses CRUD + featured/bestseller toggles |
| ই-বুক | E-books CRUD |
| রিভিউ | Reviews — add, approve/hide, delete |
| সেকশন সেটিংস | Per-section heading / subtitle / visibility |

All images uploaded from the admin panel land in the `skillwave` Supabase storage bucket and are referenced by public URL.

---

## 6. Project structure

```
src/
├── components/    # Navbar, Hero, Footer, Cards, Icons
├── pages/         # Home, AdminLogin, AdminDashboard
├── admin/         # 6 panels + RequireAuth + UI helpers
├── context/       # SiteContext (settings + sections)
├── lib/           # supabase client + uploadFile helper
└── index.css      # Tailwind layers + brand utility classes
supabase/schema.sql  # Run this in Supabase SQL editor
```

## 7. Brand tokens

Defined in [`tailwind.config.js`](tailwind.config.js) and [`src/index.css`](src/index.css). Page is locked to dark mode — no white backgrounds anywhere. Cyan `#00D4FF` is the only accent; gradients (`#00D4FF → #1E3A8A` for buttons, `#00D4FF → #FFFFFF` for headings) are used sparingly per spec.

# CareerForge Pro — Vercel Frontend Deployment Guide

This guide deploys the **frontend** (Vite + React) to **Vercel** and connects it to the **backend** already running on **Render**.

- **Backend (Render):** `https://carrerforgepro2-2.onrender.com`
- **Frontend (Vercel):** `https://carrer-forge-pro2.vercel.app` (created during deploy)

---

## 1. What was configured

| File | Purpose |
|------|---------|
| [`frontend/vercel.json`](frontend/vercel.json:1) | Tells Vercel this is a Vite project, sets build/output commands, and rewrites all routes to `index.html` for SPA (React Router) navigation. |
| [`frontend/.env.production`](frontend/.env.production:1) | Production env injected at build time. Sets `VITE_API_URL` to the Render backend and the Clerk publishable key. |
| [`server/index.js`](server/index.js:13) | Updated CORS to allow any `*.vercel.app` origin plus the `CLIENT_URL` env var, so the deployed frontend can call the API. |

> ⚠️ `.env.production` is committed on purpose so Vercel's build picks it up. It contains **no secrets** — only the public Clerk publishable key and the public API URL. The Groq key lives only on the Render backend.

---

## 2. Deploy via the Vercel Dashboard (recommended)

You already have the import link:

```
https://vercel.com/new/import?framework=other&...&s=https://github.com/anandsagar2807/CarrerForgePro2
```

1. Open the link and sign in with GitHub.
2. **Repository:** `anandsagar2807/CarrerForgePro2` → click **Import**.
3. **Project Name:** `carrer-forge-pro2` (already prefilled).
4. **Framework Preset:** choose **Vite** (Vercel auto-detects it from [`frontend/vite.config.js`](frontend/vite.config.js:1)).
5. **Root Directory:** set to **`frontend`** (the app lives in this subfolder, not the repo root).
6. **Build Command:** `npm run build` (auto-filled by Vercel).
7. **Output Directory:** `dist` (auto-filled by Vercel).
8. **Install Command:** `npm install` (auto-filled by Vercel).
9. **Environment Variables** — add these in the Vercel UI (they override `.env.production` if you prefer not to commit it):

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://carrerforgepro2-2.onrender.com/api` |
   | `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_Z3Jvd2luZy1oYW1zdGVyLTk5LmNsZXJrLmFjY291bnRzLmRldiQ` |

10. Click **Deploy**. Vercel runs `npm install` → `npm run build` → serves `frontend/dist`.

After the first deploy, Vercel gives you a URL like `https://carrer-forge-pro2.vercel.app`.

---

## 3. Deploy via Vercel CLI (alternative)

If you prefer the terminal:

```bash
# install the CLI once
npm i -g vercel

# from the repo root
cd "c:/Users/ADMIN/Downloads/CarrerForge Pro"

# link + deploy the frontend subfolder
cd frontend
vercel          # follow prompts (link to project "carrer-forge-pro2")
vercel --prod   # promote to production
```

When prompted, set:
- Framework: **Vite**
- Root: **frontend** (current dir)
- Build: `npm run build`
- Output: `dist`

Add env vars via CLI:
```bash
vercel env add VITE_API_URL production
vercel env add VITE_CLERK_PUBLISHABLE_KEY production
```

---

## 4. Update the Render backend (one-time)

So the backend allows the new Vercel origin, set this environment variable on your **Render** web service:

| Key | Value |
|-----|-------|
| `CLIENT_URL` | `https://carrer-forge-pro2.vercel.app` |

> The updated [`server/index.js`](server/index.js:13) already allows **any** `*.vercel.app` domain (including preview deployments), so even without `CLIENT_URL` set it will work. Setting `CLIENT_URL` is still recommended for explicit allow-listing.

After changing the env var on Render, **redeploy** the Render service (Render usually auto-deploys on push, but env changes need a manual redeploy or a new commit).

Also make sure these are set on Render (they should already be):
- `MONGO_URI` / `MONGODB_URI`
- `JWT_SECRET`
- `GROQ_API_KEY`
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` (if payments are used)
- `CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` (if Clerk is used server-side)

---

## 5. Update Clerk allowed origins

In the [Clerk Dashboard](https://dashboard.clerk.com):
1. Go to **User & Authentication → Restrict sign-in URLs** (or **Domains**).
2. Add your production URL: `https://carrer-forge-pro2.vercel.app`
3. Add the Vercel preview pattern if needed: `https://carrer-forge-pro2-*.vercel.app`

This prevents Clerk from blocking auth redirects on the deployed domain.

---

## 6. Verify the deployment

1. Open `https://carrer-forge-pro2.vercel.app`.
2. The landing page should load.
3. Navigate to `/templates`, `/analyze`, etc. — routes should work without 404 (handled by the `rewrites` in [`vercel.json`](frontend/vercel.json:1)).
4. Open DevTools → Network. API calls should go to `https://carrerforgepro2-2.onrender.com/api/...` and return data (no CORS errors).
5. Test sign-in/sign-up via Clerk.

### Quick health check
```bash
curl https://carrerforgepro2-2.onrender.com/api/health
# => {"status":"ok","timestamp":"..."}
```

---

## 7. Common issues & fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Blank page / 404 on refresh | Missing SPA rewrite | Ensure [`vercel.json`](frontend/vercel.json:1) `rewrites` exist and Root Directory = `frontend`. |
| API calls hit `localhost:5001` | `VITE_API_URL` not set in Vercel env | Add `VITE_API_URL=https://carrerforgepro2-2.onrender.com/api` in Vercel project settings, then redeploy. |
| CORS error in console | Backend not allowing Vercel origin | Redeploy Render with updated [`server/index.js`](server/index.js:13) (allows `*.vercel.app`). |
| Clerk redirect loop / "not allowed" | Domain not in Clerk allow-list | Add the Vercel URL in Clerk Dashboard (step 5). |
| Build fails: "module not found" | Wrong root directory | Set Root Directory to `frontend` in Vercel. |
| First API request is slow | Render free tier sleeps | Render free web services spin down after inactivity; first request takes ~30-60s to wake. Upgrade Render or add a keep-alive ping. |

---

## 8. File summary

```
CarrerForge Pro/
├── frontend/
│   ├── vercel.json          ← NEW: Vite + SPA routing config
│   ├── .env.production      ← NEW: VITE_API_URL → Render backend
│   ├── vite.config.js
│   └── package.json
└── server/
    └── index.js             ← MODIFIED: CORS allows *.vercel.app
```

You're ready to deploy. 🚀

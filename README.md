# Terra & Co. — Product Catalog Capstone

A modular, production-ready e-commerce product catalog built with **React**, **React Router**, and **Vite**. Built as a full-stack web development capstone project: browsing, search/filter, a product detail view, and a persistent-during-session cart, all client-side routed and optimized for a fast production build.

**Live demo:** _add your deployed URL here once you've deployed (see below)_

---

## Features

- **Modular component architecture** — pages, reusable UI components, a data layer, and a cart context are cleanly separated (see [Project structure](#project-structure)).
- **Client-side routing** with `react-router-dom` — catalog, product detail (`/product/:id`), cart, and a 404 page, with no full page reloads between them.
- **Search + category filtering** on the catalog page.
- **Global cart state** via React Context + `useReducer` — add, remove, update quantity, clear.
- **Performance-optimized build**:
  - Route-based code splitting with `React.lazy` / `Suspense` (each page ships as its own chunk).
  - Vendor chunk splitting (`react`/`react-dom`/`react-router-dom` cached separately from app code).
  - Production minification via Vite/esbuild, gzip pre-compression via `vite-plugin-compression2`.
  - Lazy-loaded images (`loading="lazy"`) with explicit `width`/`height` to avoid layout shift.
- **Accessible by default** — skip link, visible keyboard focus, semantic landmarks, `aria` labels on icon-only controls, reduced-motion support.
- **Deploy-ready config** for Vercel, Netlify, and Render included out of the box.

---

## Tech stack

| Layer      | Choice                                  |
|------------|------------------------------------------|
| Framework  | React 18                                 |
| Routing    | React Router 6                           |
| Build tool | Vite 5                                   |
| Styling    | Plain CSS with design tokens (no framework lock-in) |
| State      | React Context + `useReducer` (cart)      |

No backend is required to run this project — product data lives in `src/data/products.js`. Swapping it for a real API is a one-file change (see [Connecting a real backend](#connecting-a-real-backend)).

---

## Project structure

```
terra-co-catalog/
├── index.html                # HTML shell, fonts, meta tags
├── vite.config.js            # Build + optimization config
├── vercel.json / netlify.toml / render.yaml   # Deploy configs (SPA rewrites)
├── public/
│   └── _redirects            # Netlify SPA fallback (drag-and-drop deploys)
└── src/
    ├── main.jsx               # Entry point, mounts <App /> in <BrowserRouter>
    ├── App.jsx                # Route table, lazy-loaded pages, layout shell
    ├── index.css              # Design tokens (colors, type, spacing) + globals
    ├── data/
    │   └── products.js        # Sample catalog data + getProductById()
    ├── context/
    │   └── CartContext.jsx    # Cart provider/reducer + useCart() hook
    ├── components/
    │   ├── Navbar.jsx / .css
    │   ├── Footer.jsx / .css
    │   ├── ProductCard.jsx / .css
    │   └── StockMeter.jsx / .css
    └── pages/
        ├── Home.jsx / .css         # Catalog grid, search, category filter
        ├── ProductDetail.jsx / .css
        ├── Cart.jsx / .css
        └── NotFound.jsx
```

---

## Getting started locally

Requires **Node.js 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload)
npm run dev

# 3. Open the printed local URL (usually http://localhost:5173)
```

Other scripts:

```bash
npm run build     # Production build -> dist/
npm run preview   # Serve the production build locally, to sanity-check before deploying
```

---

## Uploading this project to GitHub

If you're doing this for the first time, here's the full path from your folder to a public GitHub repo:

1. **Create a new repository on GitHub**
   Go to [github.com/new](https://github.com/new), name it (e.g. `terra-co-catalog`), leave it **empty** (don't add a README/gitignore there — you already have them), and click **Create repository**.

2. **Initialize git in this project folder** (skip if it's already a git repo):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Terra & Co. product catalog"
   ```

3. **Point it at your new GitHub repo and push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/terra-co-catalog.git
   git push -u origin main
   ```

4. Refresh your GitHub page — your code is live in the repo. The included `.gitignore` already excludes `node_modules/` and `dist/`, so your upload stays small and clean.

> Already have a repo and just want to push updates later?
> `git add . && git commit -m "your message" && git push`

---

## Deploying live

You only need to do **one** of these — pick whichever platform you prefer. All three configs are already included in the repo.

### Option A — Vercel (recommended, zero config)
1. Push the project to GitHub (see above).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite: build command `npm run build`, output directory `dist`. Click **Deploy**.
4. `vercel.json` in this repo already handles client-side routing, so refreshing `/product/p-01` or `/cart` won't 404.

### Option B — Netlify
1. Push to GitHub, then go to [app.netlify.com/start](https://app.netlify.com/start) and pick the repo.
2. Build command: `npm run build`. Publish directory: `dist`. (Already set in `netlify.toml`.)
3. Deploy. The included `public/_redirects` file also covers drag-and-drop deploys of just the `dist` folder, if you ever build locally and upload it manually instead.

### Option C — Render
1. Push to GitHub, then create a **New Static Site** at [dashboard.render.com](https://dashboard.render.com).
2. Connect the repo — Render will pick up `render.yaml` automatically (build command `npm install && npm run build`, publish path `dist`, with the SPA rewrite already configured).

After deploying on any platform, copy the live URL into the top of this README so reviewers can click straight through.

---

## Asset & performance optimization notes

This project is set up so the production build is optimized by default, but if you extend it, keep these in mind:

- **Images**: product photos are lazy-loaded and sized with explicit `width`/`height`. When you swap in real product photography, export it as **WebP** (or AVIF) and keep hero/catalog images under ~150KB — tools like [Squoosh](https://squoosh.app) or `vite-imagemin` can automate this.
- **Code splitting**: new pages should be added to `App.jsx` via `React.lazy(() => import('./pages/YourPage'))` so they get their own chunk instead of bloating the main bundle.
- **Fonts**: only the specific weights actually used are loaded (see `index.html`) — avoid loading a whole font family "just in case."
- **Bundle inspection**: run `npm run build` and check the printed chunk sizes; `vendor-*.js` (React + Router) should stay separate from your app code so it's cached across deploys.

---

## Connecting a real backend

Right now `src/data/products.js` exports a static array. To connect a real API:

1. Replace the `PRODUCTS` export with a `fetch()` call (e.g. inside a `useEffect` in `Home.jsx`, or a small `useProducts()` hook).
2. Keep `getProductById` shaped the same way so `ProductDetail.jsx` doesn't need to change.
3. Add a `.env` file for your API base URL (already excluded from git via `.gitignore`) and read it with `import.meta.env.VITE_API_URL`.

---

## License

This project was built as an educational/internship capstone. Feel free to reuse and adapt it for your own learning.

# LYXENE PARIS — Skincare E-Commerce

Monorepo containing the Lyxene skincare brand website.

## Structure

```
├── frontend/   → React + Vite (deployed on Vercel)
├── backend/    → Express + Stripe (deployed on Render)
```

## Frontend (Vercel)

```bash
cd frontend
npm install
npm run dev     # → http://localhost:3000
npm run build   # → Production build in dist/
```

## Backend (Render)

```bash
cd backend
cp .env.example .env   # Fill in your Stripe key
npm install
npm start              # → http://localhost:5000
```

## Environment Variables

### Backend (Render Dashboard)
| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key |
| `FRONTEND_URL` | Your Vercel deployment URL |
| `PORT` | Auto-set by Render |

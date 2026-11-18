# shibaco EU

European English storefront for **shibaco** — Shiba Inu motif apparel with hand silk-screen prints.

This project is a Docker + Vue fork of the Japan storefront, adapted for overseas customers (English UI, EUR display, international shipping copy).

## Stack

- Vue 3 + Vite 7
- Vue Router 4
- Bootstrap 5 + Sass
- Axios (`X-Shop-Code` when `VITE_SHOP_CODE` is set)
- Stripe Checkout (via backend / optional `server/`)
- Docker for the frontend dev server

## Setup

```bash
# Docker
docker compose up

# Or npm
npm install
npm run dev
```

App: **http://localhost:5173**

### Environment

| Variable | Description |
|----------|-------------|
| `VITE_SHOP_CODE` | Shop code sent as `X-Shop-Code` |
| `VITE_PROXY_TARGET` | Vite proxy target for `/api` (default `http://host.docker.internal:3001` in Docker) |
| `VITE_API_BASE_URL` | Optional Axios base URL |

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/products` | Product list |
| `/products/:id` | Product detail |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/checkout/success` | Payment success |
| `/contact` | Contact |
| `/brand-story` | Brand story |
| `/faq` | FAQ |
| `/shipping` | Shipping |
| `/returns` | Returns |
| `/privacy-policy` | Privacy |
| `/legal` | Legal notice |

## Notes for EU

- UI copy is English; prices display as `¥ … JPY`.
- Checkout uses First / Last name (no kana). Country/region still binds to the existing prefecture API field for compatibility.
- Shipping and returns copy assume international delivery to Europe.

# shibaco EU

European English storefront for **shibaco** — Shiba Inu motif apparel with hand silk-screen prints.

This project is a Docker + Vue fork of the Japan storefront, adapted for overseas customers (English UI, Japanese yen charged at checkout, international shipping copy).

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

Copy `.env.example` to `.env.local`.

| Variable | Description |
|----------|-------------|
| `VITE_SHOP_CODE` | Shop code sent as `X-Shop-Code` |
| `VITE_PROXY_TARGET` | Vite proxy target for `/api` during local dev and prerender |
| `VITE_API_BASE_URL` | Axios base URL. Set on Render to the ShopWorks origin (for example `https://shopworks.onrender.com`). Leave unset locally so requests stay on `/api` and the proxy is used. |
| `VITE_GA_MEASUREMENT_ID` | Optional. Defaults to `G-8108T1M9BS`. Loaded only after cookie consent. |
| `VITE_GOOGLE_ADS_ID` | Optional. Defaults to `AW-18390381994`. Loaded only after cookie consent. |

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

## Currency

Prices and Stripe charges are **Japanese yen (JPY)**. ShopWorks creates Checkout line items with `currency: "jpy"`. Do not switch the storefront to EUR until that API charges euros and product prices are stored in euros. The display format lives in `src/config/store.js` and `src/utils/money.js`.

## Shipping

Checkout quotes `GET /api/overseas_shipping?country_code=` and lists `GET /api/overseas_shippings`. A missing amount is “not available”, never “Free”. Free is shown only when the amount is 0.

ShopWorks checkout still prices shipping from Japanese prefectures and rejects a `shipping_fee` that does not match that calculation. Until that changes, a real overseas rate cannot be charged. See the launch notes in the pull request.

## Render

The live site is the static `dist/` build (`render.yaml`). `server/index.js` is an optional local Stripe sketch and is not what Render runs.

## Notes for EU

- UI copy is English. Checkout collects a given name, family name, and an ISO country. It does not ask for kana or a Japanese prefecture.
- Import VAT, duty, and carrier fees are DAP (paid by the recipient on delivery). Checkout requires that acknowledgement.
- Legal, privacy, and returns pages are templates. Rows marked “Seller to complete” are intentionally blank.

# shibaco EU

## Product
shibaco is a Shiba Inu–motif apparel brand that hand-prints garments with silk screen. This repository is the **European storefront** (English UI) for customers shopping from Europe.

## Users
European customers who love Shiba Inus and want understated, everyday apparel. Product options are garment colour and size only (no ink/print colour selection).

## Jobs
- Browse and filter products
- Configure colour / size and add to cart
- Checkout via Stripe
- Contact support; read shipping, returns, FAQ, privacy, and legal pages

## Positioning
Made-to-order silk-screen apparel. Quiet design that fits city life. Ships internationally to Europe.

## Platform
web

## Stack
Vue 3 + Vite + Bootstrap/Sass + Docker (copied from Japan storefront; adapted for EU copy and design)

## Constraints
- Keep brand name `shibaco` (lowercase)
- English-only UI
- Preserve existing routes, cart, and checkout API shapes where possible
- Japan-specific UX (kana, prefectures-as-Japan, Yamato-only, tokushoho framing) must be adapted for EU

## Open / inferred
- Exact EU domain and Stripe/live shop code may differ from Japan; `.env` may need a dedicated EU shop code
- Product prices from the API are numeric yen. The UI and Stripe checkout both use JPY until ShopWorks charges another currency

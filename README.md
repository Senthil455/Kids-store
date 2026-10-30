# Kids Store

A modern online store for children's clothing, built and maintained by [@Senthil455](https://github.com/Senthil455).

Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, MongoDB (Mongoose), Redis, TanStack Query, Zod, and a provider-neutral online payment gateway.

## Features

- Product catalog with variants, categories, filters and search
- Cart, coupons, wallet and checkout (online payment or cash on delivery)
- Login with password or SMS code, refresh-token sessions
- User dashboard: orders, tickets, comments, favorites, profile
- Admin panel: products, orders, users, coupons, articles, tickets, comments, site settings
- Automatic order checks (unpaid, stuck and delivered orders)

## Getting started

```bash
cp .env.example .env
npm install
npm run seed:admin -- +15551234567 YourPassword123!
npm run dev
```

MongoDB and Redis must be running. With Docker everything starts together:

```bash
docker compose up -d --build
```

## Environment

All settings live in `.env`. See [`.env.example`](.env.example) for the full list. The essentials are:

| Variable               | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `MONGO_URI`            | MongoDB connection string                         |
| `REDIS_HOST`           | Redis host (default `127.0.0.1`)                  |
| `REDIS_PORT`           | Redis port (default `6379`)                       |
| `ACCESS_TOKEN`         | Secret used to sign access tokens                 |
| `REFRESH_TOKEN`        | Secret used to sign refresh tokens                |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site                            |
| `NEXT_PUBLIC_API_URL`  | API base path (default `/api`)                    |
| `APP_TIMEZONE`         | Timezone for delivery messages (default `UTC`)    |
| `SMS_API_URL`          | SMS provider endpoint for OTP delivery            |
| `SMS_API_KEY`          | SMS provider API key                              |
| `PAYMENT_REQUEST_URL`  | Payment gateway endpoint that creates a payment   |
| `PAYMENT_VERIFY_URL`   | Payment gateway endpoint that verifies a payment  |
| `PAYMENT_START_URL`    | Hosted payment page prefix, used with `authority` |
| `PAYMENT_MERCHANT_ID`  | Merchant identifier issued by the gateway         |
| `PAYMENT_CALLBACK_URL` | URL the gateway redirects to after payment        |

When the SMS provider is not configured, OTP codes are printed to the server log in development. Online payments activate when `PAYMENT_REQUEST_URL`, `PAYMENT_VERIFY_URL` and `PAYMENT_START_URL` are set.

## Scripts

| Command              | Description                     |
| -------------------- | ------------------------------- |
| `npm run dev`        | Development server              |
| `npm run build`      | Production build                |
| `npm start`          | Run the production build        |
| `npm run lint`       | ESLint                          |
| `npm run typecheck`  | TypeScript check                |
| `npm run format`     | Prettier                        |
| `npm run seed:admin` | Create or promote an admin user |

## Project structure

- `src/app` - pages and API routes (`api/(public)`, `api/(user)`, `api/(admin)`)
- `src/components/modules` - shared components
- `src/components/template` - page sections
- `src/configs` - MongoDB and Redis connections
- `src/model` - Mongoose models
- `src/services/client` - React Query hooks
- `src/services/server` - business logic (admin, public, user, shared)
- `src/types` - TypeScript types
- `src/validators` - Zod schemas
- `src/utils` - helpers
- `scripts` - maintenance scripts such as the admin seed

## Order automation

Order checks run every `ORDER_SWEEP_MINUTES` (default 10) inside the server process. On serverless hosting, set `DISABLE_ORDER_SWEEPER=true` and call the cron endpoint instead:

```
*/10 * * * * curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://your-site/api/cron/orders
```

## Security

- Rate limiting on login, signup, SMS codes, password reset and public forms (Redis)
- Banned users are blocked on every request
- Changing the phone number requires an SMS code
- Changing or resetting the password signs out other devices
- Uploaded images are checked by file content

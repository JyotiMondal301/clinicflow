# Carewell Clinic & Pharmacy

A Next.js 14 App Router demo for clinic operations, patient records, prescription writing, pharmacy inventory, and billing. The interactive demo uses browser-session React state so it works without credentials. PostgreSQL/Prisma schema and seed, plus Supabase SSR client helpers, provide the persistence and auth starting point.

## Included

- Dashboard with appointment, patient, pharmacy, and billing summaries
- Patient directory with searchable EMR profile, visit history, active medication, and prescription entry
- Pharmacy stock view with batch/expiry signals and cart controls
- Prescription and invoice workflow with Zod + React Hook Form validation, live totals, stock deduction, and downloadable PDF
- PostgreSQL Prisma schema with relational records, foreign keys, batch stock, invoice line items, and audit log
- Supabase browser/server client helpers for cookie-based auth integration

## Requirements

- Node.js 20+
- PostgreSQL 14+ (or a Supabase project)

## Local setup

```bash
npm install
cp .env.example .env
```

Set `DATABASE_URL` and `DIRECT_URL` to your PostgreSQL connection strings. The Supabase URL and anon key are needed when you wire sign-in; the app demo itself does not require them.

```bash
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On PowerShell, copy env with `Copy-Item .env.example .env`.

## Demo access

The current UI opens directly into an Admin demo workspace. Use the role selector in the top bar to preview Admin, Doctor, or Pharmacist navigation context. There is no login screen and no password-based demo credential in this UI build. The seed creates these database identities for later Supabase Auth linking:

- `admin@carewell.demo` — Admin
- `doctor@carewell.demo` — Doctor

Create/confirm Auth users in your Supabase project and set each `User.authUserId` to the corresponding Supabase Auth UUID before enabling protected routes. Never treat client role state as authorization.

## Project structure

```text
app/
  dashboard/page.tsx       Clinic overview
  patients/page.tsx        Patient directory and EMR view
  pharmacy/page.tsx        Inventory and point of sale
  layout.tsx               App shell and metadata
components/
  app-shell.tsx            Navigation and workspace role preview
  clinic-provider.tsx      In-session demo state
  prescription-modal.tsx   Validated prescription, invoice, and PDF flow
  ui.tsx                   Shared cards, badges, and page headings
lib/
  demo-data.ts             Demo records
  prisma.ts                Prisma singleton
  supabase/                SSR and browser client constructors
  types.ts                 View types
prisma/
  schema.prisma            PostgreSQL relational model
  seed.ts                  Repeatable demo fixture seed
```

## Data and production integration

`prisma/schema.prisma` defines users, patients, appointments, visits/vitals, medicines, suppliers, medicine batches, stock movements, prescriptions/items, invoices/items, and audit records. The demo UI intentionally stores edits in React state and resets on refresh; `prisma` and Supabase helpers are not yet connected to the interactive actions. For a deployment, map Supabase Auth users to `User.authUserId`, enforce role checks in Server Actions/Route Handlers, and move invoice creation plus FEFO batch deduction into one Prisma transaction. Add database row-level security if any browser-side Supabase table access is introduced. Store secrets only in server environment variables.

`SUPABASE_SERVICE_ROLE_KEY` is reserved for trusted server-only administration. Do not expose it as a `NEXT_PUBLIC_*` value. No test suite is included in this starter.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — serve production build
- `npm run db:seed` — upsert sample users, patients, medicines, batches, and invoice

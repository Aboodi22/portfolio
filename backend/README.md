# Portfolio backend

Small Express API with one job: receive the contact form submissions from
the portfolio and store them in a Supabase (Postgres) database.

## 1. Create the database table

In your Supabase project, open the SQL editor and run:

```sql
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);
```

## 2. Configure environment variables

Copy `.env.example` to `.env` and fill in:
- `SUPABASE_URL` — Project Settings → API → Project URL
- `SUPABASE_KEY` — Project Settings → API → `service_role` key (keep this
  secret, it only lives on the backend, never in the frontend)

## 3. Run locally

```bash
npm install
npm run dev
```

The API will be available at `http://localhost:3001/api/contact`.

## 4. Deploy

See the main setup steps for deploying this to Render for free.

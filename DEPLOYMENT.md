# Vercel Deployment

This project is ready for Vercel hosting, but the current local database uses SQLite. For a real hosted demo with persistent lead capture, move the app to hosted PostgreSQL first.

## Recommended stack

- Frontend: Vercel
- Database: Neon Postgres
- ORM: Prisma

Vercel's official docs state that new Postgres databases are connected through Marketplace integrations, and Prisma's PostgreSQL docs recommend using PostgreSQL for serverless providers such as Neon.

## 1. Create the database

1. Create a Neon project, either directly in Neon or through the Vercel Marketplace.
2. Create a database for the project.
3. Copy two connection strings:
   - `DATABASE_URL`: pooled runtime URL
   - `DIRECT_URL`: direct connection URL for Prisma CLI

Example:

```env
DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require"
```

## 2. Switch Prisma from SQLite to PostgreSQL

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

If you want Prisma CLI commands like `db push` and `db seed` to use the direct connection, update `prisma.config.ts` like this:

```ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "node prisma/seed.mjs",
  },
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});
```

## 3. Set local environment variables

Replace your local `.env` values with the hosted Postgres credentials:

```env
DATABASE_URL="your_pooled_url"
DIRECT_URL="your_direct_url"
```

Then run:

```bash
npm run db:push
npm run db:seed
```

## 4. Push code to GitHub

```bash
git init
git add .
git commit -m "Prepare Soumanasya clinic site for deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## 5. Deploy on Vercel

1. Import the GitHub repo into Vercel.
2. Set these environment variables in Vercel:
   - `DATABASE_URL`
   - `DIRECT_URL`
3. Use the default Next.js framework preset.
4. Deploy.

Because the app reads clinic data and services from the database, the Postgres schema and seed need to be in place before the first production deploy.

## 6. Post-deploy checks

1. Open the homepage, team, services, and contact pages.
2. Submit a test lead from the quick enquiry widget.
3. Confirm the lead row appears in the `Lead` table.
4. Verify `sitemap.xml` and `robots.txt`.

## Notes

- The build no longer seeds or mutates the database automatically.
- Seed intentionally runs only when you call `npm run db:seed`.
- If you want, the next step is for me to make the PostgreSQL cutover in code after you have the Neon connection strings.

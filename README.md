# Odoo POS Cafe

A modern, offline Point of Sale system for café/restaurant management, inspired by Odoo POS. Built for high performance, utilizing a direct PostgreSQL connection for instant real-time synchronization between the Cashier terminal and the Kitchen Display.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS Modules
- **Database:** PostgreSQL (Direct raw offline connection via `pg` pool)

## Quick Start Setup

We have completely removed Prisma from this project to rely entirely on a fast, offline PostgreSQL setup. You will need a local PostgreSQL database running.

1. **Clone the repository**
2. **Setup your environment variables:** 
   Update `.env` in the `frontend` folder with your local database URL:
   ```env
   DATABASE_URL="postgresql://postgres:1234@localhost:5432/odoo_pos_cafe"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```
3. **Install frontend dependencies:**
   ```bash
   npm install
   ```
4. **Initialize Database Schema (if not already done):**
   You can run the `schema.sql` found in the root directory directly into your PostgreSQL shell or GUI tool (e.g., pgAdmin) to create the necessary tables.
   ```bash
   psql -U postgres -d odoo_pos_cafe -a -f ../schema.sql
   ```
5. **Seed the database (Highly Recommended):**
   To populate the system with menus, thousands of mock orders, and kitchen history to visualize the dashboards, run the provided Node seed script:
   ```bash
   node seed_massive.js
   ```
6. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## Application Modules & Access

- **Landing Page:** `/landing`
- **Cashier Floor Terminal:** `/pos/floor`
- **Kitchen Display System (KDS):** `/kitchen/display`
- **Admin Dashboard & Analytics:** `/admin/reports`

## Project Structure

```
/odoo-pos-cafe
  /frontend
    /app
      /api              → Native Next.js Database API Routes (GET/POST/PATCH)
      /components       → Shared UI Modals & Interfaces
      /lib              → Raw PostgreSQL client (`db.ts`), auth logic
      /auth             → Login & Authentication
      /admin            → Back-office settings & analytics
      /pos              → The Cashier Terminal (Floor plan, Order creation)
      /kitchen          → Kitchen display auto-polling tickets
    seed_massive.js   → Massive 90-day offline data seeding script
  schema.sql            → The master PostgreSQL table structure
```

## License

Private — All rights reserved.

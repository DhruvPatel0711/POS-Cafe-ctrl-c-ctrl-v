# Odoo POS Cafe

A modern Point of Sale system for café/restaurant management, inspired by Odoo POS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **ORM:** Prisma

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your database credentials
3. Install dependencies:
   ```bash
   npm install
   ```
4. Push the database schema:
   ```bash
   npx prisma db push
   ```
5. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
/odoo-pos-cafe
  /app
    /api              → Next.js API routes
    /components       → Shared UI components
    /lib              → Prisma client, utils, polling helpers
    /(routes)         → Page routes
      /login          → Authentication
      /floor          → Floor plan / table layout
      /order/[tableId]→ Order management per table
      /kitchen        → Kitchen display system
      /customer       → Customer management
      /payment/[orderId] → Payment processing
      /self-order/[token] → Customer self-ordering
      /dashboard      → Analytics & overview
      /admin          → Admin panel
  /prisma
    schema.prisma     → Database schema
  /public             → Static assets
```

## License

Private — All rights reserved.

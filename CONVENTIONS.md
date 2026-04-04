# CONVENTIONS.md

## General Standards
- Use **Next.js 14 App Router** patterns.
- Use **TypeScript** for all logic and components.
- Use **Tailwind CSS** for all styling, following names from `DESIGN.md`.

## Naming Conventions
- **Components**: `PascalCase` (e.g. `AuthForm.tsx`)
- **API Routes**: `/api/[resource]/[id]/[action]` structure.
- **Client Helpers**: `camelCase` (e.g. `auth-client.ts`)
- **Prisma Models**: `PascalCase` in schema, `camelCase` for instances.

## Architecture
- **API Protection**: Use `middleware.ts` at root for JWT validation.
- **Prisma Client**: Import singleton from `@/app/lib/prisma`. NEVER instantiate `new PrismaClient()` in routes.
- **JWT**: Use `jose` library for all Edge-compatible token operations.
- **Passwords**: Always hash with `bcrypt`.

## UI Components
- **The "No-Line" Rule**: Avoid standard `border` classes for sectioning. Use background shifts between surface tiers (`surface-container-low`, `surface-highest`, etc.).
- **Typography**: `Manrope` for headlines and KPIs, `Inter` for body and labels.
- **Action Buttons**: Primary buttons must use the Amber gradient as defined in `DESIGN.md`.

## Polling & Real-time
- Use the `usePolling` hook in `app/lib` for all dashboard and status updates.

import { Pool } from 'pg'

// We create a singleton connection pool so Next.js doesn't exhaust DB connections during hot-reloads
const globalForPg = globalThis as unknown as {
  pgPool: Pool | undefined
}

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

if (process.env.NODE_ENV !== 'production') globalForPg.pgPool = pool

export default pool

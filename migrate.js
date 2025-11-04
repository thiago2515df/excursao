import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
const { Pool } = pg;

async function main() {
  const connectionString = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_PUBLIC_URL or DATABASE_URL not configured');
    process.exit(1);
  }

  console.log('🔌 Connecting to PostgreSQL...');
  
  const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  const db = drizzle(pool);

  console.log('📦 Running migrations...');
  
  try {
    await migrate(db, { migrationsFolder: './drizzle/migrations-postgres' });
    console.log('✅ Migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();

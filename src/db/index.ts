
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

// Initialize DB client only when TURSO env vars are present.
// Avoid throwing at module import time so serverless routes can fall back to file storage.
let _db: any = null;
try {
  if (process.env.TURSO_CONNECTION_URL && process.env.TURSO_AUTH_TOKEN) {
    const client = createClient({
      url: process.env.TURSO_CONNECTION_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    _db = drizzle(client, { schema });
  } else {
    // Not configured — we'll rely on the file fallback in commentsStore.
    // Log a friendly warning in server logs.
    // eslint-disable-next-line no-console
    console.warn('TURSO not configured — DB disabled, using file fallback for comments.');
  }
} catch (e) {
  // If client creation fails, don't crash the import — fall back to file storage.
  // eslint-disable-next-line no-console
  console.warn('DB initialization failed, falling back to file storage.', e);
  _db = null;
}

export const db: any = _db;

export type Database = typeof db;
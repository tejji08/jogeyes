import { db } from '@/db/index';
import { comment } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import fs from 'fs/promises';
import path from 'path';

const FALLBACK_PATH = path.join(process.cwd(), 'data', 'comments-fallback.json');

async function ensureFallbackFile() {
  try {
    await fs.mkdir(path.dirname(FALLBACK_PATH), { recursive: true });
    try {
      await fs.access(FALLBACK_PATH);
    } catch (e) {
      await fs.writeFile(FALLBACK_PATH, '[]', 'utf8');
    }
  } catch (e) {
    // ignore
  }
}

export async function getComments(postId: string) {
  try {
    const rows = await db.select().from(comment).where(eq(comment.postId, postId)).orderBy(desc(comment.createdAt));
    return { source: 'db', rows };
  } catch (e) {
    // fallback to file
    try {
      await ensureFallbackFile();
      const txt = await fs.readFile(FALLBACK_PATH, 'utf8');
      const all = JSON.parse(txt || '[]');
      const rows = all.filter((r: any) => r.postId === postId).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return { source: 'file', rows };
    } catch (e2) {
      console.error('comments fallback read failed', e2);
      return { source: 'none', rows: [] };
    }
  }
}

export async function getAllComments() {
  try {
    // try DB first
    const rows = await db.select().from(comment).orderBy(desc(comment.createdAt));
    return { source: 'db', rows };
  } catch (e) {
    try {
      await ensureFallbackFile();
      const txt = await fs.readFile(FALLBACK_PATH, 'utf8');
      const all = JSON.parse(txt || '[]');
      const rows = all.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return { source: 'file', rows };
    } catch (e2) {
      console.error('comments fallback read failed', e2);
      return { source: 'none', rows: [] };
    }
  }
}

export async function addCommentRecord(rec: { id: string; postId: string; name: string; text: string; createdAt: Date }) {
  try {
    await db.insert(comment).values({ id: rec.id, postId: rec.postId, name: rec.name, text: rec.text, createdAt: rec.createdAt });
    return { source: 'db', rec };
  } catch (e) {
    try {
      await ensureFallbackFile();
      const txt = await fs.readFile(FALLBACK_PATH, 'utf8');
      const all = JSON.parse(txt || '[]');
      all.push({ ...rec });
      await fs.writeFile(FALLBACK_PATH, JSON.stringify(all, null, 2), 'utf8');
      return { source: 'file', rec };
    } catch (e2) {
      console.error('comments fallback write failed', e2);
      throw e2;
    }
  }
}

export async function deleteCommentById(id: string) {
  try {
    await db.delete(comment).where(eq(comment.id, id));
    return { source: 'db' };
  } catch (e) {
    try {
      await ensureFallbackFile();
      const txt = await fs.readFile(FALLBACK_PATH, 'utf8');
      const all = JSON.parse(txt || '[]');
      const filtered = all.filter((r: any) => r.id !== id);
      await fs.writeFile(FALLBACK_PATH, JSON.stringify(filtered, null, 2), 'utf8');
      return { source: 'file' };
    } catch (e2) {
      console.error('comments fallback delete failed', e2);
      throw e2;
    }
  }
}

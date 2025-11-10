import { NextRequest } from 'next/server';
import { getComments, addCommentRecord } from '@/lib/commentsStore';

// Simple in-memory rate limiter (per-IP) as best-effort fallback when Redis is not configured.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max posts per window
const ipMap = new Map<string, number[]>();

function getIpFromReq(req: Request) {
  try {
    const xf = req.headers.get('x-forwarded-for');
    if (xf) return xf.split(',')[0].trim();
    const host = req.headers.get('x-real-ip');
    if (host) return host;
  } catch (e) {}
  return 'unknown';
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get('postId');
    if (!postId) return new Response(JSON.stringify({ error: 'postId is required' }), { status: 400 });

    const res = await getComments(postId);
    return new Response(JSON.stringify(res.rows), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    // In dev, return the error message to aid debugging
    const isDev = process.env.NODE_ENV !== 'production';
    const msg = isDev && e instanceof Error ? e.message : 'server error';
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { postId, name, text, honeypot } = body;
    if (!postId || !text) return new Response(JSON.stringify({ error: 'postId and text are required' }), { status: 400 });

    if (honeypot && honeypot.trim().length > 0) return new Response(JSON.stringify({ error: 'spam detected' }), { status: 400 });
    if (text.length > 5000) return new Response(JSON.stringify({ error: 'text too long' }), { status: 400 });

    const ip = getIpFromReq(req);
    const now = Date.now();
    const arr = ipMap.get(ip) || [];
    const recent = arr.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (recent.length >= RATE_LIMIT_MAX) {
      return new Response(JSON.stringify({ error: 'rate limit exceeded' }), { status: 429 });
    }
    recent.push(now);
    ipMap.set(ip, recent);

    const id = (globalThis as any).crypto?.randomUUID?.() || String(Date.now());
    const createdAt = new Date();

    const rec = { id, postId, name: name || 'Anonymous', text, createdAt };
    await addCommentRecord(rec);

    return new Response(JSON.stringify(rec), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}

// Use node runtime so file fallback can work when DB is not available.
export const runtime = 'nodejs';

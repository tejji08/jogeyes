/**
 * Rate limiter abstraction: uses Upstash Redis if env is configured, otherwise falls back to in-memory limiter.
 */
import { Redis } from '@upstash/redis';

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

let upstash: Redis | null = null;
if (UPSTASH_URL && UPSTASH_TOKEN) {
  try {
    upstash = new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN });
  } catch (e) {
    console.warn('Upstash init failed', e);
    upstash = null;
  }
}

// in-memory map fallback
const memMap = new Map<string, number[]>();

export async function incrementAndCheck(ip: string, windowMs = 60_000, max = 5): Promise<{ ok: boolean; remaining: number }> {
  if (upstash) {
    try {
      const key = `rl:${ip}`;
      // INCR and set expire if first
      const v = await upstash.incr(key);
      if (v === 1) {
        await upstash.expire(key, Math.ceil(windowMs / 1000));
      }
      const remaining = Math.max(0, max - v);
      return { ok: v <= max, remaining };
    } catch (e) {
      console.warn('upstash rate limiter failed', e);
      // fallthrough to mem
    }
  }

  const now = Date.now();
  const arr = memMap.get(ip) || [];
  const recent = arr.filter((ts) => now - ts < windowMs);
  recent.push(now);
  memMap.set(ip, recent);
  const ok = recent.length <= max;
  return { ok, remaining: Math.max(0, max - recent.length) };
}

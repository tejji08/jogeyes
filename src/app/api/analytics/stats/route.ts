import fs from 'fs/promises';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'analytics.json');

async function readAll() {
  try {
    const txt = await fs.readFile(FILE, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (e) {
    return [];
  }
}

export async function GET() {
  try {
    const all = await readAll();
    const total = all.length;

    // per-path counts
    const perPath: Record<string, number> = {};
    for (const ev of all) {
      const p = ev.path || '/';
      perPath[p] = (perPath[p] || 0) + 1;
    }
    const entries = Object.entries(perPath).sort((a, b) => b[1] - a[1]);

    // per-day counts for last 14 days (YYYY-MM-DD)
    const now = Date.now();
    const DAY = 24 * 60 * 60 * 1000;
    const perDayMap: Record<string, number> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now - i * DAY);
      const key = d.toISOString().slice(0, 10);
      perDayMap[key] = 0;
    }
    for (const ev of all) {
      const t = typeof ev.ts === 'number' ? ev.ts : Number(ev.ts || 0);
      if (!t) continue;
      const key = new Date(t).toISOString().slice(0, 10);
      if (key in perDayMap) perDayMap[key]++;
    }

    const perDay = Object.entries(perDayMap).map(([day, count]) => ({ day, count }));

    return new Response(JSON.stringify({ total, top: entries.slice(0, 10), perDay }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('analytics stats failed', e);
    return new Response(JSON.stringify({ error: 'failed' }), { status: 500 });
  }
}

export const runtime = 'nodejs';

import fs from 'fs/promises';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'analytics.json');

async function ensure() {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    try {
      await fs.access(FILE);
    } catch (e) {
      await fs.writeFile(FILE, '[]', 'utf8');
    }
  } catch (e) {}
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { path: p, ts } = body as any;
    await ensure();
    const txt = await fs.readFile(FILE, 'utf8');
    const all = JSON.parse(txt || '[]');
    all.push({ path: p || '/', ts: ts || Date.now() });
    // keep file reasonably small by slicing last 10000
    const trimmed = all.slice(-10000);
    await fs.writeFile(FILE, JSON.stringify(trimmed, null, 2), 'utf8');
    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (e) {
    console.error('analytics collect failed', e);
    return new Response(JSON.stringify({ error: 'failed' }), { status: 500 });
  }
}

export const runtime = 'nodejs';

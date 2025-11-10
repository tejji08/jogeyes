export async function GET(req: Request) {
  try {
    const expected = process.env.ADMIN_TOKEN || 'changeme';
    const provided = req.headers.get('x-admin-token');
    if (provided === expected) return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify({ ok: false }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('admin validate failed', e);
    return new Response(JSON.stringify({ error: 'failed' }), { status: 500 });
  }
}

export const runtime = 'nodejs';

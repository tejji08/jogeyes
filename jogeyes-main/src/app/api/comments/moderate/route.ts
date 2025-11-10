import { deleteCommentById } from '@/lib/commentsStore';

export async function DELETE(req: Request) {
  try {
  const expected = process.env.ADMIN_TOKEN || 'changeme';
  // very small guard — in production set ADMIN_TOKEN env var
  const provided = req.headers.get('x-admin-token');
  if (!provided || provided !== expected) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });

    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });

  // authorized via header

    await deleteCommentById(id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}

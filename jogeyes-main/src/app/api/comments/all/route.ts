import { getAllComments } from '@/lib/commentsStore';

export async function GET() {
  try {
    const res = await getAllComments();
    return new Response(JSON.stringify(res.rows), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}

import { videos } from '@/data/videos';

// Simple in-memory cache for YouTube metadata with TTL; falls back to local data if no API key.
const cache: Record<string, { data: any; ts: number }> = {};
const TTL = 1000 * 60 * 60; // 1 hour

async function fetchMetadataFromApi(id: string) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error('Missing YOUTUBE_API_KEY');
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(id)}&key=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('YouTube API error');
  const json = await res.json();
  return json;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });

    const cached = cache[id];
    if (cached && Date.now() - cached.ts < TTL) {
      return new Response(JSON.stringify(cached.data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Try API first; on missing API key or failure, fall back to local videos data
    try {
      const data = await fetchMetadataFromApi(id);
      cache[id] = { data, ts: Date.now() };
      return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      // fallback: look up in local videos.ts data
      const v = videos.find((x) => x.id === id);
      if (v) {
        const local = { items: [{ id: v.id, snippet: { title: v.title, thumbnails: { default: { url: v.thumbnail } }, description: v.description }, statistics: { viewCount: v.views || 0 } }] };
        cache[id] = { data: local, ts: Date.now() };
        return new Response(JSON.stringify(local), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      throw e;
    }
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message || 'server error' }), { status: 500 });
  }
}

export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";

// Don't import server-only auth library here. Middleware runs on the Edge
// runtime which doesn't support Node-only modules. Instead, call the
// server-side auth API endpoint which can use the server-only auth logic.
export async function middleware(request: NextRequest) {
  try {
    // Forward the incoming headers (cookies/authorization) to the auth API.
    const url = new URL('/api/auth/session', request.url).toString();
    const res = await fetch(url, {
      method: 'GET',
      headers: request.headers,
      // Allow the Edge runtime to send credentials (cookies) to the same origin
      // note: `fetch` in the Edge supports cookies when forwarding the request headers
    });

    let session = null;
    if (res.ok) {
      // the auth handler returns JSON session info
      session = await res.json();
    }

    // You can use `session` to decide redirects/rewrites. For now we just
    // continue the request — adapt to your authorization needs.
  } catch (err) {
    // If the auth API isn't reachable or failed, continue without blocking
    // to avoid taking down the entire site. Optionally log the error.
    console.error('middleware auth check failed', err);
  }
}

export const config = {
  matcher: ["/admin/analytics", "/admin"],
};
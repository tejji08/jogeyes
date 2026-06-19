import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, adminToken, expectedHash, isAuthed } from "@/lib/studio-auth";

export const runtime = "nodejs";

// GET -> report whether the current request is authenticated.
export async function GET(req: NextRequest) {
  return NextResponse.json({ authed: isAuthed(req) });
}

// POST { password } -> set the auth cookie if the password matches ADMIN_TOKEN.
export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password = (body.password || "").toString();
  if (!password || password !== adminToken()) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(STUDIO_COOKIE, expectedHash(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

// DELETE -> log out (clear the cookie).
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STUDIO_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

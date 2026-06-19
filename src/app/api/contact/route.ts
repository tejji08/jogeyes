import { NextRequest, NextResponse } from "next/server";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

// Sends contact inquiries by email via Resend when RESEND_API_KEY + a profile
// email are configured. Otherwise responds with { fallback: true } so the
// client can open the visitor's mail client (mailto) instead.
export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; projectType?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const projectType = (body.projectType || "").trim();
  const message = (body.message || "").trim();

  if (!email || !message) {
    return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = profile.email;

  if (!key || !to) {
    return NextResponse.json({ ok: false, fallback: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Jogeyes Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New inquiry${projectType ? ` — ${projectType}` : ""}${name ? ` from ${name}` : ""}`,
        text: `From: ${name || "(no name)"} <${email}>\nType: ${projectType || "(unspecified)"}\n\n${message}`,
      }),
    });
    if (!res.ok) return NextResponse.json({ ok: false, fallback: true });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, fallback: true });
  }
}

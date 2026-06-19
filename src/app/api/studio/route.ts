import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAuthed } from "@/lib/studio-auth";

export const runtime = "nodejs";

// Content types the studio can edit -> their JSON file under src/data.
const ALLOWED = ["videos", "music", "writing", "photography", "profile", "services"] as const;
type ContentType = (typeof ALLOWED)[number];

function fileFor(type: string): string | null {
  if (!ALLOWED.includes(type as ContentType)) return null;
  return path.join(process.cwd(), "src", "data", `${type}.json`);
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const type = req.nextUrl.searchParams.get("type") || "";
  const file = fileFor(type);
  if (!file) {
    return NextResponse.json({ error: "Unknown content type" }, { status: 400 });
  }
  try {
    const raw = await fs.readFile(file, "utf8");
    return NextResponse.json({ type, data: JSON.parse(raw) });
  } catch {
    return NextResponse.json({ error: "Could not read content" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // Local-editing tool: writing to source files only makes sense in dev.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Editing is disabled in production. Run the site locally with `bun dev` to edit." },
      { status: 403 }
    );
  }

  let body: { type?: string; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const file = fileFor(body.type || "");
  if (!file) {
    return NextResponse.json({ error: "Unknown content type" }, { status: 400 });
  }
  if (body.data === undefined) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    await fs.writeFile(file, JSON.stringify(body.data, null, 2) + "\n", "utf8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save content" }, { status: 500 });
  }
}

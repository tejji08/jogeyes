import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAuthed } from "@/lib/studio-auth";

export const runtime = "nodejs";

const MAX_BYTES = 12 * 1024 * 1024; // 12 MB
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function slugify(name: string): string {
  const ext = path.extname(name).toLowerCase();
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "image";
  return `${base}${ext}`;
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Uploads are disabled in production. Run the site locally to add pictures." },
      { status: 403 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  // Accepts one or many files under the "file" field — single uploads still work.
  const files = form.getAll("file").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const urls: string[] = [];
  const errors: string[] = [];
  let i = 0;
  for (const file of files) {
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXT.has(ext)) {
      errors.push(`${file.name}: unsupported type ${ext || "(none)"}`);
      continue;
    }
    const bytes = await file.arrayBuffer();
    if (bytes.byteLength > MAX_BYTES) {
      errors.push(`${file.name}: too large (max 12 MB)`);
      continue;
    }
    // unique even when many land in the same millisecond
    const filename = `${Date.now()}-${(i++).toString(36)}-${slugify(file.name)}`;
    await fs.writeFile(path.join(uploadsDir, filename), Buffer.from(bytes));
    urls.push(`/uploads/${filename}`);
  }

  if (urls.length === 0) {
    return NextResponse.json({ error: errors.join("; ") || "Upload failed" }, { status: 400 });
  }
  // `url` kept for the existing single-image field; `urls` for bulk.
  return NextResponse.json({ url: urls[0], urls, errors });
}

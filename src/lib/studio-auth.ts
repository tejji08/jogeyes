import { createHash } from "crypto";
import type { NextRequest } from "next/server";

// Simple password gate for the /studio editor, reusing the project's
// ADMIN_TOKEN env var. The auth cookie stores a hash of the token (not the
// token itself), so it can be verified server-side but isn't the raw secret.

export const STUDIO_COOKIE = "studio_auth";

export function adminToken(): string {
  return process.env.ADMIN_TOKEN || "changeme";
}

export function expectedHash(): string {
  return createHash("sha256").update(adminToken()).digest("hex");
}

export function isAuthed(req: NextRequest): boolean {
  const cookie = req.cookies.get(STUDIO_COOKIE)?.value;
  return !!cookie && cookie === expectedHash();
}

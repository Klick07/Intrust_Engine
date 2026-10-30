import { NextResponse } from "next/server";

import { prewarm } from "@/lib/prewarm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// 60 s works on every Vercel plan; a slow prewarm can also run from a laptop (npm run demo:prewarm).
export const maxDuration = 60;

// Weekly (vercel.json): template plans are per week, so a new week needs a
// fresh one or demos fall back to offline plans. Vercel sends
// "Authorization: Bearer $CRON_SECRET"; anything else is refused.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const report = await prewarm();
  return NextResponse.json({ ok: true, ...report });
}

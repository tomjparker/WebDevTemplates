import { NextRequest } from "next/server";
import { env } from "@/config/env";
import { fetchJSON } from "@/lib/http";
import { parseQuery, asInt, asString, asEnum } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;

  const parsed = parseQuery(q, {
    page: asInt({ min: 1, def: 1 }),
    pageSize: asInt({ min: 1, max: 100, def: 20 }),
    q: asString({ max: 200 }),
    status: asEnum(["open", "closed"] as const),
  });

  if (!parsed.ok) {
    return Response.json({ errors: parsed.issues }, { status: 400 });
  }

  const { page, pageSize, q: searchQ, status } = parsed.data;
  const upstream = new URL(`${env.API_URL}/issues`);
  if (!env.API_URL) return Response.json({ error: "API_URL not set" }, { status: 500 });

  const usp = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(searchQ ? { q: searchQ } : {}),
    ...(status ? { status } : {}),
  });
  upstream.search = usp.toString();

  const data = await fetchJSON<unknown>(upstream.toString(), {
    headers: {
      ...(env.API_TOKEN ? { Authorization: `Bearer ${env.API_TOKEN}` } : {}),
    },
    timeoutMs: env.REQUEST_TIMEOUT_MS,
    retry: { attempts: 2, backoffMs: n => n * 200 }, // linear backoff
    cache: "no-store",
  });

  // Optional: whitelist/shape the response before returning
  return Response.json(data);
}

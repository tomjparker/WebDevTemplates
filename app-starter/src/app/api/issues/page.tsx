import { env } from "@/config/env";
import { asEnum, asInt, asString, parseQuery } from "@/lib/validation";
import { notFound } from "next/navigation";

type Issue = { id: string; title: string }; // keep types local & small for template

export default async function IssuesPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams ?? {})) {
    if (Array.isArray(v)) for (const x of v) usp.append(k, x);
    else if (v != null) usp.set(k, v);
  }

  const parsed = parseQuery(usp, {
    page: asInt({ min: 1, def: 1 }),
    pageSize: asInt({ min: 1, max: 100, def: 20 }),
    q: asString({ max: 200 }),
    status: asEnum(["open", "closed"] as const),
  });
  if (!parsed.ok) notFound(); // keep template simple; you can render an error UI instead

  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(parsed.data)) {
    if (v != null) qs.set(k, String(v));
  }

  const res = await fetch(`/api/issues?${qs}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load issues");
  const issues = (await res.json()) as Issue[];

  return (
    <main>
      <h1>Issues</h1>
      <ul>{issues.map(i => <li key={i.id}>{i.title}</li>)}</ul>
    </main>
  );
}

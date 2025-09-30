export type Result<T> = { ok: true; data: T } | { ok: false; issues: string[] };

// Schema as code - replace with Zod later.
export function parseQuery<T extends Record<string, unknown>>(
  input: URLSearchParams,
  rules: { [K in keyof T]: (v: string | undefined) => T[K] }
): Result<T> {
  const issues: string[] = [];
  const out = {} as T;

  for (const key of Object.keys(rules) as Array<keyof T>) {
    try {
      // @ts-ignore
      out[key] = rules[key](input.get(String(key)) ?? undefined);
    } catch (e) {
      issues.push(`${String(key)}: ${(e as Error).message}`);
    }
  }
  return issues.length ? { ok: false, issues } : { ok: true, data: out };
}

// Tiny helpers
export const asInt =
  (opts: { min?: number; max?: number; def?: number } = {}) =>
  (v: string | undefined) => {
    if (v == null || v === "") {
      if (opts.def !== undefined) return opts.def;
      throw new Error("required");
    }
    const n = Number(v);
    if (!Number.isInteger(n)) throw new Error("must be integer");
    if (opts.min !== undefined && n < opts.min) throw new Error(`>= ${opts.min}`);
    if (opts.max !== undefined && n > opts.max) throw new Error(`<= ${opts.max}`);
    return n;
  };

export const asEnum =
  <T extends string>(values: readonly T[]) =>
  (v: string | undefined) => {
    if (v == null || v === "") return undefined as unknown as T | undefined;
    if (!values.includes(v as T)) throw new Error(`must be one of ${values.join(", ")}`);
    return v as T;
  };

export const asString =
  (opts: { max?: number } = {}) =>
  (v: string | undefined) => {
    if (v == null || v === "") return undefined as string | undefined;
    if (opts.max && v.length > opts.max) throw new Error(`max length ${opts.max}`);
    return v;
  };

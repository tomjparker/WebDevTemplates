type RetryPolicy = { attempts?: number; backoffMs?: (n: number) => number };

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: (RequestInit & { timeoutMs?: number }) = {}
) {
  const { timeoutMs = 3000, ...rest } = init;
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(input, { ...rest, signal: ctrl.signal });
  } finally {
    clearTimeout(id);
  }
}

export async function fetchJSON<T>(
  url: string | URL,
  init: RequestInit & { timeoutMs?: number; retry?: RetryPolicy } = {}
): Promise<T> {
  const { retry, ...rest } = init;
  const attempts = Math.max(1, retry?.attempts ?? 1);
  let lastErr: unknown;

  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetchWithTimeout(url, rest);
      if (!res.ok) {
        // don’t retry on 4xx
        if (res.status < 500 || i === attempts) {
          const txt = await res.text().catch(() => "");
          throw new Error(`Upstream ${res.status}: ${txt || res.statusText}`);
        }
        throw new Error(`Retryable ${res.status}`);
      }
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) return (await res.json()) as T;
      // allow text passthrough if needed
      return (await res.text()) as unknown as T;
    } catch (err) {
      lastErr = err;
      if (i < attempts) {
        const delay = retry?.backoffMs?.(i) ?? 0;
        if (delay) await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw lastErr;
    }
  }
  // unreachable
  throw lastErr;
}

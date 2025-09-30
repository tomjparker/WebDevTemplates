// Minimal, no runtime deps. Swap process.env keys as needed.
export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  API_URL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "",
  API_TOKEN: process.env.API_TOKEN ?? "",
  REQUEST_TIMEOUT_MS: Number(process.env.REQUEST_TIMEOUT_MS ?? 3000),
};

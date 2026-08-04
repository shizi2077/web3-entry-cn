/**
 * Cloudflare Web Analytics is configured at build time for this static site.
 * The token is intentionally optional so local previews do not emit a beacon
 * until a real token from the Cloudflare dashboard is provided.
 */
export function CloudflareAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN?.trim();

  if (!token) return null;

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}

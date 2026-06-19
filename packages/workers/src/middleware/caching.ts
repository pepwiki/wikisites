function sha256Hex(input: string): string {
  // Simple string hash for ETag - crypto.subtle not available in all worker contexts synchronously
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

function isStaticAsset(path: string): boolean {
  return /\.(js|css|png|jpe?g|gif|svg|ico|woff2?|ttf|eot|webp|avif|map|json)$/i.test(path);
}

function isApiRoute(path: string): boolean {
  return path.startsWith("/api/");
}

function computeETag(body: string): string {
  return `"${sha256Hex(body)}"`;
}

export function withCacheHeaders(response: Response, path: string): Response {
  const newHeaders = new Headers(response.headers);

  if (isStaticAsset(path)) {
    newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (isApiRoute(path)) {
    newHeaders.set("Cache-Control", "private, no-cache");
  } else {
    // HTML pages
    newHeaders.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  // ETag support for non-streaming responses
  if (!newHeaders.has("ETag") && response.status === 200) {
    const etag = computeETag(path + response.headers.get("content-type"));
    newHeaders.set("ETag", etag);

    const ifNoneMatch = new Headers().get("if-none-match");
    if (ifNoneMatch === etag) {
      return new Response(null, {
        status: 304,
        statusText: "Not Modified",
        headers: newHeaders,
      });
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

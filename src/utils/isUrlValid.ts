const protocolRelativeUrl = /^\/\//
const explicitScheme = /^[a-z][a-z\d+.-]*:/i
const webHost =
  /^(?:localhost|(?:\d{1,3}\.){3}\d{1,3}|\[[\da-f:.]+\]|(?:[^\s./:?#]+\.)+[^\s/:?#]+)(?::\d+)?(?:[/?#]|$)/i

/**
 * Parses a user-entered destination into the absolute URL that should be saved.
 *
 * Explicit schemes are preserved (`mailto:`, `file:`, custom protocols, etc.).
 * Recognisable web hosts without a scheme are treated as HTTPS destinations.
 * A single bare word is not treated as a host, preventing typo-like values
 * from being saved as a bookmark URL.
 */
export const normalizeUrl = (value: string) => {
  const url = value.trim()
  if (!url) return undefined

  const isProtocolRelative = protocolRelativeUrl.test(url)
  const host = isProtocolRelative ? url.slice(2) : url

  if (!explicitScheme.test(url) && !webHost.test(host)) return undefined

  const candidate = isProtocolRelative
    ? `https:${url}`
    : !explicitScheme.test(url) || webHost.test(url)
      ? `https://${url}`
      : url

  try {
    return new URL(candidate).href
  } catch {
    return undefined
  }
}

export const isUrlValid = (url: string) => !!normalizeUrl(url)

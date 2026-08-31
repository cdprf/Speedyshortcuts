import { browser } from "wxt/browser"

export const getFaviconUrl = (url?: string) => {
  if (!url) return ""
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1315616
  if (import.meta.env.BROWSER === "firefox") return getFaviconUrlExternal(url)
  try {
    return `chrome-extension://${
      browser.runtime.id
    }/_favicon/?pageUrl=${encodeURIComponent(url)}&size=64`
  } catch {
    return getFaviconUrlExternal(url)
  }
}

const getFaviconUrlExternal = (url: string) => {
  return `https://ico.faviconkit.net/favicon/${new URL(url).host}`
}

import { defineBackground } from "wxt/utils/define-background"
import { storage } from "wxt/utils/storage"
import { browser, type Browser } from "wxt/browser"
import { addNewSpeedDial } from "~/stores"

// TODO: Replace this with the production survey URL before the next release.
const UNINSTALL_SURVEY_URL =
  "https://example.com/nice-speed-dials-uninstall-survey"

const toggleSettingsDrawer = storage.defineItem<boolean>(
  "local:toggleSettingsDrawer",
  { fallback: false }
)

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async (details) => {
    await browser.runtime.setUninstallURL(UNINSTALL_SURVEY_URL)

    if (details.reason !== "update" || import.meta.env.MODE === "development") {
      return
    }

    await browser.tabs.create({
      // @ts-expect-error - getURL is defined per-project, but not inside the package
      url: browser.runtime.getURL("/update.html"),
    })
  })

  const contextMenuHandler = async (
    info: Browser.contextMenus.OnClickData,
    tab?: Browser.tabs.Tab
  ) => {
    if (info.menuItemId === "toggleSettings") {
      const currentValue = await toggleSettingsDrawer.getValue()
      await toggleSettingsDrawer.setValue(!currentValue)
    }

    if (info.menuItemId === "addToSpeedDials") {
      if (!tab?.url) return
      console.log("info", info)
      await addNewSpeedDial({
        title: tab?.title ?? new URL(tab.url).hostname,
        url: tab.url,
      })
    }
  }

  browser.contextMenus.onClicked.addListener(contextMenuHandler)

  try {
    browser.contextMenus.removeAll().then(() => {
      browser.contextMenus.create({
        title: "Toggle Settings",
        id: "toggleSettings",
        contexts: ["all"],
        documentUrlPatterns: [
          // @ts-expect-error - getURL is defined per-project, but not inside the package
          browser.runtime.getURL("/newtab.html"),
          // @ts-expect-error - getURL is defined per-project, but not inside the package
          browser.runtime.getURL("/"),
        ],
      })

      browser.contextMenus.create({
        title: "Add to Speed Dials",
        id: "addToSpeedDials",
        contexts: ["all"],
        // TODO: we want it for all url except for the extension's own pages
        documentUrlPatterns: ["<all_urls>"],
      })
    })
  } catch {}
})

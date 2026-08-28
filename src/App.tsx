import { Grid } from "~/components"
import { createEffect, onMount } from "solid-js"
import {
  darkMode,
  DEFAULT_VALUES,
  mainBackgroundColor,
  mainBackgroundImage,
} from "~/stores"
import { createSignal } from "solid-js"

export const App = () => {
  const [isDarkMode, setIsDarkMode] = createSignal(false)
  const [bgColor, setBgColor] = createSignal<string | undefined>(undefined)
  const [bgImage, setBgImage] = createSignal<string | undefined>(undefined)

  onMount(async () => {
    setIsDarkMode(await darkMode.getValue())
    setBgColor((await mainBackgroundColor.getValue()) || undefined)
    setBgImage((await mainBackgroundImage.getValue()) || undefined)

    // Watch for changes
    darkMode.watch(setIsDarkMode)
    mainBackgroundColor.watch(setBgColor)
    mainBackgroundImage.watch(setBgImage)
  })

  // Apply dark mode
  createEffect(() => {
    if (isDarkMode()) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  })

  // Apply background
  createEffect(() => {
    const bgImg = bgImage()
    const bgCol = bgColor()

    const backgroundColor = bgImg
      ? "transparent"
      : bgCol || DEFAULT_VALUES.mainBackgroundColor
    const backgroundImage = bgImg ? `url(${bgImg})` : "none"
    const bgSize = bgImg ? "cover" : "auto"
    const bgPosition = bgImg ? "center" : "auto"

    document.documentElement.style.setProperty(
      "--app-background-color",
      backgroundColor
    )
    document.documentElement.style.setProperty(
      "--app-background-image",
      backgroundImage
    )
    document.documentElement.style.setProperty("--app-background-size", bgSize)
    document.documentElement.style.setProperty(
      "--app-background-position",
      bgPosition
    )
  })

  return (
    <div class="grid h-full min-h-screen w-full grid-rows-[auto_1fr] place-items-center gap-2 bg-(--app-background-color,#2c2124) bg-no-repeat p-4 [background-image:var(--app-background-image,none)] bg-position-(--app-background-position,auto) bg-size-(--app-background-size,auto)">
      <Grid />
    </div>
  )
}

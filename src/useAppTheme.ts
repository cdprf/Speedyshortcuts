import { createEffect, createSignal, onMount } from "solid-js"
import {
  darkMode,
  DEFAULT_VALUES,
  mainBackgroundColor,
  mainBackgroundImage,
} from "~/stores"

type AppThemeOptions = { useCustomBackground?: boolean }

export const useAppTheme = (options: AppThemeOptions = {}) => {
  const useCustomBackground = options.useCustomBackground ?? true
  const [isDarkMode, setIsDarkMode] = createSignal(false)
  const [bgColor, setBgColor] = createSignal<string | undefined>(undefined)
  const [bgImage, setBgImage] = createSignal<string | undefined>(undefined)

  onMount(async () => {
    setIsDarkMode(await darkMode.getValue())
    if (useCustomBackground) {
      setBgColor((await mainBackgroundColor.getValue()) || undefined)
      setBgImage((await mainBackgroundImage.getValue()) || undefined)

      mainBackgroundColor.watch(setBgColor)
      mainBackgroundImage.watch(setBgImage)
    }

    darkMode.watch(setIsDarkMode)
  })

  createEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode())
  })

  createEffect(() => {
    const hasBackgroundImage = useCustomBackground && !!bgImage()

    document.documentElement.style.setProperty(
      "--app-background-color",
      hasBackgroundImage
        ? "transparent"
        : useCustomBackground
          ? bgColor() || DEFAULT_VALUES.mainBackgroundColor
          : DEFAULT_VALUES.mainBackgroundColor
    )
    document.documentElement.style.setProperty(
      "--app-background-image",
      hasBackgroundImage ? `url(${bgImage()})` : "none"
    )
    document.documentElement.style.setProperty(
      "--app-background-size",
      hasBackgroundImage ? "cover" : "auto"
    )
    document.documentElement.style.setProperty(
      "--app-background-position",
      hasBackgroundImage ? "center" : "auto"
    )
  })
}

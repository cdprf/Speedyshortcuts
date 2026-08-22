import { animationStyles } from "./src/theme/animation-styles"
import { conditions } from "./src/theme/conditions"
import { globalCss } from "./src/theme/global-css"
import { keyframes } from "./src/theme/keyframes"
import { layerStyles } from "./src/theme/layer-styles"
import { recipes, slotRecipes } from "./src/theme/recipes"
import { textStyles } from "./src/theme/text-styles"
import { colors } from "./src/theme/tokens/colors"
import { durations } from "./src/theme/tokens/durations"
import { shadows } from "./src/theme/tokens/shadows"
import { zIndex } from "./src/theme/tokens/z-index"
import { defineConfig } from "@pandacss/dev"
import { createPreset } from "@park-ui/panda-preset"
import ruby from "@park-ui/panda-preset/colors/ruby"
import mauve from "@park-ui/panda-preset/colors/mauve"

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({ accentColor: ruby, grayColor: mauve, radius: "lg" }),
  ],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      animationStyles,
      recipes,
      slotRecipes,
      keyframes,
      layerStyles,
      textStyles,
      tokens: { colors, durations, zIndex },
      semanticTokens: {
        colors: {
          fg: {
            default: {
              value: { _light: "{colors.gray.12}", _dark: "{colors.gray.12}" },
            },
            muted: {
              value: { _light: "{colors.gray.11}", _dark: "{colors.gray.11}" },
            },
            subtle: {
              value: { _light: "{colors.gray.10}", _dark: "{colors.gray.10}" },
            },
          },
          border: {
            value: { _light: "{colors.gray.4}", _dark: "{colors.gray.4}" },
          },
          error: {
            value: { _light: "{colors.red.9}", _dark: "{colors.red.9}" },
          },
        },
        shadows,
      },
    },
  },
  jsxFramework: "solid",
  outdir: "styled-system",
  plugins: [
    {
      name: "Remove Panda Preset Colors",
      hooks: {
        "preset:resolved": ({ utils, preset, name }) =>
          name === "@pandacss/preset-panda"
            ? utils.omit(preset, [
                "theme.tokens.colors",
                "theme.semanticTokens.colors",
              ])
            : preset,
      },
    },
  ],
  globalCss,
  conditions,
})

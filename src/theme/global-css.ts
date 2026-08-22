export const globalCss = {
  extend: {
    "*": {
      "--global-color-border": "colors.border",
      "--global-color-placeholder": "colors.fg.subtle",
      // TODO: add a primary color for selection and focus ring
      // "--global-color-selection": "colors.colorPalette.subtle.bg",
      "--global-color-focus-ring": "colors.colorPalette.solid.bg",
    },
    html: { colorPalette: "ruby" },
    body: { background: "canvas", color: "fg.default" },
  },
}

import { icons, type LucideProps } from "lucide-solid"
import { splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import { DEFAULT_FOLDER_ICON } from "~/stores"

export type LucideIconName = keyof typeof icons

type FolderIconGlyphProps = LucideProps & { name?: string }

export const isLucideIconName = (
  iconName?: string
): iconName is LucideIconName =>
  !!iconName && Object.prototype.hasOwnProperty.call(icons, iconName)

export const FolderIconGlyph = (props: FolderIconGlyphProps) => {
  const [local, iconProps] = splitProps(props, ["name"])
  const icon = () =>
    isLucideIconName(local.name)
      ? icons[local.name]
      : icons[DEFAULT_FOLDER_ICON]

  return <Dynamic component={icon()} {...iconProps} />
}

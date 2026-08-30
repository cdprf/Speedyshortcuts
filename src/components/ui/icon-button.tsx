import { splitProps } from "solid-js"
import { Button, type ButtonProps, type ButtonVariant } from "./button"

type LegacyIconButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export type IconButtonProps = Omit<ButtonProps, "size" | "variant"> & {
  variant?: ButtonVariant
  size?: LegacyIconButtonSize
}

export const IconButton = (props: IconButtonProps) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size"])

  return (
    <Button
      {...rest}
      class={local.class}
      size={`icon-${local.size ?? "md"}`}
      variant={local.variant}
    />
  )
}

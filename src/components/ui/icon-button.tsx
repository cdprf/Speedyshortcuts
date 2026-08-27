import { ark } from "@ark-ui/solid"
import { splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"
import { buttonClass, type ButtonSize, type ButtonVariant } from "./button"

export type IconButtonProps = ComponentProps<typeof ark.button> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const IconButton = (props: IconButtonProps) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size"])

  return (
    <ark.button
      {...rest}
      class={cn(
        buttonClass(local.variant, local.size, true),
        local.class as string | undefined
      )}
    />
  )
}

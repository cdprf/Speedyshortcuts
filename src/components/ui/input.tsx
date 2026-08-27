import { ark } from "@ark-ui/solid"
import { splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"

export type InputSize = "2xs" | "md"
export type InputProps = ComponentProps<typeof ark.input> & { size?: InputSize }

export const Input = (props: InputProps) => {
  const [local, rest] = splitProps(props, ["class", "size"])

  return (
    <ark.input
      {...rest}
      class={cn(
        "input",
        `input--size_${local.size ?? "md"}`,
        local.class as string | undefined
      )}
    />
  )
}

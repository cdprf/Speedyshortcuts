import { splitProps, type JSX } from "solid-js"
import { cn } from "~/utils/cn"

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl"
export type TextProps = JSX.HTMLAttributes<HTMLParagraphElement> & {
  size?: TextSize
}

export const Text = (props: TextProps) => {
  const [local, rest] = splitProps(props, ["class", "size"])

  return (
    <p
      {...rest}
      class={cn("text", local.size && `text--size_${local.size}`, local.class)}
    />
  )
}

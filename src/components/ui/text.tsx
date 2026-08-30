import { splitProps, type JSX } from "solid-js"
import { cn } from "~/utils/cn"

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl"
export type TextProps = JSX.HTMLAttributes<HTMLParagraphElement> & {
  size?: TextSize
}

const textSizeClasses: Record<TextSize, string> = {
  xs: "text-xs leading-4",
  sm: "text-sm leading-5",
  md: "text-base leading-6",
  lg: "text-lg leading-7",
  xl: "text-xl leading-7",
}

export const Text = (props: TextProps) => {
  const [local, rest] = splitProps(props, ["class", "size"])

  return (
    <p {...rest} class={cn(textSizeClasses[local.size ?? "md"], local.class)} />
  )
}

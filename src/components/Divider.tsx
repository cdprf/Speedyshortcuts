import type { JSX } from "solid-js"
import { cn } from "~/utils/cn"

export type DividerProps = JSX.HTMLAttributes<HTMLHRElement>

export const Divider = (props: DividerProps) => (
  <hr {...props} class={cn("divider", props.class)} />
)

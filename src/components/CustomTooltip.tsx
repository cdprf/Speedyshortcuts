import { splitProps, type ComponentProps, type JSX } from "solid-js"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipRootProps,
} from "./ui/tooltip"

type CustomTooltipProps = Omit<TooltipRootProps, "children"> & {
  content: JSX.Element
  class?: string
  children: NonNullable<ComponentProps<typeof TooltipTrigger>["asChild"]>
}

export const CustomTooltip = (props: CustomTooltipProps) => {
  const [local, rootProps] = splitProps(props, ["content", "class", "children"])

  return (
    <Tooltip {...rootProps}>
      <TooltipTrigger asChild={local.children} />
      <TooltipContent class={local.class}>{local.content}</TooltipContent>
    </Tooltip>
  )
}

import {
  Tooltip as ArkTooltip,
  TooltipContext,
  useTooltipContext,
} from "@ark-ui/solid"
import { splitProps, type ComponentProps, type JSX } from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "~/utils/cn"

export const useTooltip = useTooltipContext

export type TooltipRootProviderProps = ComponentProps<
  typeof ArkTooltip.RootProvider
>
export type TooltipRootProps = ComponentProps<typeof ArkTooltip.Root>

export const TooltipRoot = (props: TooltipRootProps) => {
  const [local, rest] = splitProps(props, [
    "positioning",
    "lazyMount",
    "unmountOnExit",
    "closeDelay",
    "openDelay",
  ])

  return (
    <ArkTooltip.Root
      closeDelay={local.closeDelay ?? 100}
      data-slot="tooltip"
      lazyMount={local.lazyMount ?? true}
      openDelay={local.openDelay ?? 0}
      positioning={local.positioning ?? { placement: "top" }}
      unmountOnExit={local.unmountOnExit ?? true}
      {...rest}
    />
  )
}

export const TooltipTrigger = (
  props: ComponentProps<typeof ArkTooltip.Trigger>
) => <ArkTooltip.Trigger data-slot="tooltip-trigger" {...props} />

export const TooltipContent = (
  props: ComponentProps<typeof ArkTooltip.Content>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <Portal>
      <ArkTooltip.Positioner data-slot="tooltip-positioner">
        <ArkTooltip.Content
          class={cn(
            "z-50 w-fit",
            "px-3 py-1.5",
            "bg-foreground",
            "text-background text-xs",
            "rounded-lg shadow-lg/5",
            "origin-(--transform-origin) animate-in",
            "fade-in-0 zoom-in-[98%]",
            "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[98%]",
            "data-[state=closed]:animate-out",
            "data-[placement=bottom]:slide-in-from-top-2",
            "data-[placement=left]:slide-in-from-end-2",
            "data-[placement=right]:slide-in-from-start-2",
            "data-[placement=top]:slide-in-from-bottom-2",
            "motion-reduce:animate-none!",
            local.class
          )}
          data-slot="tooltip-content"
          {...rest}
        >
          <TooltipArrow />

          {local.children}
        </ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </Portal>
  )
}

export const TooltipArrow = (
  props: ComponentProps<typeof ArkTooltip.Arrow>
) => {
  const [local, rest] = splitProps(props, ["style"])
  const style = () => {
    const base = {
      "--arrow-background": "var(--foreground)",
      "--arrow-size": "calc(1.5 * var(--spacing))",
    } as JSX.CSSProperties

    return typeof local.style === "object"
      ? ({ ...base, ...local.style } as JSX.CSSProperties)
      : base
  }

  return (
    <ArkTooltip.Arrow data-slot="tooltip-arrow" style={style()} {...rest}>
      <ArkTooltip.ArrowTip />
    </ArkTooltip.Arrow>
  )
}

export const Tooltip = Object.assign(TooltipRoot, {
  RootProvider: ArkTooltip.RootProvider,
  Root: TooltipRoot,
  Arrow: TooltipArrow,
  Content: TooltipContent,
  Trigger: TooltipTrigger,
  Context: TooltipContext,
})

import { Tooltip as ArkTooltip, TooltipContext } from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const RootProvider = ArkTooltip.RootProvider
const Root = ArkTooltip.Root
const Arrow = withClass(ArkTooltip.Arrow, "tooltip__arrow")
const ArrowTip = withClass(ArkTooltip.ArrowTip, "tooltip__arrowTip")
const Content = withClass(ArkTooltip.Content, "tooltip__content")
const Positioner = withClass(ArkTooltip.Positioner, "tooltip__positioner")
const Trigger = withClass(ArkTooltip.Trigger, "tooltip__trigger")

export type TooltipRootProviderProps = ComponentProps<typeof RootProvider>
export type TooltipRootProps = ComponentProps<typeof Root>

export const Tooltip = {
  RootProvider,
  Root,
  Arrow,
  ArrowTip,
  Content,
  Positioner,
  Trigger,
  Context: TooltipContext,
}

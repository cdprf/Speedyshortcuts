import { ark } from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const Root = withClass(
  ark.div,
  "flex w-full gap-3 rounded-xl border border-border bg-background p-4"
)
const Content = withClass(ark.div, "flex flex-col gap-1")
const Description = withClass(
  ark.div,
  "text-sm leading-5 text-muted-foreground"
)
const Icon = withClass(ark.svg, "size-5 shrink-0 text-foreground")
const Title = withClass(
  ark.h5,
  "text-sm leading-5 font-semibold text-foreground"
)

export type AlertRootProps = ComponentProps<typeof Root>

export const Alert = { Root, Content, Description, Icon, Title }

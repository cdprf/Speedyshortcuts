import { ark } from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const Root = withClass(ark.div, "alert__root")
const Content = withClass(ark.div, "alert__content")
const Description = withClass(ark.div, "alert__description")
const Icon = withClass(ark.svg, "alert__icon")
const Title = withClass(ark.h5, "alert__title")

export type AlertRootProps = ComponentProps<typeof Root>

export const Alert = { Root, Content, Description, Icon, Title }

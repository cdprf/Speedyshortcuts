import { ark } from "@ark-ui/solid"
import { splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"

export type AlertVariant =
  "default" | "destructive" | "info" | "warning" | "success"

const alertVariantClass: Record<AlertVariant, string> = {
  default:
    "bg-input/4 [&_svg]:text-muted-foreground [&_[data-slot=alert-action]_[data-variant=ghost]]:hover:bg-muted",
  destructive:
    "border-destructive/32 bg-destructive/4 [&_svg]:text-destructive [&_[data-slot=alert-action]_[data-variant=ghost]]:hover:bg-destructive/10",
  info: "border-info/32 bg-info/4 [&_svg]:text-info [&_[data-slot=alert-action]_[data-variant=ghost]]:hover:bg-info/10",
  warning:
    "border-warning/32 bg-warning/4 [&_svg]:text-warning [&_[data-slot=alert-action]_[data-variant=ghost]]:hover:bg-warning/10",
  success:
    "border-success/32 bg-success/4 [&_svg]:text-success [&_[data-slot=alert-action]_[data-variant=ghost]]:hover:bg-success/10",
}

export const alertVariants = (options?: { variant?: AlertVariant }) =>
  cn(
    "relative grid w-full items-start gap-x-2 gap-y-0.5 rounded-xl border px-3.5 py-3 text-card-foreground text-sm",
    "has-[>svg]:has-data-[slot=alert-action]:grid-cols-[--spacing(4)_1fr_auto] has-[>svg]:grid-cols-[--spacing(4)_1fr]",
    "has-[>svg]:gap-x-2 [&_svg]:h-lh [&_svg]:w-4",
    "has-data-[slot=alert-action]:grid-cols-[1fr_auto]",
    alertVariantClass[options?.variant ?? "default"]
  )

export type AlertProps = ComponentProps<typeof ark.div> & {
  variant?: AlertVariant
}

export const AlertRoot = (props: AlertProps) => {
  const [local, rest] = splitProps(props, ["variant", "class"])
  const variant = () => local.variant ?? "default"

  return (
    <ark.div
      class={cn(alertVariants({ variant: variant() }), local.class)}
      data-slot="alert"
      {...rest}
    />
  )
}

export const AlertTitle = (props: ComponentProps<typeof ark.div>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ark.div
      class={cn("font-heading font-medium [svg~&]:col-start-2", local.class)}
      data-slot="alert-title"
      {...rest}
    />
  )
}

export const AlertDescription = (props: ComponentProps<typeof ark.div>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ark.div
      class={cn(
        "flex flex-col gap-2.5 text-muted-foreground [svg~&]:col-start-2",
        local.class
      )}
      data-slot="alert-description"
      {...rest}
    />
  )
}

export const AlertAction = (props: ComponentProps<typeof ark.div>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ark.div
      class={cn(
        "flex gap-1 max-sm:col-start-2 max-sm:mt-2",
        "sm:[svg~[data-slot=alert-title]~&]:col-start-3",
        "sm:row-start-1 sm:row-end-3 sm:self-center",
        "sm:[[data-slot=alert-description]~&]:col-start-2",
        "sm:[[data-slot=alert-title]~&]:col-start-2",
        "sm:[svg~&]:col-start-2",
        "sm:[svg~[data-slot=alert-description]~&]:col-start-3",
        local.class
      )}
      data-slot="alert-action"
      {...rest}
    />
  )
}

export type AlertRootProps = AlertProps

export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
  Action: AlertAction,
})

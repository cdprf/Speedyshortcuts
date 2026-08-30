import { Dialog as ArkDialog, ark, useDialogContext } from "@ark-ui/solid"
import { XIcon } from "lucide-solid"
import { Show, children, splitProps, type ComponentProps } from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "~/utils/cn"
import { Button } from "./button"
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "./dialog"

export const useSheet = useDialogContext

export const SheetRoot = (props: ComponentProps<typeof Dialog>) => (
  <Dialog data-slot="sheet" {...props} />
)

export const SheetTrigger = (
  props: ComponentProps<typeof ArkDialog.Trigger>
) => <ArkDialog.Trigger data-slot="sheet-trigger" {...props} />

export const SheetOverlay = (props: ComponentProps<typeof DialogOverlay>) => (
  <DialogOverlay data-slot="sheet-overlay" {...props} />
)

export type SheetPlacement = "top" | "right" | "bottom" | "left"
export type SheetVariant = "default" | "inset"

export type SheetPositionerVariantOptions = {
  placement?: SheetPlacement
  variant?: SheetVariant
}

export const sheetPositionerVariants = (
  options: SheetPositionerVariantOptions = {}
) => {
  const placement = options.placement ?? "right"
  const variant = options.variant ?? "default"

  return cn(
    "[--inset:--spacing(0)] fixed inset-0 z-50 grid h-svh w-screen overflow-hidden",
    placement === "bottom" &&
      "grid grid-rows-[1fr_auto] not-data-[variant=inset]:pt-12",
    placement === "top" &&
      "grid grid-rows-[auto_1fr] not-data-[variant=inset]:pb-12",
    placement === "left" && "flex justify-start",
    placement === "right" && "flex justify-end",
    variant === "inset" &&
      cn(
        "px-(--inset) sm:[--inset:--spacing(4)]",
        "data-[placement=bottom]:pb-(--inset)",
        "data-[placement=top]:pt-(--inset)",
        "data-[placement=left]:pt-(--inset) data-[placement=left]:pb-(--inset)",
        "data-[placement=right]:pt-(--inset) data-[placement=right]:pb-(--inset)"
      )
  )
}

export type SheetPositionerProps = ComponentProps<typeof ArkDialog.Positioner> &
  SheetPositionerVariantOptions

export const SheetPositioner = (props: SheetPositionerProps) => {
  const [local, rest] = splitProps(props, ["variant", "placement", "class"])
  const placement = () => local.placement ?? "right"
  const variant = () => local.variant ?? "default"

  return (
    <ArkDialog.Positioner
      {...rest}
      class={cn(
        sheetPositionerVariants({ placement: placement(), variant: variant() }),
        local.class
      )}
      data-placement={placement()}
      data-slot="sheet-positioner"
      data-variant={variant()}
    />
  )
}

export type SheetContentVariantOptions = {
  placement?: SheetPlacement
  variant?: SheetVariant
}

export const sheetContentVariants = (
  options: SheetContentVariantOptions = {}
) => {
  const placement = options.placement ?? "right"
  const variant = options.variant ?? "default"

  return cn(
    "[--space:--spacing(6)] relative max-h-full min-h-0 w-full min-w-0",
    "flex flex-col bg-popover text-popover-foreground shadow-lg/5",
    "transition-[opacity,translate] duration-200 ease-in-out will-change-transform",
    "data-[state=closed]:fade-out-0 data-[state=closed]:animate-out",
    "data-[state=open]:fade-in-0 data-[state=open]:animate-in",
    "motion-reduce:animate-none! motion-reduce:transition-none!",
    placement === "bottom" &&
      "row-start-2 border-t data-[state=closed]:slide-in-from-bottom-10 data-[state=open]:slide-in-from-bottom-10",
    placement === "top" &&
      "border-b data-[state=closed]:slide-out-to-top-10 data-[state=open]:slide-in-from-top-10",
    placement === "left" &&
      "col-start-2 w-[calc(100%-(--spacing(12)))] max-w-md border-e data-[state=closed]:slide-out-to-start-10 data-[state=open]:slide-in-from-start-10",
    placement === "right" &&
      "col-start-2 w-[calc(100%-(--spacing(12)))] max-w-md border-s data-[state=closed]:slide-out-to-end-10 data-[state=open]:slide-in-from-end-10",
    variant === "inset" &&
      "sm:rounded-2xl sm:border sm:**:data-[slot=sheet-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]"
  )
}

export type SheetContentProps = ComponentProps<typeof ArkDialog.Content> &
  SheetContentVariantOptions & {
    /** Show the close button at the top right. @default true */
    showCloseButton?: boolean
  }

export const SheetContent = (props: SheetContentProps) => {
  const [local, rest] = splitProps(props, [
    "showCloseButton",
    "placement",
    "variant",
    "class",
    "children",
  ])
  const showCloseButton = () => local.showCloseButton ?? true
  const placement = () => local.placement ?? "right"
  const variant = () => local.variant ?? "default"

  return (
    <Portal>
      <SheetOverlay />

      <SheetPositioner placement={placement()} variant={variant()}>
        <ArkDialog.Content
          {...rest}
          class={cn(
            sheetContentVariants({
              placement: placement(),
              variant: variant(),
            }),
            local.class
          )}
          data-slot="sheet-content"
        >
          {local.children}

          <Show when={showCloseButton()}>
            <SheetClose
              asChild={(closeProps) => (
                <Button
                  {...closeProps()}
                  aria-label="Close"
                  class="absolute inset-e-2 top-2 opacity-64 hover:opacity-100"
                  size="icon-sm"
                  variant="ghost"
                >
                  <XIcon aria-hidden="true" />
                </Button>
              )}
            />
          </Show>
        </ArkDialog.Content>
      </SheetPositioner>
    </Portal>
  )
}

export type SheetHeaderProps = ComponentProps<typeof DialogHeader>

export const SheetHeader = (props: SheetHeaderProps) => {
  const [local, rest] = splitProps(props, [
    "class",
    "title",
    "description",
    "children",
  ])
  const resolvedChildren = children(() => local.children)

  return (
    <ark.div
      {...rest}
      class={cn(
        "flex shrink-0 flex-col gap-2 p-(--space)",
        "in-[[data-slot=sheet-content]:has([data-slot=sheet-body])]:pb-3",
        local.class
      )}
      data-slot="sheet-header"
    >
      <Show when={local.title}>
        {(title) => <SheetTitle>{title()}</SheetTitle>}
      </Show>
      <Show when={local.description}>
        {(description) => <SheetDescription>{description()}</SheetDescription>}
      </Show>
      <Show
        when={!local.title && typeof resolvedChildren() === "string"}
        fallback={resolvedChildren()}
      >
        <SheetTitle>{resolvedChildren()}</SheetTitle>
      </Show>
    </ark.div>
  )
}

export const SheetTitle = (props: ComponentProps<typeof DialogTitle>) => (
  <DialogTitle data-slot="sheet-title" {...props} />
)

export const SheetDescription = (
  props: ComponentProps<typeof DialogDescription>
) => <DialogDescription data-slot="sheet-description" {...props} />

export const SheetBody = (props: ComponentProps<typeof DialogBody>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DialogBody
      {...rest}
      class={cn(
        "in-[[data-slot=sheet-content]:has([data-slot=sheet-header])]:pt-0",
        local.class
      )}
      data-slot="sheet-body"
    />
  )
}

export const SheetClose = (
  props: ComponentProps<typeof ArkDialog.CloseTrigger>
) => <ArkDialog.CloseTrigger data-slot="sheet-close" {...props} />

export const SheetFooter = (props: ComponentProps<typeof DialogFooter>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DialogFooter
      {...rest}
      class={cn("sm:rounded-none", local.class)}
      data-slot="sheet-footer"
    />
  )
}

export const Sheet = Object.assign(SheetRoot, {
  RootProvider: ArkDialog.RootProvider,
  Root: SheetRoot,
  Backdrop: SheetOverlay,
  Overlay: SheetOverlay,
  CloseTrigger: SheetClose,
  Close: SheetClose,
  Content: SheetContent,
  Description: SheetDescription,
  Positioner: SheetPositioner,
  Title: SheetTitle,
  Trigger: SheetTrigger,
  Header: SheetHeader,
  Body: SheetBody,
  Footer: SheetFooter,
  Context: ArkDialog.Context,
})

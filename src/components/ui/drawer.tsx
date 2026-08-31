import { Drawer as ArkDrawer, ark, useDrawerContext } from "@ark-ui/solid"
import { Show, children, splitProps, type ComponentProps } from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "~/utils/cn"
import { ScrollArea } from "./scroll-area"

export const useDrawer = useDrawerContext

export const DrawerRoot = (props: ComponentProps<typeof ArkDrawer.Root>) => (
  <ArkDrawer.Root
    data-slot="drawer"
    lazyMount={props.lazyMount ?? false}
    unmountOnExit={props.unmountOnExit ?? false}
    {...props}
  />
)

export const DrawerTrigger = (
  props: ComponentProps<typeof ArkDrawer.Trigger>
) => <ArkDrawer.Trigger data-slot="drawer-trigger" {...props} />

export const DrawerOverlay = (
  props: ComponentProps<typeof ArkDrawer.Backdrop>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkDrawer.Backdrop
      {...rest}
      class={cn(
        "fixed inset-0 bg-black/32 backdrop-blur-xs",
        "[--drawer-overlay-opacity:calc(1-var(--drawer-swipe-progress,0))] opacity-(--drawer-overlay-opacity)",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "motion-reduce:animate-none!",
        local.class
      )}
      data-slot="drawer-overlay"
    />
  )
}

export type DrawerVariant = "default" | "inset"
export type DrawerPlacement = "top" | "right" | "bottom" | "left"

export type DrawerPositionerProps = ComponentProps<
  typeof ArkDrawer.Positioner
> & { variant?: DrawerVariant; placement?: DrawerPlacement }

export const DrawerPositioner = (props: DrawerPositionerProps) => {
  const [local, rest] = splitProps(props, ["variant", "placement", "class"])
  const placement = () => local.placement ?? "bottom"

  return (
    <ArkDrawer.Positioner
      {...rest}
      class={cn(
        "fixed inset-0 flex w-screen",
        placement() === "bottom" && "items-end justify-center",
        placement() === "top" && "items-start justify-center",
        placement() === "left" && "items-stretch justify-start",
        placement() === "right" && "items-stretch justify-end",
        local.variant === "inset" &&
          cn(
            "sm:p-4",
            (placement() === "top" || placement() === "bottom") && "sm:py-4"
          ),
        local.class
      )}
      data-slot="drawer-positioner"
    />
  )
}

export type DrawerContentProps = ComponentProps<typeof ArkDrawer.Content> & {
  variant?: DrawerVariant
  placement?: DrawerPlacement
}

export const DrawerContent = (props: DrawerContentProps) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "placement",
    "class",
    "children",
  ])
  const placement = () => local.placement ?? "bottom"

  return (
    <Portal>
      <DrawerOverlay />
      <DrawerPositioner placement={placement()} variant={local.variant}>
        <ArkDrawer.Content
          {...rest}
          class={cn(
            "[--space:--spacing(6)] relative flex min-h-0 flex-col bg-popover text-popover-foreground outline-none",
            "translate-y-[calc(-1.25rem*var(--nested-layer-count))] scale-[calc(1-0.1*var(--nested-layer-count))] opacity-[calc(1-0.1*var(--nested-layer-count))]",
            "data-swiping:select-none motion-reduce:animate-none!",
            placement() === "bottom" &&
              "[--bleed:3rem] -mb-(--bleed) max-h-[calc(80vh+var(--bleed))] w-full rounded-t-2xl pb-[calc(1.5rem+env(safe-area-inset-bottom,0)+var(--bleed))] data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom",
            placement() === "top" &&
              "max-h-[80vh] w-full rounded-b-2xl data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:animate-in data-[state=open]:slide-in-from-top",
            placement() === "left" &&
              "h-full w-[calc(100%-(--spacing(12)))] max-w-md rounded-e-2xl border-e data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:slide-in-from-left",
            placement() === "right" &&
              "h-full w-[calc(100%-(--spacing(12)))] max-w-md rounded-s-2xl border-s data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
            local.variant === "inset" &&
              "sm:rounded-2xl sm:border sm:**:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",
            local.class
          )}
          data-slot="drawer-content"
        >
          <Show when={placement() === "top" || placement() === "bottom"}>
            <DrawerGrabber />
          </Show>
          {local.children}
        </ArkDrawer.Content>
      </DrawerPositioner>
    </Portal>
  )
}

export const DrawerGrabber = (
  props: ComponentProps<typeof ArkDrawer.Grabber>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkDrawer.Grabber
      {...rest}
      class={cn(
        "flex h-7 shrink-0 cursor-grab touch-none items-center justify-center active:cursor-grabbing",
        "data-[swipe-direction=start]:hidden data-[swipe-direction=end]:hidden",
        local.class
      )}
      data-slot="drawer-grabber"
    >
      <ArkDrawer.GrabberIndicator
        class="h-1 w-10 rounded-full bg-muted-foreground/30"
        data-slot="drawer-grabber-indicator"
      />
    </ArkDrawer.Grabber>
  )
}

export type DrawerHeaderProps = ComponentProps<typeof ark.div> & {
  description?: string
  title?: string
}

export const DrawerHeader = (props: DrawerHeaderProps) => {
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
      class={cn("flex shrink-0 flex-col gap-2 p-(--space)", local.class)}
      data-slot="drawer-header"
    >
      <Show when={local.title}>
        {(title) => <DrawerTitle>{title()}</DrawerTitle>}
      </Show>
      <Show when={local.description}>
        {(description) => (
          <DrawerDescription>{description()}</DrawerDescription>
        )}
      </Show>
      <Show
        when={!local.title && typeof resolvedChildren() === "string"}
        fallback={resolvedChildren()}
      >
        <DrawerTitle>{resolvedChildren()}</DrawerTitle>
      </Show>
    </ark.div>
  )
}

export const DrawerTitle = (props: ComponentProps<typeof ArkDrawer.Title>) => (
  <ArkDrawer.Title
    {...props}
    class={cn("font-heading font-semibold text-lg leading-none", props.class)}
    data-slot="drawer-title"
  />
)

export const DrawerDescription = (
  props: ComponentProps<typeof ArkDrawer.Description>
) => (
  <ArkDrawer.Description
    {...props}
    class={cn("text-muted-foreground text-sm", props.class)}
    data-slot="drawer-description"
  />
)

export type DrawerBodyProps = ComponentProps<typeof ark.div> & {
  scrollFade?: boolean
}

export const DrawerBody = (props: DrawerBodyProps) => {
  const [local, rest] = splitProps(props, ["scrollFade", "class"])

  return (
    <ScrollArea class="min-h-0 flex-1" scrollFade={local.scrollFade}>
      <ark.div
        {...rest}
        class={cn("px-(--space) pb-6", local.class)}
        data-slot="drawer-body"
      />
    </ScrollArea>
  )
}

export const DrawerClose = (
  props: ComponentProps<typeof ArkDrawer.CloseTrigger>
) => <ArkDrawer.CloseTrigger data-slot="drawer-close-trigger" {...props} />

export const DrawerFooter = (props: ComponentProps<typeof ark.div>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ark.div
      {...rest}
      class={cn(
        "flex shrink-0 flex-col-reverse gap-2 border-t bg-muted/48 px-(--space) py-4 sm:flex-row sm:justify-end",
        local.class
      )}
      data-slot="drawer-footer"
    />
  )
}

export const Drawer = Object.assign(DrawerRoot, {
  RootProvider: ArkDrawer.RootProvider,
  Root: DrawerRoot,
  Backdrop: DrawerOverlay,
  Overlay: DrawerOverlay,
  CloseTrigger: DrawerClose,
  Close: DrawerClose,
  Content: DrawerContent,
  Description: DrawerDescription,
  Positioner: DrawerPositioner,
  Title: DrawerTitle,
  Trigger: DrawerTrigger,
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Grabber: DrawerGrabber,
  Context: ArkDrawer.Context,
})

import { Dialog as ArkDialog, ark, useDialogContext } from "@ark-ui/solid"
import { XIcon } from "lucide-solid"
import {
  Show,
  children,
  createContext,
  splitProps,
  useContext,
  type ComponentProps,
} from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "~/utils/cn"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"

export const useDialog = useDialogContext

type DialogStyleContextValue = {
  /** Used internally to show or hide the overlay. */
  readonly modal: boolean
}

const DialogStyleContext = createContext<DialogStyleContextValue>()

export const DialogRoot = (props: ComponentProps<typeof ArkDialog.Root>) => {
  const [local, rest] = splitProps(props, [
    "modal",
    "lazyMount",
    "unmountOnExit",
  ])
  const context = {
    get modal() {
      return local.modal ?? true
    },
  }

  return (
    <DialogStyleContext.Provider value={context}>
      <ArkDialog.Root
        {...rest}
        lazyMount={local.lazyMount ?? true}
        modal={context.modal}
        unmountOnExit={local.unmountOnExit ?? true}
      />
    </DialogStyleContext.Provider>
  )
}

export const DialogTrigger = (
  props: ComponentProps<typeof ArkDialog.Trigger>
) => <ArkDialog.Trigger {...props} />

export const dialogOverlayVariants = () =>
  cn(
    "peer fixed inset-0 z-50 bg-black/32 backdrop-blur-xs duration-200 peer-data-[slot=dialog-overlay]:hidden",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
    "motion-reduce:animate-none!"
  )

const useDialogStyle = () => {
  const context = useContext(DialogStyleContext)
  if (!context) throw new Error("useDialog must be used within Dialog")
  return context
}

export const DialogOverlay = (
  props: ComponentProps<typeof ArkDialog.Backdrop>
) => {
  const [local, rest] = splitProps(props, ["class"])
  const context = useDialogStyle()

  return (
    <Show when={context.modal}>
      <ArkDialog.Backdrop
        data-slot="dialog-overlay"
        {...rest}
        class={cn(dialogOverlayVariants(), local.class)}
      />
    </Show>
  )
}

export const DialogPositioner = (
  props: ComponentProps<typeof ArkDialog.Positioner>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkDialog.Positioner
      {...rest}
      class={cn(
        "fixed inset-0 z-50 grid h-svh w-screen grid-rows-[1fr_auto_3fr] justify-items-center p-4",
        local.class
      )}
      data-slot="dialog-positioner"
    />
  )
}

export type DialogSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "fullscreen"

const dialogSizeClasses: Record<DialogSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-xl",
  xl: "max-w-2xl",
  "2xl": "max-w-3xl",
  "3xl": "max-w-4xl",
  "4xl": "max-w-5xl",
  "5xl": "max-w-6xl",
  "6xl": "max-w-7xl",
  fullscreen: "size-full",
}

export type DialogContentVariantOptions = {
  size?: DialogSize
  bottomStickOnMobile?: boolean
}

export const dialogContentVariants = (
  options: DialogContentVariantOptions = {}
) => {
  const size = options.size ?? "md"

  return cn(
    "[--space:--spacing(6)] relative row-start-2 z-[calc(50+var(--layer-index,0))]",
    "max-h-[calc(100svh-2rem)] min-h-0 w-full min-w-0",
    "flex flex-col overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-lg/5 outline-none",
    "translate-y-[calc(-1.25rem*var(--nested-layer-count))]",
    "scale-[calc(1-0.1*var(--nested-layer-count))] opacity-[calc(1-0.1*var(--nested-layer-count))]",
    "transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform",
    "data-[nested=dialog]:data-[state=closed]:slide-in-from-bottom-10 data-[nested=dialog]:data-[state=open]:slide-in-from-bottom-10 data-[has-nested=dialog]:origin-top",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[98%]",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[98%]",
    "motion-reduce:animate-none! motion-reduce:transition-none!",
    dialogSizeClasses[size],
    options.bottomStickOnMobile &&
      cn(
        "max-sm:max-h-[calc(100svh-3rem)] max-sm:max-w-none",
        "max-sm:rounded-none max-sm:rounded-t-2xl max-sm:border-x-0 max-sm:border-t max-sm:border-b-0",
        "max-sm:opacity-[calc(1-min(var(--nested-dialogs),1))]",
        "max-sm:data-[state=closed]:slide-out-to-bottom-5 max-sm:data-[state=open]:slide-in-from-bottom-5",
        "max-sm:data-[state=closed]:zoom-out-100 max-sm:data-[state=open]:zoom-in-100"
      )
  )
}

export type DialogContentProps = ComponentProps<typeof ArkDialog.Content> &
  DialogContentVariantOptions & {
    /** Show the close button at the top right. @default true */
    showCloseButton?: boolean
  }

export const DialogContent = (props: DialogContentProps) => {
  const [local, rest] = splitProps(props, [
    "showCloseButton",
    "bottomStickOnMobile",
    "size",
    "class",
    "children",
  ])
  const showCloseButton = () => local.showCloseButton ?? true
  const bottomStickOnMobile = () => local.bottomStickOnMobile ?? true

  return (
    <Portal>
      <DialogOverlay />
      <DialogPositioner
        class={cn(
          bottomStickOnMobile() &&
            "max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-12"
        )}
      >
        <ArkDialog.Content
          {...rest}
          class={cn(
            dialogContentVariants({
              size: local.size ?? "md",
              bottomStickOnMobile: bottomStickOnMobile(),
            }),
            local.class
          )}
          data-slot="dialog-content"
        >
          {local.children}

          <Show when={showCloseButton()}>
            <DialogClose
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
      </DialogPositioner>
    </Portal>
  )
}

export type DialogBodyProps = ComponentProps<typeof ark.div> & {
  /** Add a fade effect to the scroll area. @default false */
  scrollFade?: boolean
}

export const DialogBody = (props: DialogBodyProps) => {
  const [local, rest] = splitProps(props, ["scrollFade", "class"])

  return (
    <ScrollArea class="min-h-0 flex-1" scrollFade={local.scrollFade}>
      <ark.div
        data-slot="dialog-body"
        {...rest}
        class={cn(
          "p-(--space)",
          "in-[[data-slot=dialog-content]:has([data-slot=dialog-header])]:pt-0",
          "in-[[data-slot=dialog-content]:has([data-slot=dialog-footer]:not(.border-t))]:pb-1",
          local.class
        )}
      />
    </ScrollArea>
  )
}

export type DialogHeaderProps = ComponentProps<typeof ark.div> & {
  description?: string
  title?: string
}

export const DialogHeader = (props: DialogHeaderProps) => {
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
        "in-[[data-slot=dialog-content]:has([data-slot=dialog-body])]:pb-3",
        local.class
      )}
      data-slot="dialog-header"
    >
      <Show when={local.title}>
        {(title) => <DialogTitle>{title()}</DialogTitle>}
      </Show>
      <Show when={local.description}>
        {(description) => (
          <DialogDescription>{description()}</DialogDescription>
        )}
      </Show>
      <Show
        when={!local.title && typeof resolvedChildren() === "string"}
        fallback={resolvedChildren()}
      >
        <DialogTitle>{resolvedChildren()}</DialogTitle>
      </Show>
    </ark.div>
  )
}

export const DialogTitle = (props: ComponentProps<typeof ArkDialog.Title>) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkDialog.Title
      data-slot="dialog-title"
      {...rest}
      class={cn("font-heading font-semibold text-lg leading-none", local.class)}
    />
  )
}

export const DialogDescription = (
  props: ComponentProps<typeof ArkDialog.Description>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkDialog.Description
      data-slot="dialog-description"
      {...rest}
      class={cn("text-muted-foreground text-sm", local.class)}
    />
  )
}

export const DialogClose = (
  props: ComponentProps<typeof ArkDialog.CloseTrigger>
) => <ArkDialog.CloseTrigger data-slot="dialog-close-trigger" {...props} />

export const DialogFooter = (props: ComponentProps<typeof ark.div>) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ark.div
      data-slot="dialog-footer"
      {...rest}
      class={cn(
        "flex shrink-0 flex-col-reverse gap-2 border-t bg-muted/48 px-(--space) py-4",
        "sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-2xl)-1px)]",
        local.class
      )}
    />
  )
}

export type DialogRootProps = ComponentProps<typeof DialogRoot>
export type DialogRootProviderProps = ComponentProps<
  typeof ArkDialog.RootProvider
>

export const Dialog = Object.assign(DialogRoot, {
  RootProvider: ArkDialog.RootProvider,
  Root: DialogRoot,
  Backdrop: DialogOverlay,
  Overlay: DialogOverlay,
  CloseTrigger: DialogClose,
  Close: DialogClose,
  Content: DialogContent,
  Description: DialogDescription,
  Positioner: DialogPositioner,
  Title: DialogTitle,
  Trigger: DialogTrigger,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Context: ArkDialog.Context,
})

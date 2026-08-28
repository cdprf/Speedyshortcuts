import { Dialog as ArkDialog, DialogContext } from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const RootProvider = ArkDialog.RootProvider
const Root = ArkDialog.Root
const Backdrop = withClass(ArkDialog.Backdrop, "dialog__backdrop")
const CloseTrigger = withClass(ArkDialog.CloseTrigger, "dialog__closeTrigger")
const Content = withClass(
  ArkDialog.Content,
  "relative min-w-96 rounded-xl bg-background shadow-(--shadows-lg) [[open]]:animate-[slide-in_0.4s_var(--easing-emphasized-in)] data-open:animate-[slide-in_0.4s_var(--easing-emphasized-in)] data-[state=open]:animate-[slide-in_0.4s_var(--easing-emphasized-in)] [[closed]]:animate-[slide-out_0.2s_var(--easing-emphasized-out)] data-closed:animate-[slide-out_0.2s_var(--easing-emphasized-out)] data-[state=closed]:animate-[slide-out_0.2s_var(--easing-emphasized-out)]"
)
const Description = withClass(
  ArkDialog.Description,
  "text-sm leading-5 text-muted-foreground"
)
const Positioner = withClass(
  ArkDialog.Positioner,
  "fixed top-0 left-0 z-1400 flex h-dvh w-screen items-center justify-center overflow-auto"
)
const Title = withClass(ArkDialog.Title, "text-lg leading-7 font-semibold")
const Trigger = withClass(ArkDialog.Trigger, "dialog__trigger")

export type DialogRootProviderProps = ComponentProps<typeof RootProvider>
export type DialogRootProps = ComponentProps<typeof Root>

export const Dialog = {
  RootProvider,
  Root,
  Backdrop,
  CloseTrigger,
  Content,
  Description,
  Positioner,
  Title,
  Trigger,
  Context: DialogContext,
}

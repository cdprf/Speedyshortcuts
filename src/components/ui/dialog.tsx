import { Dialog as ArkDialog, DialogContext } from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const RootProvider = ArkDialog.RootProvider
const Root = ArkDialog.Root
const Backdrop = withClass(ArkDialog.Backdrop, "dialog__backdrop")
const CloseTrigger = withClass(ArkDialog.CloseTrigger, "dialog__closeTrigger")
const Content = withClass(ArkDialog.Content, "dialog__content")
const Description = withClass(ArkDialog.Description, "dialog__description")
const Positioner = withClass(ArkDialog.Positioner, "dialog__positioner")
const Title = withClass(ArkDialog.Title, "dialog__title")
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

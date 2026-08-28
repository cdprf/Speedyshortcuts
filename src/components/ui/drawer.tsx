import {
  Dialog as ArkDialog,
  DialogContext,
  ark,
  type DialogContextProps,
} from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const RootProvider = ArkDialog.RootProvider
const Root = ArkDialog.Root
const Backdrop = withClass(ArkDialog.Backdrop, "drawer__backdrop")
const CloseTrigger = withClass(ArkDialog.CloseTrigger, "drawer__closeTrigger")
const Content = withClass(
  ArkDialog.Content,
  "grid h-full w-full grid-cols-1 grid-rows-[auto_1fr_auto] bg-background shadow-(--shadows-lg) [grid-template-areas:'header'_'body'_'footer'] [&>:not([hidden])~:not([hidden])]:border-t [&>:not([hidden])~:not([hidden])]:border-border [[hidden]]:hidden [[open]]:animate-[slide-in-right_0.4s_var(--easing-emphasized-in)] data-open:animate-[slide-in-right_0.4s_var(--easing-emphasized-in)] data-[state=open]:animate-[slide-in-right_0.4s_var(--easing-emphasized-in)] [[closed]]:animate-[slide-out-right_0.2s_var(--easing-emphasized-out)] data-closed:animate-[slide-out-right_0.2s_var(--easing-emphasized-out)] data-[state=closed]:animate-[slide-out-right_0.2s_var(--easing-emphasized-out)]"
)
const Description = withClass(
  ArkDialog.Description,
  "text-sm leading-5 text-muted-foreground"
)
const Positioner = withClass(
  ArkDialog.Positioner,
  "fixed top-0 right-0 z-1400 flex h-dvh items-center justify-center"
)
const Title = withClass(
  ArkDialog.Title,
  "text-xl leading-7.5 font-semibold text-foreground"
)
const Trigger = withClass(ArkDialog.Trigger, "drawer__trigger")
const Header = withClass(
  ark.div,
  "relative flex flex-col gap-1 p-4 [grid-area:header]"
)
const Body = withClass(
  ark.div,
  "flex flex-col overflow-auto p-6 [grid-area:body]"
)
const Footer = withClass(
  ark.div,
  "flex justify-end px-6 py-4 [grid-area:footer]"
)

export type DrawerRootProviderProps = ComponentProps<typeof RootProvider>
export type DrawerRootProps = ComponentProps<typeof Root>
export type DrawerBackdropProps = ComponentProps<typeof Backdrop>
export type DrawerCloseTriggerProps = ComponentProps<typeof CloseTrigger>
export type DrawerContentProps = ComponentProps<typeof Content>
export type DrawerDescriptionProps = ComponentProps<typeof Description>
export type DrawerPositionerProps = ComponentProps<typeof Positioner>
export type DrawerTitleProps = ComponentProps<typeof Title>
export type DrawerTriggerProps = ComponentProps<typeof Trigger>
export type DrawerContextProps = DialogContextProps

export const Drawer = {
  RootProvider,
  Root,
  Backdrop,
  CloseTrigger,
  Content,
  Description,
  Positioner,
  Title,
  Trigger,
  Header,
  Body,
  Footer,
  Context: DialogContext,
}

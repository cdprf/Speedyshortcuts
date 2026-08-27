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
  "drawer__content drawer__content--variant_right"
)
const Description = withClass(ArkDialog.Description, "drawer__description")
const Positioner = withClass(
  ArkDialog.Positioner,
  "drawer__positioner drawer__positioner--variant_right"
)
const Title = withClass(ArkDialog.Title, "drawer__title")
const Trigger = withClass(ArkDialog.Trigger, "drawer__trigger")
const Header = withClass(ark.div, "drawer__header")
const Body = withClass(ark.div, "drawer__body")
const Footer = withClass(ark.div, "drawer__footer")

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

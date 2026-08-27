import { Menu as ArkMenu, MenuContext } from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const RootProvider = ArkMenu.RootProvider
const Root = ArkMenu.Root
const Arrow = withClass(ArkMenu.Arrow, "menu__arrow")
const ArrowTip = withClass(ArkMenu.ArrowTip, "menu__arrowTip")
const CheckboxItem = withClass(
  ArkMenu.CheckboxItem,
  "menu__item menu__item--size_md"
)
const Content = withClass(
  ArkMenu.Content,
  "menu__content menu__content--size_md"
)
const ContextTrigger = withClass(ArkMenu.ContextTrigger, "menu__contextTrigger")
const Indicator = withClass(ArkMenu.Indicator, "menu__indicator")
const ItemGroupLabel = withClass(
  ArkMenu.ItemGroupLabel,
  "menu__itemGroupLabel menu__itemGroupLabel--size_md"
)
const ItemGroup = withClass(
  ArkMenu.ItemGroup,
  "menu__itemGroup menu__itemGroup--size_md"
)
const ItemIndicator = withClass(ArkMenu.ItemIndicator, "menu__itemIndicator")
const Item = withClass(ArkMenu.Item, "menu__item menu__item--size_md")
const ItemText = withClass(ArkMenu.ItemText, "menu__itemText")
const Positioner = withClass(ArkMenu.Positioner, "menu__positioner")
const RadioItemGroup = withClass(
  ArkMenu.RadioItemGroup,
  "menu__itemGroup menu__itemGroup--size_md"
)
const RadioItem = withClass(ArkMenu.RadioItem, "menu__item menu__item--size_md")
const Separator = withClass(ArkMenu.Separator, "menu__separator")
const TriggerItem = withClass(
  ArkMenu.TriggerItem,
  "menu__triggerItem menu__triggerItem--size_md"
)
const Trigger = withClass(ArkMenu.Trigger, "menu__trigger")

export type MenuRootProviderProps = ComponentProps<typeof RootProvider>
export type MenuRootProps = ComponentProps<typeof Root>

export const Menu = {
  RootProvider,
  Root,
  Arrow,
  ArrowTip,
  CheckboxItem,
  Content,
  ContextTrigger,
  Indicator,
  ItemGroupLabel,
  ItemGroup,
  ItemIndicator,
  Item,
  ItemText,
  Positioner,
  RadioItemGroup,
  RadioItem,
  Separator,
  TriggerItem,
  Trigger,
  Context: MenuContext,
}

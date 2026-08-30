import { Menu as ArkMenu, ark, useMenuContext } from "@ark-ui/solid"
import { CheckIcon, ChevronRightIcon } from "lucide-solid"
import {
  Show,
  mergeProps,
  splitProps,
  type ComponentProps,
  type JSX,
} from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "~/utils/cn"

export const useMenu = useMenuContext

export const MenuRoot = (props: ComponentProps<typeof ArkMenu.Root>) => {
  const rootProps = mergeProps(
    {
      lazyMount: true,
      positioning: { placement: "bottom-end" } as const,
      unmountOnExit: true,
    },
    props
  )

  return <ArkMenu.Root data-slot="menu" {...rootProps} />
}

export const MenuTrigger = (props: ComponentProps<typeof ArkMenu.Trigger>) => (
  <ArkMenu.Trigger data-slot="menu-trigger" {...props} />
)

export const MenuPositioner = (
  props: ComponentProps<typeof ArkMenu.Positioner>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkMenu.Positioner
      class={cn("outline-none", local.class)}
      data-slot="menu-positioner"
      {...rest}
    />
  )
}

export const menuContentClass = cn(
  "z-[calc(50+var(--nested-layer-count,0))]",
  "max-h-(--available-height) not-[class*='w-']:min-w-32",
  "overflow-y-auto rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg/5",
  "origin-(--transform-origin) outline-none duration-100",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[98%]",
  "data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-end-2",
  "data-[placement=right]:slide-in-from-start-2 data-[placement=top]:slide-in-from-bottom-2",
  "motion-reduce:animate-none!"
)

export const MenuContent = (props: ComponentProps<typeof ArkMenu.Content>) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <Portal>
      <MenuPositioner>
        <ArkMenu.Content
          class={cn(menuContentClass, local.class)}
          data-slot="menu-content"
          {...rest}
        >
          {local.children}
        </ArkMenu.Content>
      </MenuPositioner>
    </Portal>
  )
}

export type MenuGroupProps = ComponentProps<typeof ArkMenu.ItemGroup> & {
  /** The heading of the menu item group. */
  heading?: string
}

export const MenuGroup = (props: MenuGroupProps) => {
  const [local, rest] = splitProps(props, ["heading", "children"])

  return (
    <ArkMenu.ItemGroup data-slot="menu-group" {...rest}>
      <Show when={local.heading}>
        {(heading) => <MenuGroupLabel>{heading()}</MenuGroupLabel>}
      </Show>
      {local.children}
    </ArkMenu.ItemGroup>
  )
}

export const MenuSeparator = (
  props: ComponentProps<typeof ArkMenu.Separator>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkMenu.Separator
      class={cn("my-1 h-px bg-border", local.class)}
      data-slot="menu-separator"
      {...rest}
    />
  )
}

export type MenuItemVariant = "default" | "destructive"

const menuItemClass = (variant: MenuItemVariant = "default") =>
  cn(
    "group/menu-item relative w-full px-2.5 py-1.5",
    "flex items-center gap-2 select-none rounded-lg text-sm outline-hidden",
    "group-data-[date=open]/trigger-item:bg-accent group-data-[date=open]/trigger-item:text-accent-foreground",
    "data-disabled:pointer-events-none data-disabled:opacity-64",
    "[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variant === "destructive"
      ? "text-destructive data-highlighted:bg-destructive/10 dark:text-destructive-foreground dark:data-highlighted:bg-destructive-foreground/10 **:[svg]:text-destructive! dark:**:[svg]:text-destructive-foreground!"
      : "data-highlighted:bg-accent data-highlighted:text-accent-foreground"
  )

export type MenuItemProps = ComponentProps<typeof ArkMenu.Item> & {
  variant?: MenuItemVariant
}

export const MenuItem = (props: MenuItemProps) => {
  const [local, rest] = splitProps(props, ["variant", "class"])
  const variant = () => local.variant ?? "default"

  return (
    <ArkMenu.Item
      class={cn(menuItemClass(variant()), local.class)}
      data-slot="menu-item"
      data-variant={variant()}
      {...rest}
    />
  )
}

export const MenuQuickItem = (props: MenuItemProps) => {
  const [local, rest] = splitProps(props, ["variant", "class"])
  const variant = () => local.variant ?? "default"

  return (
    <ArkMenu.Item
      class={cn(
        menuItemClass(variant()),
        "flex-col gap-1 [&_svg:not([class*='size-'])]:size-4.5",
        local.class
      )}
      data-slot="menu-quick-item"
      data-variant={variant()}
      {...rest}
    />
  )
}

export const MenuCheckboxItem = (
  props: ComponentProps<typeof ArkMenu.CheckboxItem>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkMenu.CheckboxItem
      class={cn(menuItemClass(), "ps-8", local.class)}
      data-slot="menu-checkbox-item"
      {...rest}
    >
      <ArkMenu.ItemIndicator class="pointer-events-none absolute inset-s-2 flex size-3.5 items-center justify-center">
        <CheckIcon aria-hidden="true" />
      </ArkMenu.ItemIndicator>
      <ArkMenu.ItemText>{local.children}</ArkMenu.ItemText>
    </ArkMenu.CheckboxItem>
  )
}

export type MenuRadioGroupProps = ComponentProps<
  typeof ArkMenu.RadioItemGroup
> & {
  /** The heading of the menu radio item group. */
  heading?: string
}

export const MenuRadioGroup = (props: MenuRadioGroupProps) => {
  const [local, rest] = splitProps(props, ["heading", "children"])

  return (
    <ArkMenu.RadioItemGroup data-slot="menu-radio-group" {...rest}>
      <Show when={local.heading}>
        {(heading) => <MenuGroupLabel>{heading()}</MenuGroupLabel>}
      </Show>
      {local.children}
    </ArkMenu.RadioItemGroup>
  )
}

export const MenuGroupLabel = (
  props: ComponentProps<typeof ArkMenu.ItemGroupLabel>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkMenu.ItemGroupLabel
      class={cn(
        "pointer-events-none px-2 py-1.5 font-medium text-muted-foreground text-sm",
        local.class
      )}
      data-slot="menu-group-label"
      {...rest}
    />
  )
}

export const MenuRadioItem = (
  props: ComponentProps<typeof ArkMenu.RadioItem>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkMenu.RadioItem
      class={cn(menuItemClass(), "ps-8", local.class)}
      data-slot="menu-radio-item"
      {...rest}
    >
      <ArkMenu.ItemIndicator class="pointer-events-none absolute inset-s-2 flex size-3.5 items-center justify-center">
        <CheckIcon aria-hidden="true" />
      </ArkMenu.ItemIndicator>
      <ArkMenu.ItemText data-slot="menu-radio-item-text">
        {local.children}
      </ArkMenu.ItemText>
    </ArkMenu.RadioItem>
  )
}

export const MenuSub = (props: ComponentProps<typeof MenuRoot>) => (
  <MenuRoot data-slot="menu-sub" {...props} />
)

export const MenuSubContent = (
  props: ComponentProps<typeof ArkMenu.Content>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <Portal>
      <MenuPositioner data-slot="menu-sub-positioner">
        <ArkMenu.Content
          class={cn(menuContentClass, local.class)}
          data-slot="menu-sub-content"
          {...rest}
        />
      </MenuPositioner>
    </Portal>
  )
}

export const MenuSubTrigger = (
  props: ComponentProps<typeof ArkMenu.TriggerItem>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkMenu.TriggerItem
      class={cn(menuItemClass(), local.class)}
      data-slot="menu-sub-trigger"
      {...rest}
    >
      {local.children}
      <MenuShortcut>
        <ChevronRightIcon aria-hidden="true" />
      </MenuShortcut>
    </ArkMenu.TriggerItem>
  )
}

export const MenuShortcut = (props: ComponentProps<typeof ark.span>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ark.span
      class={cn(
        "ms-auto text-muted-foreground text-xs tracking-widest rtl:me-auto",
        "group-data-highlighted/menu-item:group-data-[variant=destructive]/menu-item:text-destructive dark:group-data-highlighted/menu-item:group-data-[variant=destructive]/menu-item:text-destructive-foreground",
        local.class
      )}
      data-slot="menu-shortcut"
      {...rest}
    />
  )
}

export const MenuArrow = (props: ComponentProps<typeof ArkMenu.Arrow>) => {
  const [local, rest] = splitProps(props, ["class", "style"])
  const style = () => {
    const base = {
      "--arrow-background": "var(--popover)",
      "--arrow-size": "calc(1.5 * var(--spacing))",
      left: "20px",
    } as JSX.CSSProperties

    return typeof local.style === "object"
      ? ({ ...base, ...local.style } as JSX.CSSProperties)
      : base
  }

  return (
    <ArkMenu.Arrow class={local.class} style={style()} {...rest}>
      <ArkMenu.ArrowTip class="border-s border-t" />
    </ArkMenu.Arrow>
  )
}

export type MenuRootProviderProps = ComponentProps<typeof ArkMenu.RootProvider>
export type MenuRootProps = ComponentProps<typeof MenuRoot>

export const Menu = Object.assign(MenuRoot, {
  RootProvider: ArkMenu.RootProvider,
  Root: MenuRoot,
  Arrow: MenuArrow,
  ArrowTip: ArkMenu.ArrowTip,
  CheckboxItem: MenuCheckboxItem,
  Content: MenuContent,
  ContextTrigger: ArkMenu.ContextTrigger,
  Indicator: ArkMenu.Indicator,
  ItemGroupLabel: MenuGroupLabel,
  ItemGroup: MenuGroup,
  ItemIndicator: ArkMenu.ItemIndicator,
  Item: MenuItem,
  ItemText: ArkMenu.ItemText,
  Positioner: MenuPositioner,
  QuickItem: MenuQuickItem,
  RadioItemGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Separator: MenuSeparator,
  Shortcut: MenuShortcut,
  Sub: MenuSub,
  SubContent: MenuSubContent,
  SubTrigger: MenuSubTrigger,
  TriggerItem: MenuSubTrigger,
  Trigger: MenuTrigger,
  Context: ArkMenu.Context,
})

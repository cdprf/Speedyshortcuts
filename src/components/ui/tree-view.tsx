import {
  TreeView as ArkTreeView,
  createTreeCollection as arkCreateTreeCollection,
  useTreeViewContext,
  type TreeCollection as ArkTreeCollection,
  type TreeViewNodeProviderProps as ArkTreeViewNodeProviderProps,
  type TreeViewRootComponentProps as ArkTreeViewRootComponentProps,
} from "@ark-ui/solid"
import {
  CheckIcon,
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  MinusIcon,
} from "lucide-solid"
import { Show, splitProps, type Component, type ComponentProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import { cn } from "~/utils/cn"

export const useTreeView = useTreeViewContext

type TreeIcon = Component<any>

export interface TreeNodeType<T = unknown> {
  children?: TreeNodeType<T>[]
  expandedIcon?: TreeIcon | null
  icon?: TreeIcon | null
  id: string
  name: string
}

export const createTreeCollection = <T extends TreeNodeType>(
  options: Parameters<typeof arkCreateTreeCollection<T>>[0]
) =>
  arkCreateTreeCollection<T>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    ...options,
  })

export type TreeCollection<T extends TreeNodeType = TreeNodeType> =
  ArkTreeCollection<T>

export type TreeViewProps<T extends TreeNodeType = TreeNodeType> =
  ArkTreeViewRootComponentProps<T>

export const TreeView = <T extends TreeNodeType>(props: TreeViewProps<T>) => {
  const [local, rest] = splitProps(props, [
    "lazyMount",
    "unmountOnExit",
    "class",
  ])

  return (
    <ArkTreeView.Root
      class={cn(
        "[--indentation:--spacing(4)] [--item-gap:--spacing(2)]",
        "[--padding-block:--spacing(1.5)] [--padding-inline:--spacing(3)]",
        "[--icon-size:--spacing(4)]",
        "flex w-full flex-col gap-2 text-foreground",
        local.class
      )}
      data-slot="tree-view"
      lazyMount={local.lazyMount ?? true}
      unmountOnExit={local.unmountOnExit ?? true}
      {...rest}
    />
  )
}

export const TreeViewLabel = (
  props: ComponentProps<typeof ArkTreeView.Label>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkTreeView.Label
      class={cn("select-none font-medium text-foreground text-sm", local.class)}
      data-slot="tree-view-label"
      {...rest}
    />
  )
}

export const TreeViewTree = (
  props: ComponentProps<typeof ArkTreeView.Tree>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkTreeView.Tree
      class={cn(
        "flex flex-col text-sm",
        "[&_svg]:size-(--icon-size) [&_svg]:shrink-0",
        local.class
      )}
      data-slot="tree-view-tree"
      {...rest}
    />
  )
}

export type TreeViewNodeProps<T extends TreeNodeType = TreeNodeType> =
  ArkTreeViewNodeProviderProps<T>

export const TreeViewNode = <T extends TreeNodeType>(
  props: TreeViewNodeProps<T>
) => <ArkTreeView.NodeProvider data-slot="tree-view-node" {...props} />

export const TreeViewBranch = (
  props: ComponentProps<typeof ArkTreeView.Branch>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkTreeView.Branch
      class={cn("relative", local.class)}
      data-slot="tree-view-branch"
      {...rest}
    />
  )
}

const treeViewControlClass = cn(
  "peer relative my-px flex min-h-8 w-full items-center gap-(--item-gap)",
  "py-(--padding-block) ps-[calc(var(--padding-inline)+var(--indentation)*(var(--depth)-1)+var(--icon-size)*(var(--depth)-1)*0.5)] pe-(--padding-inline)",
  "cursor-pointer select-none rounded-md border-none bg-transparent text-start font-inherit text-muted-foreground",
  "hover:bg-muted hover:text-foreground",
  "outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
  "data-selected:bg-accent data-selected:text-accent-foreground",
  "data-focus:bg-muted data-focus:text-foreground",
  "data-disabled:opacity-64 data-disabled:grayscale",
  "[&_svg]:size-4 [&_svg]:shrink-0"
)

type TreeViewBranchItemProps = ComponentProps<
  typeof ArkTreeView.BranchControl
> & { icon?: TreeIcon | null; expandedIcon?: TreeIcon | null }

export const TreeViewBranchItem = (props: TreeViewBranchItemProps) => {
  const [local, rest] = splitProps(props, [
    "icon",
    "expandedIcon",
    "class",
    "children",
  ])

  return (
    <ArkTreeView.BranchControl
      class={cn(treeViewControlClass, local.class)}
      data-slot="tree-view-branch-control"
      {...rest}
    >
      <TreeViewBranchTrigger>
        <TreeViewBranchIndicator />
      </TreeViewBranchTrigger>
      <TreeViewBranchTitle expandedIcon={local.expandedIcon} icon={local.icon}>
        {local.children}
      </TreeViewBranchTitle>
      <TreeViewSelectionIndicator />
    </ArkTreeView.BranchControl>
  )
}

const TreeViewBranchTrigger = (
  props: ComponentProps<typeof ArkTreeView.BranchTrigger>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkTreeView.BranchTrigger
      class={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
        local.class
      )}
      data-slot="tree-view-branch-trigger"
      {...rest}
    />
  )
}

type TreeViewBranchTitleProps = ComponentProps<
  typeof ArkTreeView.BranchText
> & { expandedIcon?: TreeIcon | null; icon?: TreeIcon | null }

const TreeViewBranchTitle = (props: TreeViewBranchTitleProps) => {
  const [local, rest] = splitProps(props, [
    "icon",
    "expandedIcon",
    "class",
    "children",
  ])

  return (
    <ArkTreeView.NodeContext>
      {(nodeState) => (
        <Show when={!nodeState().renaming} fallback={<TreeViewNodeInput />}>
          <ArkTreeView.BranchText
            class={cn(
              "flex flex-1 items-center gap-(--item-gap) truncate",
              local.class
            )}
            data-slot="tree-view-branch-title"
            {...rest}
          >
            <Show when={local.icon !== null && !nodeState().expanded}>
              <TreeViewItemIcon>
                <Dynamic component={local.icon ?? FolderIcon} />
              </TreeViewItemIcon>
            </Show>
            <Show when={local.expandedIcon !== null && nodeState().expanded}>
              <TreeViewItemIcon>
                <Dynamic component={local.expandedIcon ?? FolderOpenIcon} />
              </TreeViewItemIcon>
            </Show>
            {local.children}
          </ArkTreeView.BranchText>
        </Show>
      )}
    </ArkTreeView.NodeContext>
  )
}

export const TreeViewBranchIndicator = (
  props: ComponentProps<typeof ArkTreeView.BranchIndicator>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkTreeView.BranchIndicator
      class={cn(
        "inline-flex shrink-0 items-center justify-center text-muted-foreground",
        "origin-center transition-transform duration-150 data-[state=open]:rotate-90",
        "[&_svg]:size-3.5 [&_svg]:shrink-0 motion-reduce:transition-none!",
        local.class
      )}
      data-slot="tree-view-branch-indicator"
      {...rest}
    >
      {local.children ?? <ChevronRightIcon aria-hidden="true" />}
    </ArkTreeView.BranchIndicator>
  )
}

export const TreeViewBranchContent = (
  props: ComponentProps<typeof ArkTreeView.BranchContent>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkTreeView.BranchContent
      class={cn(
        "relative overflow-hidden",
        "data-[state=open]:animate-[tree-expand_150ms_ease-out]",
        "data-[state=closed]:animate-[tree-collapse_150ms_ease-out]",
        "motion-reduce:animate-none!",
        local.class
      )}
      data-slot="tree-view-branch-content"
      {...rest}
    >
      <TreeViewBranchIndentGuide />
      {local.children}
    </ArkTreeView.BranchContent>
  )
}

const TreeViewBranchIndentGuide = (
  props: ComponentProps<typeof ArkTreeView.BranchIndentGuide>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkTreeView.BranchIndentGuide
      class={cn(
        "pointer-events-none absolute z-1 h-full w-px bg-border",
        "inset-s-[calc(var(--padding-inline)+var(--indentation)*(var(--depth)-1)+var(--icon-size)*0.5*var(--depth))]",
        local.class
      )}
      data-slot="tree-view-branch-indent-guide"
      {...rest}
    />
  )
}

export const TreeViewContent = (
  props: ComponentProps<typeof ArkTreeView.Item>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkTreeView.Item
      class={cn(treeViewControlClass, local.class)}
      data-slot="tree-view-item"
      {...rest}
    />
  )
}

type TreeViewItemProps = ComponentProps<typeof ArkTreeView.ItemText> & {
  icon?: TreeIcon | null
}

export const TreeViewItem = (props: TreeViewItemProps) => {
  const [local, rest] = splitProps(props, ["icon", "class", "children"])

  return (
    <ArkTreeView.NodeContext>
      {(nodeState) => (
        <>
          <Show when={local.icon !== null}>
            <TreeViewItemIcon>
              <Dynamic component={local.icon ?? FileIcon} />
            </TreeViewItemIcon>
          </Show>
          <Show when={!nodeState().renaming} fallback={<TreeViewNodeInput />}>
            <ArkTreeView.ItemText
              class={cn(
                "flex flex-1 items-center gap-(--item-gap) truncate",
                local.class
              )}
              data-slot="tree-view-item-title"
              {...rest}
            >
              {local.children}
            </ArkTreeView.ItemText>
          </Show>
          <TreeViewSelectionIndicator />
        </>
      )}
    </ArkTreeView.NodeContext>
  )
}

const TreeViewSelectionIndicator = () => (
  <ArkTreeView.NodeContext>
    {(nodeState) => (
      <Show when={nodeState().selected}>
        <CheckIcon
          aria-hidden="true"
          class="ms-auto shrink-0 text-accent-foreground"
          data-slot="tree-view-selection-indicator"
        />
      </Show>
    )}
  </ArkTreeView.NodeContext>
)

const TreeViewItemIcon = (props: ComponentProps<"span">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <span
      class={cn(
        "in-[[data-slot=tree-view-item]:has([data-slot=tree-view-checkbox])]:hidden",
        local.class
      )}
      data-slot="tree-view-item-icon"
      aria-hidden="true"
      {...rest}
    />
  )
}

export const TreeViewCheckbox = (
  props: ComponentProps<typeof ArkTreeView.NodeCheckbox>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkTreeView.NodeCheckbox
      class={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-input bg-transparent outline-none",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "focus-visible:ring-[3px] focus-visible:ring-ring/32",
        "[&_svg]:size-3!",
        local.class
      )}
      data-slot="tree-view-checkbox"
      {...rest}
    >
      <ArkTreeView.NodeCheckboxIndicator indeterminate={<MinusIcon />}>
        <CheckIcon />
      </ArkTreeView.NodeCheckboxIndicator>
    </ArkTreeView.NodeCheckbox>
  )
}

const TreeViewNodeInput = (
  props: ComponentProps<typeof ArkTreeView.NodeRenameInput>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkTreeView.NodeRenameInput
      class={cn(
        "-my-px h-full min-w-0 flex-1 rounded-md border border-primary bg-popover px-2 py-0 text-foreground text-sm",
        "selection:bg-primary/20 selection:text-foreground",
        "outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/32",
        local.class
      )}
      data-slot="tree-view-node-rename-input"
      {...rest}
    />
  )
}

type CreateFileIconsArgs = Record<`.${string}`, TreeIcon | null>

export const createFileIcons = (icons: CreateFileIconsArgs) => ({ ...icons })

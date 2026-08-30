import { HomeIcon, type LucideProps } from "lucide-solid"
import { For, createMemo, type Component } from "solid-js"
import {
  createTreeCollection,
  TreeView,
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchItem,
  TreeViewContent,
  TreeViewItem,
  TreeViewLabel,
  TreeViewNode,
  TreeViewTree,
  type TreeNodeType,
  type TreeViewNodeProps,
} from "~/components/ui/tree-view"
import { type BookmarkDataType, getFolderIcon } from "~/stores"
import { FolderIconGlyph } from "./FolderIconGlyph"

type FolderSelectorProps = {
  root: BookmarkDataType
  value?: string
  onChange: (folderId: string) => void
}

type FolderNode = TreeNodeType & { children?: FolderNode[] }

const COLLECTION_ROOT_ID = "__folder-selector-root__"

const createFolderGlyph =
  (folderId: string): Component<LucideProps> =>
  (iconProps) => (
    <FolderIconGlyph name={getFolderIcon(folderId)} {...iconProps} />
  )

const toFolderNode = (folder: BookmarkDataType, rootId: string): FolderNode => {
  const children = (folder.children ?? [])
    .filter((child) => !child.url)
    .map((child) => toFolderNode(child, rootId))
  const isHome = folder.id === rootId
  const icon = isHome ? HomeIcon : createFolderGlyph(folder.id)

  return {
    id: folder.id,
    name: isHome ? "Home" : folder.title,
    children,
    icon,
    expandedIcon: icon,
  }
}

const getExpandableFolderIds = (node: FolderNode): string[] => [
  ...(node.children?.length ? [node.id] : []),
  ...(node.children ?? []).flatMap(getExpandableFolderIds),
]

const FolderTreeNode = (props: TreeViewNodeProps<FolderNode>) => {
  const hasChildren = () => Boolean(props.node.children?.length)

  return (
    <TreeViewNode node={props.node} indexPath={props.indexPath}>
      {hasChildren() ? (
        <TreeViewBranch>
          <TreeViewBranchItem
            icon={props.node.icon}
            expandedIcon={props.node.expandedIcon}
          >
            {props.node.name}
          </TreeViewBranchItem>

          <TreeViewBranchContent>
            <For each={props.node.children}>
              {(child, index) => (
                <FolderTreeNode
                  node={child}
                  indexPath={[...props.indexPath, index()]}
                />
              )}
            </For>
          </TreeViewBranchContent>
        </TreeViewBranch>
      ) : (
        <TreeViewContent>
          <TreeViewItem icon={props.node.icon}>{props.node.name}</TreeViewItem>
        </TreeViewContent>
      )}
    </TreeViewNode>
  )
}

export const FolderSelector = (props: FolderSelectorProps) => {
  const homeNode = createMemo(() => toFolderNode(props.root, props.root.id))
  const collection = createMemo(() =>
    createTreeCollection<FolderNode>({
      rootNode: { id: COLLECTION_ROOT_ID, name: "", children: [homeNode()] },
    })
  )
  const selectedFolderId = () => props.value ?? props.root.id
  const initialExpandedFolders = createMemo(() =>
    getExpandableFolderIds(homeNode())
  )

  return (
    <TreeView
      collection={collection()}
      defaultExpandedValue={initialExpandedFolders()}
      expandOnClick={false}
      selectedValue={[selectedFolderId()]}
      selectionMode="single"
      translations={{ treeLabel: "Folder" }}
      onSelectionChange={({ selectedValue }) => {
        const folderId = selectedValue[0]
        if (folderId) props.onChange(folderId)
      }}
    >
      <TreeViewLabel>Folder</TreeViewLabel>
      <TreeViewTree class="max-h-52 overflow-y-auto rounded-lg border border-input bg-background p-1.5 [scrollbar-color:var(--border)_transparent]">
        <For each={collection().rootNode.children}>
          {(node, index) => (
            <FolderTreeNode node={node} indexPath={[index()]} />
          )}
        </For>
      </TreeViewTree>
    </TreeView>
  )
}

export default FolderSelector

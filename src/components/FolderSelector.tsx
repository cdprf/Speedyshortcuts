import { CheckIcon, HomeIcon } from "lucide-solid"
import { For, Show, createMemo } from "solid-js"
import { type BookmarkDataType, getFolderIcon } from "~/stores"
import classes from "~/styles/FolderSelector.module.scss"
import { FolderIconGlyph } from "./FolderIconGlyph"

type FolderSelectorProps = {
  root: BookmarkDataType
  value?: string
  onChange: (folderId: string) => void
}

type FolderOption = {
  id: string
  title: string
  depth: number
  isRoot: boolean
}

const getFolderOptions = (root: BookmarkDataType) => {
  const options: FolderOption[] = []

  const visit = (folder: BookmarkDataType, depth: number) => {
    options.push({
      id: folder.id,
      title: depth === 0 ? "Home" : folder.title,
      depth,
      isRoot: depth === 0,
    })

    folder.children?.forEach((child) => {
      if (!child.url) visit(child, depth + 1)
    })
  }

  visit(root, 0)
  return options
}

export const FolderSelector = (props: FolderSelectorProps) => {
  const folders = createMemo(() => getFolderOptions(props.root))
  const selectedFolderId = () => props.value ?? props.root.id

  return (
    <div class={classes.folderSelector}>
      <div class={classes.folderSelectorHeader} id="folder-selector-label">
        Folder
      </div>

      <div
        class={classes.folderTree}
        role="group"
        aria-labelledby="folder-selector-label"
      >
        <For each={folders()}>
          {(folder) => {
            const isSelected = () => folder.id === selectedFolderId()

            return (
              <button
                type="button"
                class={classes.folderOption}
                classList={{
                  [classes.folderOptionSelected!]: isSelected(),
                  [classes.folderOptionNested!]: folder.depth > 0,
                }}
                style={{ "--folder-indent": `${folder.depth * 18}px` }}
                aria-pressed={isSelected()}
                onClick={() => props.onChange(folder.id)}
              >
                <span class={classes.folderBranch} aria-hidden="true" />
                <span class={classes.folderOptionIcon} aria-hidden="true">
                  <Show when={!folder.isRoot} fallback={<HomeIcon size={17} />}>
                    <FolderIconGlyph
                      name={getFolderIcon(folder.id)}
                      size={17}
                    />
                  </Show>
                </span>
                <span class={classes.folderOptionName} title={folder.title}>
                  {folder.title}
                </span>
                <Show when={isSelected()}>
                  <CheckIcon
                    class={classes.folderOptionCheck}
                    size={16}
                    aria-hidden="true"
                  />
                </Show>
              </button>
            )
          }}
        </For>
      </div>
    </div>
  )
}

export default FolderSelector

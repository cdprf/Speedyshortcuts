import { CheckIcon, HomeIcon } from "lucide-solid"
import { For, Show, createMemo } from "solid-js"
import { type BookmarkDataType, getFolderIcon } from "~/stores"
import { cn } from "~/utils/cn"
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
    <div class="flex w-full flex-col gap-2">
      <div class="text-sm font-medium" id="folder-selector-label">
        Folder
      </div>

      <div
        class="flex max-h-52 flex-col gap-0.5 overflow-y-auto rounded-lg border border-(--colors-gray-a6) bg-(--colors-gray-a2) p-1.5 [scrollbar-color:var(--colors-gray-a7)_transparent]"
        role="group"
        aria-labelledby="folder-selector-label"
      >
        <For each={folders()}>
          {(folder) => {
            const isSelected = () => folder.id === selectedFolderId()

            return (
              <button
                type="button"
                class={cn(
                  "relative flex min-h-9 w-full items-center gap-2 overflow-hidden rounded-md border py-1.25 pr-2.25 pl-[calc(9px+var(--folder-indent))] text-left text-[13px] transition-[color,border-color,background-color] duration-150 hover:bg-(--colors-gray-a4) hover:text-(--colors-gray-12) focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--colors-gray-a9)",
                  isSelected()
                    ? "border-(--colors-gray-a8) bg-(--colors-gray-a5) text-(--colors-gray-12)"
                    : "border-transparent bg-transparent text-(--colors-gray-11)"
                )}
                style={{ "--folder-indent": `${folder.depth * 18}px` }}
                aria-pressed={isSelected()}
                onClick={() => props.onChange(folder.id)}
              >
                <span
                  class={cn(
                    "-mt-1.75 -ml-2.5 h-3.75 w-2.25 shrink-0 rounded-bl border-b border-l border-(--colors-gray-a7)",
                    folder.depth > 0 ? "block" : "hidden"
                  )}
                  aria-hidden="true"
                />
                <span
                  class="grid shrink-0 place-items-center"
                  aria-hidden="true"
                >
                  <Show when={!folder.isRoot} fallback={<HomeIcon size={17} />}>
                    <FolderIconGlyph
                      name={getFolderIcon(folder.id)}
                      size={17}
                    />
                  </Show>
                </span>
                <span class="min-w-0 flex-1 truncate" title={folder.title}>
                  {folder.title}
                </span>
                <Show when={isSelected()}>
                  <CheckIcon
                    class="grid shrink-0 place-items-center text-(--colors-gray-12)"
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

import { SearchIcon, icons } from "lucide-solid"
import { For, Show, createEffect, createMemo, createSignal } from "solid-js"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { DEFAULT_FOLDER_ICON } from "~/stores"
import { cn } from "~/utils/cn"
import {
  FolderIconGlyph,
  isLucideIconName,
  type LucideIconName,
} from "./FolderIconGlyph"

type IconSelectorProps = {
  value?: string
  onChange: (iconName: LucideIconName) => void
}

type IconOption = { name: LucideIconName; label: string; searchValue: string }

const INITIAL_ICON_COUNT = 144

const getIconLabel = (name: string) =>
  name
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")

const ICON_OPTIONS = (Object.keys(icons) as LucideIconName[])
  .map((name): IconOption => {
    const label = getIconLabel(name)
    return { name, label, searchValue: label.toLocaleLowerCase() }
  })
  .sort((a, b) => a.label.localeCompare(b.label))

export const IconSelector = (props: IconSelectorProps) => {
  const [query, setQuery] = createSignal("")
  const [visibleCount, setVisibleCount] = createSignal(INITIAL_ICON_COUNT)

  const selectedIcon = () =>
    isLucideIconName(props.value) ? props.value : DEFAULT_FOLDER_ICON
  const initiallySelectedIcon = selectedIcon()

  const filteredIcons = createMemo(() => {
    const normalizedQuery = query().trim().toLocaleLowerCase()
    const matches = normalizedQuery
      ? ICON_OPTIONS.filter((icon) =>
          icon.searchValue.includes(normalizedQuery)
        )
      : ICON_OPTIONS

    if (normalizedQuery) return matches

    return [
      ...matches.filter((icon) => icon.name === initiallySelectedIcon),
      ...matches.filter((icon) => icon.name !== initiallySelectedIcon),
    ]
  })

  const visibleIcons = createMemo(() =>
    filteredIcons().slice(0, visibleCount())
  )
  const remainingCount = () => filteredIcons().length - visibleIcons().length

  createEffect(() => {
    query()
    setVisibleCount(INITIAL_ICON_COUNT)
  })

  return (
    <div class="flex w-full flex-col gap-2">
      <div class="flex items-baseline justify-between gap-3 text-sm">
        <label class="font-medium" for="folder-icon-search">
          Folder icon
        </label>
        <span class="text-xs text-(--colors-gray-a11)">
          {filteredIcons().length.toLocaleString()} icons
        </span>
      </div>

      <div class="relative">
        <SearchIcon
          class="pointer-events-none absolute top-1/2 left-3 z-1 -translate-y-1/2 text-(--colors-gray-a11)"
          size={16}
          aria-hidden="true"
        />
        <Input
          class="pl-9.5"
          id="folder-icon-search"
          type="search"
          inputMode="search"
          autocomplete="off"
          placeholder="Search icons"
          value={query()}
          onInput={(event) => setQuery(event.currentTarget.value)}
        />
      </div>

      <Show
        when={visibleIcons().length > 0}
        fallback={
          <div class="grid h-52 place-items-center rounded-md border border-dashed border-(--colors-gray-a7) p-4 text-center text-sm text-(--colors-gray-a11)">
            No icons match “{query().trim()}”
          </div>
        }
      >
        <div
          class="grid h-52 grid-cols-[repeat(auto-fill,minmax(38px,1fr))] gap-1 overflow-y-auto rounded-lg border border-(--colors-gray-a6) bg-(--colors-gray-a2) p-1.5 [scrollbar-color:var(--colors-gray-a7)_transparent]"
          role="group"
          aria-label="Folder icons"
        >
          <For each={visibleIcons()}>
            {(icon) => {
              const isSelected = () => icon.name === selectedIcon()

              return (
                <button
                  type="button"
                  class={cn(
                    "grid aspect-square min-w-0 cursor-pointer place-items-center rounded-md border p-0 transition-[color,border-color,background-color] duration-150 hover:bg-(--colors-gray-a4) hover:text-(--colors-gray-12) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--colors-gray-a9)",
                    isSelected()
                      ? "border-(--colors-gray-a9) bg-(--colors-gray-a5) text-(--colors-gray-12)"
                      : "border-transparent bg-transparent text-(--colors-gray-11)"
                  )}
                  aria-pressed={isSelected()}
                  aria-label={icon.label}
                  title={icon.label}
                  onClick={() => props.onChange(icon.name)}
                >
                  <FolderIconGlyph name={icon.name} size={20} />
                </button>
              )
            }}
          </For>

          <Show when={remainingCount() > 0}>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              class="col-span-full min-h-8.5 rounded-md border-0 bg-(--colors-gray-a3) text-[13px] font-medium text-(--colors-gray-a11) hover:bg-(--colors-gray-a5)! hover:text-(--colors-gray-12)"
              onClick={() =>
                setVisibleCount((count) => count + INITIAL_ICON_COUNT)
              }
            >
              Show more
            </Button>
          </Show>
        </div>
      </Show>
    </div>
  )
}

export default IconSelector

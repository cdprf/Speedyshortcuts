import { SearchIcon, icons } from "lucide-solid"
import { For, Show, createEffect, createMemo, createSignal } from "solid-js"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { DEFAULT_FOLDER_ICON } from "~/stores"
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
    <div class="iconSelector">
      <div class="iconSelectorHeader">
        <label for="folder-icon-search">Folder icon</label>
        <span>{filteredIcons().length.toLocaleString()} icons</span>
      </div>

      <div class="searchField">
        <SearchIcon size={16} aria-hidden="true" />
        <Input
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
          <div class="noResults">No icons match “{query().trim()}”</div>
        }
      >
        <div class="iconGrid" role="group" aria-label="Folder icons">
          <For each={visibleIcons()}>
            {(icon) => {
              const isSelected = () => icon.name === selectedIcon()

              return (
                <button
                  type="button"
                  class="iconOption"
                  classList={{ iconOptionSelected: isSelected() }}
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
              class="showMoreOption"
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

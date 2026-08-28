import { ChevronRightIcon, HomeIcon } from "lucide-solid"
import { For, Show } from "solid-js"
import { folderPath, getFolderIcon, navigateToFolder } from "~/stores"
import { cn } from "~/utils/cn"
import { FolderIconGlyph } from "./FolderIconGlyph"

export const FolderBreadcrumb = () => {
  return (
    <Show when={folderPath().length > 1}>
      <nav
        class="min-w-0 max-w-full rounded-full border border-(--colors-gray-a5) bg-(--colors-gray-a2) p-0.75 backdrop-blur-md"
        aria-label="Folder path"
      >
        <ol class="m-0 flex min-w-0 list-none flex-wrap items-center p-0">
          <For each={folderPath()}>
            {(folder, index) => {
              const isHome = () => index() === 0
              const isCurrent = () => index() === folderPath().length - 1

              return (
                <li class="flex min-w-0 items-center">
                  <Show when={!isHome()}>
                    <ChevronRightIcon
                      class="shrink-0 text-(--colors-gray-a9)"
                      size={14}
                      aria-hidden="true"
                    />
                  </Show>
                  <button
                    type="button"
                    class={cn(
                      "inline-flex h-7.5 max-w-45 cursor-pointer items-center gap-1.5 rounded-full border-0 bg-transparent px-2.5 text-[13px] text-(--colors-gray-a11) transition-[color,background-color] duration-150 enabled:hover:bg-(--colors-gray-a4) enabled:hover:text-(--colors-gray-12) focus-visible:bg-(--colors-gray-a4) focus-visible:text-(--colors-gray-12) focus-visible:outline-none disabled:cursor-default",
                      isCurrent() &&
                        "bg-(--colors-gray-a4) text-(--colors-gray-12) opacity-100"
                    )}
                    aria-current={isCurrent() ? "page" : undefined}
                    disabled={isCurrent()}
                    onClick={() => navigateToFolder(folder.id)}
                  >
                    <Show when={isHome()}>
                      <HomeIcon size={15} aria-hidden="true" />
                    </Show>
                    <Show when={!isHome()}>
                      <FolderIconGlyph
                        name={getFolderIcon(folder.id)}
                        size={15}
                        aria-hidden="true"
                      />
                    </Show>
                    <span class="truncate">
                      {isHome() ? "Home" : folder.title}
                    </span>
                  </button>
                </li>
              )
            }}
          </For>
        </ol>
      </nav>
    </Show>
  )
}

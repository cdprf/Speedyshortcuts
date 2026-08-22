import { ChevronRightIcon, HomeIcon } from "lucide-solid"
import { For, Show } from "solid-js"
import { folderPath, getFolderIcon, navigateToFolder } from "~/stores"
import classes from "~/styles/Grid.module.scss"
import { FolderIconGlyph } from "./FolderIconGlyph"

export const FolderBreadcrumb = () => {
  return (
    <Show when={folderPath().length > 1}>
      <nav class={classes.breadcrumb} aria-label="Folder path">
        <ol>
          <For each={folderPath()}>
            {(folder, index) => {
              const isHome = () => index() === 0
              const isCurrent = () => index() === folderPath().length - 1

              return (
                <li>
                  <Show when={!isHome()}>
                    <ChevronRightIcon
                      class={classes.breadcrumbSeparator}
                      size={14}
                      aria-hidden="true"
                    />
                  </Show>
                  <button
                    type="button"
                    class={`${classes.breadcrumbItem} ${
                      isCurrent() ? classes.breadcrumbCurrent : ""
                    }`}
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
                    <span>{isHome() ? "Home" : folder.title}</span>
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

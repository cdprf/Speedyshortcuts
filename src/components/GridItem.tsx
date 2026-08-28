import { Show, createSignal, onMount } from "solid-js"
import { Portal } from "solid-js/web"
import { Text } from "~/components/ui/text"
import { Tooltip } from "~/components/ui/tooltip"
import {
  type BookmarkDataType,
  getFolderIcon,
  type ModalTypes,
  openLinksInNewTab,
} from "~/stores"
import { getFaviconUrl } from "~/utils"
import { ContextMenu, FolderIconGlyph } from "./"

interface P {
  item: BookmarkDataType
  openModal: (type: ModalTypes, item?: BookmarkDataType) => void
  duplicateSpeedDial: (item: Partial<BookmarkDataType>) => void
  openFolder: (folder: BookmarkDataType) => void
  showTitle: boolean
}

const gridItemActionClass =
  "block h-full w-full cursor-pointer border-0 bg-transparent p-2 font-[inherit] text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-(--colors-gray-a9)"

const gridItemImageClass =
  "pointer-events-none h-full w-full select-none object-contain"

export const GridItem = (props: P) => {
  const [target, setTarget] = createSignal<"_blank" | "_self">("_self")

  onMount(async () => {
    const openInNewTab = await openLinksInNewTab.getValue()
    setTarget(openInNewTab ? "_blank" : "_self")

    openLinksInNewTab.watch((value: boolean) => {
      setTarget(value ? "_blank" : "_self")
    })
  })

  const itemContent = () => (
    <div class="flex h-full w-full flex-col items-center justify-evenly">
      <div class="h-1/2 w-1/2 rounded-(--dial-radius,4px) p-2">
        <Show
          when={props.item.url}
          fallback={
            <FolderIconGlyph
              name={getFolderIcon(props.item.id)}
              class={gridItemImageClass}
            />
          }
        >
          {(url) => (
            <img class={gridItemImageClass} src={getFaviconUrl(url())} alt="" />
          )}
        </Show>
      </div>

      <Show when={props.showTitle}>
        <Tooltip.Root
          lazyMount
          unmountOnExit
          closeDelay={0}
          openDelay={100}
          positioning={{ placement: "bottom" }}
          closeOnPointerDown={false}
        >
          <Tooltip.Trigger
            asChild={(triggerProps) => (
              <span {...triggerProps} class="w-full truncate text-center">
                {props.item.title}
              </span>
            )}
          />

          <Portal>
            <Tooltip.Positioner>
              <Tooltip.Arrow>
                <Tooltip.ArrowTip />
              </Tooltip.Arrow>
              <Tooltip.Content class="w-max max-w-3xl text-center">
                <Text>{props.item.title}</Text>
                <Show when={props.item.url}>
                  <Text>{props.item.url}</Text>
                </Show>
              </Tooltip.Content>
            </Tooltip.Positioner>
          </Portal>
        </Tooltip.Root>
      </Show>
    </div>
  )

  return (
    <div class="group/gridItem relative h-full w-full cursor-pointer overflow-hidden rounded-(--dial-radius,4px) border border-(--colors-gray-a6) bg-(--colors-gray-a2) transition-all duration-250 ease-in-out hover:border-(--colors-gray-a7) hover:bg-(--colors-gray-a4) focus-within:border-(--colors-gray-a7) focus-within:bg-(--colors-gray-a4)">
      <ContextMenu
        item={props.item}
        openModal={props.openModal}
        duplicateSpeedDial={props.duplicateSpeedDial}
      />

      <Show
        when={props.item.url}
        fallback={
          <button
            type="button"
            class={gridItemActionClass}
            onClick={() => props.openFolder(props.item)}
            aria-label={`Open ${props.item.title} folder`}
            title={props.showTitle ? undefined : props.item.title}
          >
            {itemContent()}
          </button>
        }
      >
        {(url) => (
          <a
            class={gridItemActionClass}
            href={url()}
            draggable={false}
            target={target()}
            rel={target() === "_blank" ? "noreferrer" : undefined}
            aria-label={`Open ${props.item.title}`}
            title={props.showTitle ? undefined : props.item.title}
          >
            {itemContent()}
          </a>
        )}
      </Show>
    </div>
  )
}

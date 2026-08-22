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
import classes from "~/styles/Grid.module.scss"
import { getFaviconUrl } from "~/utils"
import { ContextMenu, FolderIconGlyph } from "./"

interface P {
  item: BookmarkDataType
  openModal: (type: ModalTypes, item?: BookmarkDataType) => void
  duplicateSpeedDial: (item: Partial<BookmarkDataType>) => void
  openFolder: (folder: BookmarkDataType) => void
  showTitle: boolean
}

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
    <div class={classes.gridItemContent}>
      <div class={classes.gridItemImgDiv}>
        <Show
          when={props.item.url}
          fallback={
            <FolderIconGlyph
              name={getFolderIcon(props.item.id)}
              class={classes.gridItemImg}
            />
          }
        >
          {(url) => (
            <img
              class={classes.gridItemImg}
              src={getFaviconUrl(url())}
              alt=""
            />
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
              <span {...triggerProps} class={classes.gridItemText}>
                {props.item.title}
              </span>
            )}
          />

          <Portal>
            <Tooltip.Positioner>
              <Tooltip.Arrow>
                <Tooltip.ArrowTip />
              </Tooltip.Arrow>
              <Tooltip.Content w="max-content" maxW="3xl" textAlign="center">
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
    <div class={classes.gridItem}>
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
            class={classes.gridItemAction}
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
            class={classes.gridItemAction}
            href={url()}
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

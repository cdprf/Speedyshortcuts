import {
  CopyPlusIcon,
  FileStackIcon,
  EllipsisVertical,
  PencilIcon,
  Trash2Icon,
} from "lucide-solid"
import { createSignal } from "solid-js"
import { Portal } from "solid-js/web"
import { browser } from "wxt/browser"
import { Menu } from "~/components/ui/menu"
import type { BookmarkDataType, ModalTypes } from "~/stores"

type P = {
  item: BookmarkDataType
  openModal: (type: ModalTypes, item?: BookmarkDataType) => void
  duplicateSpeedDial: (item: Partial<BookmarkDataType>) => void
}

export const ContextMenu = (props: P) => {
  const [open, setOpen] = createSignal(false)
  const handleOpenMenu = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen((open) => !open)
  }

  const openFolderLinks = async () => {
    const [folder] = await browser.bookmarks.getSubTree(props.item.id)

    const openChildren = (children?: BookmarkDataType[]) => {
      children?.forEach((child) => {
        if (child.url) {
          browser.tabs.create({ url: child.url, active: false })
        } else {
          openChildren(child.children)
        }
      })
    }

    openChildren(folder?.children)
  }

  return (
    <Menu.Root
      lazyMount
      unmountOnExit
      open={open()}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Menu.Trigger
        asChild={(triggerProps) => (
          <button
            {...triggerProps}
            class="absolute! top-2 right-2 z-1 cursor-pointer p-1 opacity-0 [transition:opacity_0.25s_ease-in-out,background-color_0.25s_ease-in-out] focus:opacity-100 data-[state=open]:opacity-100 group-hover/gridItem:opacity-100! group-hover/gridItem:[transition:opacity_0.25s_ease-in-out_0.4s,background-color_0.25s_ease-in-out]"
            on:click={handleOpenMenu}
          />
        )}
      >
        <EllipsisVertical size={14} />
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content class="border border-(--colors-gray-a6)">
            {!props.item?.url && (
              <Menu.Item
                id="open_in_new_tab"
                value="open_in_new_tab"
                onClick={openFolderLinks}
              >
                <div class="flex items-center gap-2">
                  <FileStackIcon size={16} />
                  Open all in new tabs
                </div>
              </Menu.Item>
            )}

            <Menu.Item
              id="edit"
              value="edit"
              onClick={() => props.openModal("EDIT", props.item)}
            >
              <div class="flex items-center gap-2">
                <PencilIcon size={16} />
                Edit
              </div>
            </Menu.Item>

            <Menu.Item
              id="delete"
              value="delete"
              onClick={() => props.openModal("DELETE", props.item)}
            >
              <div class="flex items-center gap-2">
                <Trash2Icon size={16} />
                Delete
              </div>
            </Menu.Item>

            <Menu.Item
              id="duplicate"
              value="duplicate"
              onClick={() => props.duplicateSpeedDial(props.item)}
            >
              <div class="flex items-center gap-2">
                <CopyPlusIcon size={16} />
                Duplicate
              </div>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

import {
  CopyPlusIcon,
  FileStackIcon,
  EllipsisVertical,
  PencilIcon,
  Trash2Icon,
} from "lucide-solid"
import { createSignal } from "solid-js"
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
      positioning={{ placement: "bottom-start" }}
    >
      <Menu.Trigger
        asChild={(triggerProps) => (
          <button
            {...triggerProps}
            class="absolute! top-2 right-2 z-1 cursor-pointer p-1 opacity-0 [transition:opacity_0.25s_ease-in-out,background-color_0.25s_ease-in-out] focus:opacity-100 data-[state=open]:opacity-100 group-hover/gridItem:opacity-100! group-hover/gridItem:[transition:opacity_0.125s_ease-in-out_0.25s,background-color_0.25s_ease-in-out]"
            on:click={handleOpenMenu}
          />
        )}
      >
        <EllipsisVertical size={14} />
      </Menu.Trigger>

      <Menu.Content>
        <Menu.ItemGroup>
          {!props.item?.url && (
            <Menu.Item
              id="open_in_new_tab"
              value="open_in_new_tab"
              onClick={openFolderLinks}
            >
              <FileStackIcon aria-hidden="true" />
              Open all in new tabs
            </Menu.Item>
          )}

          <Menu.Item
            id="edit"
            value="edit"
            onClick={() => props.openModal("EDIT", props.item)}
          >
            <PencilIcon aria-hidden="true" />
            Edit
          </Menu.Item>

          <Menu.Item
            id="duplicate"
            value="duplicate"
            onClick={() => props.duplicateSpeedDial(props.item)}
          >
            <CopyPlusIcon aria-hidden="true" />
            Duplicate
          </Menu.Item>

          <Menu.Item
            id="delete"
            value="delete"
            variant="destructive"
            onClick={() => props.openModal("DELETE", props.item)}
          >
            <Trash2Icon aria-hidden="true" />
            Delete
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Root>
  )
}

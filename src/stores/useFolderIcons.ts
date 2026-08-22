import { createSignal } from "solid-js"
import { storage } from "wxt/utils/storage"

export const DEFAULT_FOLDER_ICON = "Folder"

type FolderIconMap = Record<string, string>

const folderIconsStorage = storage.defineItem<FolderIconMap>(
  "local:folderIcons",
  { fallback: {} }
)

const [folderIcons, setFolderIcons] = createSignal<FolderIconMap>({})

void folderIconsStorage.getValue().then(setFolderIcons).catch(console.error)
folderIconsStorage.watch(setFolderIcons)

export const getFolderIcon = (folderId: string) =>
  folderIcons()[folderId] ?? DEFAULT_FOLDER_ICON

export const setFolderIcon = async (folderId: string, iconName?: string) => {
  try {
    const nextIcons = { ...(await folderIconsStorage.getValue()) }

    if (!iconName || iconName === DEFAULT_FOLDER_ICON) {
      delete nextIcons[folderId]
    } else {
      nextIcons[folderId] = iconName
    }

    setFolderIcons(nextIcons)
    await folderIconsStorage.setValue(nextIcons)
  } catch (error) {
    console.error("Unable to save folder icon", error)
  }
}

export const removeFolderIcons = async (folderIds: string[]) => {
  if (folderIds.length === 0) return

  try {
    const nextIcons = { ...(await folderIconsStorage.getValue()) }
    folderIds.forEach((folderId) => delete nextIcons[folderId])

    setFolderIcons(nextIcons)
    await folderIconsStorage.setValue(nextIcons)
  } catch (error) {
    console.error("Unable to remove folder icons", error)
  }
}

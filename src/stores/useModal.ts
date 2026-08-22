import { createMemo, createSignal } from "solid-js"
import { isUrlValid } from "~/utils"
import {
  addNewSpeedDial,
  type BookmarkDataType,
  currentFolder,
  DEFAULT_FOLDER_ICON,
  deleteSpeedDial,
  editSpeedDial,
  getFolderIcon,
  type SpeedDialValues,
} from "./"

export type ModalType = {
  type: keyof typeof MODAL_TYPES
  title: string
  button: string
  description: string
}

export type SpeedDialKind = "bookmark" | "folder"

export type ModalDataType = SpeedDialValues & { kind?: SpeedDialKind }

export const MODAL_TYPES = {
  ADD: {
    type: "ADD",
    title: "Create",
    button: "Create",
    description: "Create a new speed dial",
  },
  EDIT: {
    type: "EDIT",
    title: "Edit",
    button: "Save",
    description: "Edit the speed dial",
  },
  DELETE: {
    type: "DELETE",
    title: "Delete",
    button: "Delete",
    description: "Are you sure you want to delete?",
  },
} as const

export type ModalTypes = keyof typeof MODAL_TYPES

export const isValid = (type?: ModalTypes, data?: ModalDataType) => {
  if (type === "DELETE") {
    return !!data?.id
  } else if (type === "EDIT" || type === "ADD") {
    const hasRequiredIdentity = type === "EDIT" ? !!data?.id : true
    const isFolder = data?.kind === "folder"

    if (isFolder) return !!(hasRequiredIdentity && data?.title?.trim())

    return !!(
      hasRequiredIdentity &&
      data?.title?.trim() &&
      data?.url &&
      isUrlValid(data.url)
    )
  }
  return false
}

const [isModalOpen, setIsModalOpen] = createSignal(false)
const [modalType, setModalType] = createSignal<ModalType>()
const [modalData, setModalData] = createSignal<ModalDataType>()
const modalItemKind = createMemo<SpeedDialKind>(
  () => modalData()?.kind ?? "bookmark"
)

const openModal = (type: ModalTypes, data?: BookmarkDataType) => {
  setIsModalOpen(true)
  setModalType(MODAL_TYPES[type])
  setModalData(
    data
      ? {
          ...data,
          parentId: data.parentId ?? currentFolder()?.id,
          kind: data.url ? "bookmark" : "folder",
          ...(!data.url ? { icon: getFolderIcon(data.id) } : {}),
        }
      : { kind: "bookmark", parentId: currentFolder()?.id }
  )
}

const closeModal = () => {
  setIsModalOpen(false)
  setModalData()
}

const handleModalDataChange = (e: Event) => {
  const { name, value = "" } = e.target as HTMLInputElement
  setModalData((s) => ({ ...s, [name]: value }))
}

const setModalItemKind = (kind: SpeedDialKind) => {
  setModalData((data) => ({
    ...data,
    kind,
    ...(kind === "folder"
      ? { url: undefined, icon: data?.icon ?? DEFAULT_FOLDER_ICON }
      : {}),
  }))
}

const setModalFolderIcon = (icon: string) => {
  setModalData((data) => ({ ...data, icon }))
}

const setModalParentFolder = (parentId: string) => {
  setModalData((data) => ({ ...data, parentId }))
}

const handleModalOnSubmit = () => {
  const type = modalType()?.type
  if (type && isValid(type, modalData())) {
    if (type === "DELETE") {
      deleteSpeedDial(modalData())
    } else if (type === "EDIT") {
      editSpeedDial(modalData())
    } else if (type === "ADD") {
      addNewSpeedDial(modalData())
    }
  }

  closeModal()
}

export {
  modalType,
  modalData,
  modalItemKind,
  openModal,
  closeModal,
  isModalOpen,
  setIsModalOpen,
  handleModalOnSubmit,
  handleModalDataChange,
  setModalItemKind,
  setModalFolderIcon,
  setModalParentFolder,
}

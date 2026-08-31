import { createMemo, createSignal } from "solid-js"
import { isUrlValid, normalizeUrl } from "~/utils"
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

export type ModalField = "title" | "url"
export type ModalValidationErrors = Partial<Record<ModalField, string>>

export const MODAL_TYPES = {
  ADD: {
    type: "ADD",
    title: "Add an item",
    button: "Add",
    description: "Choose what to add to this folder.",
  },
  EDIT: {
    type: "EDIT",
    title: "Edit item",
    button: "Save changes",
    description: "Change this item's details.",
  },
  DELETE: {
    type: "DELETE",
    title: "Delete item",
    button: "Delete",
    description: "This cannot be undone.",
  },
} as const

export type ModalTypes = keyof typeof MODAL_TYPES

export const getModalValidationErrors = (
  type?: ModalTypes,
  data?: ModalDataType
): ModalValidationErrors => {
  const errors: ModalValidationErrors = {}

  if (type !== "EDIT" && type !== "ADD") return errors

  if (!data?.title?.trim()) {
    errors.title =
      data?.kind === "folder"
        ? "Enter a folder name."
        : "Enter a speed dial name."
  }

  if (data?.kind !== "folder") {
    if (!data?.url?.trim()) {
      errors.url = "Enter a web address."
    } else if (!isUrlValid(data.url)) {
      errors.url = "Enter a valid web address, such as https://example.com."
    }
  }

  return errors
}

export const isValid = (type?: ModalTypes, data?: ModalDataType) => {
  if (type === "DELETE") {
    return !!data?.id
  }

  if (type !== "EDIT" && type !== "ADD") return false

  const hasRequiredIdentity = type !== "EDIT" || !!data?.id
  return (
    hasRequiredIdentity &&
    !Object.keys(getModalValidationErrors(type, data)).length
  )
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
    const data = modalData()
    const values = data?.url
      ? { ...data, url: normalizeUrl(data.url) ?? data.url }
      : data

    if (type === "DELETE") {
      deleteSpeedDial(values)
    } else if (type === "EDIT") {
      editSpeedDial(values)
    } else if (type === "ADD") {
      addNewSpeedDial(values)
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

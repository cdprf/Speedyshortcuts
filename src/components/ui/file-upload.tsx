import {
  FileUpload as ArkFileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
} from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const RootProvider = withClass(ArkFileUpload.RootProvider, "fileUpload__root")
const Root = withClass(ArkFileUpload.Root, "fileUpload__root")
const Dropzone = withClass(ArkFileUpload.Dropzone, "fileUpload__dropzone")
const ItemDeleteTrigger = withClass(
  ArkFileUpload.ItemDeleteTrigger,
  "fileUpload__itemDeleteTrigger"
)
const ItemGroup = withClass(ArkFileUpload.ItemGroup, "fileUpload__itemGroup")
const ItemName = withClass(ArkFileUpload.ItemName, "fileUpload__itemName")
const ItemPreviewImage = withClass(
  ArkFileUpload.ItemPreviewImage,
  "fileUpload__itemPreviewImage"
)
const ItemPreview = withClass(
  ArkFileUpload.ItemPreview,
  "fileUpload__itemPreview"
)
const Item = withClass(ArkFileUpload.Item, "fileUpload__item")
const ItemSizeText = withClass(
  ArkFileUpload.ItemSizeText,
  "fileUpload__itemSizeText"
)
const Label = withClass(ArkFileUpload.Label, "fileUpload__label")
const Trigger = withClass(ArkFileUpload.Trigger, "fileUpload__trigger")

export type FileUploadRootProviderProps = ComponentProps<typeof RootProvider>
export type FileUploadRootProps = ComponentProps<typeof Root>

export const FileUpload = {
  RootProvider,
  Root,
  Dropzone,
  ItemDeleteTrigger,
  ItemGroup,
  ItemName,
  ItemPreviewImage,
  ItemPreview,
  Item,
  ItemSizeText,
  Label,
  Trigger,
  Context: FileUploadContext,
  HiddenInput: FileUploadHiddenInput,
}

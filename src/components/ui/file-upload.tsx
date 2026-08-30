import {
  FileUpload as ArkFileUpload,
  ark,
  useFileUploadContext,
} from "@ark-ui/solid"
import { UploadIcon, XIcon } from "lucide-solid"
import { For, Show, splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"
import { Button } from "./button"

export const useFileUpload = useFileUploadContext

export const FileUploadRoot = (
  props: ComponentProps<typeof ArkFileUpload.Root>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkFileUpload.Root
      {...rest}
      class={cn(
        "group/file-upload relative flex flex-col justify-center gap-4",
        local.class
      )}
      data-slot="file-upload"
    >
      {local.children}
      <ArkFileUpload.HiddenInput />
    </ArkFileUpload.Root>
  )
}

export const FileUploadTrigger = (
  props: ComponentProps<typeof ArkFileUpload.Trigger>
) => <ArkFileUpload.Trigger data-slot="file-upload-trigger" {...props} />

export const FileUploadDropzone = (
  props: ComponentProps<typeof ArkFileUpload.Dropzone>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkFileUpload.Dropzone
      {...rest}
      class={cn(
        "[--space:--spacing(6)] p-(--space)",
        "flex flex-col items-center justify-center gap-2 text-center",
        "cursor-pointer rounded-2xl border-2 border-input border-dashed",
        "data-cover:absolute data-cover:inset-0 data-cover:flex data-cover:items-center data-cover:justify-center",
        "data-dragging:border-primary data-dragging:bg-primary/10",
        "data-invalid:border-destructive dark:data-invalid:border-destructive-foreground",
        local.class
      )}
      data-slot="file-upload-dropzone"
    />
  )
}

export const FileUploadDropzoneIcon = (
  props: ComponentProps<typeof ark.div>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ark.div
      {...rest}
      class={cn(
        "rounded-full border bg-muted/48 p-3 text-muted-foreground",
        "group-data-dragging/file-upload:border-primary/24 group-data-dragging/file-upload:bg-primary/5 group-data-dragging/file-upload:text-primary",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="file-upload-dropzone-icon"
    >
      {local.children || <UploadIcon aria-hidden="true" />}
    </ark.div>
  )
}

export const FileUploadTitle = (props: ComponentProps<typeof ark.div>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ark.div
      {...rest}
      class={cn("font-medium text-foreground text-sm", local.class)}
      data-slot="file-upload-title"
    />
  )
}

export const FileUploadDescription = (
  props: ComponentProps<typeof ark.div>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ark.div
      {...rest}
      class={cn("font-medium text-muted-foreground text-sm", local.class)}
      data-slot="file-upload-description"
    />
  )
}

export const FileUploadHelper = (props: ComponentProps<typeof ark.div>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ark.div
      {...rest}
      class={cn("text-muted-foreground text-xs", local.class)}
      data-slot="file-upload-dropzone-helper"
    />
  )
}

export const FileUploadItemGroup = (
  props: ComponentProps<typeof ArkFileUpload.ItemGroup>
) => <ArkFileUpload.ItemGroup data-slot="file-upload-item-group" {...props} />

export type FileUploadListProps = Omit<
  ComponentProps<typeof ArkFileUpload.Item>,
  "file"
>

export const FileUploadList = (props: FileUploadListProps) => {
  const [local, rest] = splitProps(props, ["class"])
  const fileUpload = useFileUpload()
  const files = () => fileUpload().acceptedFiles

  return (
    <Show when={files().length > 0}>
      <FileUploadItemGroup class="flex flex-col gap-2">
        <For each={files()}>
          {(file) => {
            const isImage = () => file.type.startsWith("image/")
            const extension = () => file.name.split(".").pop()

            return (
              <FileUploadItem
                {...rest}
                class={cn(
                  "flex-1 items-start justify-start gap-4 bg-card p-2",
                  "rounded-xl border fade-in-0 slide-in-from-top-5 animate-in",
                  "motion-reduce:animate-none!",
                  local.class
                )}
                file={file}
              >
                <FileUploadItemPreview
                  class="size-8"
                  type={isImage() ? "image/*" : ".*"}
                >
                  <Show
                    when={isImage()}
                    fallback={<span class="uppercase">{extension()}</span>}
                  >
                    <FileUploadItemPreviewImage />
                  </Show>
                </FileUploadItemPreview>

                <div class="min-w-0 flex-1 overflow-hidden">
                  <FileUploadItemName />
                  <FileUploadItemSize />
                </div>

                <FileUploadItemDeleteTrigger
                  asChild={(deleteProps) => (
                    <Button
                      {...deleteProps()}
                      aria-label={`Remove ${file.name}`}
                      class={cn(
                        "me-auto rounded-lg rtl:ms-auto",
                        "hover:bg-destructive/10 hover:text-destructive",
                        "dark:hover:bg-destructive-foreground/10 dark:hover:text-destructive-foreground"
                      )}
                      size="icon-xs"
                      variant="ghost"
                    >
                      <XIcon aria-hidden="true" />
                    </Button>
                  )}
                />
              </FileUploadItem>
            )
          }}
        </For>
      </FileUploadItemGroup>
    </Show>
  )
}

export const FileUploadItem = (
  props: ComponentProps<typeof ArkFileUpload.Item>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkFileUpload.Item
      {...rest}
      class={cn("relative inline-flex", local.class)}
      data-slot="file-upload-item"
    />
  )
}

export const FileUploadItemPreview = (
  props: ComponentProps<typeof ArkFileUpload.ItemPreview>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkFileUpload.ItemPreview
      {...rest}
      class={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        "select-none bg-primary/10 font-semibold text-[0.5rem] text-primary",
        local.class
      )}
      data-slot="file-upload-item-preview"
    />
  )
}

export const FileUploadItemPreviewImage = (
  props: ComponentProps<typeof ArkFileUpload.ItemPreviewImage>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkFileUpload.ItemPreviewImage
      {...rest}
      class={cn("aspect-square size-full rounded-lg object-cover", local.class)}
      data-slot="file-upload-item-preview-image"
    />
  )
}

export const FileUploadItemName = (
  props: ComponentProps<typeof ArkFileUpload.ItemName>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkFileUpload.ItemName
      {...rest}
      class={cn(
        "min-w-0 truncate overflow-hidden font-medium text-xs",
        local.class
      )}
      data-slot="file-upload-item-name"
    />
  )
}

export const FileUploadItemSize = (
  props: ComponentProps<typeof ArkFileUpload.ItemSizeText>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkFileUpload.ItemSizeText
      {...rest}
      class={cn("text-muted-foreground text-xs", local.class)}
      data-slot="file-upload-item-size"
    />
  )
}

export const FileUploadItemDeleteTrigger = (
  props: ComponentProps<typeof ArkFileUpload.ItemDeleteTrigger>
) => (
  <ArkFileUpload.ItemDeleteTrigger
    data-slot="file-upload-item-delete-trigger"
    {...props}
  />
)

export const FileUploadClearTrigger = (
  props: ComponentProps<typeof ArkFileUpload.ClearTrigger>
) => (
  <ArkFileUpload.ClearTrigger
    data-slot="file-upload-clear-trigger"
    {...props}
  />
)

export const FileUploadRootProvider = (
  props: ComponentProps<typeof ArkFileUpload.RootProvider>
) => (
  <ArkFileUpload.RootProvider
    data-slot="file-upload-root-provider"
    {...props}
  />
)

export type FileUploadRootProps = ComponentProps<typeof FileUploadRoot>
export type FileUploadRootProviderProps = ComponentProps<
  typeof FileUploadRootProvider
>

export const FileUpload = Object.assign(FileUploadRoot, {
  RootProvider: FileUploadRootProvider,
  Root: FileUploadRoot,
  Trigger: FileUploadTrigger,
  Dropzone: FileUploadDropzone,
  DropzoneIcon: FileUploadDropzoneIcon,
  Title: FileUploadTitle,
  Label: FileUploadTitle,
  Description: FileUploadDescription,
  Helper: FileUploadHelper,
  List: FileUploadList,
  ItemGroup: FileUploadItemGroup,
  Item: FileUploadItem,
  ItemPreview: FileUploadItemPreview,
  ItemPreviewImage: FileUploadItemPreviewImage,
  ItemName: FileUploadItemName,
  ItemSize: FileUploadItemSize,
  ItemSizeText: FileUploadItemSize,
  ItemDeleteTrigger: FileUploadItemDeleteTrigger,
  ClearTrigger: FileUploadClearTrigger,
  Context: ArkFileUpload.Context,
  HiddenInput: ArkFileUpload.HiddenInput,
})

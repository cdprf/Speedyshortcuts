import {
  CircleAlertIcon,
  ImageIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-solid"
import { Button } from "~/components/ui/button"
import {
  FileUpload as SharkFileUpload,
  type FileUploadRootProps,
} from "~/components/ui/file-upload"
import { Alert } from "~/components/ui/alert"
import { Show, splitProps } from "solid-js"
import { Text } from "~/components/ui/text"
import type { FileUploadFileError } from "@ark-ui/solid/file-upload"

const errorMessages: Record<FileUploadFileError, string> = {
  TOO_MANY_FILES: "Choose one image at a time.",
  FILE_INVALID_TYPE: "Choose an image file.",
  FILE_TOO_LARGE: "Choose an image smaller than 1.5 MB.",
  FILE_TOO_SMALL: "That image is empty. Choose another file.",
  FILE_INVALID: "That image could not be read. Choose another file.",
  FILE_EXISTS: "That image is already selected.",
}

export const FileUpload = (
  props: FileUploadRootProps & {
    onFilesChange?: (files: File[]) => void
    currentImage?: string
    onRemove?: () => void
  }
) => {
  const [local, rest] = splitProps(props, [
    "onFilesChange",
    "onRemove",
    "currentImage",
  ])

  const handleRemove = () => {
    if (local.onRemove) {
      local.onRemove()
    } else if (local.onFilesChange) {
      local.onFilesChange([])
    }
  }

  const handleFileChange = (e: { acceptedFiles: File[] }) => {
    local.onFilesChange?.(e.acceptedFiles)
  }

  return (
    <SharkFileUpload.Root
      maxFiles={1}
      maxFileSize={1572864} // 1.5MB => due to browser storage restriction
      {...rest}
      onFileChange={handleFileChange}
    >
      <Show
        when={local.currentImage}
        fallback={
          <SharkFileUpload.Dropzone class="gap-3 py-7 transition-colors duration-200">
            <SharkFileUpload.DropzoneIcon />
            <div class="space-y-1">
              <SharkFileUpload.Title>
                Upload a background image
              </SharkFileUpload.Title>
              <SharkFileUpload.Description>
                Drop an image here or choose a file.
              </SharkFileUpload.Description>
            </div>
            <SharkFileUpload.Trigger
              asChild={(triggerProps) => (
                <Button {...triggerProps()} size="sm">
                  <UploadIcon aria-hidden="true" /> Choose image
                </Button>
              )}
            />
            <SharkFileUpload.Helper>
              PNG, JPG, WebP, or GIF, up to 1.5 MB.
            </SharkFileUpload.Helper>
          </SharkFileUpload.Dropzone>
        }
      >
        {(image) => (
          <section class="overflow-hidden rounded-xl border bg-card fade-in-0 slide-in-from-top-3 animate-in motion-reduce:animate-none!">
            <div class="relative aspect-16/8 overflow-hidden bg-muted">
              <img
                alt="Current background image preview"
                class="size-full object-cover"
                src={image()}
              />
              <div class="absolute inset-0 bg-linear-to-t from-background/65 via-transparent to-transparent" />
              <div class="absolute inset-x-3 bottom-3 flex items-center gap-2 text-xs font-medium text-white drop-shadow-sm">
                <span class="flex size-7 items-center justify-center rounded-lg bg-background/80 text-foreground shadow-sm">
                  <ImageIcon aria-hidden="true" class="size-3.5" />
                </span>
                Background image in use
              </div>
            </div>

            <div class="flex items-center justify-between gap-3 p-3">
              <div class="min-w-0">
                <p class="font-medium text-sm">Custom image</p>
                <p class="mt-0.5 text-muted-foreground text-xs">
                  Replaces the background color while active.
                </p>
              </div>
              <div class="flex shrink-0 items-center gap-1">
                <SharkFileUpload.Trigger
                  asChild={(triggerProps) => (
                    <Button {...triggerProps()} size="sm" variant="outline">
                      <UploadIcon aria-hidden="true" /> Replace
                    </Button>
                  )}
                />
                <SharkFileUpload.Context>
                  {(fileUpload) => (
                    <Button
                      aria-label="Remove background image"
                      class="hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive-foreground/10 dark:hover:text-destructive-foreground"
                      onClick={() => {
                        fileUpload().clearFiles()
                        handleRemove()
                      }}
                      size="icon-xs"
                      variant="ghost"
                    >
                      <Trash2Icon aria-hidden="true" />
                    </Button>
                  )}
                </SharkFileUpload.Context>
              </div>
            </div>
          </section>
        )}
      </Show>

      <SharkFileUpload.Context>
        {(fileUpload) => (
          <Show when={fileUpload().rejectedFiles[0]?.errors[0]} keyed>
            {(error) => (
              <Alert.Root role="alert" variant="destructive">
                <CircleAlertIcon aria-hidden="true" />
                <Alert.Title>Couldn’t use that image</Alert.Title>
                <Alert.Description>
                  <Text size="sm">
                    {errorMessages[error] ||
                      "That image could not be read. Choose another file."}
                  </Text>
                </Alert.Description>
              </Alert.Root>
            )}
          </Show>
        )}
      </SharkFileUpload.Context>
    </SharkFileUpload.Root>
  )
}

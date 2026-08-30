import { CircleAlertIcon, XIcon } from "lucide-solid"
import { Button } from "~/components/ui/button"
import {
  FileUpload as SharkFileUpload,
  type FileUploadRootProps,
} from "~/components/ui/file-upload"
import { Alert } from "~/components/ui/alert"
import { Show, createMemo } from "solid-js"
import { Text } from "~/components/ui/text"
import type { FileUploadFileError } from "@ark-ui/solid/file-upload"
import { Divider } from "./Divider"

const errorMessages: Record<FileUploadFileError, string> = {
  TOO_MANY_FILES: "Too many files selected (max 1 allowed)",
  FILE_INVALID_TYPE: "Invalid file type (only images allowed)",
  FILE_TOO_LARGE: "File too large (max 1.5MB)",
  FILE_TOO_SMALL: "File too small",
  FILE_INVALID: "Invalid file",
  FILE_EXISTS: "File already exists",
}

export const FileUpload = (
  props: FileUploadRootProps & {
    onFilesChange?: (files: File[]) => void
    currentImage?: string
    onRemove?: () => void
  }
) => {
  const { onFilesChange, onRemove, currentImage, ...rest } = props
  const currentImageFile = createMemo(
    () => new File([], "background-image", { type: "image/png" })
  )

  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    } else if (onFilesChange) {
      onFilesChange([])
    }
  }

  const handleFileChange = (e: { acceptedFiles: File[] }) => {
    onFilesChange?.(e.acceptedFiles)
  }

  return (
    <SharkFileUpload.Root
      maxFiles={1}
      maxFileSize={1572864} // 1.5MB => due to browser storage restriction
      {...rest}
      onFileChange={handleFileChange}
    >
      <SharkFileUpload.Dropzone>
        <SharkFileUpload.DropzoneIcon />
        <SharkFileUpload.Title>Drop image here</SharkFileUpload.Title>
        <div class="flex w-full items-center justify-center gap-2">
          <Divider class="m-0!" />
          <SharkFileUpload.Description>or</SharkFileUpload.Description>
          <Divider class="m-0!" />
        </div>
        <SharkFileUpload.Trigger
          asChild={(triggerProps) => (
            <Button {...triggerProps()} size="sm">
              Browse image
            </Button>
          )}
        />
        <SharkFileUpload.Helper>
          Upload one image up to 1.5 MB.
        </SharkFileUpload.Helper>

        <SharkFileUpload.Context>
          {(fileUpload) => (
            <Show when={fileUpload().rejectedFiles[0]?.errors[0]} keyed>
              {(error) => (
                <Alert.Root class="mt-3" role="alert" variant="destructive">
                  <CircleAlertIcon aria-hidden="true" />
                  <Alert.Title>Upload Error</Alert.Title>
                  <Alert.Description>
                    <Text size="sm">
                      {errorMessages[error] || `Unknown error: ${error}`}
                    </Text>
                  </Alert.Description>
                </Alert.Root>
              )}
            </Show>
          )}
        </SharkFileUpload.Context>
      </SharkFileUpload.Dropzone>

      <Show when={currentImage} fallback={<SharkFileUpload.List />}>
        {(image) => (
          <SharkFileUpload.ItemGroup class="flex flex-col gap-2">
            <SharkFileUpload.Item
              class="flex-1 items-start justify-start gap-4 rounded-xl border bg-card p-2 fade-in-0 slide-in-from-top-5 animate-in motion-reduce:animate-none!"
              file={currentImageFile()}
            >
              <SharkFileUpload.ItemPreview class="size-12" type="image/*">
                <img
                  alt="Background preview"
                  class="aspect-square size-full rounded-lg object-cover"
                  src={image()}
                />
              </SharkFileUpload.ItemPreview>

              <div class="min-w-0 flex-1 overflow-hidden">
                <SharkFileUpload.ItemName>
                  Current background image
                </SharkFileUpload.ItemName>
                <SharkFileUpload.ItemSize>Saved image</SharkFileUpload.ItemSize>
              </div>

              <SharkFileUpload.Context>
                {(fileUpload) => (
                  <Button
                    aria-label="Remove background image"
                    class="me-auto rounded-lg hover:bg-destructive/10 hover:text-destructive rtl:ms-auto dark:hover:bg-destructive-foreground/10 dark:hover:text-destructive-foreground"
                    onClick={() => {
                      fileUpload().clearFiles()
                      handleRemove()
                    }}
                    size="icon-xs"
                    variant="ghost"
                  >
                    <XIcon aria-hidden="true" />
                  </Button>
                )}
              </SharkFileUpload.Context>
            </SharkFileUpload.Item>
          </SharkFileUpload.ItemGroup>
        )}
      </Show>
    </SharkFileUpload.Root>
  )
}

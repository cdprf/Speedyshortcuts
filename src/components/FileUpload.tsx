import { Trash2Icon, ImageIcon, CircleAlertIcon } from "lucide-solid"
import { Button } from "~/components/ui/button"
import {
  FileUpload as ParkFileUpload,
  type FileUploadRootProps,
} from "~/components/ui/file-upload"
import { IconButton } from "~/components/ui/icon-button"
import { Alert } from "~/components/ui/alert"
import { Show } from "solid-js"
import { Text } from "~/components/ui/text"
import type { FileUploadFileError } from "@ark-ui/solid/file-upload"

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
  const { onFilesChange, onRemove, ...rest } = props

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
    <ParkFileUpload.Root
      maxFiles={1}
      maxFileSize={1572864} // 1.5MB => due to browser storage restriction
      {...rest}
      acceptedFiles={
        props.currentImage ? [new File([props.currentImage], "image")] : []
      }
      onFileChange={handleFileChange}
    >
      <Show
        when={props.currentImage}
        fallback={
          <>
            <ParkFileUpload.HiddenInput />

            <ParkFileUpload.Dropzone class="cursor-pointer min-h-auto">
              <ParkFileUpload.Label class="text-center">
                Upload image for main background
                <br />
                (max size 1.5MB)
              </ParkFileUpload.Label>
              <ParkFileUpload.Trigger
                asChild={(triggerProps) => (
                  <Button size="sm" {...triggerProps()}>
                    Open Explorer
                  </Button>
                )}
              />

              {/* Error Messages */}
              <ParkFileUpload.Context>
                {(fileUpload) => (
                  <Show when={fileUpload().rejectedFiles[0]?.errors[0]} keyed>
                    {(error) => (
                      <Alert.Root class="my-3">
                        <Alert.Icon
                          asChild={(iconProps) => (
                            <CircleAlertIcon size={18} {...iconProps()} />
                          )}
                        />
                        <Alert.Content>
                          <Alert.Title>Upload Error</Alert.Title>
                          <Alert.Description>
                            <Text size="sm">
                              {errorMessages[error] ||
                                `Unknown error: ${error}`}
                            </Text>
                          </Alert.Description>
                        </Alert.Content>
                      </Alert.Root>
                    )}
                  </Show>
                )}
              </ParkFileUpload.Context>
            </ParkFileUpload.Dropzone>
          </>
        }
      >
        <div class="currentImagePanel">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <ImageIcon size={20} />
              <Text class="font-medium">Current background image</Text>
            </div>

            <div class="currentImagePreview">
              <img
                src={props.currentImage}
                alt="Background preview"
                style={{
                  "max-width": "100%",
                  "max-height": "200px",
                  "object-fit": "contain",
                }}
              />
              <IconButton
                size="sm"
                variant="outline"
                onClick={handleRemove}
                aria-label="Remove image"
                class="currentImageRemove"
              >
                <Trash2Icon />
              </IconButton>
            </div>
          </div>
        </div>
      </Show>
    </ParkFileUpload.Root>
  )
}

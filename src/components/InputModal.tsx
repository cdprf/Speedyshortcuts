import { createEffect, createSignal, Show } from "solid-js"
import { Button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldRequiredIndicator,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"
import {
  closeModal,
  folderTree,
  getModalValidationErrors,
  handleModalDataChange,
  handleModalOnSubmit,
  hasFolders,
  isModalOpen,
  modalData,
  modalItemKind,
  modalType,
  setModalFolderIcon,
  setModalItemKind,
  setModalParentFolder,
  setIsModalOpen,
} from "~/stores"
import { FolderSelector } from "./FolderSelector"
import { IconSelector } from "./IconSelector"

export const InputModal = () => {
  let titleInputRef: HTMLInputElement | undefined
  let urlInputRef: HTMLInputElement | undefined
  let cancelButtonRef: HTMLButtonElement | undefined
  const [errors, setErrors] = createSignal<Record<string, string | undefined>>(
    {}
  )

  createEffect(() => {
    if (isModalOpen()) setErrors({})
  })

  const validateField = (field: "title" | "url") => {
    const nextError = getModalValidationErrors(modalType()?.type, modalData())[
      field
    ]
    setErrors((current) => ({ ...current, [field]: nextError }))
    return !nextError
  }

  const handleInput = (event: Event) => {
    handleModalDataChange(event)

    const field = (event.currentTarget as HTMLInputElement).name
    if ((field === "title" || field === "url") && errors()[field]) {
      validateField(field)
    }
  }

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()

    const nextErrors = getModalValidationErrors(modalType()?.type, modalData())
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      if (nextErrors.title) titleInputRef?.focus()
      else if (nextErrors.url) urlInputRef?.focus()
      return
    }

    handleModalOnSubmit()
  }

  const modalDescription = () =>
    modalType()?.type === "DELETE"
      ? "This action cannot be undone."
      : modalType()?.description

  return (
    <Dialog
      open={isModalOpen()}
      initialFocusEl={() =>
        (modalType()?.type === "DELETE" ? cancelButtonRef : titleInputRef) ??
        null
      }
      onOpenChange={(e) => {
        setIsModalOpen(e.open)
      }}
      onExitComplete={closeModal}
    >
      <Dialog.Content>
        <Dialog.Header
          title={modalType()?.title}
          description={modalDescription()}
        />

        <form class="contents" noValidate onSubmit={handleSubmit}>
          <Dialog.Body>
            <div class="flex flex-col gap-4">
              {modalType()?.type === "DELETE" ? (
                <Text size="lg" class="self-start">
                  {modalItemKind() === "folder"
                    ? "Delete this folder and everything inside it?"
                    : modalType()?.description}
                </Text>
              ) : (
                <>
                  <Show when={modalType()?.type === "ADD"}>
                    <div class="flex w-full flex-col items-stretch gap-2">
                      <div
                        class="flex w-full items-center gap-2"
                        role="group"
                        aria-label="Item type"
                      >
                        <Button
                          type="button"
                          class="min-w-0 flex-1"
                          aria-pressed={modalItemKind() === "bookmark"}
                          variant={
                            modalItemKind() === "bookmark"
                              ? "default"
                              : "outline"
                          }
                          onClick={() => {
                            setModalItemKind("bookmark")
                            setErrors({})
                          }}
                        >
                          Speed dial
                        </Button>
                        <Button
                          type="button"
                          class="min-w-0 flex-1"
                          aria-pressed={modalItemKind() === "folder"}
                          variant={
                            modalItemKind() === "folder" ? "default" : "outline"
                          }
                          onClick={() => {
                            setModalItemKind("folder")
                            setErrors({})
                          }}
                        >
                          Folder
                        </Button>
                      </div>
                    </div>
                  </Show>

                  <FieldGroup>
                    <Field required invalid={!!errors().title}>
                      <FieldLabel>
                        {modalItemKind() === "folder"
                          ? "Folder name"
                          : "Speed dial name"}
                        <FieldRequiredIndicator />
                      </FieldLabel>
                      <Input
                        ref={(element) => (titleInputRef = element)}
                        name="title"
                        inputMode="text"
                        type="text"
                        placeholder={
                          modalItemKind() === "folder" ? "Folder name" : "Name"
                        }
                        value={modalData()?.title || ""}
                        onInput={handleInput}
                        onBlur={() => validateField("title")}
                      />
                      <Show when={errors().title}>
                        {(error) => <FieldError>{error()}</FieldError>}
                      </Show>
                    </Field>
                    <Show when={modalItemKind() === "bookmark"}>
                      <Field required invalid={!!errors().url}>
                        <FieldLabel>
                          URL
                          <FieldRequiredIndicator />
                        </FieldLabel>
                        <Input
                          ref={(element) => (urlInputRef = element)}
                          name="url"
                          inputMode="url"
                          type="url"
                          placeholder="https://example.com"
                          value={modalData()?.url || ""}
                          onInput={handleInput}
                          onBlur={() => validateField("url")}
                        />
                        <Show when={errors().url}>
                          {(error) => <FieldError>{error()}</FieldError>}
                        </Show>
                      </Field>
                    </Show>
                    <Show
                      when={
                        modalItemKind() === "bookmark" && hasFolders()
                          ? folderTree()
                          : undefined
                      }
                    >
                      {(root) => (
                        <FolderSelector
                          root={root()}
                          value={modalData()?.parentId}
                          onChange={setModalParentFolder}
                        />
                      )}
                    </Show>
                    <Show when={modalItemKind() === "folder"}>
                      <IconSelector
                        value={modalData()?.icon}
                        onChange={setModalFolderIcon}
                      />
                    </Show>
                  </FieldGroup>
                </>
              )}
            </div>
          </Dialog.Body>

          <Dialog.Footer>
            <Dialog.Close
              asChild={(closeProps) => (
                <Button
                  {...closeProps()}
                  ref={(element) => (cancelButtonRef = element)}
                  variant="outline"
                >
                  Cancel
                </Button>
              )}
            />
            <Button
              type="submit"
              variant={
                modalType()?.type === "DELETE" ? "destructive" : "default"
              }
            >
              {modalType()?.button}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog>
  )
}

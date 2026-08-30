import { Show } from "solid-js"
import { Button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"
import {
  closeModal,
  folderTree,
  handleModalDataChange,
  handleModalOnSubmit,
  hasFolders,
  isModalOpen,
  isValid,
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
  let cancelButtonRef: HTMLButtonElement | undefined

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()

    if (isValid(modalType()?.type, modalData())) {
      handleModalOnSubmit()
    }
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

        <form class="contents" onSubmit={handleSubmit}>
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
                          onClick={() => setModalItemKind("bookmark")}
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
                          onClick={() => setModalItemKind("folder")}
                        >
                          Folder
                        </Button>
                      </div>
                    </div>
                  </Show>

                  <div class="flex w-full flex-col items-stretch gap-2">
                    <label for="item-title" class="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      ref={(element) => (titleInputRef = element)}
                      id="item-title"
                      name="title"
                      inputMode="text"
                      type="text"
                      placeholder={
                        modalItemKind() === "folder" ? "Folder name" : "Name"
                      }
                      value={modalData()?.title || ""}
                      onInput={handleModalDataChange}
                    />
                  </div>
                  <Show when={modalItemKind() === "bookmark"}>
                    <div class="flex w-full flex-col items-stretch gap-2">
                      <label for="item-url" class="text-sm font-medium">
                        URL
                      </label>
                      <Input
                        id="item-url"
                        name="url"
                        inputMode="url"
                        type="url"
                        placeholder="https://example.com"
                        value={modalData()?.url || ""}
                        onInput={handleModalDataChange}
                      />
                    </div>
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
              disabled={!isValid(modalType()?.type, modalData())}
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

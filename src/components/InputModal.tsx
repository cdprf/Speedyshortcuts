import { XIcon } from "lucide-solid"
import { Show } from "solid-js"
import { Portal } from "solid-js/web"
import { Button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { IconButton } from "~/components/ui/icon-button"
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
  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()

    if (isValid(modalType()?.type, modalData())) {
      handleModalOnSubmit()
    }
  }

  return (
    <Dialog.Root
      lazyMount
      unmountOnExit
      open={isModalOpen()}
      onOpenChange={(e) => {
        setIsModalOpen(e.open)
      }}
      onExitComplete={closeModal}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="inputModalContent">
            <div class="mb-4 flex items-center justify-between">
              <Dialog.Title class="text-xl font-semibold">
                {modalType()?.title}
              </Dialog.Title>

              {/* <Dialog.CloseTrigger asChild> */}
              <Dialog.CloseTrigger>
                <IconButton size="sm" variant="ghost" aria-label="Close">
                  <XIcon aria-hidden="true" />
                </IconButton>
              </Dialog.CloseTrigger>
            </div>

            <form class="w-full" onSubmit={handleSubmit}>
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
                                ? "solid"
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
                              modalItemKind() === "folder" ? "solid" : "outline"
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
                        id="item-title"
                        name="title"
                        inputMode="text"
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

                <div class="flex items-center gap-4 self-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={!isValid(modalType()?.type, modalData())}
                  >
                    {modalType()?.button}
                  </Button>
                </div>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

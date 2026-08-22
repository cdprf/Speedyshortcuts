import { XIcon } from "lucide-solid"
import { Show } from "solid-js"
import { Portal } from "solid-js/web"
import { css } from "styled-system/css"
import { HStack, VStack } from "styled-system/jsx"
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

const fieldLabelClass = css({ fontSize: "sm", fontWeight: "medium" })
const modalFormClass = css({ width: "full" })

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
          <Dialog.Content
            p={"4"}
            minW="md"
            maxHeight="calc(100vh - 32px)"
            overflowY="auto"
          >
            <HStack justifyContent="space-between" mb={4}>
              <Dialog.Title fontSize="xl" fontWeight="semibold">
                {modalType()?.title}
              </Dialog.Title>

              {/* <Dialog.CloseTrigger asChild> */}
              <Dialog.CloseTrigger>
                <IconButton size="sm" variant="ghost" aria-label="Close">
                  <XIcon aria-hidden="true" />
                </IconButton>
              </Dialog.CloseTrigger>
            </HStack>

            <form class={modalFormClass} onSubmit={handleSubmit}>
              <VStack gap={4}>
                {modalType()?.type === "DELETE" ? (
                  <Text alignSelf={"flex-start"} fontSize="lg">
                    {modalItemKind() === "folder"
                      ? "Delete this folder and everything inside it?"
                      : modalType()?.description}
                  </Text>
                ) : (
                  <>
                    <Show when={modalType()?.type === "ADD"}>
                      <VStack width="full" alignItems="stretch" gap={2}>
                        <HStack
                          width="full"
                          gap={2}
                          role="group"
                          aria-label="Item type"
                        >
                          <Button
                            type="button"
                            flex="1"
                            minWidth="0"
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
                            flex="1"
                            minWidth="0"
                            aria-pressed={modalItemKind() === "folder"}
                            variant={
                              modalItemKind() === "folder" ? "solid" : "outline"
                            }
                            onClick={() => setModalItemKind("folder")}
                          >
                            Folder
                          </Button>
                        </HStack>
                      </VStack>
                    </Show>

                    <VStack width="full" alignItems="stretch" gap={2}>
                      <label for="item-title" class={fieldLabelClass}>
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
                    </VStack>
                    <Show when={modalItemKind() === "bookmark"}>
                      <VStack width="full" alignItems="stretch" gap={2}>
                        <label for="item-url" class={fieldLabelClass}>
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
                      </VStack>
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

                <HStack alignSelf={"flex-end"} gap={4}>
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
                </HStack>
              </VStack>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

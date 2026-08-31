import {
  ExternalLinkIcon,
  HandHeartIcon,
  InfoIcon,
  RotateCcwIcon,
  StarIcon,
  Undo2Icon,
} from "lucide-solid"
import { browser } from "wxt/browser"
import { Button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { Sheet } from "~/components/ui/sheet"
import { Text } from "~/components/ui/text"
import {
  isSettingDrawerOpen,
  setIsSettingDrawerOpen,
  gridColumns,
  dialSize,
  dialRadius,
  showSpeedDialTitles,
  showAddNewButton,
  showSettingsButton,
  showHelpButton,
  openLinksInNewTab,
  disableDragAndDrop,
  darkMode,
  mainBackgroundColor,
  mainBackgroundImage,
  resetAllSettings,
  resetSetting,
  toggleSettingsDrawer,
  DEFAULT_VALUES,
  speedDials,
} from "~/stores"
import { ColorPicker, Divider, FileUpload } from "."
import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
  NumberInputScrubber,
} from "~/components/ui/number-input"
import { Switch } from "~/components/ui/switch"
import { Show, createSignal, onMount, createMemo } from "solid-js"
import { Slider } from "~/components/ui/slider"
import { getGridDimensions } from "~/utils"
import { CustomTooltip } from "./CustomTooltip"

const RADII = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
] as const

const REVIEW_URLS = {
  chrome:
    "https://chromewebstore.google.com/detail/nice-speed-dials/igdancpfkcmgelecddchfeijbofdcnaa/reviews",
  edge: "https://microsoftedge.microsoft.com/addons/detail/nice-speed-dials/ipdcfhnakfnmchdkpboeakmijafmgnjm",
  firefox:
    "https://addons.mozilla.org/en-US/firefox/addon/nice-speed-dials/reviews/",
} as const

const SUPPORT_URL = "https://buymeacoffee.com/nsde"

export const SettingsDrawer = () => {
  const [isSupportDialogOpen, setIsSupportDialogOpen] = createSignal(false)

  // Reactive signals for settings
  const [currentGridColumns, setCurrentGridColumns] = createSignal<
    number | undefined
  >(DEFAULT_VALUES.gridColumns)
  const [currentDialSize, setCurrentDialSize] = createSignal(
    DEFAULT_VALUES.dialSize
  )
  const [currentDialRadius, setCurrentDialRadius] = createSignal(
    DEFAULT_VALUES.dialRadius
  )
  const [currentShowSpeedDialTitles, setCurrentShowSpeedDialTitles] =
    createSignal(DEFAULT_VALUES.showSpeedDialTitles)
  const [currentShowAddNew, setCurrentShowAddNew] = createSignal(
    DEFAULT_VALUES.showAddNewButton
  )
  const [currentShowSettings, setCurrentShowSettings] = createSignal(
    DEFAULT_VALUES.showSettingsButton
  )
  const [currentShowHelp, setCurrentShowHelp] = createSignal(
    DEFAULT_VALUES.showHelpButton
  )
  const [currentOpenLinksNewTab, setCurrentOpenLinksNewTab] = createSignal(
    DEFAULT_VALUES.openLinksInNewTab
  )
  const [currentDisableDragDrop, setCurrentDisableDragDrop] = createSignal(
    DEFAULT_VALUES.disableDragAndDrop
  )
  const [currentDarkMode, setCurrentDarkMode] = createSignal(
    DEFAULT_VALUES.darkMode
  )
  const [currentBgColor, setCurrentBgColor] = createSignal(
    DEFAULT_VALUES.mainBackgroundColor
  )
  const [currentBgImage, setCurrentBgImage] = createSignal<string | undefined>(
    DEFAULT_VALUES.mainBackgroundImage
  )

  // Load settings on mount
  onMount(async () => {
    setCurrentGridColumns((await gridColumns.getValue()) ?? undefined)
    setCurrentDialSize(await dialSize.getValue())
    setCurrentDialRadius(await dialRadius.getValue())
    setCurrentShowSpeedDialTitles(await showSpeedDialTitles.getValue())
    setCurrentShowAddNew(await showAddNewButton.getValue())
    setCurrentShowSettings(await showSettingsButton.getValue())
    setCurrentShowHelp(await showHelpButton.getValue())
    setCurrentOpenLinksNewTab(await openLinksInNewTab.getValue())
    setCurrentDisableDragDrop(await disableDragAndDrop.getValue())
    setCurrentDarkMode(await darkMode.getValue())
    setCurrentBgColor(await mainBackgroundColor.getValue())
    setCurrentBgImage(await mainBackgroundImage.getValue())

    // Watch for changes
    gridColumns.watch((value) => setCurrentGridColumns(value ?? undefined))
    dialSize.watch(setCurrentDialSize)
    dialRadius.watch(setCurrentDialRadius)
    showSpeedDialTitles.watch(setCurrentShowSpeedDialTitles)
    showAddNewButton.watch(setCurrentShowAddNew)
    showSettingsButton.watch(setCurrentShowSettings)
    showHelpButton.watch(setCurrentShowHelp)
    openLinksInNewTab.watch(setCurrentOpenLinksNewTab)
    disableDragAndDrop.watch(setCurrentDisableDragDrop)
    darkMode.watch(setCurrentDarkMode)
    mainBackgroundColor.watch(setCurrentBgColor)
    mainBackgroundImage.watch(setCurrentBgImage)

    // Watch for toggle settings drawer
    toggleSettingsDrawer.watch(async (value) => {
      if (value) {
        setIsSettingDrawerOpen(!isSettingDrawerOpen())
        await toggleSettingsDrawer.setValue(false)
      }
    })
  })

  // Calculate default columns when no custom value is set
  const defaultColumns = createMemo(() => {
    return getGridDimensions(speedDials.length).gridWidth
  })

  const handleResetAll = async () => {
    await resetAllSettings()
    setCurrentBgColor(DEFAULT_VALUES.mainBackgroundColor)
    setCurrentBgImage(undefined)
  }

  const handleBackgroundReset = async () => {
    // Update the visible state first so reset feels immediate.
    setCurrentBgColor(DEFAULT_VALUES.mainBackgroundColor)
    setCurrentBgImage(undefined)
    await Promise.all([
      resetSetting("mainBackgroundColor"),
      resetSetting("mainBackgroundImage"),
    ])
  }

  const openExternalPage = async (url: string) => {
    await browser.tabs.create({ url, active: true })
  }

  const openReviewPage = async () => {
    const browserName = import.meta.env.BROWSER as keyof typeof REVIEW_URLS
    await openExternalPage(REVIEW_URLS[browserName] ?? REVIEW_URLS.chrome)
  }

  const openSupportPage = async () => {
    setIsSupportDialogOpen(false)
    await openExternalPage(SUPPORT_URL)
  }

  return (
    <Sheet.Root
      open={isSettingDrawerOpen()}
      onOpenChange={(e) => setIsSettingDrawerOpen(e.open)}
    >
      <Sheet.Content variant="inset">
        <Sheet.Header
          title="Settings"
          description="Look and feel for this page"
        />

        <Sheet.Body>
          <section aria-labelledby="community-heading" class="space-y-3">
            <div>
              <Text id="community-heading" size="lg" class="font-bold">
                Enjoying Nice Speed Dials?
              </Text>
              <Text size="sm">
                A quick rating or a contribution helps keep the extension
                moving.
              </Text>
            </div>

            <div class="flex flex-wrap gap-2">
              <Button variant="outline" onClick={openReviewPage}>
                <StarIcon aria-hidden="true" /> Leave a review
              </Button>
              <Button onClick={() => setIsSupportDialogOpen(true)}>
                <HandHeartIcon aria-hidden="true" /> Support development
              </Button>
            </div>
          </section>

          <Dialog.Root
            open={isSupportDialogOpen()}
            onOpenChange={(e) => setIsSupportDialogOpen(e.open)}
          >
            <Dialog.Content size="sm">
              <Dialog.Header
                title="Keep Nice Speed Dials moving"
                description="A small contribution gives this independent project more room to improve."
              />
              <Dialog.Body>
                <Text>
                  If Nice Speed Dials makes your new tab a little calmer or
                  faster, supporting its development is a lovely way to help.
                  Every contribution goes toward future updates and polish.
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close
                  asChild={(closeProps) => (
                    <Button {...closeProps()} variant="outline">
                      Maybe later
                    </Button>
                  )}
                />
                <Button onClick={openSupportPage}>
                  <HandHeartIcon aria-hidden="true" /> Support the project
                  <ExternalLinkIcon aria-hidden="true" />
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>

          <Divider />

          <div>
            <SettingItemTitle
              title="Main background"
              subTitle="Image will be used if uploaded, else default/selected color will be used"
              showReset
              onReset={handleBackgroundReset}
            />
            <ColorPicker
              class="mt-4"
              value={currentBgColor()}
              onValueChange={(e) => {
                mainBackgroundColor.setValue(
                  e.value.toString("hex") || DEFAULT_VALUES.mainBackgroundColor
                )
              }}
            />

            <div class="flex items-center gap-2">
              <Divider />
              <Text class="my-2 font-bold">OR</Text>
              <Divider />
            </div>

            <FileUpload
              currentImage={currentBgImage()}
              accept="image/*"
              onFilesChange={async (files) => {
                const file = files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = async () => {
                    const base64String = reader.result as string
                    setCurrentBgImage(base64String || undefined)
                    await mainBackgroundImage.setValue(
                      base64String || undefined
                    )
                  }
                  reader.readAsDataURL(file)
                } else {
                  setCurrentBgImage(undefined)
                  await mainBackgroundImage.setValue(undefined)
                }
              }}
              onRemove={async () => {
                setCurrentBgImage(undefined)
                await mainBackgroundImage.setValue(undefined)
              }}
            />
            {/* TODO: input field for gradients, or add a tabs for all the options [color, image, gradient, etc] */}
          </div>

          <Divider />

          <div>
            <div class="flex items-center justify-between gap-2">
              <SettingItemTitle title="Dark mode" />
              <Switch
                checked={currentDarkMode()}
                onCheckedChange={(e) => darkMode.setValue(e.checked)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <SettingItemTitle
              title="Grid"
              subTitle="Adjust number of columns (number of rows will be adjusted
                accordingly depending on number of columns and dials)"
              showReset
              onReset={() => resetSetting("gridColumns")}
            />
            <NumberInput
              class="mt-4 max-w-40"
              value={
                currentGridColumns()?.toString() || defaultColumns()?.toString()
              }
              onValueChange={(e) => {
                const value = Number.parseInt(e.value || "0")
                if (value >= 1 && value <= 40) gridColumns.setValue(value)
              }}
              min={1}
              max={40}
              step={1}
            >
              <NumberInputScrubber>Columns</NumberInputScrubber>
              <NumberInputGroup>
                <NumberInputDecrement />
                <NumberInputInput class="text-center" />
                <NumberInputIncrement />
              </NumberInputGroup>
            </NumberInput>
          </div>

          <Divider />

          <div>
            <SettingItemTitle
              title="Dial size"
              subTitle="Adjust the size of dial"
              showReset
              onReset={() => resetSetting("dialSize")}
            />
            <Slider
              aria-label={["Dial size"]}
              class="mt-4 mb-6"
              min={40}
              max={200}
              value={[currentDialSize()]}
              onValueChange={(e) => {
                const val = e.value[0]
                if (val !== undefined) {
                  dialSize.setValue(val)
                }
              }}
              marks={[
                { value: 40, label: "xs" },
                { value: 60, label: "sm" },
                { value: 80, label: "md" },
                { value: 100, label: "lg" },
                // { value: 112, label: "lg" },
                { value: 120, label: "xl" },
                { value: 140, label: "2xl" },
                { value: 160, label: "3xl" },
                { value: 180, label: "3xl" },
                { value: 200, label: "4xl" },
              ]}
            />
          </div>

          <Divider />

          <div>
            <SettingItemTitle
              title="Dial corner radius"
              showReset
              onReset={() => resetSetting("dialRadius")}
            />
            <Slider
              aria-label={["Dial corner radius"]}
              class="mt-4 mb-6"
              min={0}
              max={RADII.length - 1}
              value={[
                Math.max(
                  0,
                  Math.min(
                    RADII.length - 1,
                    RADII.indexOf(
                      currentDialRadius() as (typeof RADII)[number]
                    ) || 0
                  )
                ),
              ]}
              onValueChange={(e) => {
                const val = e.value[0]
                if (val !== undefined && RADII[val]) {
                  dialRadius.setValue(RADII[val])
                }
              }}
              marks={RADII.map((borderRadius, index) => ({
                value: index,
                label: borderRadius,
              }))}
            />
          </div>

          <Divider />

          <div>
            <div class="flex items-center justify-between gap-2">
              <SettingItemTitle title="Show speed dial titles" />
              <Switch
                checked={currentShowSpeedDialTitles()}
                onCheckedChange={(e) => showSpeedDialTitles.setValue(e.checked)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <div class="flex items-center justify-between gap-2">
              <SettingItemTitle title="Show 'Add New' button" />
              <Switch
                checked={currentShowAddNew()}
                onCheckedChange={(e) => showAddNewButton.setValue(e.checked)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <div class="flex items-center justify-between gap-2">
              <SettingItemTitle
                title="Show 'Settings' button"
                info="You will be able to access the toogle settings via context menu (or right clicking) on this page"
              />
              <Switch
                checked={currentShowSettings()}
                onCheckedChange={(e) => showSettingsButton.setValue(e.checked)}
              />
            </div>
          </div>

          <Divider />

          {/* <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Show 'Help' button" />
                <Switch
                  checked={currentShowHelp()}
                  onCheckedChange={(e) => showHelpButton.setValue(e.checked)}
                />
              </Flex>
            </div>

            <Divider /> */}

          <div>
            <div class="flex items-center justify-between gap-2">
              <SettingItemTitle title="Open links in new tab by default" />
              <Switch
                checked={currentOpenLinksNewTab()}
                onCheckedChange={(e) => openLinksInNewTab.setValue(e.checked)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <div class="flex items-center justify-between gap-2">
              <SettingItemTitle title="Disable drag and drop" />
              <Switch
                checked={currentDisableDragDrop()}
                onCheckedChange={(e) => disableDragAndDrop.setValue(e.checked)}
              />
            </div>
          </div>
        </Sheet.Body>

        <Sheet.Footer class="gap-3">
          <Sheet.Close
            asChild={(closeProps) => (
              <Button {...closeProps()} variant="outline">
                Close
              </Button>
            )}
          />

          <Button variant="outline" onClick={handleResetAll}>
            <Undo2Icon aria-hidden="true" /> Reset all to Default
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}

const SettingItemTitle = (props: {
  title: string
  subTitle?: string
  showReset?: boolean
  info?: string
  onReset?: () => void
}) => {
  return (
    <>
      <div class="flex items-center gap-2">
        <Text size="lg" class="font-bold">
          {props.title}
        </Text>

        <Show when={props.info}>
          <CustomTooltip
            content={props.info ?? ""}
            openDelay={0}
            positioning={{ placement: "top" }}
            class="max-w-xs text-center"
          >
            {(triggerProps) => (
              <Button
                {...triggerProps()}
                aria-label={`About ${props.title}`}
                variant="ghost"
                size="icon-xs"
              >
                <InfoIcon aria-hidden="true" />
              </Button>
            )}
          </CustomTooltip>
        </Show>

        <Show when={props.showReset}>
          <CustomTooltip
            content="Reset to Default"
            openDelay={0}
            positioning={{ placement: "top" }}
          >
            {(triggerProps) => (
              <Button
                {...triggerProps()}
                aria-label={`Reset ${props.title} to default`}
                variant="ghost"
                size="icon-xs"
                onClick={(e) => {
                  e.preventDefault()
                  props.onReset?.()
                }}
              >
                <RotateCcwIcon aria-hidden="true" />
              </Button>
            )}
          </CustomTooltip>
        </Show>
      </div>

      <Show when={props.subTitle}>
        <Text size="sm">{props.subTitle}</Text>
      </Show>
    </>
  )
}

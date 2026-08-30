import {
  ColorPicker as ArkColorPicker,
  ark,
  parseColor as parseColorArk,
  useColorPickerContext,
  type ColorPickerValueChangeDetails,
} from "@ark-ui/solid"
import { CheckIcon, PipetteIcon } from "lucide-solid"
import { createSignal, splitProps, type ComponentProps } from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "~/utils/cn"
import { Button, type ButtonProps } from "./button"

export const parseColor = parseColorArk
export const useColorPicker = useColorPickerContext

type ArkRootProps = ComponentProps<typeof ArkColorPicker.Root>

export type ColorPickerProps = Omit<ArkRootProps, "defaultValue" | "value"> & {
  /** The default value of the color picker. */
  defaultValue?: string
  /** The controlled value of the color picker. */
  value?: string
}

export const ColorPickerRoot = (props: ColorPickerProps) => {
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "positioning",
    "lazyMount",
    "unmountOnExit",
    "onValueChange",
    "class",
    "children",
  ])
  const [internalValue, setInternalValue] = createSignal(local.defaultValue)
  const isControlled = () => local.value !== undefined

  const handleValueChange = (details: ColorPickerValueChangeDetails) => {
    if (isControlled()) local.onValueChange?.(details)
    else setInternalValue(details.valueAsString)
  }

  return (
    <ArkColorPicker.Root
      {...rest}
      class={cn("group/color-picker flex w-fit gap-2", local.class)}
      data-slot="color-picker"
      defaultValue={
        internalValue() ? parseColor(internalValue() as string) : undefined
      }
      lazyMount={local.lazyMount ?? true}
      onValueChange={handleValueChange}
      positioning={local.positioning ?? { placement: "top-start" }}
      unmountOnExit={local.unmountOnExit ?? true}
      value={isControlled() ? parseColor(local.value as string) : undefined}
    >
      {local.children}
      <ArkColorPicker.HiddenInput />
    </ArkColorPicker.Root>
  )
}

export const ColorPickerControl = (
  props: ComponentProps<typeof ArkColorPicker.Control>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkColorPicker.Control
      {...rest}
      class={cn("flex flex-row items-center gap-2", local.class)}
      data-slot="color-picker-control"
    />
  )
}

export const ColorPickerTrigger = (
  props: ComponentProps<typeof ArkColorPicker.Trigger>
) => <ArkColorPicker.Trigger data-slot="color-picker-trigger" {...props} />

export const ColorPickerTransparencyGrid = (
  props: ComponentProps<typeof ArkColorPicker.TransparencyGrid>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkColorPicker.TransparencyGrid
      {...rest}
      class={cn(
        "size-full rounded-[calc(var(--radius-sm)-0.5px)]",
        "bg-[linear-gradient(45deg,#e4e4e4_25%,transparent_25%),linear-gradient(-45deg,#e4e4e4_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e4e4e4_75%),linear-gradient(-45deg,transparent_75%,#e4e4e4_75%)]",
        "bg-position-[0_0,0_4px,4px_-4px,-4px_0] bg-size-(--spacing(2))",
        local.class
      )}
    />
  )
}

export const ColorPickerContent = (
  props: ComponentProps<typeof ArkColorPicker.Content>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <Portal>
      <ArkColorPicker.Positioner data-slot="color-picker-positioner">
        <ArkColorPicker.Content
          {...rest}
          class={cn(
            "[--space:--spacing(3)] relative z-50 flex w-full min-w-56 flex-col gap-4 rounded-xl border bg-popover p-(--space) text-popover-foreground shadow-lg/5 outline-none",
            "origin-(--transform-origin)",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[98%]",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[98%]",
            "motion-reduce:animate-none!",
            local.class
          )}
          data-slot="color-picker-content"
        >
          {local.children}
        </ArkColorPicker.Content>
      </ArkColorPicker.Positioner>
    </Portal>
  )
}

export const ColorPickerView = (
  props: ComponentProps<typeof ArkColorPicker.View>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkColorPicker.View
      {...rest}
      class={cn("relative flex size-full flex-1 flex-col gap-4", local.class)}
      data-slot="color-picker-view"
    />
  )
}

export const ColorPickerSlider = (
  props: ComponentProps<typeof ArkColorPicker.ChannelSlider>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <ArkColorPicker.ChannelSlider
      {...rest}
      class={cn(
        "relative flex items-center touch-none select-none rounded-full border",
        "data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        "group-data-disabled/color-picker:pointer-events-none group-data-disabled/color-picker:cursor-not-allowed group-data-disabled/color-picker:opacity-64",
        local.class
      )}
      data-slot="color-picker-channel-slider"
    >
      {local.children}
      <ArkColorPicker.ChannelSliderTrack
        class="grow select-none overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        data-slot="color-picker-channel-slider-track"
      />
      <ArkColorPicker.ChannelSliderThumb
        class="relative size-4.5 shrink-0 -translate-1/2 rounded-full border-[3px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(0,0,0,0.1)] outline-none ring-1 ring-border/64 origin-left data-[orientation=vertical]:origin-bottom"
        data-slot="color-picker-channel-slider-thumb"
      />
    </ArkColorPicker.ChannelSlider>
  )
}

export type ColorPickerEyeDropperTriggerProps = Omit<
  ComponentProps<typeof ArkColorPicker.EyeDropperTrigger>,
  "children" | "size"
> &
  Pick<ButtonProps, "children" | "size" | "variant">

export const ColorPickerEyeDropperTrigger = (
  props: ColorPickerEyeDropperTriggerProps
) => {
  const [local, rest] = splitProps(props, ["variant", "size", "children"])
  return (
    <ArkColorPicker.EyeDropperTrigger
      {...rest}
      asChild={(triggerProps) => (
        <Button
          {...triggerProps()}
          aria-label="Pick a color from the screen"
          size={local.size ?? "icon-md"}
          variant={local.variant ?? "outline"}
        >
          {local.children ?? <PipetteIcon aria-hidden="true" />}
        </Button>
      )}
      data-slot="color-picker-eye-dropper"
    />
  )
}

export const ColorPickerSwatchGroup = (
  props: ComponentProps<typeof ArkColorPicker.SwatchGroup>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkColorPicker.SwatchGroup
      {...rest}
      class={cn("flex flex-wrap items-center gap-2", local.class)}
      data-slot="color-picker-swatch-group"
    />
  )
}

export const ColorPickerSwatchTrigger = (
  props: ComponentProps<typeof ArkColorPicker.SwatchTrigger>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkColorPicker.SwatchTrigger
      {...rest}
      class={cn(
        "relative flex size-8 items-center justify-center rounded-full outline-none",
        "transition-[border-color,box-shadow] duration-100 ease-out will-change-transform",
        "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/32 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-disabled:pointer-events-none data-disabled:opacity-64",
        "data-[state=checked]:shadow-sm/5 data-[state=checked]:ring-(--color) data-[state=checked]:ring-2",
        "motion-reduce:transition-none!",
        local.class
      )}
      data-slot="color-picker-swatch-trigger"
    />
  )
}

export const ColorPickerSwatch = (
  props: ComponentProps<typeof ArkColorPicker.Swatch>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkColorPicker.Swatch
      {...rest}
      class={cn(
        "size-full shrink-0 overflow-hidden rounded-[inherit]",
        "transition-transform duration-100 ease-out will-change-transform",
        "not-[data-state=checked]:hover:scale-110 data-[state=checked]:scale-[0.8]",
        "motion-reduce:transition-none!",
        local.class
      )}
      data-slot="color-picker-swatch"
    />
  )
}

export const ColorPickerSwatchIndicator = (
  props: ComponentProps<typeof ArkColorPicker.SwatchIndicator>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <ArkColorPicker.SwatchIndicator
      {...rest}
      class={cn(
        "pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-white",
        "zoom-in-5 animate-in blur-in-md [&_svg]:size-1/2 motion-reduce:animate-none!",
        local.class
      )}
      data-slot="color-picker-swatch-indicator"
    >
      {local.children ?? <CheckIcon aria-hidden="true" />}
    </ArkColorPicker.SwatchIndicator>
  )
}

export const ColorPickerValue = (
  props: ComponentProps<typeof ArkColorPicker.ValueText>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkColorPicker.ValueText
      {...rest}
      class={cn("font-medium text-sm", local.class)}
      data-slot="color-picker-value"
    />
  )
}

export const ColorPickerValueSwatch = (
  props: ComponentProps<typeof ArkColorPicker.ValueSwatch>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkColorPicker.ValueSwatch
      {...rest}
      class={cn(
        "relative size-8 shrink-0 overflow-hidden rounded-full border",
        local.class
      )}
      data-slot="color-picker-value-swatch"
    />
  )
}

export type ColorPickerAreaProps = ComponentProps<
  typeof ArkColorPicker.Area
> & { showDots?: boolean }

export const ColorPickerArea = (props: ColorPickerAreaProps) => {
  const [local, rest] = splitProps(props, ["class", "showDots", "children"])
  return (
    <ArkColorPicker.Area
      {...rest}
      class={cn(
        "relative aspect-square size-full touch-none overflow-hidden rounded-xl border",
        local.showDots &&
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-[radial-gradient(circle,#fff3_1px,#0000_1px)] after:bg-size-[8px_8px]",
        local.class
      )}
      data-slot="color-picker-area"
    >
      <ArkColorPicker.AreaBackground
        class="size-full rounded-[inherit]"
        data-slot="color-picker-area-background"
      />
      {local.children}
    </ArkColorPicker.Area>
  )
}

export const ColorPickerAreaThumb = (
  props: ComponentProps<typeof ArkColorPicker.AreaThumb>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ArkColorPicker.AreaThumb
      {...rest}
      class={cn(
        "size-4.5 rounded-full border-[3px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(0,0,0,0.1)]",
        "outline-none ring-border/64 data-disabled:pointer-events-none data-disabled:opacity-64",
        local.class
      )}
      data-slot="color-picker-area-thumb"
    />
  )
}

type ColorPickerInputProps = Omit<
  ComponentProps<typeof ArkColorPicker.ChannelInput>,
  "channel"
> & { channel?: ComponentProps<typeof ArkColorPicker.ChannelInput>["channel"] }

export const ColorPickerInput = (props: ColorPickerInputProps) => {
  const [local, rest] = splitProps(props, ["channel"])
  return (
    <ArkColorPicker.ChannelInput
      {...rest}
      channel={local.channel ?? "hex"}
      data-slot="color-picker-input"
    />
  )
}

export const ColorPickerSwatchPreview = (
  props: ComponentProps<typeof ark.div>
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ark.div
      {...rest}
      class={cn(
        "pointer-events-none relative size-8 shrink-0 overflow-hidden rounded-full border",
        "group-data-[size=lg]/input-group:size-5 group-data-[size=md]/input-group:size-4 group-data-[size=sm]/input-group:size-3.5",
        "group-data-disabled/color-input:opacity-64",
        local.class
      )}
      data-slot="color-picker-input-swatch"
    >
      <ColorPickerTransparencyGrid />
      <ArkColorPicker.ValueSwatch class="z-1 size-full" />
    </ark.div>
  )
}

export type ColorPickerRootProps = ColorPickerProps
export type ColorPickerRootProviderProps = ComponentProps<
  typeof ArkColorPicker.RootProvider
>

export const ColorPicker = Object.assign(ColorPickerRoot, {
  RootProvider: ArkColorPicker.RootProvider,
  Root: ColorPickerRoot,
  Area: ColorPickerArea,
  AreaBackground: ArkColorPicker.AreaBackground,
  AreaThumb: ColorPickerAreaThumb,
  ChannelInput: ColorPickerInput,
  ChannelSlider: ColorPickerSlider,
  ChannelSliderLabel: ArkColorPicker.ChannelSliderLabel,
  ChannelSliderThumb: ArkColorPicker.ChannelSliderThumb,
  ChannelSliderTrack: ArkColorPicker.ChannelSliderTrack,
  ChannelSliderValueText: ArkColorPicker.ChannelSliderValueText,
  Content: ColorPickerContent,
  Context: ArkColorPicker.Context,
  Control: ColorPickerControl,
  EyeDropperTrigger: ColorPickerEyeDropperTrigger,
  FormatSelect: ArkColorPicker.FormatSelect,
  FormatTrigger: ArkColorPicker.FormatTrigger,
  HiddenInput: ArkColorPicker.HiddenInput,
  Input: ColorPickerInput,
  Label: ArkColorPicker.Label,
  Positioner: ArkColorPicker.Positioner,
  Slider: ColorPickerSlider,
  Swatch: ColorPickerSwatch,
  SwatchGroup: ColorPickerSwatchGroup,
  SwatchIndicator: ColorPickerSwatchIndicator,
  SwatchPreview: ColorPickerSwatchPreview,
  SwatchTrigger: ColorPickerSwatchTrigger,
  TransparencyGrid: ColorPickerTransparencyGrid,
  Trigger: ColorPickerTrigger,
  Value: ColorPickerValue,
  ValueSwatch: ColorPickerValueSwatch,
  ValueText: ColorPickerValue,
  View: ColorPickerView,
})

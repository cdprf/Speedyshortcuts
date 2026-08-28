import {
  ColorPicker as ArkColorPicker,
  ColorPickerContext,
  ColorPickerHiddenInput,
} from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const rootClass = "flex flex-col gap-1.5"
const thumbClass =
  "size-2.5 rounded-full shadow-[0_0_0_2px_#ffffff,0_0_2px_1px_#000000] outline-none"
const sliderClass = "rounded-lg"

const RootProvider = withClass(ArkColorPicker.RootProvider, rootClass)
const Root = withClass(ArkColorPicker.Root, rootClass)
const AreaBackground = withClass(ArkColorPicker.AreaBackground, "h-full")
const Area = withClass(ArkColorPicker.Area, "h-36 overflow-hidden rounded-lg")
const AreaThumb = withClass(ArkColorPicker.AreaThumb, thumbClass)
const ChannelInput = withClass(
  ArkColorPicker.ChannelInput,
  "colorPicker__channelInput"
)
const ChannelSliderLabel = withClass(
  ArkColorPicker.ChannelSliderLabel,
  "colorPicker__channelSliderLabel"
)
const ChannelSlider = withClass(ArkColorPicker.ChannelSlider, sliderClass)
const ChannelSliderThumb = withClass(
  ArkColorPicker.ChannelSliderThumb,
  `${thumbClass} transform-[translate(-50%,-50%)]`
)
const ChannelSliderTrack = withClass(
  ArkColorPicker.ChannelSliderTrack,
  `${sliderClass} h-3`
)
const ChannelSliderValueText = withClass(
  ArkColorPicker.ChannelSliderValueText,
  "colorPicker__channelSliderValueText"
)
const Content = withClass(
  ArkColorPicker.Content,
  "z-1000 flex max-w-96 flex-col rounded-xl bg-background p-4 shadow-(--shadows-lg) [[open]]:animate-[fade-in_0.25s_ease-out] data-open:animate-[fade-in_0.25s_ease-out] data-[state=open]:animate-[fade-in_0.25s_ease-out] [[closed]]:animate-[fade-out_0.2s_ease-out] data-closed:animate-[fade-out_0.2s_ease-out] data-[state=closed]:animate-[fade-out_0.2s_ease-out] [[hidden]]:hidden"
)
const Control = withClass(ArkColorPicker.Control, "flex flex-row gap-2")
const EyeDropperTrigger = withClass(
  ArkColorPicker.EyeDropperTrigger,
  "colorPicker__eyeDropperTrigger"
)
const FormatSelect = withClass(
  ArkColorPicker.FormatSelect,
  "colorPicker__formatSelect"
)
const FormatTrigger = withClass(
  ArkColorPicker.FormatTrigger,
  "colorPicker__formatTrigger"
)
const Label = withClass(
  ArkColorPicker.Label,
  "text-sm leading-5 font-medium text-foreground"
)
const Positioner = withClass(ArkColorPicker.Positioner, "z-1000")
const SwatchGroup = withClass(
  ArkColorPicker.SwatchGroup,
  "grid grid-cols-7 gap-2 bg-background"
)
const SwatchIndicator = withClass(
  ArkColorPicker.SwatchIndicator,
  "colorPicker__swatchIndicator"
)
const Swatch = withClass(
  ArkColorPicker.Swatch,
  "size-6 rounded-lg shadow-[0_0_0_1px_var(--colors-border-emphasized),0_0_0_2px_var(--colors-bg-default)_inset]"
)
const SwatchTrigger = withClass(
  ArkColorPicker.SwatchTrigger,
  "colorPicker__swatchTrigger"
)
const TransparencyGrid = withClass(ArkColorPicker.TransparencyGrid, sliderClass)
const Trigger = withClass(ArkColorPicker.Trigger, "colorPicker__trigger")
const ValueSwatch = withClass(
  ArkColorPicker.ValueSwatch,
  "size-6 rounded-lg shadow-[0_0_0_1px_var(--colors-border-emphasized),0_0_0_2px_var(--colors-bg-default)_inset]"
)
const ValueText = withClass(ArkColorPicker.ValueText, "colorPicker__valueText")
const View = withClass(ArkColorPicker.View, "colorPicker__view")

export type ColorPickerRootProviderProps = ComponentProps<typeof RootProvider>
export type ColorPickerRootProps = ComponentProps<typeof Root>

export const ColorPicker = {
  RootProvider,
  Root,
  AreaBackground,
  Area,
  AreaThumb,
  ChannelInput,
  ChannelSliderLabel,
  ChannelSlider,
  ChannelSliderThumb,
  ChannelSliderTrack,
  ChannelSliderValueText,
  Content,
  Control,
  EyeDropperTrigger,
  FormatSelect,
  FormatTrigger,
  Label,
  Positioner,
  SwatchGroup,
  SwatchIndicator,
  Swatch,
  SwatchTrigger,
  TransparencyGrid,
  Trigger,
  ValueSwatch,
  ValueText,
  View,
  Context: ColorPickerContext,
  HiddenInput: ColorPickerHiddenInput,
}

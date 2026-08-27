import {
  ColorPicker as ArkColorPicker,
  ColorPickerContext,
  ColorPickerHiddenInput,
} from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const RootProvider = withClass(ArkColorPicker.RootProvider, "colorPicker__root")
const Root = withClass(ArkColorPicker.Root, "colorPicker__root")
const AreaBackground = withClass(
  ArkColorPicker.AreaBackground,
  "colorPicker__areaBackground"
)
const Area = withClass(ArkColorPicker.Area, "colorPicker__area")
const AreaThumb = withClass(ArkColorPicker.AreaThumb, "colorPicker__areaThumb")
const ChannelInput = withClass(
  ArkColorPicker.ChannelInput,
  "colorPicker__channelInput"
)
const ChannelSliderLabel = withClass(
  ArkColorPicker.ChannelSliderLabel,
  "colorPicker__channelSliderLabel"
)
const ChannelSlider = withClass(
  ArkColorPicker.ChannelSlider,
  "colorPicker__channelSlider"
)
const ChannelSliderThumb = withClass(
  ArkColorPicker.ChannelSliderThumb,
  "colorPicker__channelSliderThumb"
)
const ChannelSliderTrack = withClass(
  ArkColorPicker.ChannelSliderTrack,
  "colorPicker__channelSliderTrack"
)
const ChannelSliderValueText = withClass(
  ArkColorPicker.ChannelSliderValueText,
  "colorPicker__channelSliderValueText"
)
const Content = withClass(ArkColorPicker.Content, "colorPicker__content")
const Control = withClass(ArkColorPicker.Control, "colorPicker__control")
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
const Label = withClass(ArkColorPicker.Label, "colorPicker__label")
const Positioner = withClass(
  ArkColorPicker.Positioner,
  "colorPicker__positioner"
)
const SwatchGroup = withClass(
  ArkColorPicker.SwatchGroup,
  "colorPicker__swatchGroup"
)
const SwatchIndicator = withClass(
  ArkColorPicker.SwatchIndicator,
  "colorPicker__swatchIndicator"
)
const Swatch = withClass(ArkColorPicker.Swatch, "colorPicker__swatch")
const SwatchTrigger = withClass(
  ArkColorPicker.SwatchTrigger,
  "colorPicker__swatchTrigger"
)
const TransparencyGrid = withClass(
  ArkColorPicker.TransparencyGrid,
  "colorPicker__transparencyGrid"
)
const Trigger = withClass(ArkColorPicker.Trigger, "colorPicker__trigger")
const ValueSwatch = withClass(ArkColorPicker.ValueSwatch, "colorPicker__swatch")
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

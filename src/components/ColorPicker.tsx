import { For } from "solid-js"
import {
  ColorPicker as ParkColorPicker,
  type ColorPickerRootProps,
} from "~/components/ui/color-picker"
import { IconButton } from "~/components/ui/icon-button"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"

export const ColorPicker = (props: ColorPickerRootProps) => {
  return (
    <ParkColorPicker.Root {...props}>
      <ParkColorPicker.Context>
        {(api) => (
          <>
            <ParkColorPicker.Label>Color Picker</ParkColorPicker.Label>
            <ParkColorPicker.Control>
              <ParkColorPicker.ChannelInput
                channel="hex"
                asChild={(inputProps) => <Input {...inputProps()} />}
              />
              <ParkColorPicker.Trigger
                asChild={(triggerProps) => (
                  <IconButton variant="outline" {...triggerProps()}>
                    <ParkColorPicker.Swatch value={api().value} />
                  </IconButton>
                )}
              />
            </ParkColorPicker.Control>
            <ParkColorPicker.Positioner>
              <ParkColorPicker.Content>
                <div class="flex flex-col gap-3">
                  <ParkColorPicker.Area>
                    <ParkColorPicker.AreaBackground />
                    <ParkColorPicker.AreaThumb />
                  </ParkColorPicker.Area>
                  <div class="flex items-center gap-3">
                    {/* <ParkColorPicker.EyeDropperTrigger
                      asChild={(triggerProps) => (
                        <IconButton
                          size="xs"
                          variant="outline"
                          aria-label="Pick a color"
                          {...triggerProps()}
                        >
                          <PipetteIcon />
                        </IconButton>
                      )}
                    /> */}
                    <div class="flex flex-1 flex-col gap-2">
                      <ParkColorPicker.ChannelSlider channel="hue">
                        <ParkColorPicker.ChannelSliderTrack />
                        <ParkColorPicker.ChannelSliderThumb />
                      </ParkColorPicker.ChannelSlider>
                      <ParkColorPicker.ChannelSlider channel="alpha">
                        <ParkColorPicker.TransparencyGrid size="8px" />
                        <ParkColorPicker.ChannelSliderTrack />
                        <ParkColorPicker.ChannelSliderThumb />
                      </ParkColorPicker.ChannelSlider>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <ParkColorPicker.ChannelInput
                      channel="hex"
                      asChild={(inputProps) => (
                        <Input size="2xs" {...inputProps()} />
                      )}
                    />
                    <ParkColorPicker.ChannelInput
                      channel="alpha"
                      asChild={(inputProps) => (
                        <Input size="2xs" {...inputProps()} />
                      )}
                    />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <Text size="xs" class="font-medium text-foreground">
                      Saved Colors
                    </Text>
                    <ParkColorPicker.SwatchGroup>
                      <For each={presets}>
                        {(color) => (
                          <ParkColorPicker.SwatchTrigger value={color}>
                            <ParkColorPicker.Swatch value={color} />
                          </ParkColorPicker.SwatchTrigger>
                        )}
                      </For>
                    </ParkColorPicker.SwatchGroup>
                  </div>
                </div>
              </ParkColorPicker.Content>
            </ParkColorPicker.Positioner>
          </>
        )}
      </ParkColorPicker.Context>
      <ParkColorPicker.HiddenInput />
    </ParkColorPicker.Root>
  )
}

const presets = [
  "#2c2124",
  "hsl(10, 81%, 59%)",
  "hsl(60, 81%, 59%)",
  "hsl(100, 81%, 59%)",
  "hsl(175, 81%, 59%)",
  "hsl(190, 81%, 59%)",
  "hsl(205, 81%, 59%)",
  "hsl(220, 81%, 59%)",
  "hsl(250, 81%, 59%)",
  "hsl(280, 81%, 59%)",
  "hsl(350, 81%, 59%)",
]

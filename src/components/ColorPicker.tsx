import { For, splitProps } from "solid-js"
import {
  ColorPicker as ParkColorPicker,
  type ColorPickerRootProps,
} from "~/components/ui/color-picker"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Text } from "~/components/ui/text"
import { cn } from "~/utils/cn"

export const ColorPicker = (props: ColorPickerRootProps) => {
  const [local, rest] = splitProps(props, ["class", "format"])

  return (
    <ParkColorPicker.Root
      {...rest}
      class={cn("flex-col", local.class)}
      format={local.format ?? "hsla"}
    >
      <ParkColorPicker.Label>Background color</ParkColorPicker.Label>
      <ParkColorPicker.Control>
        <ParkColorPicker.Input
          channel="hex"
          class="max-w-40"
          asChild={(inputProps) => <Input {...inputProps()} />}
        />
        <ParkColorPicker.Trigger
          asChild={(triggerProps) => (
            <Button
              {...triggerProps()}
              aria-label="Open color picker"
              size="icon-md"
              variant="outline"
            >
              <ParkColorPicker.ValueSwatch class="size-full rounded-md border-0" />
            </Button>
          )}
        />
      </ParkColorPicker.Control>

      <ParkColorPicker.Content class="w-56 min-w-0 gap-3 [--space:--spacing(2.5)]">
        <ParkColorPicker.Area>
          <ParkColorPicker.AreaThumb />
        </ParkColorPicker.Area>
        <ParkColorPicker.View format="hsla">
          <ParkColorPicker.Slider channel="hue" />
        </ParkColorPicker.View>

        <div class="flex flex-col gap-1.5">
          <Text size="xs" class="font-medium text-foreground">
            Saved colors
          </Text>
          <ParkColorPicker.SwatchGroup class="gap-1.5">
            <For each={presets}>
              {(color) => (
                <ParkColorPicker.SwatchTrigger
                  aria-label={`Use saved color ${color}`}
                  class="size-6"
                  value={color}
                >
                  <ParkColorPicker.Swatch value={color}>
                    <ParkColorPicker.SwatchIndicator />
                  </ParkColorPicker.Swatch>
                </ParkColorPicker.SwatchTrigger>
              )}
            </For>
          </ParkColorPicker.SwatchGroup>
        </div>
      </ParkColorPicker.Content>
    </ParkColorPicker.Root>
  )
}

const presets = [
  "#2C2124",
  "#EB5E42",
  "#EBEB42",
  "#7AEB42",
  "#42EBDD",
  "#42CFEB",
  "#42A5EB",
  "#427AEB",
  "#5E42EB",
  "#B342EB",
  "#EB425E",
]

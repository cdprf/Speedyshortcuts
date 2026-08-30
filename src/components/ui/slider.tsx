import {
  FieldLabel,
  Slider as ArkSlider,
  useSliderContext,
} from "@ark-ui/solid"
import {
  For,
  Index,
  Show,
  createMemo,
  splitProps,
  type ComponentProps,
  type JSX,
} from "solid-js"
import { cn } from "~/utils/cn"

export const useSlider = useSliderContext

export type SliderMark = { value: number; label?: JSX.Element }

export type SliderProps = ComponentProps<typeof ArkSlider.Root> & {
  /** The interval between generated markers. @default 1 */
  markerInterval?: number
  /** The labels to show on generated markers. @default [] */
  markerLabels?: string[]
  /** Whether to show generated markers. @default false */
  showMarkers?: boolean
  /** Sparse custom markers retained for non-zero and semantic ranges. */
  marks?: SliderMark[]
}

export const SliderRoot = (props: SliderProps) => {
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "min",
    "max",
    "markerInterval",
    "markerLabels",
    "showMarkers",
    "marks",
    "tabIndex",
    "class",
    "children",
  ])

  const min = () => local.min ?? 0
  const max = () => local.max ?? 100
  const markerInterval = () => local.markerInterval ?? 1
  const markerLabels = () => local.markerLabels ?? []
  const values = createMemo(() => {
    if (Array.isArray(local.value)) return local.value
    if (Array.isArray(local.defaultValue)) return local.defaultValue
    return [min(), max()]
  })
  const markers = createMemo<SliderMark[]>(() => {
    if (local.marks) return local.marks
    return Array.from({ length: max() + 1 }, (_, value) => ({
      value,
      label: markerLabels()[value] ?? value,
    }))
  })
  const shouldShowMarkers = () => Boolean(local.marks || local.showMarkers)

  return (
    <ArkSlider.Root
      {...rest}
      class={cn(
        "flex flex-col gap-3",
        "data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full",
        local.class
      )}
      data-slot="slider"
      defaultValue={local.defaultValue}
      max={max()}
      min={min()}
      value={local.value}
    >
      {local.children}

      <ArkSlider.Control
        class={cn(
          "relative flex w-full items-center touch-none select-none",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          "data-disabled:pointer-events-none data-disabled:opacity-64"
        )}
        data-slot="slider-control"
      >
        <ArkSlider.Track
          class={cn(
            "grow select-none overflow-hidden rounded-full bg-input/64",
            "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
            "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
          )}
          data-slot="slider-track"
        >
          <ArkSlider.Range
            class={cn(
              "absolute select-none bg-primary",
              "data-[orientation=horizontal]:h-full",
              "data-[orientation=vertical]:w-full data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch"
            )}
            data-slot="slider-range"
          />
        </ArkSlider.Track>

        <Index each={values()}>
          {(_, index) => (
            <ArkSlider.Thumb
              class={cn(
                "relative size-4.5 shrink-0",
                "cursor-grab select-none rounded-full border border-input bg-white shadow-xs/5",
                "origin-left transition-[color,box-shadow,transform]",
                "focus-visible:border-primary focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/32",
                "data-dragging:scale-110 data-dragging:cursor-grabbing data-dragging:border-primary data-dragging:ring-[3px] data-dragging:ring-ring/32",
                "pointer-coarse:after:absolute pointer-coarse:after:h-full pointer-coarse:after:min-h-11",
                "motion-reduce:transition-none!"
              )}
              data-slot="slider-thumb"
              index={index}
              tabIndex={local.tabIndex ?? undefined}
            >
              <ArkSlider.HiddenInput />
            </ArkSlider.Thumb>
          )}
        </Index>
      </ArkSlider.Control>

      <Show when={shouldShowMarkers()}>
        <ArkSlider.MarkerGroup
          class={cn(
            "mt-3 flex w-full items-center justify-between gap-1 px-2.5",
            "font-medium text-muted-foreground text-xs",
            "pointer-events-none data-[orientation=vertical]:hidden"
          )}
          data-slot="slider-marker-group"
        >
          <For each={markers()}>
            {(mark) => (
              <ArkSlider.Marker
                class={cn(
                  "group/marker flex w-0 flex-col items-center justify-center gap-2",
                  "data-[state=at-value]:text-foreground data-[state=under-value]:text-foreground"
                )}
                data-interval={
                  local.marks || mark.value % markerInterval() === 0
                    ? undefined
                    : ""
                }
                data-slot="slider-marker"
                value={mark.value}
              >
                <span
                  class={cn(
                    "h-1 w-px",
                    "bg-muted-foreground/70 group-data-[state=at-value]/marker:bg-foreground group-data-[state=under-value]/marker:bg-foreground",
                    "group-data-interval/marker:h-0.5"
                  )}
                />
                <span class="group-data-interval/marker:opacity-0">
                  {mark.label}
                </span>
              </ArkSlider.Marker>
            )}
          </For>
        </ArkSlider.MarkerGroup>
      </Show>
    </ArkSlider.Root>
  )
}

const fieldLabelClass =
  "group/field-label peer/field-label flex w-fit gap-1 select-none font-medium text-sm leading-snug"

export const SliderLabel = (props: ComponentProps<typeof ArkSlider.Label>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkSlider.Label
      {...rest}
      class={cn(fieldLabelClass, local.class)}
      data-slot="slider-label"
    />
  )
}

export const SliderValue = (
  props: ComponentProps<typeof ArkSlider.ValueText>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <FieldLabel
      asChild={(labelProps) => (
        <ArkSlider.ValueText
          {...labelProps()}
          {...rest}
          class={cn(fieldLabelClass, "ms-auto tabular-nums", local.class)}
          data-slot="progress-value"
        />
      )}
    />
  )
}

export const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  Label: SliderLabel,
  Value: SliderValue,
  ValueText: SliderValue,
  Context: ArkSlider.Context,
})

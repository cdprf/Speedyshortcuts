import {
  Slider as ArkSlider,
  SliderContext,
  SliderHiddenInput,
} from "@ark-ui/solid"
import {
  Index,
  type ComponentProps,
  type JSX,
  Show,
  children,
  splitProps,
} from "solid-js"
import { withClass } from "~/utils/with-class"

const Root = withClass(ArkSlider.Root, "slider__root")
const Control = withClass(
  ArkSlider.Control,
  "slider__control slider__control--size_md"
)
const Label = withClass(ArkSlider.Label, "slider__label slider__label--size_md")
const MarkerGroup = withClass(ArkSlider.MarkerGroup, "slider__markerGroup")
const Marker = withClass(
  ArkSlider.Marker,
  "slider__marker slider__marker--size_md"
)
const Range = withClass(ArkSlider.Range, "slider__range slider__range--size_md")
const Thumb = withClass(ArkSlider.Thumb, "slider__thumb slider__thumb--size_md")
const Track = withClass(ArkSlider.Track, "slider__track slider__track--size_md")

export type SliderProps = ComponentProps<typeof Root> & {
  marks?: { value: number; label?: JSX.Element }[]
}

export const Slider = (props: SliderProps) => {
  const [localProps, rootProps] = splitProps(props, ["children", "marks"])
  const getChildren = children(() => localProps.children)

  return (
    <Root {...rootProps}>
      <SliderContext>
        {(slider) => (
          <>
            <Show when={getChildren()}>
              <Label>{getChildren()}</Label>
            </Show>
            <Control>
              <Track>
                <Range />
              </Track>
              <Index each={slider().value}>
                {(_, index) => (
                  <Thumb index={index}>
                    <SliderHiddenInput />
                  </Thumb>
                )}
              </Index>
            </Control>
            <Show when={localProps.marks}>
              <MarkerGroup>
                <Index each={localProps.marks}>
                  {(mark) => (
                    <Marker value={mark().value}>{mark().label}</Marker>
                  )}
                </Index>
              </MarkerGroup>
            </Show>
          </>
        )}
      </SliderContext>
    </Root>
  )
}

import { Switch as ArkSwitch, SwitchHiddenInput } from "@ark-ui/solid"
import { Show, children, type ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const Root = withClass(
  ArkSwitch.Root,
  "switchRecipe__root switchRecipe__root--size_md"
)
const Control = withClass(
  ArkSwitch.Control,
  "switchRecipe__control switchRecipe__control--size_md"
)
const Label = withClass(
  ArkSwitch.Label,
  "switchRecipe__label switchRecipe__label--size_md"
)
const Thumb = withClass(
  ArkSwitch.Thumb,
  "switchRecipe__thumb switchRecipe__thumb--size_md"
)

export type SwitchProps = ComponentProps<typeof Root>

export const Switch = (props: SwitchProps) => {
  const getChildren = children(() => props.children)

  return (
    <Root {...props}>
      <Control>
        <Thumb />
      </Control>
      <Show when={getChildren()}>
        <Label>{getChildren()}</Label>
      </Show>
      <SwitchHiddenInput />
    </Root>
  )
}

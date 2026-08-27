import { NumberInput as ArkNumberInput } from "@ark-ui/solid"
import { Show, children, type ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const Root = withClass(ArkNumberInput.Root, "numberInput__root")
const Control = withClass(
  ArkNumberInput.Control,
  "numberInput__control numberInput__control--size_md"
)
const DecrementTrigger = withClass(
  ArkNumberInput.DecrementTrigger,
  "numberInput__decrementTrigger"
)
const IncrementTrigger = withClass(
  ArkNumberInput.IncrementTrigger,
  "numberInput__incrementTrigger"
)
const Input = withClass(ArkNumberInput.Input, "numberInput__input")
const Label = withClass(
  ArkNumberInput.Label,
  "numberInput__label numberInput__label--size_md"
)

export type NumberInputProps = ComponentProps<typeof Root>

export const NumberInput = (props: NumberInputProps) => {
  const getChildren = children(() => props.children)

  return (
    <Root {...props}>
      <Show when={getChildren()}>
        <Label>{getChildren()}</Label>
      </Show>
      <Control>
        <Input />
        <IncrementTrigger>
          <ChevronUpIcon />
        </IncrementTrigger>
        <DecrementTrigger>
          <ChevronDownIcon />
        </DecrementTrigger>
      </Control>
    </Root>
  )
}

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Up Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m18 15l-6-6l-6 6"
    />
  </svg>
)

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Down Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m6 9l6 6l6-6"
    />
  </svg>
)

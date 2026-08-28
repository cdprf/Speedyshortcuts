import { NumberInput as ArkNumberInput } from "@ark-ui/solid"
import { Show, children, type ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const Root = withClass(ArkNumberInput.Root, "flex flex-col gap-1.5")
const Control = withClass(
  ArkNumberInput.Control,
  "grid h-10 min-w-10 grid-cols-[1fr_32px] grid-rows-2 overflow-hidden rounded-lg border border-(--colors-border-default) ps-3 text-base transition-[border-color,box-shadow] duration-200 ease-(--easing-default) focus-within:border-primary focus-within:shadow-[0_0_0_1px_var(--colors-color-palette-default)]"
)
const DecrementTrigger = withClass(
  ArkNumberInput.DecrementTrigger,
  "inline-flex cursor-pointer items-center justify-center border-t border-s border-(--colors-border-default) text-muted-foreground transition-[background,color] duration-200 ease-(--easing-default) hover:bg-(--colors-gray-a2) hover:text-foreground [&_svg]:size-4"
)
const IncrementTrigger = withClass(
  ArkNumberInput.IncrementTrigger,
  "inline-flex cursor-pointer items-center justify-center border-s border-(--colors-border-default) text-muted-foreground transition-[background,color] duration-200 ease-(--easing-default) hover:bg-(--colors-gray-a2) hover:text-foreground [&_svg]:size-4"
)
const Input = withClass(
  ArkNumberInput.Input,
  "row-span-2 w-full border-0 bg-transparent outline-none"
)
const Label = withClass(
  ArkNumberInput.Label,
  "text-sm leading-5 font-medium text-foreground"
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

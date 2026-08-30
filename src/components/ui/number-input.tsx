import {
  FieldLabel,
  NumberInput as ArkNumberInput,
  useNumberInputContext,
} from "@ark-ui/solid"
import { MinusIcon, PlusIcon } from "lucide-solid"
import { splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"
import { Button } from "./button"
import { Input, type InputProps } from "./input"

export const useNumberInput = useNumberInputContext

export type NumberInputProps = ComponentProps<typeof ArkNumberInput.Root> &
  Pick<InputProps, "size">

export const NumberInputRoot = (props: NumberInputProps) => {
  const [local, rest] = splitProps(props, ["size", "class"])
  const size = () => local.size ?? "md"

  return (
    <ArkNumberInput.Root
      {...rest}
      class={cn(
        "group/number-field flex w-full flex-col items-start gap-2",
        "has-data-[slot=number-field-increment]:has-data-[slot=number-field-decrement]:**:data-[slot=number-field-input]:text-center",
        local.class
      )}
      data-size={size()}
      data-slot="number-field"
    />
  )
}

export const NumberInputGroup = (
  props: ComponentProps<typeof ArkNumberInput.Control>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkNumberInput.Control
      {...rest}
      class={cn(
        "relative flex w-full justify-between",
        "rounded-lg border border-input bg-transparent text-base shadow-xs/5 ring-ring/32 dark:bg-input/30",
        "transition-shadow",
        "focus-within:border-primary focus-within:ring-[3px] focus-within:ring-ring/32",
        "data-disabled:pointer-events-none data-disabled:opacity-64",
        "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/24",
        "dark:aria-invalid:border-destructive-foreground dark:aria-invalid:text-destructive-foreground dark:aria-invalid:ring-destructive-foreground/20",
        "motion-reduce:transition-none!",
        local.class
      )}
      data-slot="number-field-group"
    />
  )
}

export const NumberInputDecrement = (
  props: ComponentProps<typeof ArkNumberInput.DecrementTrigger>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkNumberInput.DecrementTrigger
      {...rest}
      asChild={(triggerProps) => (
        <Button {...triggerProps()} aria-label="Decrement" variant="ghost">
          {local.children ?? <MinusIcon aria-hidden="true" />}
        </Button>
      )}
      class={cn(
        "relative flex h-8 shrink-0",
        "in-data-[size=lg]:h-9 in-data-[size=sm]:h-7",
        "cursor-pointer rounded-none rounded-s-[calc(var(--radius-lg)+1px)] text-foreground",
        "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
        local.class
      )}
      data-slot="number-field-decrement"
    />
  )
}

export const NumberInputIncrement = (
  props: ComponentProps<typeof ArkNumberInput.IncrementTrigger>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkNumberInput.IncrementTrigger
      {...rest}
      asChild={(triggerProps) => (
        <Button {...triggerProps()} aria-label="Increment" variant="ghost">
          {local.children ?? <PlusIcon aria-hidden="true" />}
        </Button>
      )}
      class={cn(
        "relative flex h-8 shrink-0",
        "in-data-[size=lg]:h-9 in-data-[size=sm]:h-7",
        "cursor-pointer rounded-none rounded-e-[calc(var(--radius-lg)+1px)] text-foreground",
        "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
        local.class
      )}
      data-slot="number-field-increment"
    />
  )
}

export const NumberInputInput = (props: ComponentProps<typeof Input>) => {
  const [local, rest] = splitProps(props, ["size", "class"])

  return (
    <ArkNumberInput.Input
      {...rest}
      asChild={(inputProps) => (
        <Input
          {...inputProps()}
          class={cn(
            "h-8 grow tabular-nums",
            "in-data-[size=lg]:h-9 in-data-[size=sm]:h-7",
            "border-0 shadow-none ring-0",
            "focus-visible:ring-0 aria-invalid:ring-0 data-invalid:ring-0",
            "dark:bg-transparent",
            local.class
          )}
        />
      )}
      data-slot="number-field-input"
    />
  )
}

export const NumberInputScrubber = (
  props: ComponentProps<typeof ArkNumberInput.Scrubber>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkNumberInput.Scrubber
      {...rest}
      asChild={(scrubberProps) => (
        <ArkNumberInput.Label
          {...scrubberProps()}
          asChild={(labelProps) => (
            <FieldLabel
              {...labelProps()}
              class="group/field-label peer/field-label flex w-fit gap-1 select-none font-medium text-xs leading-snug"
              data-slot="field-label"
            >
              {local.children}
            </FieldLabel>
          )}
        />
      )}
      class={cn("flex cursor-ew-resize", local.class)}
      data-slot="number-field-scrubber"
    />
  )
}

export const NumberInputScrubArea = NumberInputScrubber

export const NumberInput = Object.assign(NumberInputRoot, {
  Root: NumberInputRoot,
  Group: NumberInputGroup,
  Control: NumberInputGroup,
  Decrement: NumberInputDecrement,
  DecrementTrigger: NumberInputDecrement,
  Increment: NumberInputIncrement,
  IncrementTrigger: NumberInputIncrement,
  Input: NumberInputInput,
  Scrubber: NumberInputScrubber,
  ScrubArea: NumberInputScrubArea,
  Context: ArkNumberInput.Context,
})

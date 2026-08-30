import { Switch as ArkSwitch, useSwitchContext } from "@ark-ui/solid"
import { splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"

export const useSwitch = useSwitchContext

export type SwitchProps = ComponentProps<typeof ArkSwitch.Root>

export const Switch = (props: SwitchProps) => {
  const [local, rest] = splitProps(props, ["class", "tabIndex"])

  return (
    <ArkSwitch.Root
      class={cn(
        "group/switch",
        "[--thumb-size:--spacing(5)] sm:[--thumb-size:--spacing(4)]",
        "h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)]",
        "p-px",
        "inline-flex shrink-0 items-center",
        "rounded-full border border-transparent",
        "transition-all",
        "outline-none [[data-focus-visible],[data-invalid]]:ring-[3px]",
        "data-focus-visible:border-primary data-focus-visible:ring-ring/32",
        "data-invalid:border-destructive data-invalid:ring-destructive/24",
        "dark:data-invalid:border-destructive-foreground dark:data-invalid:ring-destructive-foreground/20",
        "data-[state=checked]:bg-primary",
        "data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input",
        "data-disabled:pointer-events-none data-disabled:opacity-64",
        "motion-reduce:transition-none!",
        local.class
      )}
      data-slot="switch"
      {...rest}
    >
      <ArkSwitch.Control
        class="flex size-full items-center cursor-pointer"
        data-slot="switch-control"
      >
        <ArkSwitch.Thumb
          class={cn(
            "block",
            "aspect-square h-full w-auto",
            "bg-background",
            "rounded-full ring-0",
            "pointer-events-none",
            "transition-transform",
            "data-[state=checked]:translate-x-[calc(var(--thumb-size)-4px)]",
            "dark:data-[state=checked]:bg-primary-foreground",
            "data-[state=unchecked]:translate-x-0",
            "dark:data-[state=unchecked]:bg-foreground",
            "motion-reduce:transition-none!"
          )}
          data-slot="switch-thumb"
        />
      </ArkSwitch.Control>

      <ArkSwitch.HiddenInput tabIndex={local.tabIndex} />
    </ArkSwitch.Root>
  )
}

import { FieldInput } from "@ark-ui/solid"
import { splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"

export type InputSize = "sm" | "md" | "lg"
export type InputProps = Omit<ComponentProps<typeof FieldInput>, "size"> & {
  size?: InputSize
}

const inputSizeClasses: Record<InputSize, string> = {
  sm: "h-7",
  md: "h-8",
  lg: "h-9",
}

export const inputVariants = (options: { size?: InputSize } = {}) => {
  const size = options.size ?? "md"

  return cn(
    "peer w-full min-w-0 px-3",
    "rounded-lg border border-input bg-transparent shadow-xs/5 dark:bg-input/30",
    "text-base md:text-sm",
    "placeholder:text-muted-foreground/64",
    "file:inline-flex file:h-7 file:items-center file:border-0",
    "file:font-medium file:text-foreground file:text-sm",
    "outline-none transition-[color,box-shadow]",
    "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/32",
    "aria-invalid:border-destructive aria-invalid:text-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/24",
    "data-invalid:border-destructive data-invalid:text-destructive data-invalid:ring-[3px] data-invalid:ring-destructive/24",
    "dark:aria-invalid:border-destructive-foreground dark:aria-invalid:text-destructive-foreground dark:aria-invalid:ring-destructive-foreground/40",
    "dark:data-invalid:border-destructive-foreground dark:data-invalid:text-destructive-foreground dark:data-invalid:ring-destructive-foreground/40",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-64",
    "motion-reduce:transition-none!",
    inputSizeClasses[size]
  )
}

export const Input = (props: InputProps) => {
  const [local, rest] = splitProps(props, ["class", "size", "type"])
  const size = () => local.size ?? "md"

  return (
    <FieldInput
      {...rest}
      class={cn(inputVariants({ size: size() }), local.class)}
      data-size={size()}
      data-slot="input"
      type={local.type ?? "text"}
    />
  )
}

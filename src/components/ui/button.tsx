import { ark } from "@ark-ui/solid"
import { Show, splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"
import { Spinner } from "./spinner"

export type ButtonVariant =
  | "default"
  | "outline"
  | "destructive"
  | "secondary"
  | "ghost"
  | "link"
  | "translucent"

export type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "icon-xs"
  | "icon-sm"
  | "icon-md"
  | "icon-lg"
  | "icon-xl"

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "border border-transparent bg-primary text-primary-foreground shadow-primary/24 shadow-sm hover:bg-primary/90 focus-visible:border-background",
  outline:
    "border border-input bg-transparent text-foreground shadow-sm/5 hover:bg-accent hover:text-accent-foreground focus-visible:border-primary dark:bg-input/32 dark:hover:bg-input/64",
  translucent:
    "border border-foreground/15 bg-foreground/4 text-foreground shadow-sm/5 hover:border-foreground/20 hover:bg-foreground/10 focus-visible:border-ring",
  destructive:
    "border border-transparent bg-destructive text-white shadow-destructive/24 shadow-sm hover:bg-destructive/90 focus-visible:border-background focus-visible:ring-destructive-foreground/32",
  secondary:
    "border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:border-primary",
  ghost:
    "border border-transparent hover:bg-accent hover:text-accent-foreground focus-visible:border-primary",
  link: "border border-transparent text-primary underline-offset-4 hover:underline focus-visible:border-primary",
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-6 gap-1.5 rounded-sm px-2 text-xs [&_svg:not([class*='size-'])]:size-2.5",
  sm: "h-7 gap-1.5 px-2.5 [&_svg:not([class*='size-'])]:size-3.5",
  md: "h-8 px-3 py-2",
  lg: "h-9 px-3.5",
  xl: "h-10 px-4 text-base",
  "icon-xs": "size-6 rounded-sm",
  "icon-sm": "size-7",
  "icon-md": "size-8",
  "icon-lg": "size-9",
  "icon-xl": "size-10 [&_svg:not([class*='size-'])]:size-5",
}

const pillClasses: Partial<Record<ButtonSize, string>> = {
  xs: "has-[>svg]:pe-3",
  sm: "has-[>svg]:pe-3.5",
  md: "has-[>svg]:pe-4",
  lg: "has-[>svg]:pe-4.5",
  xl: "has-[>svg]:pe-5",
}

export type ButtonVariantOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  clickEffect?: boolean
  pill?: boolean
}

export const buttonVariants = (options: ButtonVariantOptions = {}) => {
  const variant = options.variant ?? "default"
  const size = options.size ?? "md"
  const clickEffect = options.clickEffect ?? true
  const pill = options.pill ?? false

  return cn(
    "relative inline-flex shrink-0 items-center justify-center gap-2",
    "whitespace-nowrap rounded-lg font-medium text-sm transition-all",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/32",
    "disabled:pointer-events-none disabled:opacity-64",
    "data-disabled:pointer-events-none data-disabled:opacity-64",
    "aria-disabled:pointer-events-none aria-disabled:opacity-64",
    "data-[state=loading]:pointer-events-none",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/24",
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    "motion-reduce:transition-none!",
    variantClasses[variant],
    sizeClasses[size],
    clickEffect && "active:not-aria-[haspopup]:scale-[0.98]",
    pill && "rounded-full",
    pill && pillClasses[size]
  )
}

/** @deprecated Use buttonVariants({ variant, size }) instead. */
export const buttonClass = (
  variant: ButtonVariant = "default",
  size: ButtonSize = "md"
) => buttonVariants({ variant, size })

export type ButtonProps = ComponentProps<typeof ark.button> &
  ButtonVariantOptions & {
    /** Show a loading indicator and temporarily disable interaction. */
    isLoading?: boolean
  }

export const Button = (props: ButtonProps) => {
  const [local, rest] = splitProps(props, [
    "class",
    "variant",
    "size",
    "clickEffect",
    "pill",
    "isLoading",
    "children",
  ])
  const variant = () => local.variant ?? "default"
  const size = () => local.size ?? "md"
  const clickEffect = () => local.clickEffect ?? true
  const pill = () => local.pill ?? false
  const isLoading = () => local.isLoading ?? false

  return (
    <ark.button
      class={cn(
        buttonVariants({
          variant: variant(),
          size: size(),
          clickEffect: clickEffect(),
          pill: pill(),
        }),
        local.class
      )}
      data-size={size()}
      data-slot="button"
      data-state={isLoading() ? "loading" : "idle"}
      data-variant={variant()}
      type="button"
      {...rest}
      aria-busy={isLoading()}
      aria-disabled={isLoading()}
    >
      <Show when={isLoading()} fallback={local.children}>
        <span aria-hidden="true" class="invisible">
          {local.children}
        </span>
        <span class="sr-only">{local.children}</span>
        <span class="absolute inset-0 flex items-center justify-center">
          <Spinner aria-hidden="true" />
        </span>
      </Show>
    </ark.button>
  )
}

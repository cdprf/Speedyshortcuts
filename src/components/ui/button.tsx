import { ark } from "@ark-ui/solid"
import { Show, splitProps, type ComponentProps, type JSX } from "solid-js"
import { cn } from "~/utils/cn"
import { Spinner } from "./spinner"

export type ButtonVariant = "solid" | "outline" | "ghost"
export type ButtonSize = "xs" | "sm" | "md"

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: JSX.Element
}

export type ButtonProps = ComponentProps<typeof ark.button> &
  ButtonLoadingProps & { variant?: ButtonVariant; size?: ButtonSize }

export const buttonClass = (
  variant: ButtonVariant = "solid",
  size: ButtonSize = "md",
  iconOnly = false
) =>
  cn(
    "button",
    `button--variant_${variant}`,
    `button--size_${size}`,
    iconOnly && "button--icon-only"
  )

export const Button = (props: ButtonProps) => {
  const [localProps, rest] = splitProps(props, [
    "class",
    "variant",
    "size",
    "loading",
    "disabled",
    "loadingText",
    "children",
  ])
  const trulyDisabled = () => localProps.loading || localProps.disabled

  return (
    <ark.button
      {...rest}
      disabled={trulyDisabled()}
      class={cn(
        buttonClass(localProps.variant, localProps.size),
        localProps.class as string | undefined
      )}
    >
      <Show
        when={localProps.loading && !localProps.loadingText}
        fallback={localProps.loadingText || localProps.children}
      >
        <>
          <ButtonSpinner />
          <span class="button__loading-content">{localProps.children}</span>
        </>
      </Show>
    </ark.button>
  )
}

const ButtonSpinner = () => (
  <span class="button__spinner-container">
    <Spinner class="button__spinner" />
  </span>
)

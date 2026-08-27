import { ark } from "@ark-ui/solid"
import { mergeProps, splitProps, type ComponentProps } from "solid-js"
import { withClass } from "~/utils/with-class"

const SpinnerRoot = withClass(ark.div, "spinner spinner--size_md")

export type SpinnerProps = ComponentProps<typeof SpinnerRoot> & {
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   * @default "Loading..."
   */
  label?: string
}

export const Spinner = (props: SpinnerProps) => {
  const [_localProps, rootProps] = splitProps(props, ["label"])
  const localProps = mergeProps({ label: "Loading..." }, _localProps)

  return (
    <SpinnerRoot {...rootProps}>
      <span class="sr-only">{localProps.label}</span>
    </SpinnerRoot>
  )
}

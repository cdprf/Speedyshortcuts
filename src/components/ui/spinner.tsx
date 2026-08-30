import { LoaderCircleIcon } from "lucide-solid"
import { splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"

export type SpinnerProps = ComponentProps<typeof LoaderCircleIcon>

export const Spinner = (props: SpinnerProps) => {
  const [localProps, rootProps] = splitProps(props, ["aria-label", "class"])

  return (
    <LoaderCircleIcon
      aria-label={localProps["aria-label"] ?? "Loading"}
      class={cn("size-4 animate-spin", localProps.class)}
      data-slot="spinner"
      role="status"
      {...rootProps}
    />
  )
}

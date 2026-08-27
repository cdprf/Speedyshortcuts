import type { Component, ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"

export const withClass = <T extends Component<any>>(
  BaseComponent: T,
  baseClass: string
) => {
  const StyledComponent = (props: ComponentProps<T>) => (
    <BaseComponent
      {...(props as ComponentProps<T>)}
      class={cn(baseClass, (props as { class?: string }).class)}
    />
  )

  return StyledComponent as Component<ComponentProps<T>>
}

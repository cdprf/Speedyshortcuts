import {
  ScrollArea as ArkScrollArea,
  useScrollAreaContext,
} from "@ark-ui/solid"
import { splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"

export const useScrollArea = useScrollAreaContext

export type ScrollAreaProps = ComponentProps<typeof ArkScrollArea.Root> & {
  scrollFade?: boolean
}

export const ScrollArea = (props: ScrollAreaProps) => {
  const [local, rest] = splitProps(props, ["scrollFade", "class", "children"])

  return (
    <ArkScrollArea.Root
      {...rest}
      class={cn("size-full min-h-0 [--fade-size:1.5rem]", local.class)}
      data-slot="scroll-area"
    >
      <ArkScrollArea.Viewport
        class={cn(
          "h-full rounded-[inherit] outline-none scrollbar-none",
          local.scrollFade &&
            "mask-t-from-[calc(100%-var(--fade-size))] mask-b-from-[calc(100%-var(--fade-size))] transition-shadow data-at-top:mask-t-from-100% data-at-bottom:mask-b-from-100% motion-reduce:transition-none!"
        )}
        data-slot="scroll-area-viewport"
      >
        <ArkScrollArea.Content data-slot="scroll-area-content">
          {local.children}
        </ArkScrollArea.Content>
      </ArkScrollArea.Viewport>

      <ScrollAreaScrollbar orientation="vertical" />
      <ScrollAreaScrollbar orientation="horizontal" />
      <ArkScrollArea.Corner data-slot="scroll-area-corner" />
    </ArkScrollArea.Root>
  )
}

export const ScrollAreaScrollbar = (
  props: ComponentProps<typeof ArkScrollArea.Scrollbar>
) => {
  const [local, rest] = splitProps(props, ["orientation", "class"])

  return (
    <ArkScrollArea.Scrollbar
      {...rest}
      class={cn(
        "m-1 flex bg-transparent opacity-0 transition-opacity delay-300",
        "data-[orientation=vertical]:w-1.5",
        "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:flex-col",
        "data-hover:opacity-100 data-hover:delay-0 data-hover:duration-100",
        "data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-100",
        "data-[orientation=vertical]:in-[[data-slot=scroll-area]:not([data-overflow-y])]:hidden",
        "data-[orientation=horizontal]:in-[[data-slot=scroll-area]:not([data-overflow-x])]:hidden",
        "motion-reduce:transition-none!",
        local.class
      )}
      data-slot="scroll-area-scrollbar"
      orientation={local.orientation}
    >
      <ArkScrollArea.Thumb
        class="relative flex-1 rounded-full bg-foreground/20"
        data-slot="scroll-area-thumb"
      />
    </ArkScrollArea.Scrollbar>
  )
}

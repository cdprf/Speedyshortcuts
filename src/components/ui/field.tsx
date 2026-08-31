import { Field as ArkField } from "@ark-ui/solid"
import { ark } from "@ark-ui/solid/factory"
import { splitProps, type ComponentProps } from "solid-js"
import { cn } from "~/utils/cn"

export const Field = (props: ComponentProps<typeof ArkField.Root>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkField.Root
      {...rest}
      class={cn(
        "group/field flex w-full flex-col gap-2",
        "data-invalid:text-destructive dark:data-invalid:text-destructive-foreground",
        local.class
      )}
      data-slot="field"
    />
  )
}

export const FieldGroup = (props: ComponentProps<typeof ark.div>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ark.div
      {...rest}
      class={cn("flex w-full flex-col gap-4", local.class)}
      data-slot="field-group"
    />
  )
}

export const FieldLabel = (props: ComponentProps<typeof ArkField.Label>) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkField.Label
      {...rest}
      class={cn(
        "flex w-fit gap-1 font-medium text-sm leading-snug",
        local.class
      )}
      data-slot="field-label"
    />
  )
}

export const FieldRequiredIndicator = (
  props: ComponentProps<typeof ArkField.RequiredIndicator>
) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ArkField.RequiredIndicator
      {...rest}
      class={cn(
        "select-none text-destructive text-sm dark:text-destructive-foreground",
        local.class
      )}
      data-slot="field-required-indicator"
    >
      {local.children ?? "*"}
    </ArkField.RequiredIndicator>
  )
}

export const FieldError = (
  props: ComponentProps<typeof ArkField.ErrorText>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ArkField.ErrorText
      {...rest}
      class={cn(
        "font-normal text-destructive text-sm leading-normal dark:text-destructive-foreground",
        local.class
      )}
      data-slot="field-error"
    />
  )
}

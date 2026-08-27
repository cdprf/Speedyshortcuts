// export type ClassValue = string | false | null | undefined

// export const cn = (...classes: ClassValue[]) =>
//   classes.filter(Boolean).join(" ")

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

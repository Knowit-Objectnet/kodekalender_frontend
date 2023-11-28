import { PropsWithChildren, FC } from "react"

export type Nullable<T> = T | null
export type Maybe<T> = T | undefined

export type EmptyObject = Record<string, never>

export type FCWithChildren<T = unknown> = FC<PropsWithChildren<T>>

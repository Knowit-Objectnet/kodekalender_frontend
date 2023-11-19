import { ServiceMessage } from "../ServiceMessage"


export type AdminServiceMessagePayload = Omit<ServiceMessage, "uuid" | "created_at" | "resolved"> & {
  created_at?: string
}

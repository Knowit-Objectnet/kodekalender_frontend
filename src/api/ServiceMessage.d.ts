import { Nullable } from "../../types/utils_types"


export type ServiceMessage = {
  uuid: string
  content: string
  created_at: string

  resolution_content: Nullable<string>
  resolved_at: Nullable<string>
  resolved: boolean

  door: Nullable<number>
}

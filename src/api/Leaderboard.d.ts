import { Nullable } from "../../types/utils_types"

export type LeaderboardUser = {
  uuid: string
  username: Nullable<string>
  avatar: string
  solved_count: number
  solved_at: string
}
export type Leaderboard = Array<LeaderboardUser>

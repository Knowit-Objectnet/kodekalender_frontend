import { isNil, isEmpty, join, map, orderBy, groupBy, upperFirst, values, sortBy } from "lodash-es"
import { ReactNode } from "react"

import { useLeaderboard } from "../api/requests"
import Divider from "../components/Divider"
import { numberString, getRandomDisplayName, cl } from "../utils"
import { useWhoami } from "../api/users/requests"
import { Avatar } from "../components/users/Avatar"
import { LeaderboardUser } from "../api"

import BasicPage from "./BasicPage"

const getGroupTitle = (count: number) => {
  const title = `${upperFirst(numberString(count))} løst${count > 1 ? "e" : ""} luke${
    count > 1 ? "r" : ""
  }`

  if (count === 24) return `🧝‍♂️🎅🎄 ${title} 🎄🤶🧝‍♀️`
  else return title
}

type MappedLeaderboardUser = LeaderboardUser & {
  username: ReactNode
  rank: number
}

const Leaderboard = () => {
  const { data: leaderboard } = useLeaderboard()
  const { data: whoami } = useWhoami()

  if (isNil(leaderboard)) return null
  if (isEmpty(leaderboard)) return <div className="text-center">Ingen snille barn!</div>

  const sortedBySolvedCount = orderBy(leaderboard, ["solved_count"], ["desc"])
  const mapped: MappedLeaderboardUser[] = map(sortedBySolvedCount, (u, i) => ({
    ...u,
    rank: i + 1,
    username: u.username ?? join(getRandomDisplayName(u.uuid), " ")
  }))
  const grouped = groupBy(mapped, "solved_count")
  const leaderboardGroupedOnSolvedCount = map(values(grouped), (group) =>
    sortBy(group, "solved_at")
  )

  return (
    <BasicPage title="Snille Barn">
      {map(leaderboardGroupedOnSolvedCount, (group) => {
        const solvedCount = group[0].solved_count

        return (
          <div key={solvedCount}>
            <h2 className="text-center font-bold">{getGroupTitle(solvedCount)}</h2>

            <Divider bgClasses="bg-purple-500/70 mt-3" />

            <div className="mt-6 px-16">
              {map(group, ({ uuid, username, avatar, rank }) => (
                <div
                  key={uuid}
                  className={cl(
                    "grid w-full grid-cols-[1fr_auto_1fr] px-24 py-5",
                    uuid === whoami?.uuid && "rounded-md bg-purple-700"
                  )}
                >
                  <Avatar avatar={avatar} className="h-18 max-h-18 w-18 max-w-18" />
                  <div className="flex items-center gap-4 text-opacity-80">{username}</div>
                  <div className="place-self-center-end">{rank}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </BasicPage>
  )
}

export default Leaderboard

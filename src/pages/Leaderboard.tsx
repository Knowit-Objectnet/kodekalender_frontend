import { isNil, isEmpty, join, map, upperFirst, reduce, last } from "lodash-es"
import { ReactNode } from "react"

import { useLeaderboard } from "../api/requests"
import Divider from "../components/Divider"
import { numberString, getRandomDisplayName, cl } from "../utils"
import { useWhoami } from "../api/users/requests"
import { Avatar } from "../components/users/Avatar"
import { LeaderboardUser } from "../api"

import BasicPage from "./BasicPage"


const getGroupTitle = (count: number) => {
  const title = `${upperFirst(numberString(count))} løst${count > 1 ? "e" : ""} luke${count > 1 ? "r" : ""}`

  if (count === 24)
    return `🧝‍♂️🎅🎄 ${title} 🎄🤶🧝‍♀️`
  else
    return title
}

type MappedLeaderboardUser = LeaderboardUser & {
  username: ReactNode
  rank: number
}

const Leaderboard = () => {
  const { data: leaderboard } = useLeaderboard()
  const { data: whoami } = useWhoami()

  if (isNil(leaderboard)) return null
  if (isEmpty(leaderboard))
    return <div className="text-center">Ingen snille barn!</div>

  const leaderboardGroupedOnSolvedCount = reduce(
    leaderboard,
    (acc, leaderboardUser, i) => {
      const { uuid, username } = leaderboardUser
      const mappedLeaderboardUser: MappedLeaderboardUser = {
        ...leaderboardUser,
        username: username ?? join(getRandomDisplayName(uuid), " "),
        rank: i + 1
      }

      if (last(acc)?.[0]?.solved_count === leaderboardUser.solved_count) {
        last(acc)!.push(mappedLeaderboardUser)
      } else {
        acc.push([mappedLeaderboardUser])
      }

      return acc
    },
    [] as Array<[MappedLeaderboardUser, ...MappedLeaderboardUser[]]>
  )

  return (
    <BasicPage title="Snille Barn">
      {map(leaderboardGroupedOnSolvedCount, (group) => (
        <div key={group[0].solved_count}>
          <h2 className="text-center font-bold">
            {getGroupTitle(group[0].solved_count)}
          </h2>

          <Divider bgClasses="bg-purple-500/70 mt-3" />

          <div className="px-16 mt-6">
            {map(group, ({ uuid, username, avatar, solved_at: _solved_at, rank }) => (
              <div
                key={uuid}
                className={cl(
                  "grid grid-cols-[1fr_auto_1fr] w-full px-24 py-5",
                  uuid === whoami?.uuid && "rounded-md bg-purple-700"
                )}
              >
                <Avatar avatar={avatar} className="w-18 max-w-18 h-18 max-h-18" />
                <div className="flex items-center gap-4 text-opacity-80">{username}</div>
                <div className="place-self-center-end">{rank}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </BasicPage>
  )
}

export default Leaderboard

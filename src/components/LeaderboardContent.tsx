import { FC, ReactElement, useMemo } from "react"
import { isEmpty, isNil, map, reduce, upperFirst } from "lodash-es"

import { cl, numberString } from "../utils"
import { useLeaderboard } from "../api/requests"
import { useWhoami } from "../api/users/requests"

import Divider from "./Divider"
import { UserAvatar } from "./Posts/PostForm"

type LeaderboardUser = {
  uuid: string
  username: string | null
  avatar_url: string
  position: number
}

type LeaderboardGroup = [number, Array<LeaderboardUser>]
type LeaderboardWithPosition = Array<LeaderboardGroup>

type LeaderBoardContentProps = {
  CloseButton?: ReactElement
}

type LeaderBoardGridProps = {
  solvedCount: number
  group: Array<LeaderboardUser>
}
const LeaderBoardGrid: FC<LeaderBoardGridProps> = ({ solvedCount, group }) => {
  const { data: whoami } = useWhoami()
  return (
    <div key={solvedCount}>
      <h2 className="text-center font-bold">
        {upperFirst(numberString(solvedCount))} løst
        {solvedCount > 1 && "e"} luke{solvedCount > 1 && "r"}
      </h2>
      <Divider bgClasses="bg-purple-500 mt-3" />

      {/* Grid */}
      <div className="px-16 mt-6">
        {map(group, ({ uuid, username, avatar_url, position }) => (
          <div
            key={uuid}
            className={cl(
              "grid w-full grid-cols-[1fr_auto_1fr] gap-4 px-24 py-5",
              uuid === whoami?.uuid && "rounded-md bg-purple-700"
            )}
          >
            <UserAvatar
              avatar={avatar_url}
              className="w-18 max-w-18 h-18 max-h-18"
            />
            <div className="place-self-center text-gray">{username}</div>
            <div className="place-self-center-end">{position}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const LeaderBoardContent: FC<LeaderBoardContentProps> = () => {
  const { data: leaderboard } = useLeaderboard()

  // Calculate overall position for each user, regardless of grouping.
  const leaderboardWithPosition = useMemo(() => {
    if (!leaderboard) return []

    return reduce(
      leaderboard,
      (list, [solvedCount, tuples]) => {
        const numPrecedingGroupedUsers = reduce(
          list,
          (sum, [_, entries]) => sum + entries.length,
          0
        )

        return [
          ...list,
          [
            solvedCount,
            map(tuples, ([uuid, username, avatar_url], i) => ({
              uuid,
              username,
              avatar_url,
              position: numPrecedingGroupedUsers + i + 1
            }))
          ] as LeaderboardGroup
        ]
      },
      [] as LeaderboardWithPosition
    )
  }, [leaderboard])

  if (isNil(leaderboard)) return null
  if (isEmpty(leaderboard))
    return <div className="text-center">Ingen snille barn!</div>

  return (
    <>
      {map(leaderboardWithPosition, ([solvedCount, entries]) => (
        <div key={solvedCount}>
          <LeaderBoardGrid solvedCount={solvedCount} group={entries} />
        </div>
      ))}
    </>
  )
}

export default LeaderBoardContent

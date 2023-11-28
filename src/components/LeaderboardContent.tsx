import { FC, ReactElement, ReactNode, useMemo } from "react"
import { isEmpty, isNil, map, reduce, upperFirst } from "lodash-es"

import { getRandomDisplayName, getObjKey, numberString } from "../utils"
import { useLeaderboard } from "../api/requests"

import { Header3 } from "./text"

type LeaderboardGroup = [
  number,
  Array<{ username: string | null; position: number }>
]
type LeaderboardWithPosition = Array<LeaderboardGroup>

type LeaderBoardContentProps = {
  CloseButton?: ReactElement
}

const LeaderBoardContent: FC<LeaderBoardContentProps> = () => {
  const { data: leaderboard } = useLeaderboard()

  // Calculate overall position for each user, regardless of grouping.
  const leaderboardWithPosition = useMemo(() => {
    if (!leaderboard) return []

    return reduce(
      leaderboard,
      (list, [solvedCount, usernames]) => {
        const numPrecedingGroupedUsers = reduce(
          list,
          (sum, [_, entries]) => sum + entries.length,
          0
        )

        return [
          ...list,
          [
            solvedCount,
            map(usernames, (username, i) => ({
              username,
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
    return (
      <div className="relative h-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Ingen snille barn!
        </div>
      </div>
    )

  return (
    <>
      {map(leaderboardWithPosition, ([solvedCount, entries]) => (
        <div key={solvedCount}>
          <Header3
            className="sticky top-0 -space-y-2 rounded-md bg-purple-700 py-2"
            key={solvedCount}
          >
            <div className="text-lg font-semibold tracking-wide">
              {upperFirst(numberString(solvedCount))} løst
              {solvedCount > 1 && "e"}
            </div>
            <div className="text-sm text-gray/80">
              {numberString(entries.length, true)} snil
              {entries.length > 1 ? "le" : "t"} barn
            </div>
          </Header3>
          <div className="space-y-2 pb-8 pt-4">
            {map(entries, (user) => {
              let displayName: ReactNode = user.username
              if (!displayName) {
                const [name, emoji] = getRandomDisplayName()
                displayName = (
                  <span>
                    <em>{name}</em>&nbsp;{emoji}
                  </span>
                )
              }

              return (
                <p key={getObjKey(user)}>
                  <span className="text-xs tracking-wide text-gray/40">
                    {user.position}.
                  </span>
                  &nbsp;{displayName}
                </p>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}

export default LeaderBoardContent

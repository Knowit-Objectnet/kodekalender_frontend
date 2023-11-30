import { FC, ReactElement, ReactNode, useMemo } from "react"
import { isEmpty, isNil, map, reduce, upperFirst } from "lodash-es"

import { getRandomDisplayName, getObjKey, numberString, cl } from "../utils"
import { useLeaderboard } from "../api/requests"
import { useWhoami } from "../api/users/requests"

import { Header4 } from "./text"
import Divider from "./Divider"


type LeaderboardGroup = [number, Array<{ uuid: string, username: string | null, avatar_url: string, position: number }>]
type LeaderboardWithPosition = Array<LeaderboardGroup>

type LeaderBoardContentProps = {
  CloseButton?: ReactElement
}

const LeaderBoardContent: FC<LeaderBoardContentProps> = () => {
  const { data: leaderboard } = useLeaderboard()

  const { data: whoami } = useWhoami()

  // Calculate overall position for each user, regardless of grouping.
  const leaderboardWithPosition = useMemo(() => {
    if (!leaderboard) return []

    return reduce(leaderboard, (list, [solvedCount, tuples]) => {
      const numPrecedingGroupedUsers = reduce(list, (sum, [_, entries]) => sum + entries.length, 0)

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
    }, [] as LeaderboardWithPosition)
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

  return (<>
    {map(leaderboardWithPosition, ([solvedCount, entries]) =>
      <div key={solvedCount}>
        <Header4 className="sticky top-0 py-2 rounded-md -space-y-2 text-center" key={solvedCount} >
          <div className="text-lg font-semibold tracking-wide">
            {upperFirst(numberString(solvedCount))} løst{solvedCount > 1 && "e"}
          </div>
          <div className="text-gray/80 text-sm">
            {numberString(entries.length, true)} snil{entries.length > 1 ? "le" : "t"} barn
          </div>
        </Header4>
        <Divider bgClasses="bg-purple-500 w-2/3" />
        <div className="flex justify-center flex-col gap-y-3 text-center">
          {map(entries, (user) => {
            let displayName: ReactNode = user.username
            if (!displayName) {
              const [name, emoji] = getRandomDisplayName(user.uuid)
              displayName = <span><em>{name}</em>&nbsp;{emoji}</span>
            }

            return (
              <p key={getObjKey(user)} className={cl(whoami?.uuid === user.uuid && "bg-purple-700 rounded-md w-2/3")}>
                <span className="text-gray tracking-wide">{user.position}.</span>
                &nbsp;{displayName}
              </p>
            )
            })}
        </div>
      </div>
    )}
  </>)
}

export default LeaderBoardContent

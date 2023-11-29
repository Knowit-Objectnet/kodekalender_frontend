import { FC, ReactElement, useMemo } from "react"
import { flatMap, isEmpty, isNil, map } from "lodash-es"

import { useLeaderboard } from "../api/requests"


type LeaderBoardContentProps = {
  CloseButton?: ReactElement
}

const LeaderBoardContent: FC<LeaderBoardContentProps> = () => {
  const { data: leaderboard } = useLeaderboard()

  // Calculate overall position for each user, regardless of grouping.
  const leaderboardWithPosition = useMemo(() => {
    if (!leaderboard) return []

    return flatMap(leaderboard, (group) =>
      map(group[1], (val) => [val, group[0]])
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
      <div className="full-w space-between grid grid-cols-3 place-items-center gap-x-72 gap-y-10">
        <h2 className="font-bold">Plass</h2>
        <h2 className="font-bold">Navn</h2>
        <h2 className="font-bold">Løste luker</h2>
        {map(leaderboardWithPosition, (values, index) => (
          <>
            <div>{index + 1}</div>
            <div>{values[0]}</div>
            <div>{values[1]}</div>
          </>
        ))}
      </div>
    </>
  )
}

export default LeaderBoardContent

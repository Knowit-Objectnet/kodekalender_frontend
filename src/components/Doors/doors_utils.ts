import clsx, { ClassValue } from "clsx"
import { get, has, isNil } from "lodash"

import { ChallengeDict, SolvedStatus } from "../../api/Challenge"


type DoorsUtilsBaseProps = {
  solvedStatus: SolvedStatus | undefined
  challenges: ChallengeDict | undefined
  prefetch: (door: number) => void
  navigateToDoor: (door: number) => void
}

type DoorsUtilsProps = DoorsUtilsBaseProps & {
  door: number
}

export type DoorsProps = DoorsUtilsBaseProps & {
  className?: ClassValue
}

// TODO: Figure out new door styles
export const getDoorStyleProps = ({ door, solvedStatus, challenges }: DoorsUtilsProps) => ({
  className: "text-green-600"
    // clsx("fill-current", get(solvedStatus, door)
    //   ? "text-lightbulb-green"
    //   : isNil(challenges) || !has(challenges, door)
    //     ? "text-lightbulb-dim"
    //     : "text-lightbulb-yellow"
    // )
})

export const getDoorTextStyleProps = ({ door, challenges }: DoorsUtilsProps) => ({
  className: clsx("text-gray-800", (isNil(challenges) || !has(challenges, door)) && "opacity-25" ),
  fontFamily: "'Arial'"
})

export const getDoorLinkProps = ({ door, challenges, prefetch, navigateToDoor }: DoorsUtilsProps) => ( {
  tabIndex: door + 3,
  title: `Luke ${door}`,
  ...(
    has(challenges, door)
      ? { to: `/luke/${door}`, onMouseEnter: () => prefetch(door) /*, onClick: () => navigateToDoor(door) */ }
      : { to: "/", className: "cursor-not-allowed" }
  )
})

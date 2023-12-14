import { getDay } from "date-fns"
import { memo } from "react"

import { ReactComponent as Wednesday } from "/assets/svgo/misc/wednesday.svg"

import { cl, getActiveYear } from "../utils"

import ExternalLink from "./ExternalLink"


const lastWednesdayDoor = 24 - ((getDay(new Date(getActiveYear(), 11, 24)) + 3) % 7) - 1
const WednesdayEasterEgg = ({ door, className }: { door: number, className?: string }) => {
  if (door !== lastWednesdayDoor)
    return null

  return (
    <ExternalLink
      href="https://youtu.be/1CH-7qjz4D4"
      aria-label="It is Wednesday, my dudes"
      title="It is Wednesday, my dudes"
      className={cl("opacity-0 hover:opacity-100 hover:animate-spin flex items-center", className)}
    >
      <Wednesday />
    </ExternalLink>
  )
}

export default memo(WednesdayEasterEgg)

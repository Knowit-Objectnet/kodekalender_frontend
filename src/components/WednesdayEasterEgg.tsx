import { getDay } from "date-fns"
import { AnchorHTMLAttributes, DetailedHTMLProps, FC, memo } from "react"

import { ReactComponent as Wednesday } from "/assets/svgo/misc/wednesday.svg"

import { cl, getActiveYear } from "../utils"

import ExternalLink from "./ExternalLink"

type WednesdayEasterEggProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  door: number
  className?: string
}

const lastWednesdayDoor = 24 - ((getDay(new Date(getActiveYear(), 11, 24)) + 3) % 7) - 1
const WednesdayEasterEgg: FC<WednesdayEasterEggProps> = ({ door, className, ...anchorProps }) => {
  if (door !== lastWednesdayDoor) return null

  return (
    <ExternalLink
      href="https://youtu.be/1CH-7qjz4D4"
      aria-label="It is Wednesday, my dudes"
      title="It is Wednesday, my dudes"
      className={cl("flex items-center", className)}
      {...anchorProps}
    >
      <Wednesday />
    </ExternalLink>
  )
}

export default memo(WednesdayEasterEgg)

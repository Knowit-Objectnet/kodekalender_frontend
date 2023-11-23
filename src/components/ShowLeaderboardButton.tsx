import { FC } from "react"
import { Link } from "react-router-dom"

import useIsRaffleStarted from "../hooks/useIsRaffleStarted"
import { usePrefetchLeaderboard } from "../api/requests"

import Button from "./Button"


type ShowLeaderboardButtonProps = {
  tabIndex: number
  setLeaderboardHidden: (val: boolean) => void
}

const ShowLeaderboardButton: FC<ShowLeaderboardButtonProps> = ({ tabIndex, setLeaderboardHidden }) => {
  const prefetchLeaderboard = usePrefetchLeaderboard()
  const raffleStarted = useIsRaffleStarted()

  if (!raffleStarted)
    return null

  return (<>
    {/* Link to separate page on mobile */}
    <Button className="hidden lg:inline" onMouseEnter={prefetchLeaderboard} onClick={() => setLeaderboardHidden(false)} tabIndex={tabIndex}>Ledertavle</Button>
    <Link className="lg:hidden" to="/leaderboard" tabIndex={tabIndex}>
      <Button onMouseEnter={prefetchLeaderboard}>Ledertavle</Button>
    </Link>
  </>)
}

export default ShowLeaderboardButton

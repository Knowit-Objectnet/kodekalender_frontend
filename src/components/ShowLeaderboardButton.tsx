import { FC, useContext } from "react"
import { Link } from "react-router-dom"

import useIsRaffleStarted from "../hooks/useIsRaffleStarted"
import { usePrefetchLeaderboard } from "../api/requests"
import { Maybe } from "../../types/utils_types"
import { AsidesContext } from "../AsidesContext"

import Button, { ButtonProps } from "./Button"


type ShowLeaderboardButtonProps = ButtonProps & {
  mobileButtonProps?: Maybe<ButtonProps>
}

const ShowLeaderboardButton: FC<ShowLeaderboardButtonProps> = ({ tabIndex, mobileButtonProps, ...buttonProps }) => {
  const { setShowLeaderboard } = useContext(AsidesContext)

  const prefetchLeaderboard = usePrefetchLeaderboard()
  const raffleStarted = useIsRaffleStarted()

  if (!raffleStarted)
    return null

  return (<>
    {/* Desktop button */}
    <Button
      className="hidden lg:inline"
      onMouseEnter={prefetchLeaderboard}
      onClick={() => setShowLeaderboard(true)}
      tabIndex={tabIndex}
      {...buttonProps}
    >
      Ledertavle
    </Button>

    {/* Mobile button */}
    <Link className="lg:hidden" to="/leaderboard" tabIndex={tabIndex}>
      <Button
        onMouseEnter={prefetchLeaderboard}
        {...mobileButtonProps}
      >
        Ledertavle
      </Button>
    </Link>
  </>)
}

export default ShowLeaderboardButton

import { FC } from "react"
import { Link } from "react-router-dom"
import { every, isEmpty, some } from "lodash-es"

import { useIsAdmin } from "../hooks/useIsAdmin"
import { usePrefetchLeaderboard, useServiceMessages } from "../api/requests"
import { cl, getActiveYear } from "../utils"
import useIsRaffleStarted from "../hooks/useIsRaffleStarted"

import SignInButton from "./SignInButton"
import Button from "./Button"
import SignOutButton from "./SignOutButton"
import ThemeButton from "./ThemeButton"
import { Header2 } from "./text"


const ServiceMessageBadge = () => {
  const { data: serviceMessages } = useServiceMessages()

  // No unresolved service messages, no badge shown
  if (every(serviceMessages, { resolved: true })) return null

  const classes = "absolute w-full h-full bg-red-600 rounded-full"

  return (
    <div className="absolute top-[-.2rem] right-[-.3rem] w-4 h-4">
      <span className={classes} />

      {/* Animate badge if there are any general service messages */}
      {some(serviceMessages, { resolved: false, door: null }) && <span className={`${classes} animate-ping`} />}
    </div>
  )
}

type HeaderProps = {
  setLeaderboardHidden: (state: boolean) => void
  className?: string
}

const PageHeader: FC<HeaderProps> = ({ setLeaderboardHidden, className }) => {
  const isAdmin = useIsAdmin()
  const { data: serviceMessages } = useServiceMessages()
  const prefetchLeaderboard = usePrefetchLeaderboard()
  const raffleStarted = useIsRaffleStarted()

  return (
    <header className="h-60 w-full px-20">
      <nav className="h-full flex flex-cols align-center gap-4 md:gap-16">
        <Link to="/" className="flex flex-col justify-center child:leading-none child:text-center" tabIndex={1}>
          <div className="font-bold">Kodekalender</div>
          <Header2 as="div">{getActiveYear()}</Header2>
        </Link>
        <div
          className={cl(
            `
              float-right
              mt-1
              md:mt-2
              w-full
              flex
              flex-col
              gap-4
              md:gap-16
              md:flex-row-reverse

              child:flex
              child:flex-row-reverse
              child:gap-8
              md:child:gap-16
              child:items-center
              child:flex-wrap
            `,
            className
          )}
        >
          <div className={cl({ hidden: import.meta.env.VITE_ENABLE_LIGHT_MODE !== "true" })}>
            <ThemeButton />
          </div>

          <div>
            <SignOutButton />
            <SignInButton />
          </div>

          <div>
            {raffleStarted && (<>
              {/* Link to separate page on mobile */}
              <Button className="hidden lg:inline" onMouseEnter={prefetchLeaderboard} onClick={() => setLeaderboardHidden(false)} tabIndex={2}>Ledertavle</Button>
              <Link className="lg:hidden" to="/leaderboard" tabIndex={2}>
                <Button onMouseEnter={prefetchLeaderboard}>Ledertavle</Button>
              </Link>
            </>)}

            {!isEmpty(serviceMessages) && (
              // Only show link to service messages if there are any
              <Link className="relative" to="/service_messages" tabIndex={3}>
                <Button content="Driftsmeldinger" />
                <ServiceMessageBadge />
              </Link>
            )}

            {isAdmin && (
              <>
                <Link to="/admin" title="Super secret admin pages">
                  <Button className="">Adminside</Button>
                  {/* <Button className="md:hidden"><FaLock /></Button> */}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default PageHeader

import { FC } from "react"
import { Link } from "react-router-dom"
import { every, isEmpty, some } from "lodash"
import clsx from "clsx"

import { useIsAdmin } from "../hooks/useIsAdmin"
import { usePrefetchLeaderboard, useServiceMessages } from "../api/requests"

import SignInButton from "./SignInButton"
import Button from "./Button"
import SignOutButton from "./SignOutButton"
import ThemeButton from "./ThemeButton"
import { getActiveYear } from "../utils"
import Header2 from "./text/Header2"


const ServiceMessageBadge = () => {
  const { data: serviceMessages } = useServiceMessages()

  // No unresolved service messages, no badge shown
  if (every(serviceMessages, { resolved: true })) return null

  const classes = "absolute w-full h-full bg-red-600 rounded-full"

  return (
    <div className="absolute top-[-.2rem] right-[-.3rem] w-4 h-4">
      <span className={classes} />

      {/* Animate badge if there are any general service messages */}
      {some(serviceMessages, { resolved: false, door: null }) && <span className={clsx(classes, "animate-ping")} />}
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

  return (
    <header>
      <nav className="p-8 flex flex-cols space-x-4 md:space-x-16">
        <Link to="/" className="flex flex-col child:leading-none child:text-center" tabIndex={1}>
          <div className="font-bold">Kodekalender</div>
          <Header2 as="div">{getActiveYear()}</Header2>
        </Link>
        <div
          className={clsx(
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
          <div>
            <ThemeButton />
          </div>

          <div>
            <SignOutButton />
            <SignInButton />
          </div>

          <div>
            {/* Link to separate page on mobile */}
            <Button className="hidden lg:inline" onMouseEnter={prefetchLeaderboard} onClick={() => setLeaderboardHidden(false)} tabIndex={2}>Ledertavle</Button>
            <Link className="lg:hidden" to="/leaderboard" tabIndex={2}>
              <Button onMouseEnter={prefetchLeaderboard}>Ledertavle</Button>
            </Link>

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

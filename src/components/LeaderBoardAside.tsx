import { FC, useCallback, useContext, useRef, useState } from "react"
import { Transition } from "@headlessui/react"

import { ReactComponent as Close } from "/assets/svgo/icons/close.svg"

import useOnClickOutside from "../hooks/useOnClickOutside"
import { AsidesContext } from "../AsidesContext"

import LeaderBoardContent from "./LeaderboardContent"
import { Header2 } from "./text"

const LeaderBoardAside: FC = () => {
  const { showLeaderboard, setShowLeaderboard } = useContext(AsidesContext)

  const clickableLeaderboardRef = useRef<HTMLDivElement>(null)
  const [hiddenTransitioning, setHiddenTransitioning] = useState(false)

  const closeHandlerWithTransition = useCallback(() => {
    setHiddenTransitioning(true)
    setTimeout(() => {
      setHiddenTransitioning(false)
      setShowLeaderboard(false)
    }, 300)
  }, [])

  useOnClickOutside(
    clickableLeaderboardRef,
    useCallback(() => {
      if (!clickableLeaderboardRef.current) return

      closeHandlerWithTransition()
    }, [closeHandlerWithTransition])
  )

  const closeBoard = () => {
    closeHandlerWithTransition()
  }

  if (!showLeaderboard && !hiddenTransitioning) return null

  return (
    <aside className="pointer-events-none fixed right-0 top-0 z-20 w-full overflow-hidden pt-14 sm:w-204 sm:pr-12">
      <Transition
        appear={true}
        show={!hiddenTransitioning}
        enter="transition duration-300"
        enterFrom="translate-x-full sm:translate-x-[calc(100%+6rem)]"
        enterTo="translate-x-0"
        leave="transition duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full sm:translate-x-[calc(100%+6rem)]"
      >
        <div
          className="pointer-events-auto relative rounded-md bg-purple-700 p-8 sm:rounded-xl"
          ref={clickableLeaderboardRef}
        >
          <Close
            className="absolute right-0 top-0 m-4 cursor-pointer fill-current"
            onClick={closeBoard}
          />
          <div className="h-48 pt-4 text-center text-2xl">
            <Header2>Snille barn</Header2>
            {/* <Flourish className="-mt-16 h-40 w-full rotate-2" /> */}
          </div>
          <div className="h-192 overflow-y-auto text-center xl:h-384">
            <LeaderBoardContent />
          </div>
        </div>
      </Transition>
    </aside>
  )
}

export default LeaderBoardAside

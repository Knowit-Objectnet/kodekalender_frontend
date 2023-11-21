import { FC, useCallback, useRef, useState } from "react"
import { Transition } from "@headlessui/react"

import { ReactComponent as Close } from "/assets/svg/icons/close.svg"

import useOnClickOutside from "../hooks/useOnClickOutside"

// import { ReactComponent as Flourish } from "./svg/pointsdecor.svg"
import LeaderBoardContent from "./LeaderboardContent"
import { Header2 } from "./text"


type LeaderBoardAsideProps = {
  hidden: boolean
  closeHandler: () => void
}

const LeaderBoardAside: FC<LeaderBoardAsideProps> = ({ hidden, closeHandler }) => {
  const clickableLeaderboardRef = useRef<HTMLDivElement>(null)
  const [hiddenTransitioning, setHiddenTransitioning] = useState(false)

  const closeHandlerWithTransition = useCallback(() => {
    setHiddenTransitioning(true)
    setTimeout(() => {
      setHiddenTransitioning(false)
      closeHandler()
    }, 300)
  }, [closeHandler])

  useOnClickOutside(clickableLeaderboardRef, useCallback(() => {
    if (!clickableLeaderboardRef.current) return

    closeHandlerWithTransition()
  }, [closeHandlerWithTransition]))

  const closeBoard = () => {
    closeHandlerWithTransition()
  }

  if (hidden && !hiddenTransitioning) return null

  return (
    <aside className="z-20 absolute top-0 right-0 pt-14 w-full sm:w-204 sm:pr-12 overflow-hidden pointer-events-none">
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
        <div className="bg-purple-700 relative p-8 rounded-md sm:rounded-xl pointer-events-auto" ref={clickableLeaderboardRef} >
          <Close className="fill-current absolute top-0 right-0 m-4 cursor-pointer" onClick={closeBoard} />
          <div className="h-48 pt-4 text-2xl text-center">
            <Header2>Snille barn</Header2>
            {/* <Flourish className="-mt-16 h-40 w-full rotate-2" /> */}
          </div>
          <div className="h-192 xl:h-384 text-center overflow-y-auto">
            <LeaderBoardContent />
          </div>
        </div>
      </Transition>
    </aside>
  )
}

export default LeaderBoardAside

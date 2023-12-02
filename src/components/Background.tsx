import { FC, memo, useContext, useMemo } from "react"
import Snowfall from "react-snowfall"

import { ReactComponent as Streetlamp } from "/assets/svgo/Streetlamp.svg"

import { Z_BACKGROUND_1, Z_BACKGROUND_2, Z_BACKGROUND_3, Z_BACKGROUND_4, Z_BACKGROUND_5, Z_SNOW_ATTR, cl } from "../utils"
import useIsRaffleStarted from "../hooks/useIsRaffleStarted"
import { OptionsContext } from "../OptionsContext"
import usePrefersReducedMotion from "../hooks/mediaQueries/usePrefersReducedMotion"


// Outermost container is fixed in screen space, has same size as screen, has no
// overflow
const BACKGROUND_WRAPPER_CLASSES = `
  fixed
  h-screen
  w-screen
  inset-0
  pointer-events-none
  overflow-visible
`

const BACKGROUND_ELEMENT_CONTAINER_CLASSES = `
  relative
  inline-block
  overflow-hidden

  w-full
  h-full

  before:content-['']
  before:absolute
`

/*
 * Lots of jank to make the tape extend to infinity and not flail about all over
 * the place when resized.
 */
const TAPE_CONTAINER_CLASSES = `
  ${BACKGROUND_ELEMENT_CONTAINER_CLASSES}

  before:drop-shadow-xl

  before:w-[500%]
  before:h-full
  before:translate-x-[-46%]

  before:bg-[url('/assets/svgo/Teip.svg')]
  before:bg-[length:1600px_80px]
  before:bg-repeat-x
`

const Background: FC = () => {
  const raffleStarted = useIsRaffleStarted()
  const { showSnow } = useContext(OptionsContext)
  const prefersReducedMotion = usePrefersReducedMotion()

  const content = useMemo(() => (<>
    {!raffleStarted && (<>
      {/* Streetlamp */}
      <div className={`${BACKGROUND_WRAPPER_CLASSES} absolute ${Z_BACKGROUND_5}`}>
        <Streetlamp
          className={`
          blur-[.3px]
          absolute
          left-1/2
          top-1/2
          origin-center
          translate-x-[calc(-50%-clamp(24rem,40vw,32rem))]
          translate-y-[-50%]
          h-[56.25rem]
        `} />
      </div>
    </>)}

    {/* Snow */}
    {(showSnow && !prefersReducedMotion) ? (
      <Snowfall
        speed={[0.2, 1.2]}
        wind={[-0.5, 1]}
        color="#f8f9fa"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          opacity: "0.8",
          zIndex: Z_SNOW_ATTR
        }}
      />
    ) : (
      <div className={cl(BACKGROUND_WRAPPER_CLASSES, `absolute ${Z_BACKGROUND_4}`)}>
        <div
          className={`
          ${BACKGROUND_ELEMENT_CONTAINER_CLASSES}
          before:blur-[1px]
          before:w-[300%]
          before:h-[1080px]
          before:bg-[url('/assets/svgo/Snow.svg')]
          before:bg-[length:1920px_1080px]
          before:bg-repeat-x
        `} />
      </div>
    )}


    {!raffleStarted && (<>
      {!showSnow && (
        <div className={cl(BACKGROUND_WRAPPER_CLASSES, `absolute ${Z_BACKGROUND_3}`)}>
          <div
            className={`
            ${BACKGROUND_ELEMENT_CONTAINER_CLASSES}
            before:blur-[1px]
            before:w-[300%]
            before:h-[1080px]
            before:bg-[url('/assets/svgo/GoldSnow.svg')]
            before:bg-[length:1920px_1080px]
            before:bg-repeat-x
          `} />
        </div>
      )}

      {/* Tape */}
      <div className={`${BACKGROUND_WRAPPER_CLASSES} ${Z_BACKGROUND_2}`}>
        <div
          className={`
          ${TAPE_CONTAINER_CLASSES}
          before:top-4
          before:translate-x-[-33%]
          before:origin-[calc(66%-40rem)_0%]
          before:rotate-[15deg]
        `} />
      </div>

      <div className={`${BACKGROUND_WRAPPER_CLASSES} ${Z_BACKGROUND_1}`}>
        <div
          className={`
          ${TAPE_CONTAINER_CLASSES}
          before:bottom-[clamp(0rem,12.5rem,calc(5vw+8.9rem))]
          before:bg-bottom
          before:origin-[calc(63%+30rem)_1000%]
          before:rotate-[-5deg]
          before:scale-x-[-1]
        `} />
      </div>
    </>)}
  </>), [raffleStarted, showSnow, prefersReducedMotion])

  return content
}

export default memo(Background)

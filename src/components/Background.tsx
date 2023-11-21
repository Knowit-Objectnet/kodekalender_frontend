import { FC } from "react"

import { ReactComponent as StreetLamp } from "/assets/svg/Streetlamp.svg"

import { cl } from "../utils"


type BackgroundProps = {
}

const BACKGROUND_WRAPPER_CLASSES = `
  fixed
  h-screen
  w-screen
  inset-0
  pointer-events-none
  overflow-hidden
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
 *
 * TODO: Revisit for mobile.
 */
const TAPE_CONTAINER_CLASSES = `
  ${BACKGROUND_ELEMENT_CONTAINER_CLASSES}

  before:w-[300%]
  before:h-full
  before:translate-x-[-33%]

  before:bg-[url('/assets/svg/Teip.svg')]
  before:bg-[length:1600px_80px]
  before:bg-repeat-x
`

const Background: FC<BackgroundProps> = () => (<>
  <div className={`${BACKGROUND_WRAPPER_CLASSES} z-[-5]`}>
    <StreetLamp
      className={`
        absolute
        left-1/2
        top-1/2
        origin-center
        translate-x-[calc(-50%-clamp(24rem,40vw,32rem))]
        translate-y-[-50%]
        h-[56.25rem]
      `}
    />
  </div>

  <div className={cl(BACKGROUND_WRAPPER_CLASSES, "absolute z-[-4]")}>
    <div
      className={`
        ${BACKGROUND_ELEMENT_CONTAINER_CLASSES}
        before:w-[500%]
        before:h-full
        before:bg-[url('/assets/img/Snø.png')]
        before:bg-[length:1280px_850px]
        before:bg-repeat-x
      `}
    />
  </div>

  <div className={cl(BACKGROUND_WRAPPER_CLASSES, "absolute z-[-3]")}>
    <div
      className={`
        ${BACKGROUND_ELEMENT_CONTAINER_CLASSES}
        before:w-[500%]
        before:h-full
        before:bg-[url('/assets/img/Gull.png')]
        before:bg-[length:1280px_850px]
        before:bg-repeat-x
      `}
    />
  </div>

  <div className={`${BACKGROUND_WRAPPER_CLASSES} z-[-2]`}>
    <div
      className={`
        ${TAPE_CONTAINER_CLASSES}
        z-[-2]
        before:top-4
        before:translate-x-[-33%]
        before:origin-[calc(66%-40rem)_0%]
        before:rotate-[15deg]
      `}
    />
  </div>

  <div className={`${BACKGROUND_WRAPPER_CLASSES} z-[-1]`}>
    <div
      className={`
        ${TAPE_CONTAINER_CLASSES}
        z-[-1]
        before:bottom-50
        before:bg-bottom
        before:origin-[calc(33%+30rem)_0%]
        before:rotate-[-5deg]
        before:scale-x-[-1]
      `}
    />
  </div>
</>)

export default Background

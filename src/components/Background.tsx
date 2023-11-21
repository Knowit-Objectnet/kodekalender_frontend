import { FC } from "react"


type BackgroundProps = {
}

const TAPE_WRAPPER_CLASSES = `
  absolute
  h-screen
  w-screen
  inset-0
  pointer-events-none
  overflow-hidden
  z-[-1]
`

/*
 * Lots of jank to make the tape extend to infinity and not flail about all over
 * the place when resized.
 *
 * TODO: Revisit for mobile.
 */
const TAPE_CONTAINER_CLASSES = `
  relative
  inline-block
  overflow-hidden

  w-full
  h-full

  before:content-['']
  before:absolute

  before:w-[300%]
  before:h-full
  before:translate-x-[-33%]

  before:bg-[url('/assets/svg/Teip.svg')]
  before:bg-[length:1600px_80px]
  before:bg-repeat-x
`

const Background: FC<BackgroundProps> = () => (<>
  <div className={TAPE_WRAPPER_CLASSES}>
    <div
      className={`
        ${TAPE_CONTAINER_CLASSES}
        before:top-4
        before:translate-x-[-33%]
        before:origin-[calc(66%-40rem)_0%]
        before:rotate-[15deg]
      `}
    />
  </div>
  <div className={TAPE_WRAPPER_CLASSES}>
    <div
      className={`
        ${TAPE_CONTAINER_CLASSES}
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

import { FC, memo } from "react"

import { Z_BACKGROUND_4, cl } from "../utils"


// Outermost container follows content scroll, has no overflow
const BACKGROUND_WRAPPER_CLASSES = `
  absolute
  inset-0
  pointer-events-none
  overflow-hidden
`

// Each element container is relative to allow for positioning while having an
// absolute positioned before-element that can be moved and transformed freely.
const BACKGROUND_ELEMENT_CONTAINER_CLASSES = `
  relative
  inline-block
  overflow-hidden

  w-full
  h-full

  before:content-['']
  before:absolute
`

const ContentBackground: FC = () => (<>
  {/* Snow */}
  <div className={cl(BACKGROUND_WRAPPER_CLASSES, Z_BACKGROUND_4)}>
    <div
      className={`
        ${BACKGROUND_ELEMENT_CONTAINER_CLASSES}
        before:top-[880px]
        before:blur-[1px]
        before:w-[300%]
        before:h-full
        before:bg-[url('/assets/svgo/SnowSmall.svg')]
        before:bg-[length:1920px_1080px]
        before:bg-repeat-y
      `} />
  </div>
</>)

export default memo(ContentBackground)

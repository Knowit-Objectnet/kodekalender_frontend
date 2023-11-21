import { FC } from "react"

import { cl } from "../utils"


type DividerProps = {
  bgClasses?: string
  textClasses?: string
  content?: string
}

const Divider: FC<DividerProps> = ({ bgClasses = "bg-gray/20", textClasses = "text-gray/40 bg-gray", content }) => (
  <div
    className={cl(
      "w-11/12 h-1 mx-auto rounded-full relative",
      bgClasses
    )}
  >
    {content && <span className={cl("absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-4", textClasses)}>{content}</span>}
  </div>
)

export default Divider

import { FC } from "react"

import { cl } from "../utils"

type DividerProps = {
  bgClasses?: string
  textClasses?: string
  content?: string
}

const Divider: FC<DividerProps> = ({
  bgClasses = "bg-gray/20",
  textClasses = "text-gray/40 bg-gray",
  content
}) => (
  <div className={cl("relative mx-auto h-1 w-11/12 rounded-full", bgClasses)}>
    {content && (
      <span
        className={cl(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4",
          textClasses
        )}
      >
        {content}
      </span>
    )}
  </div>
)

export default Divider

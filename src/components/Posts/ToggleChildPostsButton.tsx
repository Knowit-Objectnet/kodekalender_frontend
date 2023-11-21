import { FC } from "react"
import clsx from "clsx"
import { FaChevronDown } from "react-icons/fa"

import { numberString } from "../../utils"


type ToggleChildPostsButtonProps = {
  className?: string
  showChildPosts: boolean
  toggleShowChildPosts: () => void
  numChildPosts: number
}

const ToggleChildPostsButton: FC<ToggleChildPostsButtonProps> = ({ className, showChildPosts, toggleShowChildPosts, numChildPosts }) => {
  if (numChildPosts === 0) return null

  // TODO: Hover style
  return (
    <button className={clsx("space-x-4", className)} onClick={toggleShowChildPosts}>
      <span>
        {showChildPosts ? "Skjul" : "Vis"} {numberString(numChildPosts, true)} svar
      </span>
      <FaChevronDown
        className={clsx(
          "-mt-1 inline w-8 transition-all ease-out-cubic duration-300",
          showChildPosts && "-rotate-180"
        )}
      />
    </button>
  )
}

export default ToggleChildPostsButton

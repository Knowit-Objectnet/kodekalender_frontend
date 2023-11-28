import { FC } from "react"
import { FaChevronDown } from "react-icons/fa"

import { cl, numberString } from "../../utils"

type ToggleChildPostsButtonProps = {
  className?: string
  showChildPosts: boolean
  toggleShowChildPosts: () => void
  numChildPosts: number
}

const ToggleChildPostsButton: FC<ToggleChildPostsButtonProps> = ({
  className,
  showChildPosts,
  toggleShowChildPosts,
  numChildPosts
}) => {
  if (numChildPosts === 0) return null

  // TODO: Hover style
  return (
    <button
      className={cl("space-x-4", className)}
      onClick={toggleShowChildPosts}
    >
      <span>
        {showChildPosts ? "Skjul" : "Vis"} {numberString(numChildPosts, true)}{" "}
        svar
      </span>
      <FaChevronDown
        className={cl(
          "-mt-1 inline w-8 transition-all duration-300 ease-out-cubic",
          showChildPosts && "-rotate-180"
        )}
      />
    </button>
  )
}

export default ToggleChildPostsButton

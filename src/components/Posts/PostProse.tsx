import { FC } from "react"

import { cl } from "../../utils"

type PostProseProps = {
  html: string
  className?: string
}

const PostProse: FC<PostProseProps> = ({ html, className }) => (
  <div
    className={cl(
      "prose prose-sm md:prose max-w-none md:max-w-none break-words",
      className
    )}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export default PostProse

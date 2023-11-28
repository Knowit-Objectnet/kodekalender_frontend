import { FC } from "react"

import { cl } from "../../utils"

type PostProseProps = {
  html: string
  className?: string
}

const PostProse: FC<PostProseProps> = ({ html, className }) => (
  <div
    className={cl("prose prose-sm max-w-none break-words md:prose md:max-w-none", className)}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export default PostProse

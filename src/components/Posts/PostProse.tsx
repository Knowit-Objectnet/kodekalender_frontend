import clsx from "clsx"
import { FC } from "react"


type PostProseProps = {
  html: string
  className?: string
}

const PostProse: FC<PostProseProps> = ({ html, className }) => (
  <div
    className={clsx(
      "prose prose-sm md:prose max-w-none md:max-w-none break-words",
      className
    )}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export default PostProse

import { isNil } from "lodash-es"
import { FC } from "react"

import PostProse from "./PostProse"


type PostPreviewProps = {
  html: string | undefined
  isLoading: boolean
  className?: string
}

const PostPreview: FC<PostPreviewProps> = ({ html, isLoading, className }) => {
  if (isNil(html) && isLoading) return null
  if (isNil(html)) return <div>Her ser noe ut til å ha gått galt...</div>

  return <PostProse html={html} className={className} />
}

export default PostPreview

import { isNil } from "lodash-es"
import { FC } from "react"

import PostProse from "./PostProse"

type PostPreviewProps = {
  html: string | undefined
  isLoading?: boolean
  className?: string
  deleted?: boolean
}

const PostPreview: FC<PostPreviewProps> = ({ html, isLoading, className, deleted }) => {
  if (isNil(html) && isLoading) return null
  if (isNil(html)) return <div>Her ser noe ut til å ha gått galt...</div>
  if (deleted) return <p className="font-bold text-white">Slettet innlegg</p>

  return <PostProse html={html} className={className} />
}

export default PostPreview

import { FC } from "react"
import { find, some } from "lodash-es"

import { Post } from "../../api/Post"
import { useCreateLike, useDeleteLike, useLikes } from "../../api/requests"
import useIsOwnPost from "../../hooks/useIsOwnPost"
import { cl } from "../../utils"
import Icon from "../Icons/Icon"

type LikeProps = {
  post: Post
}

const LikeButton: FC<LikeProps> = ({ post }) => {
  const { mutate: createLike } = useCreateLike()
  const { mutate: deleteLike } = useDeleteLike()
  const { data: likes } = useLikes()

  const liked = some(likes, { post_uuid: post.uuid })
  const isOwnPost = useIsOwnPost(post)

  const likePost = () => {
    if (!liked && !isOwnPost) {
      createLike({ postUuid: post.uuid })
    }
  }

  const unlikePost = () => {
    const like = find(likes, { post_uuid: post.uuid })
    if (like) deleteLike(like)
  }

  return (
    <button
      className={cl(
        isOwnPost
          ? "cursor-default"
          : "cursor-pointer hover:child:text-red-500 hover:child:scale-[120%]",
        "flex gap-2 items-center"
      )}
      onClick={liked ? unlikePost : likePost}
    >
      <Icon name="heart" sm />
      <span className="!text-white">{post.likes}</span>
    </button>
  )
}

export default LikeButton

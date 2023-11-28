import { FC } from "react"
import { find, some } from "lodash-es"

import { ReactComponent as Favorite } from "/assets/svg/icons/heart.svg"

import { Post } from "../../api/Post"
import { useCreateLike, useDeleteLike, useLikes } from "../../api/requests"
import useIsOwnPost from "../../hooks/useIsOwnPost"
import { cl } from "../../utils"

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
    if (!liked && !isOwnPost) createLike({ postUuid: post.uuid })
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
          : "cursor-pointer hover:child:scale-[120%] hover:child:text-red-500",
        "inline-block space-x-1"
      )}
      onClick={liked ? unlikePost : likePost}
    >
      <Favorite
        className={cl(
          "-mt-2 inline-block w-6 fill-current transition duration-200 ease-out-cubic",
          post.likes > 0 ? "text-red-500" : "text-red-300"
        )}
      />
      <span className="!text-white">{post.likes}</span>
    </button>
  )
}

export default LikeButton

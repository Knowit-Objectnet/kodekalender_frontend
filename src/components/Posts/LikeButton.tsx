import { FC } from "react"
import { find, some } from "lodash"

import { ReactComponent as Favorite } from "../svg/heart.svg"
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
    if (!liked && !isOwnPost)
      createLike({ postUuid: post.uuid })
  }

  const unlikePost = () => {
    const like = find(likes, { post_uuid: post.uuid })
    if (like)
      deleteLike(like)
  }

  return (
    <button
      className={cl(
        isOwnPost ? "cursor-default" : "cursor-pointer hover:child:text-red-500 hover:child:scale-[120%]",
        "inline-block space-x-1"
      )}
      onClick={liked ? unlikePost : likePost}
    >
      <Favorite
        className={cl(
          "inline-block -mt-2 fill-current w-6 transition duration-200 ease-out-cubic",
            post.likes > 0 ? "text-red-500" : "text-red-300"
        )}
      />
      <span className="!text-white">{post.likes}</span>
    </button>
  )
}

export default LikeButton

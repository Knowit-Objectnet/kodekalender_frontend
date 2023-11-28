import { FC, memo } from "react"

import { cl, squish } from "../../utils"
import { ChildPost as ChildPostType } from "../../api"

import LikeButton from "./LikeButton"
import PostWrapper from "./PostWrapper"

const DELETE_CONFIRM = squish(`
  Er du sikker på at du vil slette innlegget ditt? Andre brukere kan se
  at det har vært et innlegg her, men forfatter og innhold blir slettet.
`)

type ChildPostProps = {
  post: ChildPostType
}

// XXX: Possibly broken text color
const ChildPost: FC<ChildPostProps> = ({ post }) => (
  <PostWrapper
    post={post}
    deleteConfirmText={DELETE_CONFIRM}
    // Imagine using some kind of Cascading Style Sheet to avoid
    // having to pass these variables around...
    wrapperClassName="bg-gray sm:p-4"
    contentClassName={cl("!mr-0", post.deleted && "!ml-0")}
  >
    {post.deleted ? (
      <div className="p-4 text-center font-light sm:p-8">
        <em>Slettet innlegg</em>
      </div>
    ) : (
      <footer>
        <div>
          <LikeButton post={post} />
        </div>
      </footer>
    )}
  </PostWrapper>
)

export default memo(ChildPost)

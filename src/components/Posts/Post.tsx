import { FC, memo } from "react"
import { map } from "lodash-es"

import { ParentPost } from "../../api/Post"
import useBooleanToggle from "../../hooks/useBooleanToggle"
import { squish } from "../../utils"
import AddChildPostButton from "../AddChildPostButton"
import SubscribeButton from "../SubscribeButton"

import LikeButton from "./LikeButton"
import ChildPostForm from "./ChildPostForm"
import ToggleChildPostsButton from "./ToggleChildPostsButton"
import PostWrapper from "./PostWrapper"
import ChildPost from "./ChildPost"

const DELETE_CONFIRM = squish(`
  Er du sikker på at du vil slette innlegget ditt? Dersom noen har svart
  på innlegget vil det fortsatt være synlig at det har vært et innlegg
  her, men forfatter og innhold blir fjernet.
`)

type PostProps = {
  post: ParentPost
  door: number
}

const Post: FC<PostProps> = ({ post, door }) => {
  const [showForm, toggleShowForm] = useBooleanToggle(false)
  const [showChildPosts, toggleShowChildPosts] = useBooleanToggle(true)

  return (
    <PostWrapper post={post} deleteConfirmText={DELETE_CONFIRM} className="grid gap-4">
      {post.deleted && (
        <div className="p-4 text-center font-light text-gray/80 sm:p-12">
          <em>Slettet innlegg</em>
        </div>
      )}
      <footer className="grid grid-cols-4">
        <div className="space-x-4 justify-self-start pl-4">
          {!post.deleted && (
            <>
              <LikeButton post={post} />
              <SubscribeButton post={post} className="-mt-2 align-middle text-sm" />
            </>
          )}
        </div>
        <div className="space-x-8 justify-self-end">
          <AddChildPostButton toggleShowForm={toggleShowForm} />
          <ToggleChildPostsButton
            showChildPosts={showChildPosts}
            toggleShowChildPosts={toggleShowChildPosts}
            numChildPosts={post.children.length}
          />
        </div>
      </footer>

      {/*
       * TODO: This looks pretty bad on mobile. Figure out way to fix.
       * useBreakPoint hook and show different elements entirely on different
       * media sizes?
       */}
      {showForm && (
        <ChildPostForm toggleShowForm={toggleShowForm} door={door} parent={post} className="my-8" />
      )}

      {showChildPosts && (
        <div className="min-w-0 space-y-4">
          {map(post.children, (child) => (
            <ChildPost key={child.uuid} post={child} />
          ))}
        </div>
      )}
    </PostWrapper>
  )
}

export default memo(Post)

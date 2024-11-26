import { FC, Fragment, useEffect } from "react"
import { map, trimStart } from "lodash-es"
import { useLocation } from "react-router-dom"

import { usePosts as useUserPosts } from "../../api/requests"
import { Header3 } from "../text"
import Divider from "../Divider"
import { LinkButton } from "../LinkButton"
import SubscribeButton from "../SubscribeButton"
import { useWhoami } from "../../api/users/requests"
import { cl } from "../../utils"

import { PostForm, Post } from "./PostForm"

type PostsSectionProps = {
  door: number
  usePosts?: typeof useUserPosts
  withoutInput?: boolean
}

const PostsSection: FC<PostsSectionProps> = ({
  door,
  usePosts = useUserPosts,
  withoutInput = false
}) => {
  const { data: posts } = usePosts(door)
  const { hash } = useLocation()

  useEffect(() => {
    if (!posts) return
    document
      .getElementById(trimStart(hash, "#"))
      ?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [hash, posts])

  if (!posts) return null

  return (
    <section className="grid justify-items-center">
      <div className="flex w-full flex-col gap-6">
        <div className="grid grid-cols-[1fr_auto_1fr]">
          <div />
          <Header3 as="h2" className="flex-1 text-center">
            {`Kommentarer (${posts.length})`}
          </Header3>
          <SubscribeButton door={door} className="place-self-center-end" />
        </div>
        <Divider bgClasses="w-full bg-purple-500" />
      </div>
      <NewCommentSection door={door} withoutInput={withoutInput} />
      <div className="flex w-full flex-col gap-12 overflow-x-hidden">
        {map(posts, (post) => (
          <Fragment key={post.uuid}>
            <Divider bgClasses={cl("w-full my-18 bg-purple-500", withoutInput && "h-0")} />
            <Post door={door} post={post} />
          </Fragment>
        ))}
      </div>
    </section>
  )
}

const NewCommentSection = ({
  door,
  withoutInput
}: Pick<PostsSectionProps, "door" | "withoutInput">) => {
  const { data: whoami } = useWhoami()
  if (!whoami?.username) {
    return (
      <div className="mt-8 flex flex-col gap-8">
        <p>Du må oppgi et brukernavn for å kunne delta i kommentarfeltet.</p>
        <LinkButton className="mx-auto" content="Rediger bruker" to="/users/edit" />
      </div>
    )
  } else if (!withoutInput) {
    return (
      <div className="mt-25 flex w-full items-start gap-6 overflow-hidden">
        <PostForm door={door} />
      </div>
    )
  }
  return null
}

export default PostsSection

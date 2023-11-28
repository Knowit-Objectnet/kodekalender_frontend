import { useState, useEffect, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import TextareaAutosize from "react-autosize-textarea/lib"

import { Post } from "../../api/Post"
import useIsOwnPost from "../../hooks/useIsOwnPost"
import { cl, getTimestamp } from "../../utils"
import Button from "../Button"
import {
  useDeletePost,
  usePostMarkdown,
  usePrefetchPostMarkdown,
  useUpdatePost
} from "../../api/requests"
import usePostPreviewState from "../../hooks/usePostPreviewState"
import { FCWithChildren } from "../../../types/utils_types"

import PostProse from "./PostProse"
import PostPreview from "./PostPreview"

type PostWrapperProps = {
  post: Post
  deleteConfirmText: string

  // classes passed on to children, intuitive at call site
  className?: string

  // classes for overriding style of post sections mostly to allow different
  // styling of child posts
  wrapperClassName?: string
  contentClassName?: string
  proseClassName?: string
}

const PostWrapper: FCWithChildren<PostWrapperProps> = ({
  post,
  deleteConfirmText,
  className,
  wrapperClassName,
  contentClassName,
  proseClassName,
  children
}) => {
  const timestamp = getTimestamp(post.created_at)
  const isOwnPost = useIsOwnPost(post)

  const [isEditing, setIsEditing] = useState(false)
  const { data: markdown, isLoading: isMarkdownLoading } = usePostMarkdown(
    post.uuid,
    { enabled: isEditing }
  )
  const prefetchMarkdown = usePrefetchPostMarkdown()

  const editFieldRef = useRef<HTMLTextAreaElement>(null)
  const [
    preview,
    previewHtml,
    previewLoading,
    togglePreview,
    updatePreviewContent
  ] = usePostPreviewState(editFieldRef)

  const { mutate: doUpdatePost, isLoading: isPostUpdating } = useUpdatePost()
  const { mutate: doDeletePost } = useDeletePost()

  const deletePost = useCallback(async () => {
    if (!window.confirm(deleteConfirmText)) return

    doDeletePost({ post })
  }, [deleteConfirmText, doDeletePost, post])

  const toggleEditing = useCallback(() => {
    setIsEditing((state) => !state)
  }, [setIsEditing])

  const { hash } = useLocation()
  const isDeepLinkedPost = hash === `#${post.uuid}`
  const scrollRef = useRef<HTMLElement>(null)

  // Scroll to deep linked post on mount
  useEffect(() => {
    if (!isDeepLinkedPost) return

    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const updatePost = () => {
    if (!editFieldRef.current) return

    doUpdatePost({
      post,
      content: editFieldRef.current.value,
      html: previewHtml
    })
    setIsEditing(false)
    togglePreview()
  }

  // TODO: Replace classname overrides with isChild
  return (
    <article
      id={post.uuid}
      ref={scrollRef}
      className={cl(
        "relative rounded-md bg-purple-500 px-4 py-8 md:px-4",
        isDeepLinkedPost && "ring-4 ring-inset ring-yellow-400",
        wrapperClassName
      )}
    >
      {!post.deleted && (
        <div className="absolute w-8 sm:w-16 lg:w-20 xl:w-avatar">
          <img
            className="flex w-full items-center justify-center rounded-full"
            src={post.author.avatar ?? ""} // TODO: Placeholder avatar
            alt="User avatar"
          />
        </div>
      )}
      <div
        className={cl("mx-8 sm:mx-16 lg:mx-20 xl:mx-avatar", contentClassName)}
      >
        <div className="relative px-2 sm:px-4 md:px-8">
          <div className="text-xl font-semibold">
            {!post.deleted && post.author.username}
          </div>

          <div className="absolute right-0 top-0 flex flex-row-reverse space-x-8 space-x-reverse">
            <time className="text-sm sm:text-base">{timestamp}</time>
            {!post.deleted && isOwnPost && !isEditing && (
              <div className="mt-1 space-x-8">
                <Button
                  sm
                  onClick={toggleEditing}
                  onMouseEnter={() => prefetchMarkdown(post.uuid)}
                >
                  Rediger
                </Button>
                <Button sm onClick={deletePost}>
                  Slett
                </Button>
              </div>
            )}
          </div>

          {/* XXX: Potentially broken colors */}
          {isEditing && !isMarkdownLoading && (
            <div className="my-8 space-y-4">
              {preview && (
                <PostPreview
                  html={previewHtml}
                  isLoading={previewLoading}
                  className="min-h-[5rem] w-full rounded-t border-b-2 border-white bg-gray p-4"
                />
              )}

              <TextareaAutosize
                autoFocus
                ref={editFieldRef}
                className={cl(
                  "min-h-40 block w-full rounded-t border-b-2 border-white bg-gray/30 p-4 text-sm outline-none md:text-base",
                  preview && "hidden"
                )}
                defaultValue={markdown}
              />

              <div className="flex justify-between">
                <Button
                  sm
                  onClick={() => setIsEditing(false)}
                  content="Avbryt"
                />

                <div className="space-x-8">
                  <Button
                    sm
                    disabled={isPostUpdating}
                    onClick={togglePreview}
                    onMouseEnter={updatePreviewContent}
                    content={preview ? "Rediger" : "Forhåndsvis"}
                  />
                  <Button
                    sm
                    disabled={isPostUpdating}
                    onClick={updatePost}
                    content="Lagre"
                  />
                </div>
              </div>
            </div>
          )}

          {!isEditing && !post.deleted && (
            <PostProse html={post.content} className="my-8 md:my-16" />
          )}

          <div className={className}>{children}</div>
        </div>
      </div>
    </article>
  )
}

export default PostWrapper

import {
  ComponentPropsWithRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react"
import TextareaAutosize from "react-textarea-autosize"
import { map } from "lodash-es"
import { Controller, useForm } from "react-hook-form"
import { Dialog } from "@headlessui/react"

import Button from "../Button"
import { cl, dateFormat } from "../../utils"
import { useCreatePost, useDeletePost, useUpdatePost } from "../../api/requests"
import usePostPreviewState from "../../hooks/usePostPreviewState"
import { useWhoami } from "../../api/users/requests"
import { ParentPost, Post as PostType } from "../../api"
import useBooleanToggle from "../../hooks/useBooleanToggle"
import useIsOwnPost from "../../hooks/useIsOwnPost"
import SubscribeButton from "../SubscribeButton"
import avatarFallback from "../../../assets/svgo/slettet.svg"

import PostPreview from "./PostPreview"
import LikeButton from "./LikeButton"

type PostFormProps = {
  post?: PostType
  door: number
  parent?: ParentPost
  onCancel?: VoidFunction
}

type PostFormValues = {
  content: string
}

type PostProps = {
  door: number
  post: PostType
  parent?: ParentPost
}

const PostButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithRef<"button">
>(({ className, ...props }, ref) => (
  <button
    className={cl(
      "disabled:text-purple-100 text-sm p-4 rounded-full hover:bg-purple-500 focus-within:bg-purple-500",
      className
    )}
    {...props}
    ref={ref}
  />
))

type UserAvatarProps = {
  avatar?: string
  deleted?: boolean
}

const UserAvatar = ({ avatar, deleted }: UserAvatarProps) => (
  <div className="w-24 max-w-24">
    <img
      className="flex w-full items-center justify-center rounded-full"
      src={deleted || !avatar ? avatarFallback : avatar}
      alt=""
    />
  </div>
)

export const Post = ({ door, post, parent }: PostProps) => {
  const [isEditing, toggleIsEditing] = useBooleanToggle(false)
  const [isAddingReply, toggleIsAddingReply] = useBooleanToggle(false)
  const [dialogOpen, toggleDialogOpen] = useBooleanToggle(false)
  const isOwnPost = useIsOwnPost(post)

  const { mutate: doDeletePost } = useDeletePost()

  const onDeletePost = useCallback(async () => {
    doDeletePost({ post })
    toggleDialogOpen()
  }, [doDeletePost, post, toggleDialogOpen])

  if (post.deleted && parent) return null

  return (
    <div className="flex flex-col">
      <article id={post.uuid} className="flex w-full items-start gap-6">
        <UserAvatar avatar={post.author.avatar ?? ""} deleted={post.deleted} />
        <div className="flex w-full flex-col overflow-hidden">
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              {!post.deleted && (
                <span className="text-md">{post.author.username}</span>
              )}
              <span className="text-purple-100 text-sm">
                {dateFormat(new Date(post.created_at), "long")}
              </span>
            </div>
            <div className="flex gap-6 items-center">
              {"children" in post ? <SubscribeButton post={post} /> : null}
              {!post.deleted && <LikeButton post={post} />}
            </div>
          </div>
          {isEditing ? (
            <PostForm post={post} door={door} onCancel={toggleIsEditing} />
          ) : (
            <PostPreview deleted={post.deleted} html={post.content} />
          )}
          <div className="flex justify-between">
            {!isEditing && (
              <div className="flex gap-4">
                {!parent && (
                  <PostButton
                    onClick={toggleIsAddingReply}
                    disabled={isAddingReply}
                  >
                    Svar
                  </PostButton>
                )}
                {!post.deleted && isOwnPost && (
                  <div className="flex gap-4">
                    <PostButton onClick={toggleIsEditing}>Rediger</PostButton>
                    <PostButton onClick={toggleDialogOpen}>Slett</PostButton>
                    <Dialog
                      open={dialogOpen}
                      onClose={toggleDialogOpen}
                      className="relative z-10"
                    >
                      <div className="fixed inset-0 bg-black/50" />
                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-purple-500 p-8 text-left align-middle shadow-xl transition-all flex flex-col gap-12">
                            <Dialog.Title>Slett kommentar</Dialog.Title>
                            <Dialog.Description>
                              Er du sikker på at du vil slette kommentaren din?
                            </Dialog.Description>
                            <div className="flex justify-end gap-4 text-white">
                              <Button onClick={toggleDialogOpen}>Avbryt</Button>
                              <Button onClick={onDeletePost}>Slett</Button>
                            </div>
                          </Dialog.Panel>
                        </div>
                      </div>
                    </Dialog>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
      <div className="w-full pl-32">
        {isAddingReply && (
          <div className="py-12 mt-12">
            <PostForm
              door={door}
              parent={"children" in post ? post : undefined}
              onCancel={toggleIsAddingReply}
            />
          </div>
        )}
        {!!("children" in post) && (
          <div className="mt-12">
            {map(post.children, (child) => (
              <Post key={child.uuid} door={door} post={child} parent={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const PostForm = ({ post, door, parent, onCancel }: PostFormProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const { data: whoami } = useWhoami()
  const { control, handleSubmit, formState, reset, trigger } = useForm({
    defaultValues: { content: post?.markdown_content ?? "" },
    mode: "all"
  })

  const [isPreview, previewHtml, previewLoading, togglePreview] =
    usePostPreviewState(inputRef)

  const createPostMutation = useCreatePost()
  const updatePostMutation = useUpdatePost()

  const labelledBy = useMemo(
    () => (formState.isValid ? undefined : "form-error"),
    [formState.isValid]
  )

  const onSubmit = useCallback(
    (data: PostFormValues) => {
      if (post) {
        updatePostMutation.mutate(
          { post, content: data.content },
          {
            onSuccess: () => {
              reset()
              onCancel?.()
            }
          }
        )
      } else {
        createPostMutation.mutate(
          { door, content: data.content, parent },
          {
            onSuccess: ({ uuid }) => {
              reset()
              if (parent) {
                onCancel?.()
              }
              window.location.href = `#${uuid}`
              document
                .getElementById(uuid)
                ?.scrollIntoView({ behavior: "smooth" })
            }
          }
        )
      }
    },
    [
      createPostMutation,
      door,
      onCancel,
      parent,
      post,
      reset,
      updatePostMutation
    ]
  )

  // Trigger validation on load and after successful submit
  useEffect(() => {
    trigger()
  }, [trigger, formState.isSubmitSuccessful])

  return (
    <div className="flex w-full gap-6">
      {!post && <UserAvatar avatar={whoami?.avatar ?? ""} />}
      <form
        className="w-full flex flex-col gap-4 overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isPreview ? (
          <div className="w-full overflow-hidden">
            <PostPreview
              html={previewHtml}
              className="min-h-[3.25rem]"
              isLoading={previewLoading}
            />
          </div>
        ) : (
          <div className="relative flex w-full items-center">
            <label className="sr-only" htmlFor="content">
              Legg igjen en kommentar
            </label>
            <Controller
              control={control}
              name="content"
              rules={{
                required: "Du må skrive noe før du kan kommentere"
              }}
              render={({ field: { ref, ...field } }) => (
                <TextareaAutosize
                  {...field}
                  ref={(e) => {
                    ref(e)
                    inputRef.current = e
                  }}
                  className="block w-full rounded-lg border-2 border-purple-500 bg-transparent p-4 outline-none prose prose-sm md:prose break-words resize-none !max-w-full"
                  aria-labelledby={labelledBy}
                  placeholder={
                    "Vi støtter markdown! Alle blokk-elementer krever en tom linje over og under."
                  }
                />
              )}
            />
            {!!labelledBy && (
              <div id="form-error" className="sr-only">
                {formState.errors.content?.message}
              </div>
            )}
          </div>
        )}
        <div className="flex gap-4 justify-end">
          <PostButton
            type="button"
            onClick={togglePreview}
            disabled={!!formState.errors.content?.message}
          >
            {isPreview ? "Rediger" : "Forhåndsvis"}
          </PostButton>
          {(post || !!parent) && (
            <PostButton type="button" onClick={onCancel}>
              Avbryt
            </PostButton>
          )}
          <PostButton
            type="submit"
            disabled={!formState.isDirty || !formState.isValid}
          >
            Lagre
          </PostButton>
        </div>
      </form>
    </div>
  )
}

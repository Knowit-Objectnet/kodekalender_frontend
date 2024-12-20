import { ComponentPropsWithRef, forwardRef, useCallback, useEffect, useMemo, useRef } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { map } from "lodash-es"
import { Controller, useForm } from "react-hook-form"
import { Dialog } from "@headlessui/react"
import { useNavigate } from "react-router-dom"

import Button from "../Button"
import { Z_MODAL, cl, dateFormat } from "../../utils"
import { useCreatePost, useDeletePost, useUpdatePost } from "../../api/requests"
import usePostPreviewState from "../../hooks/usePostPreviewState"
import { useWhoami } from "../../api/users/requests"
import { ParentPost, Post as PostType } from "../../api"
import useBooleanToggle from "../../hooks/useBooleanToggle"
import useIsOwnPost from "../../hooks/useIsOwnPost"
import SubscribeButton from "../SubscribeButton"
import { Avatar } from "../users/Avatar"

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

const PostButton = forwardRef<HTMLButtonElement, ComponentPropsWithRef<"button">>(
  ({ className, ...props }, ref) => (
    <button
      className={cl(
        "rounded-full p-4 text-sm focus-within:bg-purple-500 hover:bg-purple-500 disabled:text-purple-100",
        className
      )}
      {...props}
      ref={ref}
    />
  )
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
        <Avatar avatar={post.author.avatar ?? ""} deleted={post.deleted} />
        <div className="flex w-full flex-col overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span className="text-md font-bold">
                {post.deleted ? "Ukjent bruker" : post.author.username}
              </span>
              <span className="text-sm text-purple-100">
                {dateFormat(new Date(post.created_at), "long")}
              </span>
            </div>
            <div className="flex items-center gap-6">
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
                  <PostButton onClick={toggleIsAddingReply} disabled={isAddingReply}>
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
                      className={`relative ${Z_MODAL}`}
                    >
                      <div className="fixed inset-0 bg-black/50" />
                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Dialog.Panel className="flex w-full max-w-md transform flex-col gap-12 overflow-hidden rounded-2xl bg-purple-500 p-8 text-left align-middle shadow-xl transition-all">
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
          <div className="mt-12 py-12">
            <PostForm
              door={door}
              parent={"children" in post ? post : undefined}
              onCancel={toggleIsAddingReply}
            />
          </div>
        )}
        {!!("children" in post) && (
          <div className="mt-12 flex flex-col gap-12">
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

  const navigate = useNavigate()

  const [isPreview, previewHtml, previewLoading, togglePreview] = usePostPreviewState(inputRef)

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
              navigate(`#${uuid}`)
            }
          }
        )
      }
    },
    [createPostMutation, door, navigate, onCancel, parent, post, reset, updatePostMutation]
  )

  // Trigger validation on load and after successful submit
  useEffect(() => {
    trigger()
  }, [trigger, formState.isSubmitSuccessful])

  return (
    <div className="flex w-full gap-6">
      {!post && <Avatar avatar={whoami?.avatar ?? ""} />}
      <form
        className="flex w-full flex-col gap-4 overflow-hidden"
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
                  className="prose prose-sm block w-full !max-w-full resize-none break-words rounded-lg border-2 border-purple-500 bg-transparent p-4 outline-none md:prose"
                  aria-labelledby={labelledBy}
                  placeholder="Vi støtter markdown! Kodeblokker har syntax highlighting for de fleste språk."
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
        <div className="flex justify-end gap-4">
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
          <PostButton type="submit" disabled={!formState.isDirty || !formState.isValid}>
            Lagre
          </PostButton>
        </div>
      </form>
    </div>
  )
}

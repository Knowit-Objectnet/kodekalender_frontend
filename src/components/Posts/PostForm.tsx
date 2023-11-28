import { FC, useCallback, useRef, useState } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"
import { isNil } from "lodash-es"
import { Link } from "react-router-dom"

import Button from "../Button"
import { cl, squish } from "../../utils"
import { useCreatePost } from "../../api/requests"
import usePostPreviewState from "../../hooks/usePostPreviewState"
import { useWhoami } from "../../api/users/requests"

import PostPreview from "./PostPreview"

const FORM_PLACEHOLDER = squish(`
  Legg igjen en kommentar! Vi har støtte for markdown med
  syntax highlighting. Alle blokk-elementer (kode, lister,
  tabeller, etc.) krever en hel linje whitespace rundt seg.
`)

type PostFormProps = {
  door: number
}

const PostForm: FC<PostFormProps> = ({ door }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { data: whoami } = useWhoami()

  const { mutate: doCreatePost, isLoading } = useCreatePost()

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isDirty, setIsDirty] = useState(false)
  const setDirty = useCallback(() => setIsDirty(true), [setIsDirty])
  const [
    preview,
    previewHtml,
    previewLoading,
    togglePreview,
    updatePreviewContent
  ] = usePostPreviewState(inputRef)

  const createPost = async () => {
    if (!inputRef.current) return

    doCreatePost(
      { door, content: inputRef.current.value },
      {
        onSuccess: ({ uuid }) => {
          setIsSubmitted(true)
          window.location.href = `#${uuid}`
        }
      }
    )
  }

  if (isSubmitted) {
    return (
      <div className="grid w-192 place-content-center space-y-8 rounded-md bg-purple-500 px-16 py-8">
        <p className="text-center">Du finner kommentaren din nederst!</p>
        <Button
          onClick={() => {
            setIsSubmitted(false)
            setIsDirty(false)
          }}
          content="Legg igjen ny kommentar?"
        />
      </div>
    )
  }

  if (!whoami) return null

  if (isNil(whoami.username)) {
    return (
      <div className="grid w-192 place-content-center space-y-8 rounded-md bg-purple-500 px-16 py-8">
        <p className="text-center">
          Du må oppgi et brukernavn for å kunne delta i kommentarfeltet.
        </p>
        <Link className="mx-auto" to="/users/edit">
          <Button content="Rediger bruker" />
        </Link>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-end rounded-md bg-purple-500 px-8 pb-4 pt-8">
      {preview && (
        <PostPreview
          html={previewHtml}
          isLoading={previewLoading}
          className="min-h-[5rem] w-full rounded-b-none border-b-4 border-white pb-4"
        />
      )}

      {/* If this element is unmounted, we must restore the current value. Easier to just hide. */}
      <TextareaAutosize
        className={cl(
          "block h-40 w-full border-b-4 border-white bg-transparent p-0 pb-4 outline-none",
          preview && "hidden"
        )}
        ref={inputRef}
        onChange={setDirty}
        placeholder={FORM_PLACEHOLDER}
      />

      <div>
        {isDirty && (
          <Button
            className="font-medium"
            disabled={isLoading}
            onClick={togglePreview}
            onMouseEnter={updatePreviewContent}
            content={preview ? "Rediger" : "Forhåndsvis"}
          />
        )}
        <Button
          className="ml-8 cursor-pointer border-none bg-none p-8 font-medium uppercase"
          disabled={isLoading}
          onClick={createPost}
          value="Lagre"
          content="Kommenter"
        />
      </div>
    </div>
  )
}

export default PostForm

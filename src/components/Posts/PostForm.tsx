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
  const [preview, previewHtml, previewLoading, togglePreview, updatePreviewContent] = usePostPreviewState(inputRef)

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
      <div className="bg-purple-500 rounded-md px-16 py-8 w-192 space-y-8 grid place-content-center">
        <p className="text-center">Du finner kommentaren din nederst!</p>
        <Button onClick={() => { setIsSubmitted(false); setIsDirty(false) }} content="Legg igjen ny kommentar?" />
      </div>
    )
  }

  if (!whoami) return null

  if (isNil(whoami.username)) {
    return (
      <div className="bg-purple-500 rounded-md px-16 py-8 w-192 space-y-8 grid place-content-center">
        <p className="text-center">Du må oppgi et brukernavn for å kunne delta i kommentarfeltet.</p>
        <Link className="mx-auto" to="/users/edit">
          <Button content="Rediger bruker" />
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-purple-500 w-full rounded-md px-8 pt-8 pb-4 flex flex-col items-end">
      {preview && (
        <PostPreview
          html={previewHtml}
          isLoading={previewLoading}
          className="w-full min-h-[5rem] pb-4 rounded-b-none border-b-4 border-white"
        />
      )}

      {/* If this element is unmounted, we must restore the current value. Easier to just hide. */}
      <TextareaAutosize
        className={cl(
          "block w-full h-40 p-0 pb-4 outline-none bg-transparent border-b-4 border-white",
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
          className="bg-none border-none cursor-pointer ml-8 p-8 font-medium uppercase"
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

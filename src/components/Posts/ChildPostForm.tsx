import { FC, useCallback, useRef, useState } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"

import Button from "../Button"
import { useCreatePost } from "../../api/requests"
import { ParentPost } from "../../api"
import usePostPreviewState from "../../hooks/usePostPreviewState"
import { cl } from "../../utils"

import PostPreview from "./PostPreview"

type ChildPostFormProps = {
  toggleShowForm: () => void
  door: number
  parent: ParentPost
  className?: string
}

const ChildPostForm: FC<ChildPostFormProps> = ({ toggleShowForm, door, parent, className }) => {
  const { mutate: doCreatePost, isLoading } = useCreatePost()

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isDirty, setIsDirty] = useState(false)
  const setDirty = useCallback(() => setIsDirty(true), [setIsDirty])
  const [preview, previewHtml, previewLoading, togglePreview, updatePreviewContent] =
    usePostPreviewState(inputRef)

  const createPost = async () => {
    if (!inputRef.current) return

    doCreatePost({ door, parent, content: inputRef.current.value }, { onSuccess: toggleShowForm })
    toggleShowForm()
  }

  return (
    <div className={cl("space-y-4", className)}>
      {preview && (
        <PostPreview
          html={previewHtml}
          isLoading={previewLoading}
          className="min-h-[5rem] w-full rounded-t border-b-4 border-white bg-gray p-4"
        />
      )}

      <TextareaAutosize
        autoFocus
        ref={inputRef}
        className={cl(
          "block min-h-[5rem] w-full rounded-t border-b-4 border-white bg-gray p-4 text-base outline-none",
          preview && "hidden"
        )}
        onChange={setDirty}
        placeholder="Svar på kommentar"
      />

      <div className="flex justify-between">
        <Button sm onClick={toggleShowForm} content="Avbryt" />

        <div className="space-x-8">
          {isDirty && (
            <Button
              sm
              disabled={isLoading}
              onClick={togglePreview}
              onMouseEnter={updatePreviewContent}
              content={preview ? "Rediger" : "Forhåndsvis"}
            />
          )}
          <Button sm disabled={isLoading} onClick={createPost} content="Svar" />
        </div>
      </div>
    </div>
  )
}

export default ChildPostForm

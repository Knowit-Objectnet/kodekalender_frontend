import { useEffect, useRef, useState, FC } from "react"
import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { map, reject } from "lodash"
import SparkMD5 from "spark-md5"
import { FaTimes } from "react-icons/fa"
import { AxiosProgressEvent } from "axios"

import { AdminChallenge, AdminChallengePayload, File as ChallengeFile } from "../../api/admin/Challenge"
import Button from "../Button"
import { useCreateBlob, useUploadFile } from "../../api/admin/requests"
import useIsMounted from "../../hooks/useIsMounted"
import FormElementCustom from "../form/FormElementCustom"
import { cl, isPresent } from "../../utils"


type AttachmentsInputProps = {
  challenge: AdminChallenge
  setValue: UseFormSetValue<AdminChallengePayload>
  register: UseFormRegister<AdminChallengePayload>
  className?: string
}

let fileIdCounter = 0

const AttachmentsInput: FC<AttachmentsInputProps> = ({ challenge, register, setValue, className /*, register */ }) => {
  // Registers 'files' in form, otherwise useless
  register("files")

  const { mutateAsync: createBlob } = useCreateBlob()
  const { mutateAsync: uploadFile } = useUploadFile()

  // FileObjects is source of truth for form files
  const [fileObjects, setFileObjects] = useState<Array<ChallengeFile & { fileId: number }>>(map(challenge.files, (file) => ({ ...file, fileId: fileIdCounter++ })))
  useEffect(() => {
    setValue("files", map(fileObjects, "signed_id"))
  }, [setValue, fileObjects])

  const [fileProgress, setFileProgress] = useState<Record<number, { progress: number } | undefined>>({})

  const isMounted = useIsMounted()

  const handleFiles = async (inputFiles: FileList) => {
    await Promise.all(map(inputFiles, async (file) => {
      const fileId = fileIdCounter++
      setFileProgress((progress) => ({ ...progress, [fileId]: { progress: 0 } }))

      const payload = ({
        filename: file.name,
        content_type: file.type,
        byte_size: file.size,
        checksum: btoa(SparkMD5.ArrayBuffer.hash(await file.arrayBuffer(), true))
      })

      const { signed_id, direct_upload } = await createBlob({ blob: payload })
      if (!isMounted()) return

      setFileObjects((oldFileObjects) => [...oldFileObjects, { signed_id, filename: file.name, fileId }])

      const onUploadProgress = ({ loaded, total }: AxiosProgressEvent) => {
        if (!isMounted()) return

        if (isPresent(total))
          setFileProgress((progress) => ({ ...progress, [fileId]: { progress: loaded / total } }))
      }

      await uploadFile({ upload: { file, directUpload: direct_upload }, config: { onUploadProgress } })

      if (!isMounted()) return
      setFileProgress((progress) => ({ ...progress, [fileId]: { progress: 1 } }))
    }))
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cl("space-y-4", className)}>
      <FormElementCustom label="Filer" note="husk å dobbeltsjekke riktig filnavn i markdown">
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          multiple
          onChange={({ target: { files } }) => files && handleFiles(files)}
        />
        <Button
          className="block form-input"
          type="button"
          content="Velg filer..."
          onClick={() => fileInputRef.current?.click()}
        />
      </FormElementCustom>

      <div className="grid grid-cols-4 gap-4">
        {map(fileObjects, ({ filename, signed_id, fileId }) => {
          const progress = fileProgress[fileId]?.progress ?? 1

          return (
            <span
              key={signed_id}
              className="relative overflow-hidden p-2 border-2 rounded-md border-yellow-400 text-center"
            >
              {progress < 1 && (
                <div
                  style={{ width: `calc(${progress * 100}% + ${progress * 0.5}rem)` }}
                  className="absolute -top-2 -left-2 h-[calc(100%+.5rem)] bg-purple-400/20"
                />
              )}
              <span className="inline-block w-[calc(100%-1.5rem)] line-clamp-1">{filename}</span>
              <FaTimes
                className="absolute top-0 right-4 h-full w-6 cursor-pointer"
                onClick={() => setFileObjects((oldFileObjects) => reject(oldFileObjects, { signed_id }))}
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default AttachmentsInput

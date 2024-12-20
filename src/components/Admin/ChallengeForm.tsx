import { map, toString } from "lodash-es"
import { memo, useState, FC } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { useForm } from "react-hook-form"

import { AdminChallenge, AdminChallengePayload } from "../../api/admin/Challenge"
import { useChallengePreview } from "../../api/admin/requests"
import useAvailableDoors from "../../hooks/admin/useAvailableDoors"
import {
  cl,
  getDefaultActiveFrom,
  getDefaultActiveTo,
  getTimestampForInputField
} from "../../utils"
import Button from "../Button"
import Challenge from "../Door/Challenge"
import FormElement from "../form/FormElement"
import FormElementCustom from "../form/FormElementCustom"

import AttachmentsInput from "./AttachmentsInput"

type ChallengeFormProps = {
  challenge: AdminChallenge
  newForm?: boolean
  submit: (challenge: AdminChallengePayload) => void
}

const ChallengeForm: FC<ChallengeFormProps> = ({ challenge, newForm = false, submit }) => {
  const [preview, setPreview] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: {
      dirtyFields: { door: isDoorDirty }
    }
  } = useForm<AdminChallengePayload>({
    defaultValues: { ...challenge, files: map(challenge.files, "signed_id") }
  })

  const [challengePreview, setChallengePreview] = useState<AdminChallengePayload>()
  const { data: markdownPreview } = useChallengePreview(challengePreview, { enabled: preview })

  const togglePreview = () => {
    setPreview((state) => {
      setChallengePreview(state ? undefined : getValues())
      return !state
    })
  }

  const availableDoors = useAvailableDoors()

  // Selects are weird. Door is set to 1 on first render, even though `d` is given as default value.
  const door = watch("door")
  const activeFrom =
    challenge.active_from ?? getDefaultActiveFrom(isDoorDirty ? door : challenge.door)
  const activeTo = challenge.active_to ?? getDefaultActiveTo()

  return (
    <div className="space-y-16">
      <form
        className="space-y-8"
        onSubmit={handleSubmit((data) =>
          submit({ ...data, door: isDoorDirty ? door : challenge.door })
        )}
      >
        <div className="flex w-full justify-end gap-8">
          <Button type="submit">Lagre</Button>
          <Button type="button" className="uppercase" onClick={togglePreview}>
            {preview ? "Rediger" : "Forhåndsvisning"}
          </Button>
        </div>

        <div className={cl("grid grid-cols-3 gap-8", preview && "hidden")}>
          {newForm && (
            <FormElementCustom label="Luke" className="col-span-3">
              <select
                className="form-select block w-full text-black"
                defaultValue={availableDoors[0]}
                {...register("door", { required: true })}
              >
                {map(availableDoors, (door) => (
                  <option key={door} value={door} label={toString(door)} />
                ))}
              </select>
            </FormElementCustom>
          )}
          <FormElement
            label="Tittel"
            type="text"
            defaultValue={challenge.title}
            {...register("title", { required: true })}
          />
          <FormElement
            label="Forfatter"
            type="text"
            defaultValue={challenge.author}
            {...register("author", { required: true })}
          />
          <FormElement
            label="Svar"
            note="omringende whitespace blir ignorert"
            type="text"
            defaultValue={challenge.answer}
            {...register("answer", { required: true })}
          />

          <FormElement
            label="Aktiv fra"
            disabled
            type="datetime-local"
            value={getTimestampForInputField(activeFrom)}
          />
          <FormElement
            label="Aktiv til"
            disabled
            type="datetime-local"
            value={getTimestampForInputField(activeTo)}
          />

          <AttachmentsInput
            challenge={challenge}
            register={register}
            setValue={setValue}
            className="col-span-3"
          />

          <div className="col-span-3">
            <FormElementCustom
              label="Innhold"
              note="tittel-elementet blir erstattet med tittel fra over"
              className="col-span-3"
            >
              <TextareaAutosize
                className="form-textarea block w-full text-black"
                rows={5}
                defaultValue={challenge.markdown_content}
                {...register("markdown_content", { required: true })}
              />
            </FormElementCustom>
          </div>
        </div>
      </form>

      {preview && challengePreview && markdownPreview && (
        <Challenge
          withoutInput
          challenge={{ ...challengePreview, content: markdownPreview.html }}
        />
      )}
    </div>
  )
}

export default memo(ChallengeForm)

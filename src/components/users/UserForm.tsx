import { constant, forEach, join, pickBy, some } from "lodash-es"
import { FC, memo, useEffect, useId, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDebounce } from "use-debounce"

import { LoggedInWhoami } from "../../api"
import {
  SignUpParameters,
  UpdateUserParameters,
  useDeleteUser
} from "../../api/users/requests"
import { QueryError } from "../../axios"
import BasicPage from "../../pages/BasicPage"
import { cl, debug, squish } from "../../utils"
import Button from "../Button"
import CheckMark from "../checkmarks/CheckMark"
import FormElement from "../form/FormElement"
import FormElementCustom from "../form/FormElementCustom"
import FormError from "../form/FormError"
import NoteElements from "../form/NoteElements"
import FormInputElement from "../form/FormInputElement"
import OptInMarketingCheckboxes from "../form/OptInMarketingCheckboxes"
import FormGroup from "../form/FormGroup"
import SubmitButton from "../SubmitButton"


const DELETE_USER_CONFIRM = squish(`
  Er du sikker på at du vil slette brukeren din? Du vil ikke lenger være med i premietrekningen. Dette kan ikke reverseres.
`)

export const getOptInMarketingLabel = constant(
  "Samtykker du til at vi kan kontakte deg om jobbmuligheter etter konkurransen?"
)
export const getOptInMarketingNote = (editLater: boolean) =>
  `Vi ønsker å kunne kontakte deg om jobbmuligheter etter at konkurransen er over. Huk av for hvorvidt du ønsker å motta slik e-post.${
    editLater ? " Du kan endre dette senere." : ""
  }`

type UserFormProps = {
  user?: LoggedInWhoami
  // TODO: Here be dragons
  submit: (data: any, options?: any) => void
  submitError: QueryError<{
    errors: Record<keyof SignUpParameters, string[]>
  }> | null
  newForm?: boolean
}

const UserForm: FC<UserFormProps> = ({
  user,
  submit,
  submitError,
  newForm = false
}) => {
  const navigate = useNavigate()

  const formMethods = useForm<SignUpParameters>()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: {
      isSubmitting,
      isSubmitSuccessful,
      errors,
      isDirty,
      dirtyFields
    }
  } = formMethods

  const fileUploadId = useId()
  const optInMarketingId = useId()

  // Set default values from user object if is edit form. Defaultvalues directly
  // to useForm had some weirdness, so use reset instead. Might be a 2020-bug.
  useEffect(() => {
    if (newForm) return

    reset({
      email: user?.email ?? "",
      username: user?.username ?? "",
      opt_in_marketing: user?.has_answered_opt_in_marketing
        ? user?.opt_in_marketing
        : undefined
    })
    clearErrors()
  }, [newForm, user, reset, clearErrors])

  useEffect(() => {
    forEach(submitError?.errors, (messages, key) =>
      setError(key as any, { message: join(messages, ", ") })
    )
  }, [submitError, setError])

  const { mutate: doDeleteUser } = useDeleteUser()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const username = watch("username")
  const avatar = watch("avatar")
  const avatarUrl = watch("avatar_url")
  const [debouncedAvatarUrl] = useDebounce(avatarUrl, 500)

  const onSubmit = (data: UpdateUserParameters) => {
    debug("UserForm onSubmit")
    debug({ data })

    submit(
      // Submit only dirty data to avoid overwriting with null values
      newForm
        ? data
        : pickBy(
            data,
            (_value, key) =>
              dirtyFields[key as keyof UpdateUserParameters] === true
          )
    )
  }

  debug({ errors })

  const deleteUser = () => {
    if (window.confirm(DELETE_USER_CONFIRM)) {
      doDeleteUser(null, { onSuccess: () => navigate("/") })
    }
  }

  return (
    <BasicPage
      title={newForm ? "Ny bruker" : "Rediger bruker"}
      containerClassName={cl(
        "gap-6 mx-8 sm:mx-32 group",
        some(errors) && "errors"
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider {...formMethods}>
        <FormGroup error={errors.email} dirty={dirtyFields.email}>
          <FormElement
            required={newForm}
            autoFocus={newForm}
            label="E-post"
            note="Innlogging og kontakt ved premiering."
            type="email"
            {...register("email", { required: newForm })}
          />
        </FormGroup>

        {newForm && (
          <div className="grid grid-cols-[auto_auto_1fr] gap-4">
            <span>Jobber du i Knowit?</span>
            <NoteElements
              iconClassName="rotate-180 -left-2 -top-2" // Fake an exclmation-circle :)
              note="Knowit-ansatte kan dessverre ikke delta i premietrekningen. Vennligst bruk din Knowit-adresse ved registrering. Takk<3"
            />
          </div>
        )}

        <FormGroup error={errors.password} dirty={dirtyFields.password}>
          <FormElement
            required={newForm}
            label="Passord"
            note={!newForm ? "La være blank for å beholde passord" : undefined}
            type="password"
            {...register("password", { required: newForm })}
          />
        </FormGroup>

        <FormGroup
          error={errors.password_confirmation}
          dirty={dirtyFields.password_confirmation}
        >
          <FormElement
            required={newForm}
            label="Bekreft passord"
            type="password"
            {...register("password_confirmation", { required: newForm })}
          />
        </FormGroup>

        <FormGroup error={errors.username} dirty={dirtyFields.username}>
          <FormElement
            autoComplete="nickname"
            label="Brukernavn"
            note={squish(`
              Du kan oppgi brukernavn dersom du vil delta i komentarfeltet og være synlig i ledertavlen.${
                newForm ? "Du kan endre dette senere." : ""
              }
            `)}
            type="text"
            {...register("username")}
          />
          {/^.+@.+\..+$/.test(username ?? "") && (
            <FormError
              error={{
                type: "pattern",
                message:
                  "Dette ser ut som en e-postadresse! Er du sikker på at du mente å sette dette som brukernavn (synlig for alle)?"
              }}
            />
          )}
        </FormGroup>

        <FormGroup error={errors.avatar} dirty={dirtyFields.avatar}>
          <FormElementCustom htmlFor={fileUploadId} label="Profilbilde">
            <input
              id={fileUploadId}
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => {
                clearErrors("avatar")

                const file = e.target.files?.[0]
                if (!file) return

                if (file.size > 2 * 1024 * 1024) {
                  setError("avatar", { message: "for stort" })
                  return
                }

                setValue("avatar", file, { shouldDirty: true })
              }}
            />
            <Button
              className="font-normal"
              content={avatar ? avatar.name : "Velg bilde (maks 2MB)"}
              onClick={() => fileInputRef.current?.click()}
            />
          </FormElementCustom>
        </FormGroup>
        <FormGroup error={errors.avatar_url} dirty={dirtyFields.avatar_url}>
          <FormInputElement
            type="url"
            maxLength={256}
            placeholder="... eller oppgi URL"
            {...register("avatar_url")}
          />
          {(avatar || debouncedAvatarUrl || user?.avatar) && (
            <img
              className="w-avatar mt-6"
              src={
                debouncedAvatarUrl ||
                (avatar && URL.createObjectURL(avatar)) ||
                user?.avatar ||
                ""
              }
            />
          )}
        </FormGroup>

        <FormGroup
          error={errors.opt_in_marketing}
          dirty={dirtyFields.opt_in_marketing}
        >
          <FormElementCustom
            required={newForm}
            htmlFor={optInMarketingId}
            label={getOptInMarketingLabel()}
            note={getOptInMarketingNote(newForm)}
            noteDirection="bottom"
          >
            <OptInMarketingCheckboxes
              required
              id={optInMarketingId}
              className="float-left"
            />
          </FormElementCustom>
        </FormGroup>

        <div className="flex flex-col items-center gap-32">
          {!newForm &&
            isDirty &&
            !isSubmitting &&
            isSubmitSuccessful &&
            !submitError && (
              <CheckMark wrapperClassName="mx-auto w-32" message="Lagret!" />
            )}
          <SubmitButton
            disabled={!isDirty || isSubmitting}
            className=""
            content={newForm ? "Opprett bruker" : "Lagre"}
          />
          {!newForm && (
            <Button
              type="button"
              onClick={deleteUser}
              className="text-red-700"
              content="Slett bruker"
            />
          )}
        </div>
      </FormProvider>
    </BasicPage>
  )
}

export default memo(UserForm)

import { forEach, join, pickBy } from "lodash-es"
import { FC, memo, useEffect, useId, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDebounce } from "use-debounce"

import { LoggedInWhoami } from "../../api"
import { SignUpParameters, UpdateUserParameters, useDeleteUser } from "../../api/users/requests"
import { QueryError } from "../../axios"
import BasicPage from "../../pages/BasicPage"
import { squish } from "../../utils"
import Button from "../Button"
import CheckMark from "../checkmarks/CheckMark"
import FormElement from "../form/FormElement"
import FormElementCustom from "../form/FormElementCustom"
import FormError from "../form/FormError"
import NoteElements from "../form/NoteElements"
import FormInputElement from "../form/FormInputElement"
import OptInMarketingCheckboxes from "../form/OptInMarketingCheckboxes"


const DELETE_USER_CONFIRM = squish(`
  Er du sikker på at du vil slette brukeren din? Du vil ikke lenger være med i premietrekningen. Dette kan ikke reverseres.
`)

type UserFormProps = {
  user?: LoggedInWhoami
  submit: (data: any) => void
  submitError: QueryError<{ errors: Record<keyof SignUpParameters, string[]> }> | null
  newForm?: boolean
}

const UserForm: FC<UserFormProps> = ({ user, submit, submitError, newForm = false }) => {
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
    formState: { isSubmitting, isSubmitSuccessful, errors, isDirty, dirtyFields }
  } = formMethods

  const fileUploadId = useId()
  const optInMarketingId = useId()

  const optInMarketingValue = watch("opt_in_marketing")

  useEffect(() => {
    if (newForm) return

    reset({ email: user?.email ?? "", username: user?.username ?? "", opt_in_marketing: user?.opt_in_marketing ?? false})
    clearErrors()
  }, [newForm, user, reset, clearErrors])

  useEffect(() => {
    forEach(submitError?.errors, (messages, key) => setError(key as any, { message: join(messages, ", ") }))
  }, [submitError, setError])

  const { mutate: doDeleteUser } = useDeleteUser()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const username = watch("username")
  const avatar = watch("avatar")
  const avatarUrl = watch("avatar_url")
  const [debouncedAvatarUrl] = useDebounce(avatarUrl, 500)

  const onSubmit = (data: UpdateUserParameters) => {
    // A little hacky way to make yes/no required
    if (optInMarketingValue === undefined) {
      setError("opt_in_marketing", { message: "Du må velge enten Ja eller Nei" })
      return
    } else {
      clearErrors("opt_in_marketing")
    }

    submit(
      newForm
        ? data

        // Submit only dirty data to avoid overwriting with null values
        : pickBy(data, (_value, key) => dirtyFields[key as keyof UpdateUserParameters] === true)
    )
  }

  const deleteUser = () => {
    if (window.confirm(DELETE_USER_CONFIRM)) {
      doDeleteUser(null, { onSuccess: () => navigate("/") })
    }
  }

  return (
    <BasicPage title={newForm ? "Ny bruker" : "Rediger bruker"} containerClassName="gap-6 mx-32" onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        <div>
          <FormElement
            autoFocus={newForm}
            label="E-post"
            note="Innlogging og kontakt ved premiering."
            type="email"
            maxLength={128}
            {...register("email", { required: newForm })}
          />
          <FormError error={errors.email} />
        </div>

        {newForm && (
          <div className="grid grid-cols-[auto_auto_1fr] gap-4">
            <span>Jobber du i Knowit?</span>
            <NoteElements
              iconClassName="rotate-180 -left-2 -top-2" // Fake an exclmation-circle :)
              note="Du vil ikke kunne delta i premietrekningen. Vennligst registrer deg med Knowit-adresse."
            />
          </div>
        )}

        <div>
          <FormElement
            label="Passord"
            note={!newForm ? "La være blank for å beholde passord" : undefined}
            type="password"
            minLength={8}
            maxLength={128}
            {...register("password", { required: newForm })}
          />
          <FormError error={errors.password} />
        </div>

        <div>
          <FormElement
            label="Bekreft passord"
            type="password"
            minLength={8}
            maxLength={128}
            {...register("password_confirmation", { required: newForm })}
          />
          <FormError error={errors.password_confirmation} />
        </div>

        <div>
          <FormElement
            autoComplete="nickname"
            label="Brukernavn"
            note={squish(`
              Du kan oppgi brukernavn dersom du vil delta i komentarfeltet og være synlig i ledertavlen.${newForm && "Du kan endre dette senere."}
            `)}
            type="text"
            maxLength={30}
            {...register("username")}
          />
          <FormError error={errors.username} />
          {/^.+@.+\..+$/.test(username ?? "") && <FormError error={{ type: "pattern", message: "Dette ser ut som en e-postadresse! Er du sikker på at du mente å sette dette som brukernavn (synlig for alle)?" }} />}
        </div>

        <div>
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
            <FormError error={errors.avatar} />
          </FormElementCustom>
          <FormInputElement
            type="url"
            maxLength={256}
            placeholder="... eller oppgi URL"
            className="mt-2 form-input w-full"
            {...register("avatar_url")}
          />
          {(avatar || debouncedAvatarUrl || user?.avatar) && (
            <img className="w-avatar" src={debouncedAvatarUrl || (avatar && URL.createObjectURL(avatar)) || user?.avatar || ""} />
          )}
          <FormError error={errors.avatar_url} />
        </div>

        <div>
          <FormElementCustom
            htmlFor={optInMarketingId}
            label="Samtykke til at vi kan kontakte deg etter konkurransen"
            note={`Vi ønsker å kunne kontakte deg om jobbmuligheter etter at konkurransen er over. Huk av hvis du ønsker å motta slik e-post.${newForm && " Du kan endre dette senere."}`}
            noteDirection="bottom"
          >
            <OptInMarketingCheckboxes id={optInMarketingId} />
          </FormElementCustom>
        </div>

        <div className="flex flex-col items-center gap-32">
          {!newForm && isDirty && !isSubmitting && isSubmitSuccessful && !submitError && <CheckMark wrapperClassName="mx-auto w-32" message="Lagret!" />}
          <Button primary type="submit" disabled={!isDirty || isSubmitting} className="" content={newForm ? "Opprett bruker" : "Lagre"} />
          {!newForm && <Button type="button" onClick={deleteUser} className="text-red-700" content="Slett bruker" />}
        </div>
      </FormProvider>
    </BasicPage>
  )
}

export default memo(UserForm)

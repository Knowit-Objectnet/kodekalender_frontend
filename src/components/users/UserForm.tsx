import { Popover } from "@headlessui/react"
import { forEach, join, pickBy } from "lodash"
import { FC, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDebounce } from "use-debounce"

import { LoggedInWhoami } from "../../api"
import { SignUpParameters, UpdateUserParameters, useDeleteUser } from "../../api/users/requests"
import { QueryError } from "../../axios"
import UserPage from "../../pages/users/UserPage"
import { squish } from "../../utils"
import Button from "../Button"
import CheckMark from "../checkmarks/CheckMark"
import FormCustomCheckbox from "../form/FormCustomCheckbox"
import FormElement from "../form/FormElement"
import FormElementCustom from "../form/FormElementCustom"
import FormError from "../form/FormError"


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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors, isDirty, dirtyFields }
  } = useForm<SignUpParameters>()

  console.log(dirtyFields)


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
    <UserPage title={newForm ? "Ny bruker" : "Rediger bruker"} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormElement
          autoFocus={newForm}
          label="E-post"
          note="Innlogging og kontakt ved premiering."
          type="email"
          maxLength={128}
          className="w-full"
          {...register("email", { required: newForm })}
        />
        <FormError error={errors.email} />
        {newForm && (
          <Popover>
            <Popover.Button tabIndex={-1}>
              <div className="text-gray/30">
                Jobber du i Knowit?
              </div>
            </Popover.Button>
            <Popover.Panel className="bg-white rounded p-4">
              Du vil ikke kunne delta i premietrekningen. Vennligst registrer deg med Knowit-adresse.
            </Popover.Panel>
          </Popover>
        )}


        {newForm
          ? (
            <FormCustomCheckbox
              label="Jeg samtykker i å bli kontaktet for rekrutteringsformål i etterkant av konkurransen."
              val={optInMarketingValue}
              setValue={setValue}
            />
          )
          : (
            <FormElement
              label="Jeg samtykker i å bli kontaktet for rekrutteringsformål i etterkant av konkurransen."
              type="checkbox"
              {...register("opt_in_marketing")}
              labelClassName="mt-4"
            />
          )
        }
        <div className="text-opacity-60 text-gray-700">
          <em>Vi ønsker å kontakte deg om jobbmuligheter etter konkurransen er over. Huk av hvis du ønsker å motta mail om dette.{newForm && " Du kan endre dette senere."}</em>
        </div>
        <FormError error={errors.opt_in_marketing} />



        <FormElement
          label="Passord"
          note={!newForm ? "La være blank for å beholde passord" : undefined}
          type="password"
          minLength={8}
          maxLength={128}
          labelClassName="mt-8"
          className="w-full"
          {...register("password", { required: newForm })}
        />
        <FormError error={errors.password} />

        <FormElement
          label="Bekreft passord"
          type="password"
          minLength={8}
          maxLength={128}
          labelClassName="mt-8"
          className="w-full"
          {...register("password_confirmation", { required: newForm })}
        />
        <FormError error={errors.password_confirmation} />
      </div>


      <div className="!mt-24">
        <div className="text-gray/60">
          <em>Dersom du vil delta i kommentarfeltet.<br />Brukernavnet vises i kommentarfeltet og på ledertavlen.{newForm && " Du kan endre dette senere."}</em>
        </div>
        <FormElement
          autoComplete="nickname"
          label="Brukernavn"
          type="text"
          maxLength={30}
          labelClassName="mt-2"
          className="w-full"
          {...register("username")}
        />
        <FormError error={errors.username} />
        {/^.+@.+\..+$/.test(username ?? "") && <FormError error={{ type: "pattern", message: "Dette ser ut som en e-postadresse! Er du sikker på at du mente å sette dette som brukernavn (synlig for alle)?" }} />}

        <FormElementCustom label="Profilbilde" className="mt-8 w-full">
          <input
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
            className="block h-24 max-w-full line-clamp-1 form-input"
            type="button"
            content={avatar ? avatar.name : "Velg bilde (maks 2MB)"}
            onClick={() => fileInputRef.current?.click()}
          />
          <FormError error={errors.avatar} />
        </FormElementCustom>
        <input
          type="url"
          maxLength={256}
          placeholder="... eller oppgi URL"
          className="mt-2 form-input w-full"
          {...register("avatar_url")}
        />
        {(avatar || debouncedAvatarUrl || user?.avatar) && (
          <img className="my-4 w-avatar" src={debouncedAvatarUrl || (avatar && URL.createObjectURL(avatar)) || user?.avatar || ""} />
        )}
        <FormError error={errors.avatar_url} />
      </div>


      {!newForm && isDirty && !isSubmitting && isSubmitSuccessful && !submitError && <CheckMark wrapperClassName="mx-auto w-32" message="Lagret!" />}
      <Button type="submit" disabled={!isDirty || isSubmitting} className="mt-16 block mx-auto" content={newForm ? "Opprett bruker" : "Lagre"} />
      {!newForm && <Button type="button" onClick={deleteUser} className="mt-8 block mx-auto text-red-700" content="Slett bruker" />}
    </UserPage>
  )
}

export default UserForm

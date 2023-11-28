import { FC } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"

import {
  InitiateResetPasswordParameters,
  useInitiateResetPassword
} from "../../api/users/requests"
import FormElement from "../../components/form/FormElement"
import BasicPage from "../BasicPage"
import SubmitButton from "../../components/SubmitButton"

const LostPassword: FC = () => {
  const { search } = useLocation()
  const paramMatch = search.match(/email=(?<email>\S+)/)?.groups

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful }
  } = useForm<InitiateResetPasswordParameters>()
  const { mutate: resetPassword, error, isLoading } = useInitiateResetPassword()

  const onSubmit = (data: InitiateResetPasswordParameters) => {
    resetPassword(data)
  }

  if (isSubmitSuccessful && !isLoading && !error) {
    return (
      <BasicPage title="Glemt passord">
        <p className="text-center">Tilbakestillingsinstrukser sendt.</p>
        <p className="text-center">
          Dersom det finnes en konto med e-postadressen du oppga vil du snarlig
          få en e-post med instrukser for å tilbakestille ditt passord.
        </p>
      </BasicPage>
    )
  }

  return (
    <BasicPage
      title="Glemt passord"
      onSubmit={handleSubmit(onSubmit)}
      containerClassName="gap-16"
    >
      <FormElement
        autoFocus
        label="E-post"
        type="email"
        defaultValue={decodeURIComponent(paramMatch?.email ?? "")}
        className="w-full"
        {...register("email")}
      />

      <SubmitButton
        content="Send tilbakestillingsinstrukser"
        className="mx-auto"
      />
    </BasicPage>
  )
}

export default LostPassword

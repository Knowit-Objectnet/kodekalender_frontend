import { FC } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"

import { InitiateResetPasswordParameters, useInitiateResetPassword } from "../../api/users/requests"
import FormElement from "../../components/form/FormElement"
import Button from "../../components/Button"
import BasicPage from "../BasicPage"


const LostPassword: FC = () => {
  const { search } = useLocation()
  const paramMatch = search.match(/email=(?<email>\S+)/)?.groups

  const { register, handleSubmit, formState: { isSubmitSuccessful } } = useForm<InitiateResetPasswordParameters>()
  const { mutate: resetPassword, error, isLoading } = useInitiateResetPassword()

  const onSubmit = (data: InitiateResetPasswordParameters) => {
    resetPassword(data)
  }

  if (isSubmitSuccessful && !isLoading && !error) {
    return (
      <BasicPage title="Tilbakestillingsinstrukser sendt">
        <div className="text-center">
          Dersom det finnes en konto med e-postadressen du oppga vil du snarlig
          få en e-post med instrukser for å tilbakestille ditt passord.
        </div>
      </BasicPage>
    )
  }

  return (
    <BasicPage title="Glemt passord" onSubmit={handleSubmit(onSubmit)}>
      <FormElement
        autoFocus
        label="E-post"
        type="email"
        defaultValue={decodeURIComponent(paramMatch?.email ?? "")}
        className="w-full"
        {...register("email")}
      />

      <Button type="submit" content="Send tilbakestillingsinstrukser" />
    </BasicPage>
  )
}

export default LostPassword

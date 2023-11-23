import { forEach, join } from "lodash-es"
import { useEffect, FC } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"

import { ResetPasswordParameters, useResetPassword } from "../../api/users/requests"
import FormElement from "../../components/form/FormElement"
import Button from "../../components/Button"
import BasicPage from "../BasicPage"
import FormGroup from "../../components/form/FormGroup"


const ResetPassword: FC = () => {
  const { search } = useLocation()
  const paramMatch = search.match(/reset_password_token=(?<resetPasswordToken>\S+)/)?.groups

  const { register, handleSubmit, setValue, setError, formState: { errors, dirtyFields, isSubmitSuccessful } } = useForm<ResetPasswordParameters>()
  const { mutate: resetPassword, error, isLoading } = useResetPassword()
  useEffect(() => {
    forEach(error?.errors, (messages, key) => setError(key as any, { message: join(messages, ", ") }))
  }, [error, setError])

  useEffect(() => {
    setValue("reset_password_token", paramMatch?.resetPasswordToken ?? "")
  }, [setValue, paramMatch])

  const onSubmit = (data: ResetPasswordParameters) => {
    resetPassword(data)
  }

  if (isSubmitSuccessful && !isLoading &&!error) {
    return (
      <BasicPage title="Passord tilbakestilt">
        <div className="text-center">Du kan nå logge inn med ditt nye passord.</div>
      </BasicPage>
    )
  }

  return (
    <BasicPage title="Tilbakestill passord" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup error={errors.password} dirty={dirtyFields.password}>
        <FormElement
          label="Passord"
          type="password"
          {...register("password", { required: true })}
        />
      </FormGroup>

      <FormGroup error={errors.password_confirmation} dirty={dirtyFields.password_confirmation}>
        <FormElement
          label="Bekreft passord"
          type="password"
          {...register("password_confirmation", { required: true })}
        />
      </FormGroup>

      <Button type="submit" className="block mx-auto" content="Tilbakestill passord" />
    </BasicPage>
  )
}

export default ResetPassword

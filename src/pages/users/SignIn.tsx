import { FC } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { SignInParameters, useSignIn } from "../../api/users/requests"
import FormElement from "../../components/form/FormElement"
import BasicPage from "../BasicPage"
import SubmitButton from "../../components/SubmitButton"
import { LinkButton } from "../../components/LinkButton"


const SignIn: FC = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, getValues } = useForm<SignInParameters>()
  const { mutate: signIn, error } = useSignIn()

  const onSubmit = (data: SignInParameters) => {
    signIn(
      data,
      { onSuccess: () => navigate("/") }
    )
  }

  return (
    <BasicPage title="Logg inn" containerClassName="gap-24" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-200 mx-auto flex flex-col items-center gap-6">
        <FormElement
          autoFocus
          label="E-post"
          type="email"
          {...register("email", { required: true })}
        />
        <FormElement
          label="Passord"
          type="password"
          {...register("password", { required: true })}
        />

        {error && <div><em className="text-red-700">{error.error}</em></div>}

        <SubmitButton icon="sign-in" content="Logg inn" />
      </div>

      <div className="flex flex-wrap gap-6 md:gap-12 justify-center">
        <LinkButton to="/users/sign_up" name="edit" content="Ny bruker?" />
        <LinkButton
          to="/users/lost_password"
          name="mail"
          content="Glemt passord?"
          onClick={(e) => {
            e.preventDefault()
            const email = getValues("email") || ""
            navigate(`/users/lost_password?email=${email}`)
          }}
          />
      </div>
    </BasicPage>
  )
}

export default SignIn

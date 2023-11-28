import { FC } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { SignInParameters, useSignIn } from "../../api/users/requests"
import FormElement from "../../components/form/FormElement"
import Button from "../../components/Button"
import BasicPage from "../BasicPage"
import SubmitButton from "../../components/SubmitButton"

const SignIn: FC = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, getValues } = useForm<SignInParameters>()
  const { mutate: signIn, error } = useSignIn()

  const onSubmit = (data: SignInParameters) => {
    signIn(data, { onSuccess: () => navigate("/") })
  }

  return (
    <BasicPage title="Logg inn" containerClassName="gap-24" onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-auto flex w-full max-w-200 flex-col items-center gap-6">
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

        {error && (
          <div>
            <em className="text-red-700">{error.error}</em>
          </div>
        )}

        <SubmitButton icon="sign-in" content="Logg inn" />
      </div>

      <div className="flex justify-center gap-12">
        <Link to="/users/sign_up">
          <Button icon="edit" content="Ny bruker?" />
        </Link>
        <Link
          to="/users/lost_password"
          onClick={(e) => {
            const email = getValues("email") || ""
            const url = new URL(e.currentTarget.href)
            url.searchParams.set("email", email)
            e.currentTarget.href = url.toString()
          }}
        >
          <Button icon="mail" content="Glemt passord?" />
        </Link>
      </div>
    </BasicPage>
  )
}

export default SignIn

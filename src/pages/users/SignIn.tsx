import { FC } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { SignInParameters, useSignIn } from "../../api/users/requests"
import FormElement from "../../components/form/FormElement"
import Button from "../../components/Button"
import BasicPage from "../BasicPage"


const SignIn: FC = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, watch } = useForm<SignInParameters>()
  const { mutate: signIn, error } = useSignIn()

  const onSubmit = (data: SignInParameters) => {
    signIn(data, { onSuccess: () => navigate("/") })
  }

  const email = watch("email")

  return (
    <BasicPage title="Logg inn" containerClassName="gap-24" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-200 mx-auto flex flex-col items-center gap-6">
        <FormElement
          autoFocus
          label="E-post"
          type="email"
          {...register("email")}
        />
        <FormElement
          label="Passord"
          type="password"
          {...register("password")}
        />

        {error && <div><em className="text-red-700">{error.error}</em></div>}

        <Button primary type="submit" icon="sign-in" content="Logg inn" />
      </div>

      <div className="flex gap-12 justify-center">
        <Link to="/users/sign_up">
          <Button icon="edit" content="Ny bruker?" />
        </Link>
        <Link to={`/users/lost_password?email=${encodeURIComponent(email || "")}`}>
          <Button icon="mail" content="Glemt passord?" />
        </Link>
      </div>
    </BasicPage>
  )
}

export default SignIn

import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { SignUpParameters, useSignUp } from "../../api/users/requests"
import UserForm from "../../components/users/UserForm"


const SignUp: FC = () => {
  const navigate = useNavigate()

  const { mutateAsync: signUp, error } = useSignUp()

  const submit = (data: SignUpParameters) => {
    signUp(data, { onSuccess: () => navigate("/") })
  }

  return (
    <UserForm
      submit={submit}
      submitError={error}
      newForm
    />
  )
}

export default SignUp

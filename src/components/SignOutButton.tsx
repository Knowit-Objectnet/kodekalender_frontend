import { isNil } from "lodash-es"
import { FC, useContext, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"

import { useSignOut } from "../api/users/requests"
import { AuthContext } from "../AuthContext"

import Button, { ButtonProps } from "./Button"


const SignOutButton: FC<ButtonProps> = ({ onClick, ...buttonProps }) => {
  const navigate = useNavigate()

  const { isAuthenticated } = useContext(AuthContext)
  const { mutate: signOut } = useSignOut()

  if (!isAuthenticated) return null

  const onClickFunc = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!isNil(onClick)) onClick(e)
    if (window.confirm("Er du sikker på at du vil logge ut?"))
      signOut(null, { onSuccess: () => navigate("/") })
  }

  return (
    <Button
      onClick={(e) => onClickFunc(e)}
      icon="sign-out"
      content="Logg ut"
      {...buttonProps}
    />
  )
}

export default SignOutButton

import { FC, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { useSignOut } from "../api/users/requests"
import { AuthContext } from "../AuthContext"

import Button, { ButtonProps } from "./Button"

const SignOutButton: FC<ButtonProps> = (buttonProps) => {
  const navigate = useNavigate()

  const { isAuthenticated } = useContext(AuthContext)
  const { mutate: signOut } = useSignOut()

  if (!isAuthenticated) return null

  return (
    <Button
      onClick={() => {
        if (window.confirm("Er du sikker på at du vil logge ut?"))
          signOut(null, { onSuccess: () => navigate("/") })
      }}
      icon="sign-out"
      content="Logg ut"
      {...buttonProps}
    />
  )
}

export default SignOutButton

import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { useSignOut } from "../api/users/requests"
import { AuthContext } from "../AuthContext"

import Button from "./Button"


const SignOutButton = () => {
  const navigate = useNavigate()

  const { isAuthenticated } = useContext(AuthContext)
  const { mutate: signOut } = useSignOut()

  if (!isAuthenticated) return null

  return (
    <Button
      tabIndex={4}
      onClick={() => signOut(null, { onSuccess: () => navigate("/") })}
      content="Logg ut"
    />
  )
}

export default SignOutButton

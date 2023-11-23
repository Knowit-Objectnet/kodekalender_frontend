import { useContext } from "react"
import { Link } from "react-router-dom"

import { useWhoami } from "../api/users/requests"
import { AuthContext } from "../AuthContext"

import Button from "./Button"


const SignInButton = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { data: whoami } = useWhoami()

  const [to, icon, content] =
    isAuthenticated && whoami
      ? ["/users/edit", "user", "Min bruker"] as const
      : ["/users/sign_in", "sign-in", "Logg inn"] as const

  return (
    <Link to={to}>
      <Button icon={icon} content={content} />
    </Link>
  )
}

export default SignInButton

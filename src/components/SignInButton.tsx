import { useContext } from "react"
import { Link } from "react-router-dom"

import { useWhoami } from "../api/users/requests"
import { AuthContext } from "../AuthContext"

import Button from "./Button"


const SignInButton = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { data: whoami } = useWhoami()

  const to = isAuthenticated && whoami ? "/users/edit" : "/users/sign_in"
  const content = isAuthenticated && whoami?.username ? "Min bruker" : "Logg inn"

  return (
    <Link to={to}>
      <Button icon="user" content={content} />
    </Link>
  )
}

export default SignInButton

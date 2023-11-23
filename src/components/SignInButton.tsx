import { Link } from "react-router-dom"

import useAuthenticatedWhoami from "../hooks/useAuthenticatedWhoami"

import Button from "./Button"


const SignInButton = () => {
  const whoami = useAuthenticatedWhoami()

  const [to, icon, content] =
    whoami
      ? ["/users/edit", "user", whoami.username ?? "Min bruker"] as const
      : ["/users/sign_in", "sign-in", "Logg inn"] as const

  return (
    <Link to={to}>
      <Button icon={icon} content={content} />
    </Link>
  )
}

export default SignInButton

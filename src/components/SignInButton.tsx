import { FC } from "react"
import { Link } from "react-router-dom"

import useAuthenticatedWhoami from "../hooks/useAuthenticatedWhoami"

import Button, { ButtonProps } from "./Button"

const SignInButton: FC<ButtonProps> = (buttonProps) => {
  const whoami = useAuthenticatedWhoami()

  const [to, icon, content] = whoami
    ? (["/users/edit", "user", whoami.username ?? "Min bruker"] as const)
    : (["/users/sign_in", "sign-in", "Logg inn"] as const)

  return (
    <Link to={to}>
      <Button icon={icon} content={content} {...buttonProps} />
    </Link>
  )
}

export default SignInButton

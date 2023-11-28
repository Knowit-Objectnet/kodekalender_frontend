import { FC } from "react"
import { Link } from "react-router-dom"

import useAuthenticatedWhoami from "../hooks/useAuthenticatedWhoami"

import Button, { ButtonProps } from "./Button"

type SignInProps = {
  linkClass?: string
}

const SignInButton: FC<ButtonProps & SignInProps> = ({
  linkClass,
  ...rest
}) => {
  const whoami = useAuthenticatedWhoami()

  const [to, icon, content] = whoami
    ? (["/users/edit", "user", whoami.username ?? "Min bruker"] as const)
    : (["/users/sign_in", "sign-in", "Logg inn"] as const)

  return (
    <Link to={to} className={linkClass}>
      <Button icon={icon} content={content} {...rest} />
    </Link>
  )
}

export default SignInButton

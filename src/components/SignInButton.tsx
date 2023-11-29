import { forwardRef } from "react"
import { LinkProps } from "react-router-dom"

import useAuthenticatedWhoami from "../hooks/useAuthenticatedWhoami"

import { LinkButton } from "./LinkButton"

const SignInButton = forwardRef<HTMLAnchorElement, Omit<LinkProps, "to">>(
  (props, ref) => {
    const whoami = useAuthenticatedWhoami()

    const [to, icon, content] = whoami
      ? (["/users/edit", "user", whoami.username ?? "Min bruker"] as const)
      : (["/users/sign_in", "sign-in", "Logg inn"] as const)

    return (
      <LinkButton {...props} ref={ref} to={to} name={icon} content={content} />
    )
  }
)

export default SignInButton

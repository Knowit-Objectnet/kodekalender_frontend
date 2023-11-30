import { isNil } from "lodash-es"
import { forwardRef, MouseEventHandler, useContext } from "react"
import { LinkProps, useNavigate } from "react-router-dom"

import { useSignOut } from "../api/users/requests"
import { AuthContext } from "../AuthContext"

import { LinkButton } from "./LinkButton"

const SignOutButton = forwardRef<HTMLAnchorElement, Omit<LinkProps, "to">>(
  ({ onClick, ...buttonProps }, ref) => {
    const navigate = useNavigate()

    const { isAuthenticated } = useContext(AuthContext)
    const { mutate: signOut } = useSignOut()

    if (!isAuthenticated) return null

    const onClickFunc: MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (!isNil(onClick)) onClick(e)
      if (window.confirm("Er du sikker på at du vil logge ut?"))
        signOut(null, { onSuccess: () => navigate("/") })
    }

    return (
      <LinkButton
        onClick={onClickFunc}
        to=""
        name="sign-out"
        content="Logg ut"
        {...buttonProps}
        ref={ref}
      />
    )
  }
)

export default SignOutButton

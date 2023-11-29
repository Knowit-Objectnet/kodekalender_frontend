import { FC } from "react"
import { Link } from "react-router-dom"

import useAuthenticatedWhoami from "../hooks/useAuthenticatedWhoami"

import { ButtonProps } from "./Button"
import Icon from "./Icons/Icon"

type SignInProps = {
  linkClass?: string
}

const SignInButton: FC<ButtonProps & SignInProps> = ({ linkClass }) => {
  const whoami = useAuthenticatedWhoami()

  const [to, icon, content] = whoami
    ? (["/users/edit", "user", whoami.username ?? "Min bruker"] as const)
    : (["/users/sign_in", "sign-in", "Logg inn"] as const)

  return (
    <Link to={to} className={linkClass}>
      <div
        className={`
        flex 
        flex-row 
        items-center 
        gap-2
        
        bg-purple-700
        rounded-full
        px-12
        py-3
        
        hover:bg-purple-900 
        hover:ring 
        hover:ring-inset 
        hover:ring-purple-700 
        
        focus:outline-none 
        focus:ring 
        focus:ring-inset 
        focus:ring-purple-100 
        
        active:bg-purple-500
        `}
      >
        <Icon name={icon} />
        {content}
      </div>
    </Link>
  )
}

export default SignInButton

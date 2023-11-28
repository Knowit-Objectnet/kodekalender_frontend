import { useContext } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../AuthContext"
import { useWhoami } from "../api/users/requests"

import Button from "./Button"

const RegisterButton = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { data: whoami } = useWhoami()

  const [to, icon, content, disabled] =
    isAuthenticated && whoami
      ? (["", null, "Lykke til!", true] as const)
      : (["/users/sign_up", "edit", "Registrer deg", false] as const)

  if (disabled) return null

  return (
    <Link className="inline-block" to={to} aria-disabled={disabled}>
      <Button icon={icon} content={content} disabled={disabled} />
    </Link>
  )
}

export default RegisterButton

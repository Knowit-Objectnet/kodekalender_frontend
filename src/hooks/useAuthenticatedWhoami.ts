import { useContext } from "react"

import { AuthContext } from "../AuthContext"
import { useWhoami } from "../api/users/requests"

const useAuthenticatedWhoami = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { data: whoami } = useWhoami()

  if (!isAuthenticated || !whoami) return undefined

  return whoami
}

export default useAuthenticatedWhoami

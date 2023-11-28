import { createContext } from "react"

import { FCWithChildren } from "../types/utils_types"

import { useWhoami } from "./api/users/requests"

type AuthContextType = {
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false
})

export const AuthContextProvider: FCWithChildren = ({ children }) => {
  const { data: whoami } = useWhoami()

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!whoami && !whoami.is_guest }}
    >
      {children}
    </AuthContext.Provider>
  )
}

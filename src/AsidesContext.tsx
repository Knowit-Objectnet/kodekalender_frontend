import { constant, isFunction } from "lodash-es"
import { Dispatch, SetStateAction, createContext, useState } from "react"

import { FCWithChildren } from "../types/utils_types"

type AsidesContextType = {
  showLeaderboard: boolean
  showMenu: boolean
  setShowLeaderboard: Dispatch<SetStateAction<boolean>>
  setShowMenu: Dispatch<SetStateAction<boolean>>
}

export const AsidesContext = createContext<AsidesContextType>({
  showLeaderboard: false,
  showMenu: false,
  setShowLeaderboard: constant(undefined),
  setShowMenu: constant(undefined)
})

export const AsidesContextProvider: FCWithChildren = ({ children }) => {
  const [state, setState] = useState({
    showLeaderboard: false,
    showMenu: false
  })

  const contextValue: AsidesContextType = {
    ...state,
    setShowLeaderboard: (val_or_setter) => {
      if (isFunction(val_or_setter)) val_or_setter = val_or_setter(state.showLeaderboard)

      setState({ ...state, showLeaderboard: val_or_setter })

      return val_or_setter
    },
    setShowMenu: (val_or_setter) => {
      if (isFunction(val_or_setter)) val_or_setter = val_or_setter(state.showMenu)

      setState({ ...state, showMenu: val_or_setter })

      return val_or_setter
    }
  }

  return <AsidesContext.Provider value={contextValue}>{children}</AsidesContext.Provider>
}

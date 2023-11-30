import { constant, isFunction } from "lodash-es"
import { Dispatch, SetStateAction, createContext, useState } from "react"

import { FCWithChildren } from "../types/utils_types"


type OptionsContextType = {
  showSnow: boolean
  setShowSnow: Dispatch<SetStateAction<boolean>>
}

export const OptionsContext = createContext<OptionsContextType>({
  showSnow: true,
  setShowSnow: constant(undefined)
})

export const OptionsContextProvider: FCWithChildren = ({ children }) => {
  const [state, setState] = useState({ showSnow: true })

  const contextValue: OptionsContextType = {
    ...state,
    setShowSnow: (val_or_setter) => {
      if (isFunction(val_or_setter))
        val_or_setter = val_or_setter(state.showSnow)

      setState({ ...state, showSnow: val_or_setter })

      return val_or_setter
    }
  }

  return (
    <OptionsContext.Provider value={contextValue}>
      {children}
    </OptionsContext.Provider>
  )
}

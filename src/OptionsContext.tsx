import { isFunction, keys, pick } from "lodash-es"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "react"

import { FCWithChildren } from "../types/utils_types"

import { debug, guardPresent } from "./utils"
import usePrefersColorScheme from "./hooks/mediaQueries/usePrefersColorScheme"
import usePrefersReducedMotion from "./hooks/mediaQueries/usePrefersReducedMotion"

const LOCALSTORAGE_KEY = "knowit_kodekalender/options"

export const THEME_VALUES = ["light", "dark", "system"] as const
export const THEME_I18N = { light: "lyst", dark: "mørkt", system: "system" }
export type ThemeValues = (typeof THEME_VALUES)[number]

type OptionsContextValues = {
  showSnow: boolean

  // You can set the theme to "system", but it will always be "dark" or "light' when read back
  theme: Exclude<ThemeValues, "system">
  trueTheme: ThemeValues
}
type OptionsContextSettableValues = {
  showSnow: boolean
  theme: ThemeValues
}
type OptionsContextSetters = {
  setShowSnow: Dispatch<SetStateAction<boolean>>
  setTheme: Dispatch<SetStateAction<ThemeValues>>
}
type OptionsContextType = OptionsContextValues & OptionsContextSetters

const OPTIONS_CONTEXT_DEFAULT_VALUES: OptionsContextSettableValues = {
  showSnow: true,
  theme: "system"
}
const pickSafeOptionsKeys = (options: Record<string, unknown>) =>
  pick(options, keys(OPTIONS_CONTEXT_DEFAULT_VALUES))

// Danger danger: Cannot use this context outside of a provider
export const OptionsContext = createContext(undefined as unknown as OptionsContextType)

export const OptionsContextProvider: FCWithChildren = ({ children }) => {
  const [state, setState] = useState<OptionsContextSettableValues>(
    // Initialize options state with values from localStorage if present
    guardPresent(
      localStorage.getItem(LOCALSTORAGE_KEY),
      (options) => ({
        ...OPTIONS_CONTEXT_DEFAULT_VALUES,
        ...pickSafeOptionsKeys(JSON.parse(options))
      }),
      OPTIONS_CONTEXT_DEFAULT_VALUES
    )
  )

  /*
   * Creates a SetStationAction that acts on a single scoped value within a larger
   * state object. Behaves like a regular SetStateAction would, allowing for a
   * setter function or a plain value to set. Persists entire state to
   * localStorage on every change.
   */
  const createScopedPersistedSetter = useCallback(
    <K extends keyof OptionsContextSettableValues>(
      key: K
    ): Dispatch<SetStateAction<OptionsContextSettableValues[K]>> =>
      (value_or_setter) =>
        setState((state) => {
          const newValue = isFunction(value_or_setter)
            ? value_or_setter(state[key])
            : value_or_setter

          const newState = { ...state, [key]: newValue }
          const newStateJSON = JSON.stringify(pickSafeOptionsKeys(newState))

          debug(`Setting OptionsContext localStorage state to ${newStateJSON}`)
          localStorage.setItem(LOCALSTORAGE_KEY, newStateJSON)

          return newState
        }),
    [setState]
  )

  const [setShowSnow, setTheme] = useMemo(
    () => [createScopedPersistedSetter("showSnow"), createScopedPersistedSetter("theme")],
    [createScopedPersistedSetter]
  )

  const prefersReducedMotion = usePrefersReducedMotion()
  const [previousPrefersReducedMotion, setPreviousPrefersReducedMotion] =
    useState(prefersReducedMotion)
  useEffect(() => {
    // If the user changes their preference, toggle snow to reflect new preference
    if (prefersReducedMotion !== previousPrefersReducedMotion) setShowSnow(!prefersReducedMotion)

    setPreviousPrefersReducedMotion(prefersReducedMotion)
  }, [prefersReducedMotion, previousPrefersReducedMotion, setShowSnow])

  const prefersColorSchemeLight = usePrefersColorScheme({ query: "light", layoutEffect: true })

  const theme = useMemo(
    () =>
      state.theme === "system"
        ? import.meta.env.VITE_ENABLE_LIGHT_MODE === "true" && prefersColorSchemeLight
          ? "light"
          : "dark"
        : state.theme,
    [state.theme, prefersColorSchemeLight]
  )

  // Apply theme class to document for styling
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light")
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const contextValue: OptionsContextType = useMemo(
    () => ({
      showSnow: state.showSnow,
      setShowSnow,

      theme,
      trueTheme: state.theme,
      setTheme
    }),
    [state.showSnow, state.theme, setShowSnow, setTheme, theme]
  )

  return <OptionsContext.Provider value={contextValue}>{children}</OptionsContext.Provider>
}

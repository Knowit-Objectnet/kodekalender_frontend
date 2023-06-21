import { chain, has, split } from "lodash"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"


export const ANCHOR_VARS = { year: (s: string) => parseInt(s) } as const

export function getAnchorVar<N extends keyof typeof ANCHOR_VARS>(name: N): ReturnType<typeof ANCHOR_VARS[N]> | undefined
/* eslint-disable no-redeclare */
export function getAnchorVar<N extends keyof typeof ANCHOR_VARS, F extends ReturnType<typeof ANCHOR_VARS[N]>>(name: N, fallback: F): ReturnType<typeof ANCHOR_VARS[N]> | F
export function getAnchorVar<N extends keyof typeof ANCHOR_VARS, F extends ReturnType<typeof ANCHOR_VARS[N]>>(name: N, fallback?: F) {
  const value = window.sessionStorage.getItem(`anchor_vars/${name}`)

  if (value) {
    return ANCHOR_VARS[name](value)
  }

  return fallback
}

const useStoreAnchorVars = () => {
  const location = useLocation()

  useEffect(() => {
    chain(location.hash)
      .trimStart("#")
      .split("&")
      .map((parts) => split(parts, "="))
      .filter(([name]) => has(ANCHOR_VARS, name))
      .forEach(([name, value]) => {
        console.log(`Setting ${name} to ${value}`)
        window.sessionStorage.setItem(`anchor_vars/${name}`, value)
      })
      .value()
  }, [location.hash])
}

export default useStoreAnchorVars

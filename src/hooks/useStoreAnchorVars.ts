import { trimStart, split, filter, has, forEach } from "lodash-es"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { debug } from "../utils"

export const ANCHOR_VARS = {
  year: (s: string) => parseInt(s),
  debug: (s: string) => s === "true",
  raffle_started: (s: string) => s === "true"
} as const

export function getAnchorVar<N extends keyof typeof ANCHOR_VARS>(
  name: N
): ReturnType<(typeof ANCHOR_VARS)[N]> | undefined
/* eslint-disable no-redeclare */
export function getAnchorVar<
  N extends keyof typeof ANCHOR_VARS,
  F extends ReturnType<(typeof ANCHOR_VARS)[N]>
>(name: N, fallback: F): ReturnType<(typeof ANCHOR_VARS)[N]> | F
export function getAnchorVar<
  N extends keyof typeof ANCHOR_VARS,
  F extends ReturnType<(typeof ANCHOR_VARS)[N]>
>(name: N, fallback?: F) {
  const value = window.sessionStorage.getItem(`anchor_vars/${name}`)

  if (value) {
    return ANCHOR_VARS[name](value)
  }

  return fallback
}

const useStoreAnchorVars = () => {
  const location = useLocation()

  useEffect(() => {
    const hash = trimStart(location.hash, "#")
    const pairs = split(hash, "&")
    const validPairs = filter(pairs, (pair) => {
      const [name] = split(pair, "=")
      return has(ANCHOR_VARS, name)
    })

    forEach(validPairs, (pair) => {
      const [name, value] = split(pair, "=")
      debug(`Setting ${name} to ${value}`)
      window.sessionStorage.setItem(`anchor_vars/${name}`, value)
    })
  }, [location.hash])
}

export default useStoreAnchorVars

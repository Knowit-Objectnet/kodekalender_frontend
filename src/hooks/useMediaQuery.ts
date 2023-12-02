import { useEffect, useLayoutEffect, useState } from "react"


const getMatches = (query: string) => window.matchMedia(query).matches

export type UseMediaQueryOptions = {
  layoutEffect?: boolean
}
export const useMediaQuery = ({ query, layoutEffect = false }: { query: string } & UseMediaQueryOptions) => {
  const [matches, setMatches] = useState(getMatches(query))
  const effectFunc = layoutEffect ? useLayoutEffect : useEffect

  effectFunc(() => {
    const handleChange = () => setMatches(getMatches(query))

    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query, setMatches])

  return matches
}

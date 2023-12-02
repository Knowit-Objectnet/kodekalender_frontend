import { UseMediaQueryOptions, useMediaQuery } from "../useMediaQuery"


const usePrefersColorScheme = ({ query, ...options }: { query: "light" | "dark" } & UseMediaQueryOptions) => (
  useMediaQuery({ query: `(prefers-color-scheme: ${query})`, ...options })
)

export default usePrefersColorScheme

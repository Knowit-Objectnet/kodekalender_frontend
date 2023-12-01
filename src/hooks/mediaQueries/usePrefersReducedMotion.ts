import { UseMediaQueryOptions, useMediaQuery } from "../useMediaQuery"


const usePrefersReducedMotion = ({ query = true, ...options }: { query?: boolean } & UseMediaQueryOptions = {}) => (
  useMediaQuery({ query: "(prefers-reduced-motion: reduce)", ...options }) === query
)

export default usePrefersReducedMotion

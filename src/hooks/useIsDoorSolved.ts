import { Maybe } from "../../types/utils_types"
import { useSolvedStatus } from "../api/requests"
import { isPresent } from "../utils"

const useIsDoorSolved = (door: Maybe<number>) => {
  const { data } = useSolvedStatus({ enabled: isPresent(door) })

  return !!data && data[door!]
}

export default useIsDoorSolved

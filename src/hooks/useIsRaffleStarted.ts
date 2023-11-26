import { getRaffleStart } from "../utils"

import useCurrentTime from "./useCurrentTime"
import { getAnchorVar } from "./useStoreAnchorVars"


const RAFFLE_START = getRaffleStart()

const useIsRaffleStarted = () => {
  const currentTime = useCurrentTime()

  return getAnchorVar("raffle_started") || currentTime >= RAFFLE_START
}

export default useIsRaffleStarted

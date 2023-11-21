import { getRaffleStart } from "../utils"
import useCurrentTime from "./useCurrentTime"


const RAFFLE_START = getRaffleStart()

const useIsRaffleStarted = () => {
  const currentTime = useCurrentTime()

  return currentTime >= RAFFLE_START
}

export default useIsRaffleStarted

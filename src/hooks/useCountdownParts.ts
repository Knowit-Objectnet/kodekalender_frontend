import { intervalToDuration } from 'date-fns'

import { getRaffleStart } from "../utils"
import useCurrentTime from "./useCurrentTime"


type CountdownParts = [number, number, number, number]

const COUNTDOWN_TO = getRaffleStart()
const ZERO_COUNTDOWN_ARRAY: CountdownParts = [0, 0, 0, 0]

const useCountdownParts: () => CountdownParts = () => {
  const currentTime = useCurrentTime(1000)

  if (currentTime > COUNTDOWN_TO)
    return ZERO_COUNTDOWN_ARRAY

  const duration = intervalToDuration({ start: currentTime, end: COUNTDOWN_TO })
  return [duration.days ?? 0, duration.hours ?? 0, duration.minutes ?? 0, duration.seconds ?? 0]
}

export default useCountdownParts

import { useEffect, useState } from "react"


const useCurrentTime = (interval = 5000) => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), interval)
    return () => clearInterval(intervalId)
  }, [setDate, interval])

  return date
}

export default useCurrentTime

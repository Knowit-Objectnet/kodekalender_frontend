import { useCallback, useState } from "react"

const useToggleBgAnimationState = (): [boolean, () => void] => {
  const [value, setValue] = useState(localStorage.getItem("bg-animation-paused") === "true")

  const toggleValue = useCallback(() => {
    setValue((value) => {
      localStorage.setItem("bg-animation-paused", (!value).toString())
      return !value
    })
  }, [setValue])

  return [value, toggleValue]
}

export default useToggleBgAnimationState

import { forwardRef, useCallback, useContext } from "react"

import { OptionsContext } from "../OptionsContext"

import Button, { ButtonProps } from "./Button"


const ToggleAnimatedSnowButton = forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, ...buttonProps }, ref) => {
  const { showSnow, setShowSnow } = useContext(OptionsContext)

  const toggleSnow = useCallback(() => {
    setShowSnow((showSnow) => !showSnow)
  }, [setShowSnow])

  const [content, ariaContent] =
    showSnow
      ? ["Skru av snø", "Skru av animert snø"]
      : ["Skru på snø", "Skru på animert snø"]

  return (
    <Button
      ref={ref}
      icon="snow"

      onClick={(e) => { onClick?.(e); toggleSnow() }}

      content={content}
      aria-label={ariaContent}

      {...buttonProps}
    />
  )
})

export default ToggleAnimatedSnowButton

import { forwardRef, useCallback, useContext } from "react"

import { OptionsContext } from "../OptionsContext"

import Button, { ButtonProps } from "./Button"


const ToggleAnimatedSnowButton = forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, ...buttonProps }, ref) => {
  const { playSound, setPlaySound } = useContext(OptionsContext)

  const toggleSound = useCallback(() => {
    setPlaySound((playSound) => !playSound)
  }, [setPlaySound])

  const [content, ariaContent] = playSound
    ? ["Skru av lyd", "Skru av bakgrunnslyd"]
    : ["Skru på lyd", "Skru på bakgrunnslyd"]

  return (
    <Button
      ref={ref}
      icon="sound"

      onClick={(e) => { onClick?.(e); toggleSound() }}
      content={content}
      aria-label={ariaContent}

      {...buttonProps}
    />
  )
})

export default ToggleAnimatedSnowButton
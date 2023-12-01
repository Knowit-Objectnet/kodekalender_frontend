import { forwardRef, useCallback, useContext, useId } from "react"

import { OptionsContext } from "../OptionsContext"
import usePrefersReducedMotion from "../hooks/mediaQueries/usePrefersReducedMotion"

import Button, { ButtonProps } from "./Button"


const ToggleAnimatedSnowButton = forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, ...buttonProps }, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { showSnow, setShowSnow } = useContext(OptionsContext)

  const toggleSnow = useCallback(() => {
    setShowSnow((showSnow) => !showSnow)
  }, [setShowSnow])

  const [content, ariaContent] =
    (showSnow && !prefersReducedMotion)
      ? ["Skru av snø", "Skru av animert snø"]
      : ["Skru på snø", "Skru på animert snø"]

  const description =
    prefersReducedMotion
      ? "Animasjoner er satt til redusert i operativsystemet ditt. Skru av dette for å kunne se nydelig animert snø ☃️."
      : ""

  const id = useId()

  return (
    <>
      <Button
        ref={ref}
        icon="snow"

        onClick={(e) => { onClick?.(e); toggleSnow() }}
        disabled={prefersReducedMotion}

        content={content}
        title={description}
        aria-label={ariaContent}
        aria-describedby={description ? id : undefined}

        {...buttonProps}
      />
      {description && <span id={id} className="sr-only">{description}</span>}
    </>
  )
})

export default ToggleAnimatedSnowButton

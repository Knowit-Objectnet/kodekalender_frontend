import { indexOf, upperFirst } from "lodash-es"
import { forwardRef, useCallback, useContext } from "react"

import { OptionsContext, THEME_I18N, THEME_VALUES, ThemeValues } from "../OptionsContext"

import Button, { ButtonProps } from "./Button"


const getNextTheme = (theme: ThemeValues[number]) => THEME_VALUES[(indexOf(THEME_VALUES, theme) + 1) % THEME_VALUES.length]

const ThemeButton = forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, ...buttonProps }, ref) => {
  const { trueTheme, setTheme } = useContext(OptionsContext)

  const switchTheme = useCallback(() => {
    setTheme(getNextTheme(trueTheme))
  }, [trueTheme, setTheme])

  return (
    <Button
      ref={ref}
      onClick={(e) => { onClick?.(e); switchTheme() }}
      {...buttonProps}
    >
      {upperFirst(THEME_I18N[getNextTheme(trueTheme)])} tema
    </Button>
  )
})

export default ThemeButton

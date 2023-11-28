import { FC, useCallback, useState } from "react"

import Button, { ButtonProps } from "./Button"

const INITIAL_THEME_IS_LIGHT =
  localStorage.theme === "light" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: light)").matches)

const ThemeButton: FC<ButtonProps> = (buttonProps) => {
  const [themeIsLight, setThemeIsLight] = useState(INITIAL_THEME_IS_LIGHT)

  const switchTheme = useCallback(() => {
    const newThemeIsLight = !themeIsLight

    setThemeIsLight(newThemeIsLight)

    localStorage.theme = newThemeIsLight ? "light" : "dark"

    document.documentElement.classList.toggle("light", newThemeIsLight)
    document.documentElement.classList.toggle("dark", !newThemeIsLight)
  }, [themeIsLight, setThemeIsLight])

  return (
    <Button onClick={switchTheme} {...buttonProps}>
      {themeIsLight ? "Dark mode" : "Light mode"}
    </Button>
  )
}

export default ThemeButton

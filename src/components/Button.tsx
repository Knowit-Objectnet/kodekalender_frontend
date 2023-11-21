import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react"

import { cl } from "../utils"

import Icon, { IconProps } from "./Icons/Icon"


type HTMLButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type ButtonProps = Omit<HTMLButtonProps, "content"> & {
  content?: ReactNode
  disabled?: boolean
  sm?: boolean
  icon?: IconProps["name"]
  className?: string
}

const Button: FC<ButtonProps> = ({
  content,
  disabled,
  sm = false,
  icon,
  children,
  className,
  ...restProps
}) => (
  <button
    className={cl(
      `
        bg-purple-700
        hover:bg-purple-900
        active:bg-purple-500
        focus:outline-none
        focus:ring
        focus:ring-purple-100

        px-12
        py-3

        rounded-full

        font-bold
        whitespace-nowrap
        align-middle
      `,
      sm && "sm:text-sm",
      disabled && "text-opacity-30",
      className
    )}
    disabled={disabled}
    {...restProps}
  >
    {icon && (<>
      <Icon name={icon} className="mr-3" />
    </>)}
    {content ?? children}
  </button>
)

export default Button

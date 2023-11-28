import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react"

import { cl } from "../utils"
import { Nullable } from "../../types/utils_types"

import Icon, { IconProps } from "./Icons/Icon"

type HTMLButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export type ButtonProps = Omit<HTMLButtonProps, "content"> & {
  content?: ReactNode
  disabled?: boolean
  sm?: boolean
  primary?: boolean
  icon?: Nullable<IconProps["name"]>
  className?: string
}

const Button: FC<ButtonProps> = ({
  content,
  disabled,
  sm = false,
  primary = false,
  icon,
  children,
  className,
  type = "button",
  ...restProps
}) => (
  <button
    className={cl(
      `
        whitespace-nowrap

        rounded-full
        bg-purple-700

        px-12

        py-3
        align-middle
        font-bold
      `,
      !disabled &&
        `
        hover:bg-purple-900
        hover:ring
        hover:ring-purple-700

        focus:outline-none

        focus:ring
        focus:ring-purple-100
        active:bg-purple-500
      `,
      disabled &&
        `
        text-white/30
      `,
      sm &&
        `
        px-8
        py-2
        sm:text-sm
      `,
      { "bg-purple-600": primary },
      className
    )}
    disabled={disabled}
    type={type}
    {...restProps}
  >
    {icon && (
      <>
        <Icon name={icon} className={cl("mr-3", sm && "mr-2 h-10 w-10")} />
      </>
    )}
    {content ?? children}
  </button>
)

export default Button

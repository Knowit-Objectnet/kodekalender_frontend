import { ReactNode, forwardRef } from "react"
import { Link, LinkProps } from "react-router-dom"

import { cl } from "../utils"

import Icon, { IconProps } from "./Icons/Icon"

type Props = {
  to: string
  name?: IconProps["name"]
  external?: boolean
  content: ReactNode
}

export const LinkButton = forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "content" | "omit"> & Props
>(({ to, name, content, className, external = false, ...rest }, ref) => (
  <Link
    to={to}
    rel={external ? "noopener noreferrer" : ""}
    target={external ? "_blank" : "_self"}
    {...rest}
    ref={ref}
    className={cl(
      `
      flex
      flex-row
      items-center
      gap-3

      whitespace-nowrap
      rounded-full
      bg-purple-700
      px-12

      py-3
      hover:bg-purple-900
      hover:ring
      hover:ring-inset

      hover:ring-purple-700
      focus:outline-none
      focus:ring
      focus:ring-inset

      focus:ring-purple-100
      active:bg-purple-500
`,
      className
    )}
  >
    {name && <Icon name={name} className="h-10 w-10" />}
    {content}
  </Link>
))

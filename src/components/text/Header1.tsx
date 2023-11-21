import clsx from "clsx"
import { ElementType, HTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"


type Header1Props = HTMLAttributes<HTMLHeadingElement> & {
  as?: ElementType
}

const Header1: FCWithChildren<Header1Props> = ({ children, className, as = "h1", ...rest }) => {
  const Component = as

  return (
    <Component
      className={clsx("font-['Twinkle_Star'] text-2xl tracking-[0.03475rem]", className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Header1

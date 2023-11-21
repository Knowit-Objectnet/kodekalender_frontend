import clsx from "clsx"
import { ElementType, HTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"


type Header4Props = HTMLAttributes<HTMLHeadingElement> & {
  as?: ElementType
}

const Header4: FCWithChildren<Header4Props> = ({ children, className, as = "h4", ...rest }) => {
  const Component = as

  return (
    <Component
      className={clsx("font-[Nunito] text-lg", className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Header4

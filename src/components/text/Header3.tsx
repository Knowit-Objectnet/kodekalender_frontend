import clsx from "clsx"
import { ElementType, HTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"


type Header3Props = HTMLAttributes<HTMLHeadingElement> & {
  as?: ElementType
}

const Header3: FCWithChildren<Header3Props> = ({ children, className, as = "h3", ...rest }) => {
  const Component = as

  return (
    <Component
      className={clsx("font-[Nunito] text-lg font-bold", className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Header3

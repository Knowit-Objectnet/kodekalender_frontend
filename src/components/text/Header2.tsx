import clsx from "clsx"
import { ElementType, HTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"


type Header2Props = HTMLAttributes<HTMLHeadingElement> & {
  as?: ElementType
}

const Header2: FCWithChildren<Header2Props> = ({ children, className, as = "h2", ...rest }) => {
  const Component = as

  return (
    <Component
      className={clsx("font-['Twinkle_Star'] text-xl tracking-[0.03475rem]", className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Header2

import clsx from "clsx"
import { HTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"


type Header1Props = HTMLAttributes<HTMLHeadingElement>

const Header1: FCWithChildren<Header1Props> = ({ children, className, ...rest }) => (
  <h1
    className={clsx("font-['Twinkle_Star'] text-[70px]", className)}
    {...rest}
  >
    {children}
  </h1>
)

export default Header1

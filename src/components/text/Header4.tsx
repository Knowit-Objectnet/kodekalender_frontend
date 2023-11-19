import clsx from "clsx"
import { HTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"


type Header4Props = HTMLAttributes<HTMLHeadingElement>

const Header4: FCWithChildren<Header4Props> = ({ children, className, ...rest }) => (
  <h4
    className={clsx("font-[Nunito] text-[28px]", className)}
    {...rest}
  >
    {children}
  </h4>
)

export default Header4

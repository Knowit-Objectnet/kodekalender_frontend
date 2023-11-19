import clsx from "clsx"
import { HTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"


type Header3Props = HTMLAttributes<HTMLHeadingElement>

const Header3: FCWithChildren<Header3Props> = ({ children, className, ...rest }) => (
  <h3
    className={clsx("font-[Nunito] text-[28px] font-bold", className)}
    {...rest}
  >
    {children}
  </h3>
)

export default Header3

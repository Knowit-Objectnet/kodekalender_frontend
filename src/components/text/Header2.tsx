import clsx from "clsx"
import { HTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"


type Header2Props = HTMLAttributes<HTMLHeadingElement>

const Header2: FCWithChildren<Header2Props> = ({ children, className, ...rest }) => (
  <h2
    className={clsx("font-['Twinkle_Star'] text-[54px]", className)}
    {...rest}
  >
    {children}
  </h2>
)

export default Header2

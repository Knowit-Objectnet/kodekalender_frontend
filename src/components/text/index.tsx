import { ElementType, HTMLAttributes } from "react"

import { cl } from "../../utils"
import { FCWithChildren } from "../../../types/utils_types"


const HEADER_CLASSES = [
  "font-['Twinkle_Star'] text-2xl tracking-[0.03475rem]",
  "font-['Twinkle_Star'] text-xl tracking-[0.03375rem]",
  "font-[Nunito] text-lg font-bold",
  "font-[Nunito] text-lg"
] as const

type HeaderComponentProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: ElementType
  className?: string
}

const createHeader = (n: 1 | 2 | 3 | 4): FCWithChildren<HeaderComponentProps> => (
  ({ children, as = `h${n}`, className, ...rest }) => {
    const HeaderComponent = as

    return (
      <HeaderComponent
        className={cl(
          HEADER_CLASSES[n - 1],
          className
        )}
        {...rest}
      >
        {children}
      </HeaderComponent>
    )
  }
)

export const Header1 = createHeader(1)
export const Header2 = createHeader(2)
export const Header3 = createHeader(3)
export const Header4 = createHeader(4)

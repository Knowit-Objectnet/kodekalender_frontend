import { ElementType, HTMLAttributes } from "react"

import { cl } from "../../utils"
import { FCWithChildren } from "../../../types/utils_types"


const HEADER_CLASSES = [
  "font-['Twinkle_Star'] text-xl sm:text2xl md:text-3xl tracking-[0.03475rem]",
  "font-['Twinkle_Star'] text-lg sm:text-xl md:text-2xl tracking-[0.03375rem]",
  "font-['Nunito_Variable'] text-base sm:text-lg font-bold",
  "font-['Nunito_Variable'] text-base sm:text-lg"
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
          "shadow-black/70 [text-shadow:_1px_1px_2px_var(--tw-shadow-color)]",
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

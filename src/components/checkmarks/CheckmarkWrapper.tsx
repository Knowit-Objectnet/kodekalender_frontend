import { useEffect, useRef } from "react"

import { FCWithChildren } from "../../../types/utils_types"
import { cl } from "../../utils"

export type CheckmarkWrapperProps = {
  wrapperClassName?: string
  message?: string
  scrollTo?: boolean
}

const CheckmarkWrapper: FCWithChildren<CheckmarkWrapperProps> = ({
  children,
  wrapperClassName,
  message,
  scrollTo = false
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollTo) scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [scrollTo])

  return (
    <div ref={scrollRef} className={cl(wrapperClassName)}>
      {children}
      {message && (
        <p className="mt-8 whitespace-nowrap text-center md:mt-16 md:text-lg">
          {message}
        </p>
      )}
    </div>
  )
}

export default CheckmarkWrapper

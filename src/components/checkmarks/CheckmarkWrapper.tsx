import { useEffect, useRef } from "react"
import clsx from "clsx"

import { FCWithChildren } from "../../../types/utils_types"


export type CheckmarkWrapperProps = {
  wrapperClassName?: string
  message?: string
  scrollTo?: boolean
}

const CheckmarkWrapper: FCWithChildren<CheckmarkWrapperProps> = ({ children, wrapperClassName, message, scrollTo = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollTo) scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [scrollTo])

  return (
    <div ref={scrollRef} className={clsx(wrapperClassName)}>
      {children}
      {message && <p className="md:text-lg text-center mt-8 md:mt-16 whitespace-nowrap">{message}</p>}
    </div>
  )
}

export default CheckmarkWrapper

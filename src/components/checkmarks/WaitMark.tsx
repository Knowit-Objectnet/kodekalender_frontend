import { join } from "lodash-es"
import { FC, useEffect, useState } from "react"

import { cl, easeOutCubic } from "../../utils"

import Wrapper, { CheckmarkWrapperProps } from "./CheckmarkWrapper"


const OFFSET = 65.1
const R = 62.1

export const WaitMark: FC<CheckmarkWrapperProps &  { retryAfter: number, className?: string }> = ({ retryAfter, className, ...props }) => {
  const [countdown, setCountdown] = useState(retryAfter)

  useEffect(() => {
    const interval = setInterval(() => setCountdown((x) => x > 0 ? x - 1 : x), 1000)

    return () => clearInterval(interval)
  }, [setCountdown])

  return (
    <Wrapper {...props}>
      <svg className={cl("text-yellow-400 stroke-current mx-auto", className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <path
          d={`
            M ${OFFSET} ${OFFSET}
            m 0 ${-R}
            a ${R}, ${R} 0 1, 1 0 ${2*R}
            a ${R}, ${R} 0 1, 1 0 ${-2*R}
          `}
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="6"
          strokeDasharray="1"
          strokeDashoffset="0"
          pathLength="1"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur={retryAfter}
            by="1"
            additive="sum"
          />
        </path>
        <path
          d={`
            M ${OFFSET} ${OFFSET}
            m -15.7 -27.2
            v 54.4
          `}
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="6"
          strokeDasharray="1"
          strokeDashoffset="1"
          pathLength="1"
        >
          <animate
            attributeName="stroke-dashoffset"
            begin=".2s"
            dur=".2s"
            by="-1"
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines={join(easeOutCubic, " ")}
          />
        </path>
        <path
          d={`
            M ${OFFSET} ${OFFSET}
            m 15.7 -27.2
            v 54.4
          `}
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="6"
          strokeDasharray="1"
          strokeDashoffset="1"
          pathLength="1"
        >
          <animate
            attributeName="stroke-dashoffset"
            begin=".4s"
            dur=".2s"
            by="-1"
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines={join(easeOutCubic, " ")}
          />
        </path>
      </svg>
      <p className="text-center mt-2">
        {countdown} sekund{countdown !== 1 && "er"}
      </p>
    </Wrapper>
  )
}

export default WaitMark

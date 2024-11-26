import { join } from "lodash-es"
import { FC } from "react"

import { easeInCubic, easeOutCubic } from "../../utils"

import Wrapper, { CheckmarkWrapperProps } from "./CheckmarkWrapper"

const OFFSET = 65.1
const R = 62.1

export const WrongMark: FC<CheckmarkWrapperProps> = (props) => (
  <Wrapper {...props}>
    <svg
      className="stroke-current text-red-700"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2"
    >
      <path
        d={`
          M ${OFFSET} ${OFFSET}
          m 0 ${-R}
          a ${R}, ${R} 0 1, 1 0 ${2 * R}
          a ${R}, ${R} 0 1, 1 0 ${-2 * R}
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
          dur=".4s"
          by="1"
          fill="freeze"
          calcMode="spline"
          keyTimes="0;1"
          keySplines={join(easeOutCubic, " ")}
        />
      </path>
      <path
        d={`
          M ${OFFSET} ${OFFSET}
          m 30.7 -27.2
          l -61.4 54.4
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
          keySplines={join(easeInCubic, " ")}
        />
      </path>
      <path
        d={`
          M ${OFFSET} ${OFFSET}
          m -30.7 -27.2
          l 61.4 54.4
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
          keySplines={join(easeInCubic, " ")}
        />
      </path>
    </svg>
  </Wrapper>
)

export default WrongMark

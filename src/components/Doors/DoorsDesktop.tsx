import clsx from "clsx"
import { FC, useEffect, useState } from "react"
import { forEach, range } from "lodash"

import { DoorsProps } from "./doors_utils"

import { NBSP } from "../../utils"

import { ReactComponent as TestSvg } from "/assets/svg/test-doors.svg"


const DoorsDesktop: FC<DoorsProps> = ({ className, challenges, solvedStatus }) => {
  const [useTestSvg, setUseTestSvg] = useState(false)
  const [svg, setSvg] = useState<string>()

  useEffect(() => {
    (async () => {
      const response = await fetch("https://julekalender-public.s3.amazonaws.com/development/doors_desktop.svg")
      setSvg(await response.text())
    })()
  }, [setSvg])

  useEffect(() => {
    const rootStyle = document.documentElement.style

    forEach(range(1, 25), (i) => {
      const challenge = challenges?.[i]
      const solved = solvedStatus?.[i]

      // Challenge not yet available, show only bottom layer
      if (!challenge && !solved) {
        rootStyle.setProperty(`--door-${i}-solved-display`, "none")
        rootStyle.setProperty(`--door-${i}-open-display`, "none")
      } else {
        // Challenge available, show door for solved=true/false
        rootStyle.setProperty(`--door-${i}-${solved ? "solved" : "open"}-display`, "initial")
        rootStyle.setProperty(`--door-${i}-${solved ? "open" : "solved"}-display`, "none")
      }
    })

  }, [challenges, solvedStatus])

  if (!svg)
    return null

  return (
    <div>
      <label>
        <input type="checkbox" onChange={(e) => setUseTestSvg(e.target.checked)} />
        {NBSP}
        Bruk test-SVG
      </label>
      {useTestSvg
        ? <div className={clsx(className)}><TestSvg /></div>
        : <div className={clsx(className)} dangerouslySetInnerHTML={{ __html: svg }} />
      }
    </div>
  )
}

export default DoorsDesktop

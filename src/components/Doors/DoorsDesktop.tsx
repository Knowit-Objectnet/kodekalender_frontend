import { FC, useLayoutEffect, useMemo, useRef, useState } from "react"
import { constant, every, forEach, map, range, times, zip } from "lodash-es"
import { Link } from "react-router-dom"

import { ReactComponent as DoorsDesktopSvg } from "/assets/svg/Julehus.svg"

import { cl } from "../../utils"
import { Maybe } from "../../../types/utils_types"

import { DoorsProps } from "./doors_utils"

const doorLinkPadding = 6
const EMPTY_STYLES = times(24, constant(undefined))

type DoorStatus = "solved" | "open" | "closed"

const DoorsDesktop: FC<DoorsProps> = ({ className, challenges, solvedStatus }) => {
  const doorsState: DoorStatus[] = useMemo(
    () =>
      map(range(1, 25), (i) => {
        const challenge = challenges?.[i]
        const solved = solvedStatus?.[i]

        if (challenge && solved) return "solved"
        else if (challenge && !solved) return "open"
        else return "closed"
      }),
    [challenges, solvedStatus]
  )

  /*
   * Toggle visibility of all _secret_ door elements - showing whether a door
   * has been opened or is solved by current user.
   */
  useLayoutEffect(() => {
    const rootStyle = document.documentElement.style

    forEach(doorsState, (state, i) => {
      // Challenge not yet available, show only bottom layer
      if (state == "closed") {
        rootStyle.setProperty(`--door-${i + 1}-solved-display`, "none")
        rootStyle.setProperty(`--door-${i + 1}-open-display`, "none")
      } else {
        // Challenge available, show door for solved=true/false
        rootStyle.setProperty(
          `--door-${i + 1}-${state === "solved" ? "solved" : "open"}-display`,
          "initial"
        )
        rootStyle.setProperty(
          `--door-${i + 1}-${state === "solved" ? "open" : "solved"}-display`,
          "none"
        )
      }
    })
  }, [doorsState])

  /*
   * Generate all link elements that are to be overlayed on the doors to link through to each challenge.
   */
  const [doorElementStyles, setDoorElementStyles] = useState<Maybe<Record<string, number>>[]>(
    times(24, () => ({}))
  )
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const doorElementRefs = times(24, () => useRef<HTMLAnchorElement>(null))
  const doorElements = useMemo(
    () =>
      map(zip(doorsState, doorElementStyles, doorElementRefs), ([state, styles, ref], i) =>
        state === "closed" ? null : (
          <Link key={i} to={`/luke/${i + 1}`} ref={ref} style={styles} className="fixed" />
        )
      ),
    [doorsState, doorElementStyles, doorElementRefs]
  )

  /*
   * Update the position and dimensions of each link element so that it overlays
   * its door in the SVG. Must update on scroll or resize, and check positioning
   * an extra time on first render if all nodes aren't rendered yet.
   */
  const doorsContainerRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const updateLinkPositions = () => {
      if (!doorsContainerRef.current) return

      // Exit early if container is not in view at all.
      const { y: containerY, height: containerHeight } =
        doorsContainerRef.current.getBoundingClientRect()
      if (containerY + containerHeight < 0) {
        setDoorElementStyles(EMPTY_STYLES)
        return
      }

      const doorsLayerNode = doorsContainerRef.current.querySelector("#Lockedx24")
      if (!doorsLayerNode) return

      const styles = map(doorElementRefs, (ref, i) => {
        if (!ref.current) return

        const targetDoor = doorsLayerNode.querySelector(`#Locked\\:\\:${i + 1}`)

        if (!targetDoor) return

        const { x, y, width, height } = targetDoor.getBoundingClientRect()
        return {
          top: y - doorLinkPadding,
          left: x - doorLinkPadding,
          width: width + 2 * doorLinkPadding,
          height: height + 2 * doorLinkPadding
        }
      })

      // If we got no styles, that means somehow no dom node was found for any door. Unlikely. Try again in a jiffy.
      if (every(styles, (s) => s === undefined)) timeout = setTimeout(updateLinkPositions)

      setDoorElementStyles(styles)
    }

    // Call to set positions at least once
    updateLinkPositions()

    window.addEventListener("resize", updateLinkPositions)
    window.addEventListener("scroll", updateLinkPositions)

    return () => {
      window.removeEventListener("resize", updateLinkPositions)
      window.removeEventListener("scroll", updateLinkPositions)
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doorsContainerRef, ...doorElementRefs])

  useLayoutEffect(() => {
    forEach(doorsContainerRef.current?.querySelectorAll("#Locked24 ~ *"), (node) => {
      node.classList.add("pointer-events-none")
    })
  }, [])

  return (
    <div ref={doorsContainerRef} className="relative">
      <DoorsDesktopSvg
        className={cl(
          `
            absolute
            left-[50%]
            min-h-[calc(914.16px*.7)]

            w-[clamp(calc(1800px*.7),100vw,150vw)]
            translate-x-[-50%]
          `,
          className
        )}
      />
      {doorElements}
    </div>
  )
}

export default DoorsDesktop

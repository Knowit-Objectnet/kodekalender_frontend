import { every, forEach, map, range, slice, times, zip } from "lodash-es"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

import { ReactComponent as JulehusSvg } from "/assets/svgo/Julehus.svg"

import { useChallenges, usePrefetchLikes, usePrefetchPosts, useSolvedStatus } from "../api/requests"
import PageContent from "../components/PageContent"
import { Maybe } from "../../types/utils_types"
import { Z_JULEHUS, cl, debug } from "../utils"
import { getAnchorVar } from "../hooks/useStoreAnchorVars"


const DOOR_LINK_PADDING = 6

type DoorStatus = "solved" | "open" | "closed"

const Doors = () => {
  const { data: challenges } = useChallenges()
  const { data: solvedStatus } = useSolvedStatus()
  const prefetchPosts = usePrefetchPosts()
  const prefetchLikes = usePrefetchLikes()


  const doorsState: DoorStatus[] = useMemo(() => (
    map(range(1, 25), (i) => {
      const challenge = challenges?.[i]
      const solved = solvedStatus?.[i]

      if (challenge && solved)
        return "solved"
      else if (challenge && !solved)
        return "open"
      else
        return "closed"
    })), [challenges, solvedStatus])

  /*
   * Toggle visibility of all _secret_ door elements - showing whether a door
   * has been opened or is solved by current user.
   */
  useLayoutEffect(() => {
    const rootStyle = document.documentElement.style

    forEach(doorsState, (state, i) => {
      // Challenge not yet available, show only bottom layer
      if (state == "closed") {
        rootStyle.setProperty(`--door-${i+1}-solved-display`, "none")
        rootStyle.setProperty(`--door-${i+1}-open-display`, "none")
      } else {
        // Challenge available, show door for solved=true/false
        rootStyle.setProperty(`--door-${i+1}-${state === "solved" ? "solved" : "open"}-display`, "initial")
        rootStyle.setProperty(`--door-${i+1}-${state === "solved" ? "open" : "solved"}-display`, "none")
      }
    })

    const windowGroups = [[1, 8], [8, 15], [15, 18], [18, 24]]
    forEach(windowGroups, ([from, to]) => {
      const subState = slice(doorsState, from - 1, to - 1)
      if (every(subState, (state) => state === "solved")) {
        debug(`Setting vindu ${to - 1} to ON: ${JSON.stringify(subState)}`)
        rootStyle.setProperty(`--vindu-${to - 1}-display`, "initial")
      } else {
        debug(`Setting vindu ${to - 1} to OFF ${JSON.stringify(subState)}`)
        rootStyle.setProperty(`--vindu-${to - 1}-display`, "none")
      }
    })
  }, [doorsState])

  /*
   * Generate all link elements that are to be overlayed on the doors to link through to each challenge.
   */
  const [doorElementStyles, setDoorElementStyles] = useState<Maybe<Record<string, number>>[]>(times(24, () => ({})))
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const doorElementRefs = times(24, () => useRef<HTMLAnchorElement>(null))
  const doorElements = useMemo(() => (
    map(zip(doorsState, doorElementStyles, doorElementRefs), ([state, styles, ref], i) => (
      state === "closed"
        ? null
        : (
          <Link
            key={i}
            to={`/luke/${i + 1}`}
            ref={ref}
            style={styles}
            className={cl("fixed", getAnchorVar("debug") && "bg-red-700/40 ring-red-700 ring-4 ring-inset")}
            onMouseOver={() => { prefetchLikes(); prefetchPosts(i + 1) }}
          />
        )
    ))
  ), [doorsState, doorElementStyles, doorElementRefs, prefetchLikes, prefetchPosts])

  const debouncedUpdateLinkPositions = useDebouncedCallback(() => {
    if (!doorsContainerRef.current)
      return

    const doorsLayerNode = doorsContainerRef.current.querySelector("#Julehus__Lockedx24")
    if (!doorsLayerNode)
      return

    const styles = map(doorElementRefs, (ref, i) => {
      if (!ref.current)
        return

      const targetDoor = doorsLayerNode.querySelector(`#Julehus__Locked\\:\\:${i + 1}`)

      if (!targetDoor)
        return

      const { x, y, width, height } = targetDoor.getBoundingClientRect()
      return {
        top: y - DOOR_LINK_PADDING,
        left: x - DOOR_LINK_PADDING,
        width: width + (2 * DOOR_LINK_PADDING),
        height: height + (2 * DOOR_LINK_PADDING)
      }
    })

    setDoorElementStyles(styles)
  }, 300)

  const [userHasScrolled, setUserHasScrolled] = useState(false)

  useEffect(() => {
    if (userHasScrolled) return
    const handleDoorsScroll = () => {
      setUserHasScrolled(true)
    }

    const ref = doorsContainerRef.current
    ref?.addEventListener("scroll", handleDoorsScroll)
    return () => ref?.removeEventListener("scroll", handleDoorsScroll)
  }, [userHasScrolled])

  useEffect(() => {
    const currentDate = new Date()
    // If it's past 4am, we're on the next day
    const linkIndex = currentDate.getHours() >= 4 ? currentDate.getDate() : currentDate.getDate() - 1

    const el = document.getElementById(`Julehus__Locked::${linkIndex}`)
    if (!el || !doorsContainerRef.current) return
    const boundingRect = el.getBoundingClientRect()
    const doorsContainerWidth = doorsContainerRef.current.offsetWidth
    // If the doors container is wider than the SVG, don't scroll
    const svgWidth = doorsContainerRef.current.querySelector("svg")?.getBoundingClientRect().width
    if (!svgWidth || doorsContainerWidth >= svgWidth) return
    doorsContainerRef.current.scrollTo({ behavior: "instant", left: boundingRect.left - (boundingRect.width / 2) - (doorsContainerWidth / 2) })
  }, [])


  /*
   * Update the position and dimensions of each link element so that it overlays
   * its door in the SVG. Must update on scroll or resize.
   */
  const doorsContainerRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const doorsContainerRefCurrent = doorsContainerRef.current
    doorsContainerRefCurrent?.addEventListener("scroll", debouncedUpdateLinkPositions)
    window.addEventListener("resize", debouncedUpdateLinkPositions)
    window.addEventListener("scroll", debouncedUpdateLinkPositions)

    // Sometimes the actual DOM nodes in the SVG aren't available when this
    // effect first runs. Observer for changes to try and catch them being
    // mounted later.
    const mutationObserver = new MutationObserver(debouncedUpdateLinkPositions)
    if (doorsContainerRefCurrent)
      mutationObserver.observe(doorsContainerRefCurrent, { childList: true, subtree: true })

    // Try to update links on first render
    debouncedUpdateLinkPositions()

    return () => {
      doorsContainerRefCurrent?.removeEventListener("scroll", debouncedUpdateLinkPositions)
      window.removeEventListener("resize", debouncedUpdateLinkPositions)
      window.removeEventListener("scroll", debouncedUpdateLinkPositions)
      mutationObserver.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doorsContainerRef, ...doorElementRefs, debouncedUpdateLinkPositions, challenges])

  useLayoutEffect(() => {
    forEach(doorsContainerRef.current?.querySelectorAll("#Julehus__Locked24 ~ *"), (node) => {
      node.classList.add("pointer-events-none")
    })
  }, [])

  return (
    <PageContent
      className={`
        w-full
      `}
    >
      <div
        ref={doorsContainerRef}
        className={`
          julehus-width:relative
          max-julehus-width:overflow-x-scroll

          h-[max(21.25rem,calc(100vh-15rem))]
        `}
      >
        <JulehusSvg
          className={`
            julehus-width:absolute
            julehus-width:left-[50%]
            julehus-width:translate-x-[-50%]

            h-full

            ${Z_JULEHUS}
          `}
        />

        {doorElements}
      </div>
    </PageContent>
  )
}

export default Doors

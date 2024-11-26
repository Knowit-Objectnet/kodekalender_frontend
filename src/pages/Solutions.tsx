import { memo, useEffect, useRef } from "react"
import { compact, isEmpty, map, values } from "lodash-es"
import { Link } from "react-router-dom"

import { useChallenges } from "../api/requests"
import useCurrentTime from "../hooks/useCurrentTime"
import { getRaffleEnd } from "../utils"
import { Header2 } from "../components/text"
import WednesdayEasterEgg from "../components/WednesdayEasterEgg"
import { Challenge } from "../api"

import BasicPage from "./BasicPage"

const SolutionEntry = memo(({ challenge }: { challenge: Challenge }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Position easter egg randomly within container when user start hovering
  // (just in time for it to be shown).
  useEffect(() => {
    const containerElement = containerRef.current
    if (!containerElement) return

    const mouseEnterHandler = () => {
      const easterEggElement = containerElement.querySelector(
        "a#solutions-easter-egg"
      ) as HTMLAnchorElement | null
      if (!easterEggElement) return

      const containerBounds = containerElement.getBoundingClientRect()
      const easterEggBounds = easterEggElement.getBoundingClientRect()

      const x = Math.random() * (containerBounds.width - easterEggBounds.width)
      const y = Math.random() * (containerBounds.height - easterEggBounds.height)

      easterEggElement.style.top = `${y}px`
      easterEggElement.style.left = `${x}px`
    }

    containerElement.addEventListener("mouseenter", mouseEnterHandler)
    window.addEventListener("resize", mouseEnterHandler)

    return () => {
      containerElement.removeEventListener("mouseenter", mouseEnterHandler)
      window.removeEventListener("resize", mouseEnterHandler)
    }
  })

  return (
    <div ref={containerRef} className="group relative">
      <WednesdayEasterEgg
        id="solutions-easter-egg"
        door={challenge.door}
        className={`
          pointer-events-none
          absolute
          h-28
          w-28
          rounded-full
          p-4
          opacity-0

          group-hover:animate-spin
          group-hover:opacity-100
          max-sm:h-24
          max-sm:w-24
        `}
      />
      <Link
        to={`/luke/${challenge.door}`}
        className={`
          flex
          flex-col
          gap-1
          rounded-md
          p-4
          text-center
          hover:bg-purple-700
          sm:gap-2
          sm:p-8
        `}
      >
        <h2>Luke {challenge.door}</h2>
        <Header2 as="span" className="test-base font-bold sm:!text-lg">
          {challenge.title}
        </Header2>
        <code
          className={`
            mx-auto
            inline-block
            max-w-full
            overflow-x-auto
            text-sm

            tracking-wide
            sm:text-base
          `}
        >
          {challenge.answer}
        </code>
      </Link>
    </div>
  )
})

const Solutions = () => {
  const { data: challenges, isLoading } = useChallenges()
  const currentTime = useCurrentTime()

  if (currentTime < getRaffleEnd()) {
    return (
      <BasicPage title="Løsninger">
        <p className="mt-8 text-center">Hva gjør du her?? Gå og løs lukene!</p>
      </BasicPage>
    )
  }

  if (isLoading) return null

  return (
    <BasicPage
      title="Løsninger"
      containerClassName="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16"
    >
      {isEmpty(challenges) ? (
        <div>Ingenting her!</div>
      ) : (
        map(compact(values(challenges)), (challenge) => (
          <SolutionEntry key={challenge.door} challenge={challenge} />
        ))
      )}
    </BasicPage>
  )
}

export default Solutions

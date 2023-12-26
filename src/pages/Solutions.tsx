import { compact, isEmpty, map, values } from "lodash-es"

import { useChallenges } from "../api/requests"
import useCurrentTime from "../hooks/useCurrentTime"
import { getRaffleEnd } from "../utils"
import { Header2 } from "../components/text"

import BasicPage from "./BasicPage"


const Solutions = () => {
  const { data: challenges, isLoading } = useChallenges()
  const currentTime = useCurrentTime()

  if (currentTime < getRaffleEnd()) {
    return (
      <BasicPage title="Løsninger">
        <p className="mt-8 text-center">
          Hva gjør du her?? Gå og løs lukene!
        </p>
      </BasicPage>
    )
  }

  if (isLoading) return null

  return (
    <BasicPage title="Løsninger" containerClassName="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-24">
      {isEmpty(challenges)
        ? <div>Ingenting her!</div>
        : map(compact(values(challenges)), (challenge) => (
          <div className="flex flex-col gap-1 sm:gap-2 text-center">
            <h2>Luke {challenge.door}</h2>
            <Header2 as="span" className="test-base sm:!text-lg font-bold">{challenge.title}</Header2>
            <code
              className={`
                text-sm
                sm:text-base
                max-w-full
                overflow-x-auto
                tracking-wide

                inline-block
                mx-auto
              `}
            >
              {challenge.answer}
            </code>
          </div>
         ))
      }
    </BasicPage>
  )
}

export default Solutions

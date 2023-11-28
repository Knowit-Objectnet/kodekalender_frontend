import { compact, isEmpty, map, values } from "lodash-es"

import { useChallenges } from "../api/requests"
import useCurrentTime from "../hooks/useCurrentTime"
import { getRaffleEnd } from "../utils"
import { Header1 } from "../components/text"

import Page from "./Page"

const Solutions = () => {
  const { data: challenges, isLoading } = useChallenges()
  const currentTime = useCurrentTime()

  if (currentTime < getRaffleEnd()) {
    return <div>Hva gjør du her?? Gå og løs lukene!</div>
  }

  if (isLoading) return null

  return (
    <Page className="mx-8 space-y-16 rounded-md bg-purple-700 px-16 py-24 md:mx-16 md:px-24">
      <div className="text-center">
        <Header1>Løsninger</Header1>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-12">
        {isEmpty(challenges) ? (
          <div>Ingenting her!</div>
        ) : (
          map(compact(values(challenges)), (challenge) => (
            <div className="grid justify-items-center gap-2">
              <div className="tracking-wide">
                Luke {challenge.door} <span className="text-gray/40">&mdash;</span>{" "}
                <em>{challenge.title}</em>
              </div>
              <div className="max-w-full overflow-x-auto font-mono text-lg font-semibold">
                {challenge.answer}
              </div>
            </div>
          ))
        )}
      </div>
    </Page>
  )
}

export default Solutions

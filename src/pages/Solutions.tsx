import { compact, isEmpty, map, values } from "lodash-es"

import { useChallenges } from "../api/requests"
import useCurrentTime from "../hooks/useCurrentTime"
import { getRaffleEnd } from "../utils"
import { Header1 } from "../components/text"

import Page from "./Page"
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
    <Page className="py-24 px-16 md:px-24 mx-8 md:mx-16 bg-purple-700 rounded-md space-y-16">
      <div className="text-center">
        <Header1>Løsninger</Header1>
      </div>
      <div className="grid grid-cols-1 gap-12 justify-items-center">
        {isEmpty(challenges)
          ? <div>Ingenting her!</div>
          : map(compact(values(challenges)), (challenge) => (
            <div className="grid gap-2 justify-items-center">
              <div className="tracking-wide">Luke {challenge.door} <span className="text-gray/40">&mdash;</span> <em>{challenge.title}</em></div>
              <div className="font-mono font-semibold text-lg max-w-full overflow-x-auto">{challenge.answer}</div>
            </div>
          ))
        }
      </div>
    </Page>
  )
}

export default Solutions

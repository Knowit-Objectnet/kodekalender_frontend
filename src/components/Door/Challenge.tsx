import { FC, ReactNode } from "react"

import { Challenge as ChallengeType } from "../../api/Challenge"
import { Header1 } from "../text"

import Input from "./Input"


type ChallengeProps = {
  challenge: ChallengeType | undefined
  withoutInput?: boolean
  preamble?: ReactNode
}

const Challenge: FC<ChallengeProps> = ({ challenge, withoutInput = false, preamble }) => {
  if (!challenge) return null

  return (
    <div className="pb-16 pt-28 px-8 md:px-24 mx-4 md:mx-16 bg-purple-800 rounded-md">
      {preamble}

      <div className="relative space-y-8 md:space-y-12 lg:space-y-24">
        <div className="text-center pb-8 md:pb-12 shadow-[0_24px_4px_-24px_white]">
          <Header1>{challenge.title}</Header1>
          <p className="mt-2"><em>Av {challenge.author}</em></p>
        </div>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: challenge.content }}
        />

        {!withoutInput && (
          <Input door={challenge.door} />
        )}
      </div>
    </div>
  )
}

export default Challenge

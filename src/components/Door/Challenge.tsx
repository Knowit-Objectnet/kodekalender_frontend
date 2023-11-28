import { FC, ReactNode } from "react"

import { Challenge as ChallengeType } from "../../api/Challenge"
import { Header1 } from "../text"

import Input from "./Input"

type ChallengeProps = {
  challenge: ChallengeType | undefined
  withoutInput?: boolean
  preamble?: ReactNode
}

const Challenge: FC<ChallengeProps> = ({
  challenge,
  withoutInput = false,
  preamble
}) => {
  if (!challenge) return null

  return (
    <div>
      {preamble}
      <div className="relative space-y-8 md:space-y-12 lg:space-y-24">
        <div className="pb-8 text-center shadow-[0_24px_4px_-24px_white] md:pb-12">
          <Header1 className="text-xl">{challenge.title}</Header1>
          <p className="mt-2">
            <em>Av {challenge.author}</em>
          </p>
        </div>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: challenge.content }}
        />

        {!withoutInput && <Input door={challenge.door} />}
      </div>
    </div>
  )
}

export default Challenge

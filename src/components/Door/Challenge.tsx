import { FC, ReactNode } from "react"

import { Challenge as ChallengeType } from "../../api/Challenge"
import { Header1, Header2 } from "../text"

import Input from "./Input"
import Divider from "../Divider"

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
        <div className="flex flex-col gap-4 pb-8 text-center md:pb-12">
          <Header2 as={Header1}>{challenge.title}</Header2>
          <p>
            <em>Av {challenge.author}</em>
          </p>
          <Divider bgClasses="w-full bg-purple-500" />
        </div>

        <div
          className="prose !max-w-full"
          dangerouslySetInnerHTML={{ __html: challenge.content }}
        />

        {!withoutInput && <Input door={challenge.door} />}
      </div>
    </div>
  )
}

export default Challenge

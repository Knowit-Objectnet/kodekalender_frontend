import { FC, ReactNode } from "react"

import SubscribeButton from "../SubscribeButton"
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
    <div className="pb-16 pt-28 px-8 md:px-24 mx-4 md:mx-16 bg-purple-700 rounded-md">
      {preamble}

      <div className="relative space-y-8 md:space-y-12 lg:space-y-24">
        <div className="text-center pb-8 md:pb-12 border-b-4">
          <Header1>{challenge.title}</Header1>
          <p className="mt-2"><em>Av {challenge.author}</em></p>
        </div>

        <div
          className="mx-auto prose prose-sm md:prose max-w-none md:max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: challenge.content }}
        />

        {!withoutInput && (
          <>
            <div className="w-112 py-6 px-12 mx-auto">
              <Input door={challenge.door} />
            </div>
            <div className="absolute bottom-0 right-0">
              <SubscribeButton door={challenge.door} className="text-xl" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Challenge

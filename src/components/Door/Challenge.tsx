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
    <div className="mx-4 rounded-md bg-purple-700 px-8 pb-16 pt-28 md:mx-16 md:px-24">
      {preamble}

      <div className="relative space-y-8 md:space-y-12 lg:space-y-24">
        <div className="border-b-4 pb-8 text-center md:pb-12">
          <Header1>{challenge.title}</Header1>
          <p className="mt-2">
            <em>Av {challenge.author}</em>
          </p>
        </div>

        <div
          className="prose prose-sm mx-auto max-w-none break-words md:prose md:max-w-none"
          dangerouslySetInnerHTML={{ __html: challenge.content }}
        />

        {!withoutInput && (
          <>
            <div className="mx-auto w-112 px-12 py-6">
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

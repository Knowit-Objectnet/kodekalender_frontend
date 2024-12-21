import { FC, useContext, useEffect, useState } from "react"

import CheckMark from "../checkmarks/CheckMark"
import WrongMark from "../checkmarks/WrongMark"
import { AuthContext } from "../../AuthContext"
import { useCreateSolution } from "../../api/requests"
import useIsDoorSolved from "../../hooks/useIsDoorSolved"
import WaitMark from "../checkmarks/WaitMark"
import { cl } from "../../utils"
import Icon from "../Icons/Icon"
import SignInButton from "../SignInButton"

type InputProps = {
  door: number
}

const Input: FC<InputProps> = ({ door }) => {
  const { isAuthenticated } = useContext(AuthContext)

  const [attemptCount, setAttemptCount] = useState(0)
  const [answer, setAnswer] = useState("")
  const [dirty, setDirty] = useState(false)
  const isDoorSolved = useIsDoorSolved(door)

  const { mutate: createSolution, isLoading, error, reset } = useCreateSolution()
  const [rateLimitTimeout, setRateLimitTimeout] = useState(0)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (error && error.status === 429 && error.headers && error.headers["retry-after"]) {
      const retryAfter = parseInt(error.headers["retry-after"])

      setRateLimitTimeout(retryAfter)
      timeout = setTimeout(() => {
        setRateLimitTimeout(0)
        setAttemptCount(0)
        reset()
      }, retryAfter * 1000)
    }

    return () => timeout && clearTimeout(timeout)
  }, [error, setRateLimitTimeout, setAttemptCount, reset])

  const submitAnswer = () => {
    createSolution({ door, answer })
    setDirty(false)
    setAttemptCount((count) => count + 1)
  }

  const isWrongAnswer = !isDoorSolved && attemptCount > 0 && !isLoading && !dirty

  if (!isDoorSolved && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center gap-8">
        <p>Logg inn for å delta!</p>
        <SignInButton />
      </div>
    )
  }

  if (isDoorSolved) {
    return (
      <CheckMark
        wrapperClassName="w-32 md:w-56 mx-auto"
        message={`Bra jobba!${door === 24 ? " Og god jul! 🥳" : ""}`}
        scrollTo={attemptCount > 0}
      />
    )
  }

  // Rate limit exceeded
  if (rateLimitTimeout > 0 && error) {
    return (
      <WaitMark
        wrapperClassName="w-96 mx-auto"
        className="w-32 md:w-56"
        message={error.message}
        retryAfter={rateLimitTimeout}
        scrollTo
      />
    )
  }

  return (
    <>
      <div className="relative flex items-center">
        <input
          className={cl(
            `
            form-input
            w-full
            rounded-xl
            border-2
            border-purple-500
            bg-transparent
            pr-22
            font-bold
            placeholder:font-bold
            placeholder:text-purple-400
          `,
            { "text-red-700": isWrongAnswer }
          )}
          placeholder="Ditt svar:"
          value={answer}
          maxLength={255}
          onChange={(e) => {
            setAnswer(e.target.value)
            setDirty(true)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitAnswer()
            }
          }}
        />

        <button
          type="button"
          disabled={!answer}
          className={cl(
            `
            absolute
            right-0
            h-full
            w-24
            rounded-r-xl
            pl-6
            text-left
          `,
            {
              "hover:cursor-pointer": answer,
              "pointer-events-none": !answer
            }
          )}
          onClick={submitAnswer}
        >
          <Icon name="send" className={cl({ "text-white/30": !answer })} />
        </button>
      </div>

      <div className="w-full text-center text-sm">
        Når du har løst oppgaven kan du se kommentarfeltet!
      </div>

      {(isWrongAnswer || error) && (
        <WrongMark
          wrapperClassName="w-32 md:w-56 mx-auto mt-16"
          message={error?.message ?? "Feil svar!"}
          scrollTo
        />
      )}
    </>
  )
}

export default Input

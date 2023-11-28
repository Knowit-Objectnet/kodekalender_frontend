import { toInteger } from "lodash-es"
import { FC, memo, useContext, useMemo } from "react"

import { Header1, Header3 } from "../components/text"
import useCountdownParts from "../hooks/useCountdownParts"
import { cl, dateFormat, getActiveYear, getRaffleStart } from "../utils"
import PageContent from "../components/PageContent"
import RegisterButton from "../components/RegisterButton"
import { AuthContext } from "../AuthContext"

type TimerDisplayProps = {
  countdownPartIndex: 0 | 1 | 2 | 3
  className?: string
}

const TimerDisplay: FC<TimerDisplayProps> = memo(({ countdownPartIndex, className }) => {
  const t = useCountdownParts()[countdownPartIndex]
  const tens = toInteger(t / 10)
  const ones = t % 10

  const content = useMemo(
    () => (
      <div
        className={cl(
          `
          flex

          child:rounded-2xl
          child:border-2
          child:border-purple-900
          child:bg-purple-700
          child:p-15
        `,
          className
        )}
      >
        <Header3 as="span" className="text-xl">
          {tens}
        </Header3>
        <Header3 as="span" className="text-xl">
          {ones}
        </Header3>
      </div>
    ),
    [tens, ones, className]
  )

  return content
})

const Separator = () => (
  <Header3 as="span" className="mx-3 text-xl">
    :
  </Header3>
)

const Countdown = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <PageContent
      className={`
        grid
        w-full
        grid-flow-row

        content-center
        justify-items-center

        gap-24
      `}
    >
      <Header1 className="inline-block leading-none">Kodekalender {getActiveYear()}</Header1>

      <div
        className={`
          m-auto

          inline-grid
          grid-cols-[repeat(7,auto)]
          grid-rows-[auto_1fr]

          justify-items-center
          text-center
          child:self-center
        `}
        title={`Første luke åpnes ${dateFormat(getRaffleStart(), "long")}.`}
      >
        <Header3 as="span">Dager</Header3>
        <span />
        <Header3 as="span">Timer</Header3>
        <span />
        <Header3 as="span">Minutter</Header3>
        <span />
        <Header3 as="span">Sekunder</Header3>

        <TimerDisplay countdownPartIndex={0} />
        <Separator />
        <TimerDisplay countdownPartIndex={1} />
        <Separator />
        <TimerDisplay countdownPartIndex={2} />
        <Separator />
        <TimerDisplay countdownPartIndex={3} />
      </div>

      <p className="w-304">
        Bli med på Knowits julekalender! Hver dag før jul åpnes en ny luke med en oppgave du må
        løse. Vi trekker en heldig vinner som får en valgfri mobil eller nettbrett!
      </p>

      <div className="space-x-8">
        {isAuthenticated ? (
          <span className="font-bold">Lykke til!</span>
        ) : (
          <>
            <span className="font-bold">Er du Nordpolens flittigste alv?</span>
            <RegisterButton />
          </>
        )}
      </div>
    </PageContent>
  )
}

export default Countdown

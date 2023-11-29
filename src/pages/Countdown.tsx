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

  const content = useMemo(() => (
    <div
      className={cl(
        `
          flex

          child:border-2
          child:border-purple-900
          child:rounded-2xl
          child:bg-purple-700

          child:p-[clamp(1rem,6vw,1.5rem)]
        `,
        className
      )}
    >
      <Header3 as="span" className="!text-[clamp(1.95rem,6vw,2.625rem)]">{tens}</Header3>
      <Header3 as="span" className="!text-[clamp(1.95rem,6vw,2.625rem)]">{ones}</Header3>
    </div>
  ), [tens, ones, className])

  return content
})

const Separator = () => (
  <Header3 as="span" className="!text-[clamp(1.95rem,6vw,2.625rem)] mx-3">:</Header3>
)

const Countdown = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <PageContent
      className={`
        grid
        grid-flow-row
        auto-rows-min


        gap-24
        max-md:gap-12

        justify-items-center
        text-center

        md:w-full
        max-md:px-10
      `}
    >
      <Header1 className="inline-block leading-none">Kodekalender {getActiveYear()}</Header1>

      <div
        className={`
          m-auto

          inline-grid
          grid-cols-[repeat(7,auto)]
          grid-rows-[auto_1fr]

          max-md:grid-cols-[repeat(3,auto)]
          max-md:grid-rows-[auto_1fr_auto_1fr]

          justify-items-center
          text-center
          descendant:self-center
        `}
        title={`Første luke åpnes ${dateFormat(getRaffleStart(), "long")}.`}
      >
        <Header3 as="span">Dager</Header3>
        <span />
        <Header3 as="span">Timer</Header3>

        <div className="contents max-md:hidden">
          <span />
          <Header3 as="span">Minutter</Header3>
          <span />
          <Header3 as="span">Sekunder</Header3>
        </div>

        <TimerDisplay countdownPartIndex={0} />
        <Separator />
        <TimerDisplay countdownPartIndex={1} />

        <div className="contents max-md:hidden">
          <Separator />
          <TimerDisplay countdownPartIndex={2} />
          <Separator />
          <TimerDisplay countdownPartIndex={3} />
        </div>

        <div className="hidden max-md:contents">
          <div className="contents child:mt-12">
            <Header3 as="span">Minutter</Header3>
            <span />
            <Header3 as="span">Sekunder</Header3>
          </div>

          <TimerDisplay countdownPartIndex={2} />
          <Separator />
          <TimerDisplay countdownPartIndex={3} />
        </div>
      </div>

      <p className="max-w-304 max-sm:text-justify">
        Bli med på Knowits julekalender! Hver dag før jul åpnes en ny luke med
        en oppgave du må løse. Vi trekker en heldig vinner som får en valgfri
        mobil eller nettbrett!
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-mad:gap-4">
        {isAuthenticated
          ? <span className="font-bold">Lykke til!</span>
          : (<>
            <span className="font-bold">Er du Nordpolens flittigste alv?</span>
            <RegisterButton />
          </>)
        }
      </div>
    </PageContent>
  )
}

export default Countdown

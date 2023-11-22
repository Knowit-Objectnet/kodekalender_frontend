import { toInteger } from "lodash-es"
import { FC, memo } from "react"

import Button from "../components/Button"
import { Header1, Header3 } from "../components/text"
import useCountdownParts from "../hooks/useCountdownParts"
import { cl, dateFormat, getActiveYear, getRaffleStart } from "../utils"
import PageContent from "../components/PageContent"


type TimerDisplayProps = {
  t: number
  className?: string
}

const TimerDisplay: FC<TimerDisplayProps> = memo(({ t, className }) => {
  const tens = toInteger(t / 10)
  const ones = t % 10

  return (
    <div
      className={cl(
        `
          flex

          child:border-2
          child:border-purple-900
          child:rounded-2xl
          child:bg-purple-700
          child:p-15
        `,
        className
      )}
    >
      <Header3 as="span" className="text-xl">{tens}</Header3>
      <Header3 as="span" className="text-xl">{ones}</Header3>
    </div>
  )
})

const Separator = () => (
  <Header3 as="span" className="text-xl mx-3">:</Header3>
)

const Countdown = () => {
  const [days, hours, minutes, seconds] = useCountdownParts()


  return (
    <PageContent
      className={`
        grid
        grid-flow-row
        gap-24

        content-center
        justify-items-center
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

        <TimerDisplay t={days} />
        <Separator />
        <TimerDisplay t={hours} />
        <Separator />
        <TimerDisplay t={minutes} />
        <Separator />
        <TimerDisplay t={seconds} />
      </div>

      <p className="w-304">
        Bli med på Knowits julekalender! Hver dag før jul åpnes en ny luke med
        en oppgave du må løse. Vi trekker en heldig vinner som får en valgfri
        mobil eller nettbrett!
      </p>

      <div className="space-x-8">
        <span className="font-bold">Er du Nordpolens flittigste alv?</span>
        <Button icon="edit">Registrer deg</Button>
      </div>
    </PageContent>
  )
}

export default Countdown

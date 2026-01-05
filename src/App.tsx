import { lazy, memo, Suspense, useContext, useEffect, useMemo, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Privacy from "./pages/Privacy"
import Door from "./pages/Door"
import PageHeader from "./components/PageHeader"
import Background from "./components/Background"
import Doors from "./pages/Doors"
import Leaderboard from "./pages/Leaderboard"
import ServiceMessages from "./pages/ServiceMessages"
import Page from "./pages/Page"
import Solutions from "./pages/Solutions"
import useStoreAnchorVars from "./hooks/useStoreAnchorVars"
import useIsRaffleStarted from "./hooks/useIsRaffleStarted"
import Countdown from "./pages/Countdown"
import About from "./pages/About"
import Career from "./pages/Career"
import Contact from "./pages/Contact"
import PageFooter from "./components/PageFooter"
import Icon, { IconProps } from "./components/Icons/Icon"
import useWelcomeBackRedirect from "./hooks/useWelcomeBackRedirect"
import ContentBackground from "./components/ContentBackground"
import { OptionsContext } from "./OptionsContext"
import { ReactComponent as KodekalenderLogoDesktop } from "/assets/svgo/misc/Kodekalender Logo Desktop 2025.svg"
import { ReactComponent as KodekalenderLogoMobile } from "/assets/svgo/misc/Kodekalender Logo Mobile 2025.svg"
import { Header2 } from "./components/text"

const WinnerMessage = () => (
  <div className="space-y-12 text-center">
    <Header2>Vinneren er trukket</Header2>
    <div className="inline-block max-w-384">
      Vinneren av Knowit Kodekalender 2025 er trukket! Mens vi venter på svar, takk til alle som har
      vært med og gratulerer til vinneren!
      <br />
      Vi alvene takker for oss for denne gang og håper vi ser dere igjen neste år!
    </div>
    <div className="grid place-items-center">
      <KodekalenderLogoDesktop className="hidden w-60 md:block" />
      <KodekalenderLogoMobile className="-mt-3 block w-30 md:hidden" />
    </div>
  </div>
)

const Loader = memo(({ icon }: { icon: IconProps["name"] }) => {
  const [delayed, setDelayed] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setDelayed(false), 250)
    return () => clearTimeout(t)
  }, [setDelayed])

  if (delayed) return null

  return (
    <Page>
      <Icon
        name={icon}
        className={`
        fixed
        left-1/2
        top-1/2
        h-64
        w-64
        translate-x-[-50%]
        translate-y-[-50%]
        animate-pulse
        text-purple-100/70
      `}
      />
    </Page>
  )
})

const App = () => {
  useStoreAnchorVars()
  useWelcomeBackRedirect()
  const { showSnow } = useContext(OptionsContext)

  const raffleStarted = useIsRaffleStarted()
  const raffleRoutes = useMemo(
    () =>
      raffleStarted ? (
        <>
          <Route path="/" element={<WinnerMessage />} />
        </>
      ) : (
        <Route path="/" element={<Countdown />} />
      ),
    [raffleStarted]
  )

  // Memoize entire application tree so we don't re-render anything when the
  // useIsRaffleStarted timer triggers.
  const content = useMemo(
    () => (
      <>
        <Background />

        <div
          id="content-container"
          className={`
        max-w-screen
        relative
        flex
        min-h-screen
        w-screen

        flex-col
        justify-between
        overflow-x-clip
      `}
        >
          {!showSnow && <ContentBackground />}
          <PageHeader />

          <Routes>
            {raffleRoutes}

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />

            {/* 404? - Route to main view */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <PageFooter />
        </div>
      </>
    ),
    [raffleRoutes, showSnow]
  )

  return content
}

export default memo(App)

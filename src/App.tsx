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

import { ReactComponent as KodekalenderLogoDesktop } from "/assets/svgo/misc/Kodekalender Logo Desktop.svg"
import { ReactComponent as KodekalenderLogoMobile } from "/assets/svgo/misc/Kodekalender Logo Mobile.svg"
import { Header2 } from "./components/text"

const WinnerMessage = () => (
  <div className="space-y-12 text-center">
    <Header2>Vinneren er trukket</Header2>

    <div className="inline-block max-w-384">
      Vinneren av Knowit Kodekalender 2024 er trukket! Mens vi venter på svar, takk til alle som har
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

const App = () => {
  const { showSnow } = useContext(OptionsContext)

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
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
            <Route path="*" element={<WinnerMessage />} />
          </Routes>

          <PageFooter />
        </div>
      </>
    ),
    [showSnow]
  )

  return content
}

export default memo(App)

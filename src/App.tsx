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
  <div className="text-center space-y-12">
    <Header2>Årets vinner</Header2>

     Vinneren av Knowit Kodekalender 2023 med hele 24 løste luker er <span className="font-bold">Øystein Høystad Bruce</span>. Gratulerer så mye!
    <br />
    Vi alvene takker for oss for denne gang og håper vi ser dere igjen neste år!

    <div className="grid place-items-center">
      <KodekalenderLogoDesktop className="hidden md:block w-60" />
      <KodekalenderLogoMobile className="block md:hidden w-30 -mt-3" />
    </div>
  </div>
)

const App = () => {
  const {showSnow} = useContext(OptionsContext)

  // Memoize entire application tree so we don't re-render anything when the
  // useIsRaffleStarted timer triggers.
  const content = useMemo(() => (<>
    <Background />

    <div
      id="content-container"
      className={`
        relative
        w-screen
        max-w-screen
        overflow-x-clip
        min-h-screen

        flex
        flex-col
        justify-between
      `}
    >
      { !showSnow && <ContentBackground /> }
      <PageHeader />

      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="*" element={<WinnerMessage />} />
      </Routes>


      <PageFooter />
    </div>
  </>), [showSnow])

  return content
}

export default memo(App)

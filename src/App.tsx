import { lazy, memo, Suspense, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { FaCogs } from "react-icons/fa"
import clsx from "clsx"

import Gdpr from "./pages/Gdpr"
import Door from "./pages/Door"
import PageHeader from "./components/PageHeader"
import StarBackground from "./components/StarBackground"
import LeaderBoardAside from "./components/LeaderBoardAside"
import Doors from "./pages/Doors"
import Leaderboard from "./pages/Leaderboard"
import ServiceMessages from "./pages/ServiceMessages"
import BackgroundPauseButton from "./components/BackgroundPauseButton"
import Page from "./pages/Page"
import Solutions from "./pages/Solutions"
import useStoreAnchorVars from "./hooks/useStoreAnchorVars"
import useToggleBgAnimationState from "./hooks/useToggleBgAnimationState"
import PageFooter from "./components/PageFooter"


const LazyAdmin = () => {
  const Component = lazy(() => import("./pages/Admin"))

  const Fallback = (
    <Page>
      <FaCogs
        className={clsx(
          "fixed",
          "top-1/2",
          "left-1/2",
          "w-64",
          "h-64",
          "translate-x-[-50%]",
          "translate-y-[-50%]",
          "text-white/70",
          "animate-pulse"
        )}
      />
    </Page>
  )

  return (
    <Suspense fallback={Fallback}>
      <Component />
    </Suspense>
  )
}

const LazyUser = () => {
  const Component = lazy(() => import("./pages/User"))

  return (
    <Component />
  )
}

const App = () => {
  useStoreAnchorVars()

  const [leaderboardHidden, setLeaderboardHidden] = useState(true)
  const [bgAnimationPaused, toggleBgAnimationPaused] = useToggleBgAnimationState()


  return (<>
    <StarBackground paused={bgAnimationPaused} />
    <LeaderBoardAside
      hidden={leaderboardHidden}
      closeHandler={() => setLeaderboardHidden(true)}
    />

    <div
      id="content-container"
      className={`
        grid
        grid-rows-[auto_1fr_auto_auto]
        min-h-[calc(100vh+1.5rem)]
        xh-[calc(100%+1.5rem)]
      `}
    >
      <PageHeader setLeaderboardHidden={setLeaderboardHidden} />

      <Routes>
        <Route path="/" element={<Doors />} />
        <Route path="/luke/:door" element={<Door />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/gdpr" element={<Gdpr />} />
        <Route path="/service_messages" element={<ServiceMessages />} />
        <Route path="/solutions" element={<Solutions />} />

        <Route path="/admin/*" element={<Admin />} />
        <Route path="/users/*" element={<Users />} />

        {/* 404? - Route to main view */}
        <Route element={<Navigate to="/" />} />
      </Routes>

      <PageFooter />

      <BackgroundPauseButton paused={bgAnimationPaused} onTogglePaused={toggleBgAnimationPaused} />
    </div>
  </>)
}

export default memo(App)

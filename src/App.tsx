import { lazy, memo, Suspense, useCallback, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { FaCogs } from "react-icons/fa"
import clsx from "clsx"

import Gdpr from "./pages/Gdpr"
import Door from "./pages/Door"
import Header from "./components/Header"
import StarBackground from "./components/StarBackground"
import LeaderBoardAside from "./components/LeaderBoardAside"
import Doors from "./pages/Doors"
import Leaderboard from "./pages/Leaderboard"
import ServiceMessages from "./pages/ServiceMessages"
import BackgroundPauseButton from "./components/BackgroundPauseButton"
import Page from "./pages/Page"
import Solutions from "./pages/Solutions"
import useStoreAnchorVars from "./hooks/useStoreAnchorVars"


const LazyAdmin = () => {
  const Component = lazy(() => import("./pages/Admin"))

  const Fallback = (
    <Page>
      <FaCogs
        className={clsx(
          "fixed",
          "top-1/2",
          "left-1/2",
          "w-32",
          "h-32",
          "translate-x-[-50%]",
          "translate-y-[-50%]",
          "text-lightbulb-yellow/70",
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
    <Suspense fallback={<Page />}>
      <Component />
    </Suspense>
  )
}

const App = () => {
  useStoreAnchorVars()

  const [leaderboardHidden, setLeaderboardHidden] = useState(true)

  const [bgAnimationPaused, setBgAnimationPaused] = useState(localStorage.getItem("stars-paused") === "true")
  const togglePaused = useCallback(() => {
    setBgAnimationPaused((state) => {
      localStorage.setItem("stars-paused", state ? "false" : "true")
      return !state
    })
  }, [setBgAnimationPaused])

  return (<>
    <StarBackground paused={bgAnimationPaused} />
    <LeaderBoardAside
      hidden={leaderboardHidden}
      closeHandler={() => setLeaderboardHidden(true)}
    />

    <div id="content-container" className="relative min-h-[calc(100vh+1.5rem)] h-[calc(100%+1.5rem)]">
      <Header className="-mb-4" setLeaderboardHidden={setLeaderboardHidden} />

      <Routes>
        <Route path="/" element={<Doors />} />
        <Route path="/luke/:door" element={<Door />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/gdpr" element={<Gdpr />} />
        <Route path="/service_messages" element={<ServiceMessages />} />
        <Route path="/solutions" element={<Solutions />} />

        <Route path="/admin" element={<LazyAdmin />} />
        <Route path="/users" element={<LazyUser />} />

        {/* 404? - Route to main view */}
        <Route element={<Navigate to="/" />} />
      </Routes>

      <BackgroundPauseButton paused={bgAnimationPaused} onTogglePaused={togglePaused} />
    </div>
  </>)
}

export default memo(App)

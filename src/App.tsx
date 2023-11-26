import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Privacy from "./pages/Privacy"
import Door from "./pages/Door"
import PageHeader from "./components/PageHeader"
import Background from "./components/Background"
import LeaderBoardAside from "./components/LeaderBoardAside"
import Doors from "./pages/Doors"
import Leaderboard from "./pages/Leaderboard"
import ServiceMessages from "./pages/ServiceMessages"
import Page from "./pages/Page"
import Solutions from "./pages/Solutions"
import useStoreAnchorVars from "./hooks/useStoreAnchorVars"
// import useToggleBgAnimationState from "./hooks/useToggleBgAnimationState"
import useIsRaffleStarted from "./hooks/useIsRaffleStarted"
import Countdown from "./pages/Countdown"
import About from "./pages/About"
import Career from "./pages/Career"
import Contact from "./pages/Contact"
import PageFooter from "./components/PageFooter"
import Icon, { IconProps } from "./components/Icons/Icon"
import useWelcomeBackRedirect from "./hooks/useWelcomeBackRedirect"
import ContentBackground from "./components/ContentBackground"


const Loader = memo(({ icon }: { icon: IconProps["name"] }) => {
  const [delayed, setDelayed] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setDelayed(false), 250)
    return () => clearTimeout(t)
  }, [setDelayed])

  if (delayed)
    return null

  return (
    <Page>
      <Icon
        name={icon}
        className={`
        fixed
        top-1/2
        left-1/2
        w-64
        h-64
        translate-x-[-50%]
        translate-y-[-50%]
        text-purple-100/70
        animate-pulse
      `} />
    </Page>
  )
})

const LazyAdmin = () => {
  const Component = lazy(() => import("./pages/Admin"))

  return (
    <Suspense fallback={<Loader icon="edit" />}>
      <Component />
    </Suspense>
  )
}

const LazyUser = () => {
  const Component = lazy(() => import("./pages/User"))

  return (
    <Suspense fallback={<Loader icon="user" />}>
      <Component />
    </Suspense>
  )
}

const App = () => {
  useStoreAnchorVars()

  useWelcomeBackRedirect()

  const [leaderboardHidden, setLeaderboardHidden] = useState(true)
  const hideLeaderboard = useCallback(() => setLeaderboardHidden(true), [setLeaderboardHidden])

  const raffleStarted = useIsRaffleStarted()
  const raffleRoutes = useMemo(() => (
    raffleStarted
      ? (<>
        <Route path="/" element={<Doors />} />
        <Route path="/luke/:door" element={<Door />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/solutions" element={<Solutions />} />
      </>)
      : <Route path="/" element={<Countdown />} />
  ), [raffleStarted])

  // Memoize entire application tree so we don't re-render anything when the
  // useIsRaffleStarted timer triggers.
  const content = useMemo(() => (<>
    <Background />
    <LeaderBoardAside
      hidden={leaderboardHidden}
      closeHandler={hideLeaderboard}
    />

    <div
      id="content-container"
      className={`
        relative
        max-w-screen
        overflow-x-visible
        grid
        grid-rows-[auto_1fr_auto]
        min-h-screen
        items-center
        justify-items-center
      `}
    >
      <ContentBackground />
      <PageHeader setLeaderboardHidden={setLeaderboardHidden} />

      <Routes>
        {raffleRoutes}

        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/service_messages" element={<ServiceMessages />} />

        <Route path="/admin/*" element={<LazyAdmin />} />
        <Route path="/users/*" element={<LazyUser />} />

        {/* 404? - Route to main view */}
        <Route element={<Navigate to="/" />} />
      </Routes>

      <PageFooter />
    </div>
  </>), [leaderboardHidden, hideLeaderboard, setLeaderboardHidden, raffleRoutes])

  return content
}

export default memo(App)

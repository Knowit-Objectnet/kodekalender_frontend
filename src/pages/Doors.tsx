import { get } from "lodash"
import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { useChallenges, usePrefetchLikes, usePrefetchPosts, useSolvedStatus } from "../api/requests"
import PageFooter from "../components/PageFooter"
import DoorsDesktop from "../components/Doors/DoorsDesktop"
import DoorsMobile from "../components/Doors/DoorsMobile"
import RaffleNotification from "../components/RaffleNotification"


const Doors = () => {
  const navigate = useNavigate()

  const { data: challenges } = useChallenges()
  const { data: solvedStatus } = useSolvedStatus()
  const prefetchPosts = usePrefetchPosts()
  const prefetchLikes = usePrefetchLikes()


  const prefetch = useCallback((door: number) => {
    prefetchLikes()

    if (get(solvedStatus, door))
      prefetchPosts(door)
  }, [prefetchLikes, prefetchPosts, solvedStatus])

  const lightProps = useMemo(() => ({
    challenges,
    solvedStatus,
    prefetch,
    navigateToDoor: (door: number) => navigate(`/luke/${door}`)
  }), [challenges, solvedStatus, prefetch, navigate])

  return (
    <main>
      <RaffleNotification />

      {/* Visibility toggle done with media queries in CSS */}
      <DoorsDesktop {...lightProps} />
      <DoorsMobile {...lightProps} />

      <PageFooter />
    </main>
  )
}

export default Doors

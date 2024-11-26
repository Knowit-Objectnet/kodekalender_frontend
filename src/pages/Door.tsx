import { FC, useContext, useLayoutEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import PostsSection from "../components/Posts/PostsSection"
import Challenge from "../components/Door/Challenge"
import { AuthContext } from "../AuthContext"
import useIsDoorSolved from "../hooks/useIsDoorSolved"
import { useChallenge } from "../api/requests"
import ServiceMessageAlert from "../components/Door/ServiceMessageAlert"
import { guardPresent } from "../utils"
import WednesdayEasterEgg from "../components/WednesdayEasterEgg"

import BasicPage from "./BasicPage"

const Door: FC = () => {
  const navigate = useNavigate()

  const { door: doorString } = useParams<{ door: string }>()
  const door = guardPresent(doorString, parseInt)

  const { data: challenge, isLoading } = useChallenge(door)

  const { isAuthenticated } = useContext(AuthContext)
  const solved = useIsDoorSolved(door)

  // Redirect home if no challenge found.
  if (!isLoading && !challenge) navigate("/")

  useLayoutEffect(() => {
    if (!door || (!isLoading && !challenge)) navigate("/")
  }, [door, isLoading, challenge, navigate])

  if (!door || (!isLoading && !challenge)) return null

  return (
    <BasicPage className="relative">
      <div className="flex flex-col gap-30 pb-16 pt-28">
        <Challenge challenge={challenge} />
        {isAuthenticated && solved && <PostsSection door={door} />}
      </div>
      <WednesdayEasterEgg
        door={door}
        className={`
          absolute
          bottom-12
          left-16
          h-28
          w-28
          rounded-full
          p-4
          opacity-0
          hover:animate-spin

          hover:opacity-100
          max-sm:bottom-8
          max-sm:left-8
        `}
      />
      <ServiceMessageAlert
        door={door}
        className="absolute left-24 top-32 h-20 w-18 md:left-40 md:h-24 md:w-24"
      />
    </BasicPage>
  )
}

export default Door

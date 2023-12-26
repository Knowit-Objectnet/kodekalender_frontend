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
      <div className="pb-16 pt-28 flex flex-col gap-30">
        <Challenge challenge={challenge} />
        {isAuthenticated && solved && <PostsSection door={door} />}
      </div>
      <WednesdayEasterEgg
        door={door}
        className={`
          absolute
          w-28
          h-28
          p-4
          rounded-full
          bottom-12
          left-16
          max-sm:bottom-8
          max-sm:left-8

          opacity-0
          hover:opacity-100
          hover:animate-spin
        `}
      />
      <ServiceMessageAlert
        door={door}
        className="w-18 h-20 md:w-24 md:h-24 absolute left-24 md:left-40 top-32"
      />
    </BasicPage>
  )
}

export default Door

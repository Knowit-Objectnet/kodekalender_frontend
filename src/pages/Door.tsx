import { FC, useContext, useLayoutEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import PostsSection from "../components/Posts/PostsSection"
import Challenge from "../components/Door/Challenge"
import { AuthContext } from "../AuthContext"
import useIsDoorSolved from "../hooks/useIsDoorSolved"
import { useChallenge } from "../api/requests"
import ServiceMessageAlert from "../components/Door/ServiceMessageAlert"
import { guardPresent } from "../utils"

import Page from "./Page"


const Door: FC = () => {
  const navigate = useNavigate()

  const { door: doorString } = useParams<{ door: string }>()
  const door = guardPresent(doorString, parseInt)

  const { data: challenge, isLoading } = useChallenge(door)

  const { isAuthenticated } = useContext(AuthContext)
  const solved = useIsDoorSolved(door)

  // Redirect home if no challenge found.
  if (!isLoading && !challenge)
    navigate("/")

  useLayoutEffect(() => {
    if (!door || (!isLoading && !challenge))
      navigate("/")
  }, [door, isLoading, challenge, navigate])

  if (!door || (!isLoading && !challenge))
    return null

  return (
    <Page className="relative">
      <div className="space-y-door-elements">
        <Challenge challenge={challenge} />
        {isAuthenticated && solved && <PostsSection door={door} />}
      </div>
      <ServiceMessageAlert
        door={door}
        className="w-9 h-10 md:w-12 md:h-12 absolute left-12 md:left-20 top-16"
      />
    </Page>
  )
}

export default Door

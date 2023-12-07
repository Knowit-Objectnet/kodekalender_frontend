import { FC, memo, useLayoutEffect, useMemo, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { isNil, minBy, values } from "lodash-es"

import Challenge from "../../components/Door/Challenge"
import PostsSection from "../../components/Posts/PostsSection"
import DoorSelect from "../../components/Admin/DoorSelect"
import {
  useChallenge,
  useChallenges,
  useDeleteChallenge,
  usePosts as useAdminPosts
} from "../../api/admin/requests"
import Button from "../../components/Button"
import { LinkButton } from "../../components/LinkButton"

const Doors: FC = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const paramMatch = search.match(/door=(?<door>\d+)/)?.groups

  // Find the first available challenge in case we need to choose a default door
  const { data: challenges } = useChallenges()
  const minChallenge = useMemo(() => minBy(values(challenges), "door"), [challenges])

  const { mutate: doDeleteChallenge, isLoading: isDeleting } = useDeleteChallenge()

  const deleteChallenge = () => {
    if (
      !window.confirm(`Er du sikker på at du vil slette luke ${door} "${adminChallenge?.title}"?`)
    )
      return

    doDeleteChallenge(
      { door },
      {
        onSuccess: () => {
          setDoor(undefined)
          navigate("/admin/doors")
        }
      }
    )
  }

  const [door, setDoor] = useState<number | undefined>(paramMatch && parseInt(paramMatch.door))

  // If no door is set (through query or user choice), default to first available door
  useLayoutEffect(() => {
    setDoor((door) => door ?? minChallenge?.door)
  }, [setDoor, minChallenge])

  const { data: adminChallenge } = useChallenge(door ?? minChallenge?.door)

  if (isNil(door)) return null

  return (
    <div className="w-11/12">
      <Challenge
        challenge={adminChallenge}
        withoutInput
        preamble={
          <div className="w-full flex flex-wrap gap-y-6 justify-between mb-16">
            <DoorSelect door={door} setDoor={setDoor} />
            <div className="flex gap-6">
              <LinkButton to={`/admin/doors/${door}/edit`} content="Rediger luke" />{" "}
              <Button disabled={isDeleting} onClick={deleteChallenge}>
                Slett luke
              </Button>
            </div>
          </div>
        }
      />
      <PostsSection door={door} usePosts={useAdminPosts} withoutInput />
    </div>
  )
}

export default memo(Doors)

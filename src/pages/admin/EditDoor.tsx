import { FC, useLayoutEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { AdminChallengePayload } from "../../api/admin/Challenge"
import { useChallenge, useUpdateChallenge } from "../../api/admin/requests"
import ChallengeForm from "../../components/Admin/ChallengeForm"
import { guardPresent } from "../../utils"


const EditDoor: FC = () => {
  const { door: doorString } = useParams<{ door: string }>()
  const door = guardPresent(doorString, parseInt)
  const navigate = useNavigate()

  const { data: challenge, isLoading } = useChallenge(door)
  const { mutate: updateChallenge } = useUpdateChallenge()

  const submit = (challenge: AdminChallengePayload) => {
    updateChallenge({ challenge }, { onSuccess: () => navigate(`/admin/doors?door=${challenge.door}`) })
  }

  useLayoutEffect(() => {
    if (!door || (!isLoading && !challenge))
      navigate("/admin/doors/new")
  }, [door, isLoading, challenge, navigate])

  if (!door || (isLoading || !challenge))
    return null

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl font-semibold">Luke {door}</span>
      </div>

      <ChallengeForm challenge={challenge} submit={submit} />
    </div>
  )
}

export default EditDoor

import { isEmpty } from "lodash-es"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { AdminChallengePayload } from "../../api/admin/Challenge"
import { useCreateChallenge } from "../../api/admin/requests"
import ChallengeForm from "../../components/Admin/ChallengeForm"
import useAvailableDoors from "../../hooks/admin/useAvailableDoors"


const NewDoor: FC = () => {
  const navigate = useNavigate()

  const { mutate: createChallenge } = useCreateChallenge()

  const submit = (challenge: AdminChallengePayload) => {
    createChallenge({ challenge }, { onSuccess: () => navigate(`/admin/doors?door=${challenge.door}`) })
  }

  const availableDoors = useAvailableDoors()

  if (isEmpty(availableDoors)) return (
    <div className="text-center">
      <span className="text-4xl font-semibold">Ingen ledige luker!</span>
    </div>
  )

  return (
    <div className="space-y-16">
      <div className="text-center">
        <span className="text-4xl font-semibold">Ny luke</span>
      </div>

      <ChallengeForm newForm challenge={{ door: availableDoors[0], title: "", author: "", answer: "", markdown_content: "", files: [] }} submit={submit} />
    </div>
  )
}

export default NewDoor

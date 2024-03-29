import { find } from "lodash-es"
import { FC, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useUpdateServiceMessage } from "../../api/admin/requests"
import { AdminServiceMessagePayload } from "../../api/admin/ServiceMessage"
import { useServiceMessages } from "../../api/requests"
import ServiceMessageForm from "../../components/Admin/ServiceMessageForm"
import { guardPresent } from "../../utils"

const EditServiceMessage: FC = () => {
  const { uuid } = useParams<{ uuid: string }>()
  const navigate = useNavigate()

  const { data: serviceMessage, isLoading } = useServiceMessages({
    select: (serviceMessages) => find(serviceMessages, { uuid })
  })
  const { mutate: updateServiceMessage } = useUpdateServiceMessage()

  const submit = (serviceMessage: AdminServiceMessagePayload) => {
    guardPresent(uuid, (uuid) =>
      updateServiceMessage(
        { uuid, service_message: serviceMessage },
        { onSuccess: () => navigate("/admin/service_messages") }
      )
    )
  }

  useEffect(() => {
    if (!isLoading && !serviceMessage) navigate("/admin/service_messages/new")
  }, [isLoading, serviceMessage, navigate])

  if (isLoading || !serviceMessage) return null

  return <ServiceMessageForm serviceMessage={serviceMessage} submit={submit} />
}

export default EditServiceMessage

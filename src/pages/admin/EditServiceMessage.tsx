import { find } from "lodash-es"
import { FC, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useUpdateServiceMessage } from "../../api/admin/requests"
import { AdminServiceMessagePayload } from "../../api/admin/ServiceMessage"
import { useServiceMessages } from "../../api/requests"
import ServiceMessageForm from "../../components/Admin/ServiceMessageForm"
import { guardPresent } from "../../utils"
import { ServiceMessage } from "../../api/ServiceMessage"

const EditServiceMessage: FC = () => {
  const { uuid } = useParams<{ uuid: string }>()
  const navigate = useNavigate()

  const { data: serviceMessage, isPending } = useServiceMessages<ServiceMessage | undefined>({
    select: (serviceMessages: ServiceMessage[]) => find(serviceMessages, { uuid })
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
    if (!isPending && !serviceMessage) navigate("/admin/service_messages/new")
  }, [isPending, serviceMessage, navigate])

  if (isPending || !serviceMessage) return null

  return <ServiceMessageForm serviceMessage={serviceMessage} submit={submit} />
}

export default EditServiceMessage

import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { useCreateServiceMessage } from "../../api/admin/requests"
import { AdminServiceMessagePayload } from "../../api/admin/ServiceMessage"
import ServiceMessageForm from "../../components/Admin/ServiceMessageForm"

const NewServiceMessage: FC = () => {
  const navigate = useNavigate()

  const { mutate: createServiceMessage } = useCreateServiceMessage()

  const submit = (serviceMessage: AdminServiceMessagePayload) => {
    createServiceMessage(
      { service_message: serviceMessage },
      { onSuccess: () => navigate("/admin/service_messages") }
    )
  }

  return (
    <div className="space-y-16">
      <div className="text-center">
        <span className="text-4xl font-semibold">Ny driftsmelding</span>
      </div>

      <ServiceMessageForm
        newForm
        serviceMessage={{
          content: "",
          resolution_content: null,
          resolved_at: null,
          door: null
        }}
        submit={submit}
      />
    </div>
  )
}

export default NewServiceMessage

import { isEmpty, map } from "lodash"
import { Link } from "react-router-dom"

import { useDeleteServiceMessage } from "../../api/admin/requests"
import { useServiceMessages } from "../../api/requests"
import Button from "../../components/Button"
import ServiceMessage from "../../components/ServiceMessage"
import { Header1 } from "../../components/text"
import { cl } from "../../utils"


const ServiceMessages = () => {
  const { data: serviceMessages, isLoading } = useServiceMessages()

  const { mutate: doDeleteServiceMessage } = useDeleteServiceMessage()

  const deleteServiceMessage = (uuid: string) => {
    if (!window.confirm("Sikker på at du vil slette driftsmelding?")) return

    doDeleteServiceMessage({ uuid })
  }

  if (isLoading) return null

  return (
    <>
      <div className="text-center">
        <Header1>Driftsmeldinger</Header1>
      </div>
      <div className="grid grid-cols-1 gap-12 justify-items-center">
        {isEmpty(serviceMessages)
          ? <div>🎄 Ingen driftsmeldinger. Livet er herlig! 🎄</div>
          : map(serviceMessages, (serviceMessage) => {
            const messageClasses = serviceMessage.resolved_at
              ? "border-yellow-400/70 text-gray/70"
              : "border-red-700/70"

            return (
              <div key={serviceMessage.uuid} className="w-full max-w-[40rem]">
                <div className="m-4 space-x-8">
                  <Link to={`/admin/service_messages/${serviceMessage.uuid}/edit`}>
                    <Button content="Rediger" />
                  </Link>
                  <Button content="Slett" onClick={() => deleteServiceMessage(serviceMessage.uuid)} />
                </div>
                <ServiceMessage
                  className={cl("border-2 p-8 rounded-md w-full", messageClasses)}
                  serviceMessage={serviceMessage}
                />
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default ServiceMessages

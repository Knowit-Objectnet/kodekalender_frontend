import { isEmpty, map } from "lodash-es"

import { useDeleteServiceMessage } from "../../api/admin/requests"
import { useServiceMessages } from "../../api/requests"
import Button from "../../components/Button"
import ServiceMessage from "../../components/ServiceMessage"
import { Header2 } from "../../components/text"
import { LinkButton } from "../../components/LinkButton"

const ServiceMessages = () => {
  const { data: serviceMessages, isLoading } = useServiceMessages()

  const { mutate: doDeleteServiceMessage } = useDeleteServiceMessage()

  const deleteServiceMessage = (uuid: string) => {
    if (!window.confirm("Sikker på at du vil slette driftsmelding?")) return

    doDeleteServiceMessage({ uuid })
  }

  if (isLoading) return null

  return (
    <div>
      <Header2 className="place-self-center">Driftsmeldinger</Header2>
      <div className="grid grid-cols-1 justify-items-center gap-12">
        {isEmpty(serviceMessages) ? (
          <div>🎄 Ingen driftsmeldinger. Livet er herlig! 🎄</div>
        ) : (
          map(serviceMessages, (serviceMessage) => (
            <div key={serviceMessage.uuid} className="flex w-full flex-col gap-4">
              <div className="flex justify-end gap-8">
                <LinkButton
                  to={`/admin/service_messages/${serviceMessage.uuid}/edit`}
                  content="Rediger"
                />
                <Button content="Slett" onClick={() => deleteServiceMessage(serviceMessage.uuid)} />
              </div>
              <ServiceMessage serviceMessage={serviceMessage} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ServiceMessages

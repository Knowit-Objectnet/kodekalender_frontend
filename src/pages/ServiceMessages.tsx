import { isEmpty, map } from "lodash-es"

import { useServiceMessages } from "../api/requests"
import ServiceMessage from "../components/ServiceMessage"

import BasicPage from "./BasicPage"

const ServiceMessages = () => {
  const { data: serviceMessages, isLoading } = useServiceMessages()

  if (isLoading) return null

  return (
    <BasicPage title="Driftsmeldinger" containerClassName="w-full px-16">
      {isEmpty(serviceMessages) ? (
        <div>🎄 Ingen driftsmeldinger. Livet er herlig! 🎄</div>
      ) : (
        map(serviceMessages, (msg) => <ServiceMessage key={msg.uuid} serviceMessage={msg} />)
      )}
    </BasicPage>
  )
}

export default ServiceMessages

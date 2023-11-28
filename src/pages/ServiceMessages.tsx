import { isEmpty, map } from "lodash-es"

import { useServiceMessages } from "../api/requests"
import ServiceMessage from "../components/ServiceMessage"
import { Header1 } from "../components/text"
import { cl } from "../utils"

import Page from "./Page"

const ServiceMessages = () => {
  const { data: serviceMessages, isLoading } = useServiceMessages()

  if (isLoading) return null

  return (
    <Page className="mx-8 space-y-16 rounded-md bg-purple-700 px-16 py-24 md:mx-16 md:px-24">
      <div className="text-center">
        <Header1>Driftsmeldinger</Header1>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-8">
        {isEmpty(serviceMessages) ? (
          <div>🎄 Ingen driftsmeldinger. Livet er herlig! 🎄</div>
        ) : (
          map(serviceMessages, (serviceMessage) => {
            const messageClasses = serviceMessage.resolved
              ? "border-yellow-400/70 text-gray/70"
              : "border-red-700/70"

            return (
              <ServiceMessage
                key={serviceMessage.uuid}
                className={cl(
                  "w-full max-w-320 rounded-md border-2 p-8",
                  messageClasses
                )}
                serviceMessage={serviceMessage}
              />
            )
          })
        )}
      </div>
    </Page>
  )
}

export default ServiceMessages

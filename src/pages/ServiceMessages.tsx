import clsx from "clsx"
import { isEmpty, map } from "lodash"

import { useServiceMessages } from "../api/requests"
import ServiceMessage from "../components/ServiceMessage"
import Header1 from "../components/text/Header1"

import Page from "./Page"


const ServiceMessages = () => {
  const { data: serviceMessages, isLoading } = useServiceMessages()

  if (isLoading) return null

  return (
    <Page className="py-12 px-8 md:px-12 mx-4 md:mx-8 bg-purple-700 rounded-md space-y-8">
      <div className="text-center">
        <Header1>Driftsmeldinger</Header1>
      </div>
      <div className="grid grid-cols-1 gap-4 justify-items-center">
        {isEmpty(serviceMessages)
          ? <div>🎄 Ingen driftsmeldinger. Livet er herlig! 🎄</div>
          : map(serviceMessages, (serviceMessage) => {
            const messageClasses = serviceMessage.resolved
              ? "border-yellow-400/70 text-gray/70"
              : "border-red-700/70"

            return (
              <ServiceMessage
                key={serviceMessage.uuid}
                className={clsx("border-2 p-4 rounded-md w-full max-w-[40rem]", messageClasses)}
                serviceMessage={serviceMessage}
              />
            )
          })
        }
      </div>
    </Page>
  )
}

export default ServiceMessages

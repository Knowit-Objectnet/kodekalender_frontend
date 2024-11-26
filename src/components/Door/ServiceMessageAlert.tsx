import { Popover } from "@headlessui/react"
import { filter, isEmpty, map, some } from "lodash-es"
import { FC } from "react"
import { FaExclamationTriangle } from "react-icons/fa"

import { useServiceMessages } from "../../api/requests"
import ServiceMessage from "../ServiceMessage"
import { cl } from "../../utils"

type ServiceMessageAlertProps = {
  door: number
  className?: string
}

const ServiceMessageAlert: FC<ServiceMessageAlertProps> = ({ door, className }) => {
  const { data: doorServiceMessages } = useServiceMessages({
    select: (serviceMessages) => filter(serviceMessages, { door })
  })

  if (isEmpty(doorServiceMessages)) return null

  const hasErrors = some(doorServiceMessages, { resolved: false })

  return (
    <div className={className}>
      <Popover className="relative">
        <Popover.Button
          as={FaExclamationTriangle}
          className={cl(
            "h-full w-full cursor-pointer",
            hasErrors ? "text-pink-900" : "text-yellow-400"
          )}
        />

        <Popover.Panel className="fixed left-[5%] min-w-[90%] md:absolute md:left-0 md:min-w-min">
          <div className="flex flex-col gap-8 rounded-md bg-purple-700 p-8 md:w-288">
            <p className="text-center font-bold">Driftsmeldinger for denne luken</p>
            {map(doorServiceMessages, (serviceMessage) => (
              <ServiceMessage key={serviceMessage.uuid} serviceMessage={serviceMessage} />
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  )
}

export default ServiceMessageAlert

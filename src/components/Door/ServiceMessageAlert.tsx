import { Popover } from "@headlessui/react"
import { filter, isEmpty, map, some } from "lodash-es"
import { FC } from "react"
import { FaExclamationTriangle } from "react-icons/fa"

import { useServiceMessages } from "../../api/requests"
import Divider from "../Divider"
import ServiceMessage from "../ServiceMessage"
import { cl } from "../../utils"

type ServiceMessageAlertProps = {
  door: number
  className?: string
}

const ServiceMessageAlert: FC<ServiceMessageAlertProps> = ({
  door,
  className
}) => {
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
            hasErrors ? "text-red-700/70" : "text-yellow-400/70"
          )}
        />

        <Popover.Panel className="fixed left-[5%] min-w-[90%] md:absolute md:left-0 md:min-w-min">
          <div
            className={cl(
              "grid place-items-center rounded-md border-2 border-opacity-70 bg-purple-700 shadow-lg",
              hasErrors ? "border-red-700" : "border-yellow-400"
            )}
          >
            {map(doorServiceMessages, (serviceMessage, idx) => (
              <>
                {idx > 0 && (
                  <Divider
                    bgClasses={cl(
                      hasErrors ? "bg-red-700/70" : "bg-yellow-400/70"
                    )}
                  />
                )}
                <ServiceMessage
                  key={serviceMessage.uuid}
                  className={cl(
                    "w-full p-8 pt-16 md:w-288 md:p-8",
                    serviceMessage.resolved && "text-opacity-70"
                  )}
                  serviceMessage={serviceMessage}
                />
              </>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  )
}

export default ServiceMessageAlert

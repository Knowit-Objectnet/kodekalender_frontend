import clsx from "clsx"
import { FC } from "react"

import { ServiceMessage as ServiceMessageType } from "../api/ServiceMessage"
import { getTimestamp } from "../utils"

import Header3 from "./text/Header3"


type ServiceMessageProps = {
  serviceMessage: ServiceMessageType
  className?: string
}

const ServiceMessage: FC<ServiceMessageProps> = ({ serviceMessage: { content, resolution_content, created_at, resolved, resolved_at, door }, className }) => (
  <div className={clsx(className, "relative space-y-2")}>
    <Header3>
      {resolved
        ? (door ? `Feil på luke ${door} (rettet)` : "Feil (rettet)")
        : (door ? `Feil på luke ${door}` : "Feil")
      }
    </Header3>
    <time className="absolute top-1 right-3 text-xs">{getTimestamp(created_at)}{resolved_at && ` — ${getTimestamp(resolved_at)}`}</time>

    <p>{resolution_content ?? content}</p>
  </div>
)

export default ServiceMessage

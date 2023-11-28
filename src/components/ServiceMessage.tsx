import { FC } from "react"

import { ServiceMessage as ServiceMessageType } from "../api/ServiceMessage"
import { cl, getTimestamp } from "../utils"

import { Header3 } from "./text"

type ServiceMessageProps = {
  serviceMessage: ServiceMessageType
  className?: string
}

const ServiceMessage: FC<ServiceMessageProps> = ({
  serviceMessage: { content, resolution_content, created_at, resolved, resolved_at, door },
  className
}) => (
  <div className={cl("relative space-y-4", className)}>
    <Header3>
      {resolved
        ? door
          ? `Feil på luke ${door} (rettet)`
          : "Feil (rettet)"
        : door
          ? `Feil på luke ${door}`
          : "Feil"}
    </Header3>
    <time className="absolute right-6 top-2 text-xs">
      {getTimestamp(created_at)}
      {resolved_at && ` — ${getTimestamp(resolved_at)}`}
    </time>

    <p>{resolution_content ?? content}</p>
  </div>
)

export default ServiceMessage

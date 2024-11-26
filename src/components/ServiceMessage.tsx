import { FC } from "react"

import { ServiceMessage as ServiceMessageType } from "../api/ServiceMessage"
import { cl, dateFormat } from "../utils"

import { Header3 } from "./text"

type ServiceMessageProps = {
  serviceMessage: ServiceMessageType
  className?: string
}

const ServiceMessage: FC<ServiceMessageProps> = ({
  serviceMessage: { content, resolution_content, created_at, resolved, resolved_at, door },
  className
}) => (
  <div
    className={cl(
      "flex w-full flex-col gap-8 rounded-md border-2 p-8",
      resolved ? "border-yellow-400" : "border-red-700",
      className
    )}
  >
    <div className="flex flex-wrap items-center justify-between">
      <Header3 as="h2">
        {`Feil${door ? ` på luke ${door}` : ""}${resolved ? " (rettet)" : ""}`}
      </Header3>
      <span className="whitespace-nowrap text-xs">
        <time>{dateFormat(new Date(created_at), "short")}</time>
        {resolved_at && (
          <>
            {" — "}
            <time>{dateFormat(new Date(resolved_at), "short")}</time>
          </>
        )}
      </span>
    </div>
    <p>{resolution_content ?? content}</p>
  </div>
)

export default ServiceMessage

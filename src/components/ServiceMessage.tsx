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
      "w-full flex flex-col gap-8 border-2 p-8 rounded-md",
      resolved ? "border-yellow-400" : "border-red-700",
      className
    )}
  >
    <div className="flex justify-between flex-wrap items-center">
      <Header3 as="h2">
        {`Feil${door ? ` på luke ${door}` : ""}${resolved ? " (rettet)" : ""}`}
      </Header3>
      <span className="text-xs whitespace-nowrap">
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

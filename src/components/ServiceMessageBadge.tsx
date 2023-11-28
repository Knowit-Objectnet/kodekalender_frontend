import { every, some } from "lodash-es"
import { FC } from "react"

import { useServiceMessages } from "../api/requests"

const ServiceMessageBadge: FC = () => {
  const { data: serviceMessages } = useServiceMessages()

  // No unresolved service messages, no badge shown
  if (every(serviceMessages, { resolved: true })) return null

  const classes = "absolute w-full h-full bg-red-600 rounded-full"

  return (
    <div className="absolute right-[-.3rem] top-[-.2rem] h-4 w-4">
      <span className={classes} />

      {/* Animate badge if there are any general service messages */}
      {some(serviceMessages, { resolved: false, door: null }) && (
        <span className={`${classes} animate-ping`} />
      )}
    </div>
  )
}

export default ServiceMessageBadge

import { find } from "lodash-es"
import { FC, useMemo, useState } from "react"
import { FaBellSlash, FaBell } from "react-icons/fa"
import { useDebounce } from "use-debounce"

import { ParentPost } from "../api"
import { useCreateSubscription, useDeleteSubscription, useSubscriptions } from "../api/requests"
import { cl } from "../utils"

type SubscribeButtonProps = {
  door?: number
  post?: ParentPost
  className?: string
}

const ANIMATION_DURATION = 700

const SubscribeButton: FC<SubscribeButtonProps> = ({ door, post, className }) => {
  const { data: subscriptions } = useSubscriptions()
  const { mutate: createSubscription } = useCreateSubscription()
  const { mutate: deleteSubscription } = useDeleteSubscription()

  const [animating, setAnimating] = useState(false)

  const subscription = find(subscriptions, door ? { door } : { postUuid: post?.uuid })
  const [debouncedSubscription] = useDebounce(subscription, ANIMATION_DURATION)

  const buttonTitle = useMemo(() => {
    const context = door ? "innlegg på denne luken" : "svar på dette innlegget"
    return subscription
      ? `Slutt å motta e-postvarsel om nye ${context}`
      : `Motta varsel på e-post om nye ${context}`
  }, [subscription, door])

  if (!subscriptions) return null
  if (!door && !post) return null

  const subscribe = () => {
    if (door) createSubscription({ door })
    else if (post) createSubscription({ postUuid: post.uuid })
  }

  const unsubscribe = () => {
    if (subscription) deleteSubscription(subscription)
  }

  const onClick = () => {
    if (subscription) unsubscribe()
    else subscribe()

    setAnimating(true)

    setTimeout(() => setAnimating(false), ANIMATION_DURATION)
  }

  return (
    <button
      className={cl(
        "origin-top transition-transform hover:-rotate-12",
        className,
        animating && "animate-bellClick"
      )}
      title={buttonTitle}
      aria-label={buttonTitle}
      onClick={onClick}
    >
      {debouncedSubscription ? <FaBellSlash /> : <FaBell />}
    </button>
  )
}

export default SubscribeButton

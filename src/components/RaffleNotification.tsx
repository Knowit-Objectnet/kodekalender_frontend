import { Link } from "react-router-dom"

import useCurrentTime from "../hooks/useCurrentTime"
import { getRaffleEnd } from "../utils"

const RaffleNotification = ({ className }: { className?: string }) => {
  const currentTime = useCurrentTime()

  if (currentTime < getRaffleEnd()) return null

  return (
    <div className={className}>
      Konkurransen er over for denne gang, men du kan fortsette å svare på luker og skrive innlegg
      til vi skrur av tjenesten en gang i løpet av januar.
      <br />
      Løsninger for årets luker finner du{" "}
      <Link to="/solutions" className="underline">
        her
      </Link>
      .
    </div>
  )
}

export default RaffleNotification

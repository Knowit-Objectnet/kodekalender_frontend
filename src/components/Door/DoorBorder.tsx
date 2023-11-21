import { FC } from "react"

import { ReactComponent as Border } from "../svg/mistletoeborder.svg"


const DoorBorder: FC = () => (
  <div className="-mb-40 z-10 relative flex justify-center !pointer-events-none">
    <Border className="w-kodekalender shrink-0" />
  </div>
)

export default DoorBorder

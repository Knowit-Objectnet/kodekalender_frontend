import { FC } from "react"

import { cl } from "../utils"

type BackgroundPauseButtonProps = {
  paused: boolean
  onTogglePaused: () => void
}

const BackgroundPauseButton: FC<BackgroundPauseButtonProps> = ({ paused, onTogglePaused }) => (
  <label
    title="Varm laptop? 🔥"
    className={cl("p-2", "shadow", "text-xs", "pointer-events-auto", "cursor-pointer")}
  >
    <input
      type="checkbox"
      className="mr-2 w-6 cursor-pointer"
      checked={paused}
      onClick={onTogglePaused} // Also triggered by click to surrounding label
      readOnly
    />
    Stopp bakgrunnsanimasjon
  </label>
)

export default BackgroundPauseButton

import { FC } from "react"

import { cl } from "../utils"


type StarBackgroundProps = {
  paused: boolean
}

const StarBackground: FC<StarBackgroundProps> = ({ paused }) => {
  const animationClasses = cl(
    "fixed",
    "h-screen",
    "w-screen",
    "before:fixed",
    "before:inset-0",
    "before:h-[calc(100vh*2)]",
    { paused }
  )

  return (
    <div className="absolute h-screen w-screen pointer-events-none overflow-hidden">
      <div
        className={cl(
          animationClasses,
          "before:bg-stars-background",
          "z-[-300]",
          { "animate-stars-background": !paused }
        )}
      />
      <div
        className={cl(
          animationClasses,
          "before:bg-stars-midground",
          "z-[-200]",
          { "animate-stars-midground": !paused }
        )}
      />
      <div
        className={cl(
          animationClasses,
          "before:bg-stars-foreground",
          "z-[-100]",
          { "animate-stars-foreground": !paused }
        )}
      />
    </div>
  )
}

export default StarBackground

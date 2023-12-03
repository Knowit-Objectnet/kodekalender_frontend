import { Howl } from "howler";
import { FC, useContext, useEffect, useRef } from "react"

import { OptionsContext } from "../OptionsContext"

import song1 from "/assets/audio/christmas-song-1.mp3"
import song2 from "/assets/audio/christmas-song-2.mp3"


const useBackgroundMusic = () => {
  const { playSound } = useContext(OptionsContext)
  const howler = useRef(new Howl({
    src: [song2, song1],
    loop: true,
    volume: 0.03
  }))

  useEffect(() => {
    if (howler.current.playing() && !playSound) {
      howler.current.pause()
      return
    }
    if (!howler.current.playing() && playSound) {
      howler.current.play()
    }
  }, [playSound])

  return <></>
}

export default useBackgroundMusic
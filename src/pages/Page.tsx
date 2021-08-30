import clsx from "clsx"
import { FC } from "react"

import BackToDoorsButton from "../components/BackToDoorsButton"
import DoorBorder from "../components/Door/DoorBorder"


type PageProps = {
  className?: string
}

const Page: FC<PageProps> = ({ className, children }) => (
  <main className={clsx("max-w-kodekalender mx-auto", className)}>
    <BackToDoorsButton />
    <DoorBorder />

    {children}
  </main>
)

export default Page
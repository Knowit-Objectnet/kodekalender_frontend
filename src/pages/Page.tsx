import BackToDoorsButton from "../components/BackToDoorsButton"
import DoorBorder from "../components/Door/DoorBorder"
import { FCWithChildren } from "../../types/utils_types"
import { cl } from "../utils"


type PageProps = {
  className?: string
  wrapperClassName?: string
}

const Page: FCWithChildren<PageProps> = ({ className, wrapperClassName, children }) => (
  <main
    className={cl(
      "w-376",
      "mx-auto",
      "pointer-events-none", // Allow click through to animation toggle
      "child:pointer-events-auto",
      "pb-8",
      wrapperClassName
    )}
  >
    <BackToDoorsButton />
    <DoorBorder />

    <div className={clsx(className)}>
      {children}
    </div>
  </main>
)

export default Page

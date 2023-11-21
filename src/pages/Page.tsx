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
      wrapperClassName
    )}
  >
    {/* <DoorBorder /> */}

    <div className={className}>
      {children}
    </div>
  </main>
)

export default Page

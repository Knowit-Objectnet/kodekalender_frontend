import DoorBorder from "../components/Door/DoorBorder"
import { FCWithChildren } from "../../types/utils_types"
import PageContent from "../components/PageContent"

type PageProps = {
  className?: string
  wrapperClassName?: string
}

const Page: FCWithChildren<PageProps> = ({ className, wrapperClassName, children }) => (
  <PageContent className={wrapperClassName}>
    {/* <DoorBorder /> */}

    <div className={className}>{children}</div>
  </PageContent>
)

export default Page

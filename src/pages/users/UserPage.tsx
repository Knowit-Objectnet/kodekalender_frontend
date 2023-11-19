import Page from "../Page"
import { FCWithChildren } from "../../../types/utils_types"
import Header1 from "../../components/text/Header1"


type UserPageProps = {
  title: string
  onSubmit?: (data: any) => void
}

const UserPage: FCWithChildren<UserPageProps> = ({ title, onSubmit, children }) => {
  const Container = onSubmit ? "form" : "div"

  return (
    <Page className="max-w-[36rem] mx-auto py-12 px-8 md:px-12 bg-purple-700 rounded-md space-y-8 grid place-content-center children:w-[clamp(16rem,50vw,24rem)]">
      <Header1 className="text-center">{title}</Header1>

      <Container className="space-y-8" onSubmit={onSubmit}>
        {children}
      </Container>
    </Page>
  )
}

export default UserPage

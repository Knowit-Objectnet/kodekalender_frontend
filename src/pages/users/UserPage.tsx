import Page from "../Page"
import { FCWithChildren } from "../../../types/utils_types"
import { Header1 } from "../../components/text"


type UserPageProps = {
  title: string
  onSubmit?: (data: any) => void
}

const UserPage: FCWithChildren<UserPageProps> = ({ title, onSubmit, children }) => {
  const Container = onSubmit ? "form" : "div"

  return (
    <Page className="max-w-288 mx-auto py-24 px-16 md:px-24 bg-purple-700 rounded-md space-y-16 grid place-content-center child:w-[clamp(16rem,50vw,24rem)]">
      <Header1 className="text-center">{title}</Header1>

      <Container className="space-y-16" onSubmit={onSubmit}>
        {children}
      </Container>
    </Page>
  )
}

export default UserPage

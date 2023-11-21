import { FCWithChildren } from "../../types/utils_types"
import { cl } from "../utils"
import Divider from "../components/Divider"
import { Header1, Header2 } from "../components/text"

import Page from "./Page"


type BasicPageProps = {
  title: string
  className?: string
}

const BasicPage: FCWithChildren<BasicPageProps> = ({ title, className, children }) => (
  <Page
    className={cl(
      `
        bg-purple-800
        rounded-[1.25rem]

        shadow-lg
        shadow-pure-black/50

        px-24
        py-27
      `,
      className
    )}
  >
    <Header1 as={Header2} className="text-center">{title}</Header1>

    <Divider bgClasses="my-12 bg-purple-500" />

    <div className="grid grid-flow-row gap-12">
      {children}
    </div>
  </Page>
)

export default BasicPage

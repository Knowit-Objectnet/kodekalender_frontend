import { FCWithChildren } from "../../types/utils_types"
import { cl } from "../utils"
import Divider from "../components/Divider"
import { Header1, Header2 } from "../components/text"

import Page from "./Page"


export type BasicPageProps = {
  title: string
  className?: string
  containerClassName?: string
  onSubmit?: (data: any) => void
}

const BasicPage: FCWithChildren<BasicPageProps> = ({ title, className, containerClassName, onSubmit, children }) => {
  const ContainerComponent = onSubmit ? "form" : "div"
  const containerProps = onSubmit ? { onSubmit } : {}
  const containerClasses = onSubmit ? "gap-6 mx-32" : "gap-12"

  return (
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

      <ContainerComponent className={cl("grid grid-flow-row", containerClasses, containerClassName)} {...containerProps }>
        {children}
      </ContainerComponent>
    </Page>
  )
}

export default BasicPage

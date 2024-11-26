import { FCWithChildren } from "../../types/utils_types"
import { cl } from "../utils"
import Divider from "../components/Divider"
import { Header1, Header2 } from "../components/text"
import { ReactComponent as SnowBorder } from "../../assets/svgo/misc/snowDesktop.svg"

import Page from "./Page"

export type BasicPageProps = {
  title?: string
  className?: string
  containerClassName?: string
  onSubmit?: (data: any) => void
}

const BasicPage: FCWithChildren<BasicPageProps> = ({
  title,
  className,
  containerClassName,
  onSubmit,
  children
}) => {
  // If onSubmit given, wrap page in a form component and set a little tighter
  // gap for form fields
  const [ContainerComponent, containerProps, containerClasses] = onSubmit
    ? (["form", { onSubmit }, "gap-6 sm:mx-32"] as const)
    : (["div", {}, "gap-12"] as const)

  return (
    <Page
      className={cl(
        `
        relative

        mx-auto
        max-w-[clamp(0rem,57.5rem,90vw+3rem)]
        rounded-[1.25rem]

        bg-purple-800

        px-8
        py-27
        shadow-lg


        shadow-pure-black/50
        sm:px-24
      `,
        className
      )}
    >
      <SnowBorder className="absolute left-[-2%] top-[clamp(-20px,calc(-0.027*100vw+5.45px),5px)] w-[104%]" />

      {title && (
        <>
          <Header2 as={Header1} className="text-center">
            {title}
          </Header2>
          <Divider bgClasses="my-12 bg-purple-500" />
        </>
      )}

      <ContainerComponent
        className={cl("grid grid-flow-row", containerClasses, containerClassName)}
        {...containerProps}
      >
        {children}
      </ContainerComponent>
    </Page>
  )
}

export default BasicPage

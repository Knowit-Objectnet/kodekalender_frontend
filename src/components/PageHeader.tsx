import { useContext } from "react"
import { Link } from "react-router-dom"

import { ReactComponent as KnowitLogo } from "/assets/svg/Knowit logo.svg"

import { AsidesContext } from "../AsidesContext"
import { getActiveYear } from "../utils"

import SignInButton from "./SignInButton"
import { Header2 } from "./text"
import ExternalLink from "./ExternalLink"
import Button from "./Button"


const PageHeader = () => {
  const { setShowMenu } = useContext(AsidesContext)

  return (
    <header className="h-60 w-full px-20">
      <nav className="h-full grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-4 md:gap-16">
        {/* Go Home */}
        <Link
          to="/"
          title="Til forsiden"
          className="place-self-center-start flex flex-col justify-center child:leading-none child:text-center"
        >
          <div className="font-bold">Kodekalender</div>
          <Header2 as="div">{getActiveYear()}</Header2>
        </Link>

        <ExternalLink href="https://knowit.no">
          <KnowitLogo />
        </ExternalLink>

        <div className="place-self-center-end flex flex-row gap-8">
          <SignInButton />

          <Button
            icon="menu"
            content="Meny"
            onClick={() => setShowMenu((state) => !state)}
          />
        </div>
      </nav>
    </header>
  )
}

export default PageHeader

import { useContext } from "react"
import { Link } from "react-router-dom"

import { ReactComponent as KnowitLogo } from "/assets/svgo/Knowit logo.svg"
import { ReactComponent as KodekalenderLogoDesktop } from "/assets/svgo/Kodekalender Logo Desktop.svg"
import { ReactComponent as KodekalenderLogoMobile } from "/assets/svgo/Kodekalender Logo Mobile.svg"

import { AsidesContext } from "../AsidesContext"

import SignInButton from "./SignInButton"
import ExternalLink from "./ExternalLink"
import Button from "./Button"


const PageHeader = () => {
  const { setShowMenu } = useContext(AsidesContext)

  return (
    <header className="h-60 w-full px-12 sm:px-20 xpx-[clamp(1.25rem,10vw,2.5rem)]">
      <nav className="h-full grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-4 md:gap-16">
        {/* Go Home */}
        <Link
          to="/"
          title="Til forsiden"
          className="place-self-center-start flex flex-col justify-center child:w-full"
        >
          <KodekalenderLogoDesktop className="hidden md:block w-60" />
          <KodekalenderLogoMobile className="block md:hidden w-30 -mt-3" />
        </Link>

        <ExternalLink href="https://knowit.no">
          <KnowitLogo className="w-50 sm:w-70" />
        </ExternalLink>

        <div className="place-self-center-end flex flex-row gap-8">
          <SignInButton linkClass="hidden md:block" className="hover:bg-transparent hover:backdrop-blur-sm hover:backdrop-brightness-75" />
          <Button
            icon="menu"
            content={<span className="hidden lg:inline">Meny</span>}
            aria-label="Åpne meny"
            title="Åpne meny"
            onClick={() => setShowMenu((state) => !state)}
            className="hover:bg-transparent hover:backdrop-blur-sm hover:backdrop-brightness-75"
          />
        </div>
      </nav>
    </header>
  )
}

export default PageHeader

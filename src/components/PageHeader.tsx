import { Link } from "react-router-dom"

import { ReactComponent as KnowitLogo } from "/assets/svgo/misc/Knowit logo.svg"
import { ReactComponent as KodekalenderLogoDesktop } from "/assets/svgo/misc/Kodekalender Logo Desktop.svg"
import { ReactComponent as KodekalenderLogoMobile } from "/assets/svgo/misc/Kodekalender Logo Mobile.svg"

import { Z_HEADER } from "../utils"

import SignInButton from "./SignInButton"
import ExternalLink from "./ExternalLink"
import { DropDownMenu } from "./DropDownMenu"
import RaffleNotification from "./RaffleNotification"


const RAFFLE_BACKGROUND_STYLE = "bg-purple-800/90 rounded-md py-2 px-3"

const PageHeader = () => (
  <header className="w-full min-h-48 py-3 sm:py-6 px-12 sm:px-20">
    <nav
      // Different column definitions to have left and right columns maintain
      // equal width, while the middle column remains centered.
      className={`
        h-full
        grid
        grid-cols-[4.6rem_1fr_4.6rem]
        md:grid-cols-[8.125rem_1fr_8.125rem]
        lg:grid-cols-[18.125rem_1fr_18.125rem]
        items-center
        justify-items-center
        gap-4
      `}>
      {/* Go Home */}
      <div className={`flex flex-col gap-4 text-center items-center ${Z_HEADER} col-start-2`}>
        <ExternalLink href="https://knowit.no">
          <KnowitLogo className="w-50 sm:w-70" />
        </ExternalLink>
        <RaffleNotification className={`max-w-[clamp(18rem,90%,36rem)] max-sm:hidden ${RAFFLE_BACKGROUND_STYLE}`} />
      </div>
    </nav>
  </header>
)

export default PageHeader

import { Transition } from "@headlessui/react"
import { isEmpty } from "lodash-es"
import { ElementType, FC, useCallback, useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { ReactComponent as KnowitLogo } from "/assets/svg/Knowit logo.svg"

import useOnClickOutside from "../hooks/useOnClickOutside"
import { cl } from "../utils"
import { useServiceMessages } from "../api/requests"
import { useIsAdmin } from "../hooks/useIsAdmin"
import { AsidesContext } from "../AsidesContext"
import { AuthContext } from "../AuthContext"
import { FCWithChildren } from "../../types/utils_types"

import SignOutButton from "./SignOutButton"
import ShowLeaderboardButton from "./ShowLeaderboardButton"
import ThemeButton from "./ThemeButton"
import Button, { ButtonProps } from "./Button"
import ServiceMessageBadge from "./ServiceMessageBadge"
import SignInButton from "./SignInButton"
import ExternalLink from "./ExternalLink"


const MenuGroup: FCWithChildren = ({ children }) => (
  <div className="flex flex-col gap-4">
    {children}
  </div>
)

const MenuButton: FC<ButtonProps & { as?: ElementType }> = ({ as = Button, ...buttonProps}) => {
  const Component = as

  return (
    <Component className="w-full text-left" sm {...buttonProps} />
  )
}

const MenuAside: FC = () => {
  const { showMenu, setShowMenu } = useContext(AsidesContext)
  const { isAuthenticated } = useContext(AuthContext)

  const clickableMenuRef = useRef<HTMLDivElement>(null)
  const [hiddenTransitioning, setHiddenTransitioning] = useState(false)

  const isAdmin = useIsAdmin()
  const { data: serviceMessages } = useServiceMessages()

  const closeHandlerWithTransition = useCallback(() => {
    setHiddenTransitioning(true)
    setTimeout(() => {
      setHiddenTransitioning(false)
      setShowMenu(false)
    }, 300)
  }, [])

  useOnClickOutside(clickableMenuRef, useCallback(() => {
    if (!clickableMenuRef.current) return

    closeHandlerWithTransition()
  }, [closeHandlerWithTransition]))

  if (!showMenu && !hiddenTransitioning) return null

  return (
    <aside
      className={`
        fixed
        pointer-events-none

        z-20
        top-48
        right-0

        w-full
        sm:w-140
        sm:pr-12
        overflow-hidden
      `}>
      <Transition
        appear={true}
        show={!hiddenTransitioning}
        enter="transition duration-300"
        enterFrom="translate-x-full sm:translate-x-[calc(100%+6rem)]"
        enterTo="translate-x-0"
        leave="transition duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full sm:translate-x-[calc(100%+6rem)]"
      >
        <div
          ref={clickableMenuRef}
          className={`
            pointer-events-auto

            flex
            flex-col
            gap-12

            bg-purple-800
            border-purple-900

            px-8
            py-12
            rounded-md
            sm:rounded-xl
          `}
        >
          <MenuGroup>
            <MenuButton as={SignInButton} />
            <MenuButton as={SignOutButton} /> {/* Hides itself if not logged in */}
            <MenuButton as={ThemeButton} className={cl({ hidden: import.meta.env.VITE_ENABLE_LIGHT_MODE !== "true" })} />
          </MenuGroup>

          <MenuGroup>
            <MenuButton as={ShowLeaderboardButton} icon="award" />

            {!isEmpty(serviceMessages) && (
              // Only show link to service messages if there are any
              <Link className="relative" to="/service_messages" tabIndex={3}>
                <MenuButton content="Driftsmeldinger" />
                <ServiceMessageBadge />
              </Link>
            )}

            {isAdmin && (
              <Link to="/admin" title="Super secret admin pages">
                <MenuButton icon="edit" content="Adminside" />
              </Link>
            )}
          </MenuGroup>

          <MenuGroup>
            <Link to="/about"><MenuButton icon="info" content="Om kodekalenderen" /></Link>
            <Link to="/privacy"><MenuButton icon="user" content="Personopplysninger" /></Link>
            <Link to="/contact"><MenuButton icon="knowit" content="Kontakt oss" /></Link>
            <Link to="/career"><MenuButton icon="mail" content="Jobb i Knowit" /></Link>
          </MenuGroup>

          <MenuGroup>
            <ExternalLink href="https://github.com/Knowit-Objectnet/" aria-label="Se hva vi gjør på GitHub"><MenuButton icon="github" content="GitHub" /></ExternalLink>
            <ExternalLink href="https://www.facebook.com/weareknowit" aria-label="Besøk oss på Facebook"><MenuButton icon="facebook" content="Facebook" /></ExternalLink>
            <ExternalLink href="https://instagram.com/weareknowit" aria-label="Følg oss på Instagram"><MenuButton icon="instagram" content="Instagram" /></ExternalLink>
            <ExternalLink href="https://twitter.com/knowitnorge" aria-label="Følg oss på Twitter/X"><MenuButton icon="twitter" content="Twitter" /></ExternalLink>
          </MenuGroup>


          <ExternalLink href="https://knowit.no" className="self-center">
            <KnowitLogo />
          </ExternalLink>
        </div>
      </Transition>
    </aside>
  )
}

export default MenuAside

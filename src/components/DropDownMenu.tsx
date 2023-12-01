import { Fragment, ReactNode, useCallback, useContext, useMemo } from "react"
import { Menu, Transition } from "@headlessui/react"
import { some } from "lodash-es"

import { Z_DROPDOWN, cl, isPresent } from "../utils"
import { useIsAdmin } from "../hooks/useIsAdmin"
import { useServiceMessages } from "../api/requests"
import { OptionsContext } from "../OptionsContext"
import { AuthContext } from "../AuthContext"

import Icon from "./Icons/Icon"
import SignInButton from "./SignInButton"
import SignOutButton from "./SignOutButton"
import ThemeButton from "./ThemeButton"
import ExternalLink from "./ExternalLink"

import { ReactComponent as KnowitLogo } from "/assets/svg/Knowit logo.svg"

import Button from "./Button"
import { LinkButton } from "./LinkButton"


const MenuGroup = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-3" role="none">
    {children}
  </div>
)

export const DropDownMenu = () => {
  const isAdmin = useIsAdmin()
  const { isAuthenticated } = useContext(AuthContext)
  const { data: serviceMessages } = useServiceMessages()
  const { showSnow, setShowSnow } = useContext(OptionsContext)

  const toggleSnow = useCallback(() => {
    setShowSnow((showSnow) => !showSnow)
  }, [setShowSnow])

  const hasUnresolvedServiceMessages = useMemo(() =>
    some(serviceMessages, (sm) => !sm.resolved),
  [serviceMessages])

  return (
    <div
      className={`
      relative
      data-[headlessui-state=active]:descendant:ring
      data-[headlessui-state=active]:descendant:ring-inset
      `}
    >
      <Menu>
        <Menu.Button
          as={Button}
          className="hover:bg-transparent hover:backdrop-blur-sm hover:backdrop-brightness-75"
        >
          <Icon
            name="menu"
            className="md:mr-3 max-md:child:left-0 max-md:child:top-0"
          />
          <span
            className={cl(
              "hidden md:block",
              hasUnresolvedServiceMessages && "text-yellow-500"
            )}
          >
            Meny
          </span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`
              absolute
              right-0
              mt-2

              rounded-md
              px-8
              py-12
              bg-purple-800

              flex
              flex-col
              items-center
              gap-12

              child:w-full

              ${Z_DROPDOWN}
           `}
          >
            <MenuGroup>
              <Menu.Item>
                <SignInButton />
              </Menu.Item>

              {isAuthenticated && (
                <Menu.Item>
                  <SignOutButton className="w-full font-normal" />
                </Menu.Item>
              )}

              {import.meta.env.VITE_ENABLE_LIGHT_MODE === "true" && (
                <Menu.Item>
                  <ThemeButton className="w-full" />
                </Menu.Item>
              )}
              <Menu.Item>
                <Button
                  icon="snow"
                  content={showSnow ? "Skru av snø" : "Skru på snø"}
                  onClick={toggleSnow}
                ></Button>
              </Menu.Item>
            </MenuGroup>

            <MenuGroup>
              <Menu.Item>
                <LinkButton
                  to="/leaderboard"
                  name="award"
                  content="Ledertavle"
                />
              </Menu.Item>

              {isPresent(serviceMessages) && (
                <Menu.Item>
                  <LinkButton
                    to="/service_messages"
                    name="bell"
                    content="Driftsmeldinger"
                    className={cl(hasUnresolvedServiceMessages && "text-yellow-500")}
                  />
                </Menu.Item>
              )}

              {isAdmin && (
                <Menu.Item>
                  <LinkButton to="/admin" name="edit" content="Adminside" />
                </Menu.Item>
              )}
            </MenuGroup>

            <MenuGroup>
              <Menu.Item>
                <LinkButton
                  to="/about"
                  name="info"
                  content="Om kodekalenderen"
                />
              </Menu.Item>

              <Menu.Item>
                <LinkButton
                  to="/privacy"
                  name="user"
                  content="Personopplysninger"
                />
              </Menu.Item>

              <Menu.Item>
                <LinkButton to="/contact" name="knowit" content="Kontakt oss" />
              </Menu.Item>

              <Menu.Item>
                <LinkButton to="/career" name="mail" content="Jobb i Knowit" />
              </Menu.Item>
            </MenuGroup>

            <MenuGroup>
              <Menu.Item>
                <LinkButton
                  external
                  to="https://github.com/Knowit-Objectnet/"
                  name="github"
                  content="GitHub"
                  aria-label="Se hva vi gjør på GitHub"
                />
              </Menu.Item>

              <Menu.Item>
                <LinkButton
                  external
                  to="https://www.facebook.com/weareknowit"
                  name="facebook"
                  content="Facebook"
                  aria-label="Besøk oss på Facebook"
                />
              </Menu.Item>

              <Menu.Item>
                <LinkButton
                  external
                  to="https://instagram.com/weareknowit"
                  name="instagram"
                  content="Instagram"
                  aria-label="Følg oss på Instagram"
                />
              </Menu.Item>

              <Menu.Item>
                <LinkButton
                  external
                  to="https://twitter.com/knowitnorge"
                  name="twitter"
                  content="Twitter"
                  aria-label="Følg oss på Twitter/X"
                />
              </Menu.Item>
            </MenuGroup>

            <ExternalLink
              href="https://knowit.no"
              className="flex justify-center"
            >
              <KnowitLogo />
            </ExternalLink>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

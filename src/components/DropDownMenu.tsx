import { Fragment, ReactNode } from "react"
import { Menu, MenuItemsProps, Transition } from "@headlessui/react"

import Icon, { IconProps } from "./Icons/Icon"
import SignInButton from "./SignInButton"
import SignOutButton from "./SignOutButton"
import ThemeButton from "./ThemeButton"

import { cl } from "../utils"

import { Link } from "react-router-dom"
import { isEmpty } from "lodash-es"

import { useIsAdmin } from "../hooks/useIsAdmin"
import { useServiceMessages } from "../api/requests"

import ServiceMessageBadge from "./ServiceMessageBadge"
import ExternalLink from "./ExternalLink"

import { ReactComponent as KnowitLogo } from "/assets/svg/Knowit logo.svg"


export const LinkButton = ({
  to,
  name,
  content,
  external = false
}: {
  to: string
  name?: IconProps["name"]
  content: ReactNode
  external?: boolean
}) => (
  <Link
    to={to}
    rel={external ? "noopener noreferrer" : ""}
    target={external ? "_blank" : "_self"}
  >
    <div
      className={cl(
        `
      flex
      flex-row
      items-center
      gap-3

      whitespace-nowrap
      rounded-full
      bg-purple-700
      px-12

      py-3
      hover:bg-purple-900
      hover:ring
      hover:ring-inset

      hover:ring-purple-700
      focus:outline-none
      focus:ring
      focus:ring-inset

      focus:ring-purple-100
      active:bg-purple-500
`
      )}
    >
      {name && <Icon name={name} className="h-10 w-10" />}
      {content}
    </div>
  </Link>
)

const DropDownMenuItem = ({
  children,
  ...rest
}: MenuItemsProps<"div"> & { children: ReactNode }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          {...rest}
          className={cl(
            active && "rounded-full bg-purple-900 outline-none ring ring-inset"
          )}
        >
          {children}
        </div>
      )}
    </Menu.Item>
  )
}
export const DropDownMenu = () => {
  const isAdmin = useIsAdmin()
  const { data: serviceMessages } = useServiceMessages()

  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="rounded-full bg-purple-700 px-12 py-3 hover:bg-purple-900 hover:ring hover:ring-inset hover:ring-purple-700">
          <Icon name="menu" className="mr-3" />
          Meny
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
            flex 
            flex-col 
            items-center 
            gap-12 
            rounded-md 
            bg-purple-800 
            px-8 
            py-12 
            child:w-full
           `}
          >
            <div className="flex w-full flex-col gap-3" role="none">
              <DropDownMenuItem>
                <SignInButton />
              </DropDownMenuItem>

              <DropDownMenuItem>
                <SignOutButton className="w-full font-normal" />
              </DropDownMenuItem>

              {import.meta.env.VITE_ENABLE_LIGHT_MODE === "true" && (
                <DropDownMenuItem>
                  <ThemeButton className="w-full" />
                </DropDownMenuItem>
              )}
            </div>

            <div className="flex flex-col gap-3" role="none">
              <DropDownMenuItem>
                <LinkButton
                  to="/leaderboard"
                  name="award"
                  content="Ledertavle"
                />
              </DropDownMenuItem>

              {!isEmpty(serviceMessages) && (
                <DropDownMenuItem>
                  <LinkButton
                    to="/service_messages"
                    content={
                      <>
                        <ServiceMessageBadge />
                        Driftsmeldinger
                      </>
                    }
                  />
                </DropDownMenuItem>
              )}

              {isAdmin && (
                <DropDownMenuItem>
                  <LinkButton to="/admin" name="edit" content="Adminside" />
                </DropDownMenuItem>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <DropDownMenuItem>
                <LinkButton
                  to="/about"
                  name="info"
                  content="Om kodekalenderen"
                />
              </DropDownMenuItem>

              <DropDownMenuItem>
                <LinkButton
                  to="/privacy"
                  name="user"
                  content="Personopplysninger"
                />
              </DropDownMenuItem>

              <DropDownMenuItem>
                <LinkButton to="/contact" name="knowit" content="Kontakt oss" />
              </DropDownMenuItem>

              <DropDownMenuItem>
                <LinkButton to="/career" name="mail" content="Jobb i Knowit" />
              </DropDownMenuItem>
            </div>

            <div className="flex flex-col gap-3">
              <DropDownMenuItem>
                <LinkButton
                  external
                  to="https://github.com/Knowit-Objectnet/"
                  name="github"
                  content="GitHub"
                  aria-label="Se hva vi gjør på GitHub"
                />
              </DropDownMenuItem>

              <DropDownMenuItem>
                <LinkButton
                  external
                  to="https://www.facebook.com/weareknowit"
                  name="facebook"
                  content="Facebook"
                  aria-label="Besøk oss på Facebook"
                />
              </DropDownMenuItem>

              <DropDownMenuItem>
                <LinkButton
                  external
                  to="https://instagram.com/weareknowit"
                  name="instagram"
                  content="Instagram"
                  aria-label="Følg oss på Instagram"
                />
              </DropDownMenuItem>

              <DropDownMenuItem>
                <LinkButton
                  external
                  to="https://twitter.com/knowitnorge"
                  name="twitter"
                  content="Twitter"
                  aria-label="Følg oss på Twitter/X"
                />
              </DropDownMenuItem>
            </div>

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

import { Link } from "react-router-dom"

import { Z_FOOTER } from "../utils"

import ExternalLink from "./ExternalLink"
import Icon from "./Icons/Icon"


const PageFooter = () => (
  <footer className={`h-60 flex flex-col justify-center gap-6 ${Z_FOOTER}`}>
    <div
      className={`
        flex
        flex-wrap
        gap-12
        max-md: gap-x-8
        max-md: gap-y-4
        justify-center
        align-center
      `}
    >
      <Link className="underline" to="/contact">
        Kontakt oss
      </Link>
      <Link className="underline" to="/career">
        Jobb i Knowit
      </Link>
    </div>

    <div className="flex gap-12 justify-center align-center">
      <ExternalLink
        href="https://github.com/Knowit-Objectnet/"
        aria-label="Se hva vi gjør på GitHub"
      >
        <Icon name="github" />
      </ExternalLink>
      <ExternalLink
        href="https://www.facebook.com/weareknowit"
        aria-label="Besøk oss på Facebook"
      >
        <Icon name="facebook" />
      </ExternalLink>
      <ExternalLink
        href="https://instagram.com/weareknowit"
        aria-label="Følg oss på Instagram"
      >
        <Icon name="instagram" />
      </ExternalLink>
      <ExternalLink
        href="https://twitter.com/knowitnorge"
        aria-label="Følg oss på Twitter/X"
      >
        <Icon name="twitter" />
      </ExternalLink>
    </div>
  </footer>
)

export default PageFooter

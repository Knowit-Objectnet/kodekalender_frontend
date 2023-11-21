import { FC } from "react"
import { Link } from "react-router-dom"

import ExternalLink from "./ExternalLink"
import Icon from "./Icons/Icon"

import { ReactComponent as KnowitLogo } from "/assets/svg/Knowit logo.svg"


const facebookLabel = "Besøk oss på Facebook"
const twitterLabel = "Følg oss på Twitter/X"
const githubLabel = "Se hva vi gjør på GitHub"
const instagramLabel = "Følg oss på Instagram"

const PageFooter: FC = () => (
  <footer className="mt-19 space-y-6">
    <div className="grid justify-center">
      <ExternalLink href="https://knowit.no">
        <KnowitLogo />
      </ExternalLink>
    </div>

    <div className="flex gap-12 justify-center align-center">
      <Link className="underline" to="/about">Om kodekalenderen</Link>
      <Link className="underline" to="/privacy">Personopplysninger</Link>
      <Link className="underline" to="/contact">Kontakt oss</Link>
      <Link className="underline" to="/career">Jobb i Knowit</Link>
    </div>

    <div className="flex gap-12 justify-center align-center">
      <ExternalLink href="https://github.com/knowit/" aria-label={githubLabel}><Icon name="github" /></ExternalLink>
      <ExternalLink href="https://www.facebook.com/weareknowit" aria-label={facebookLabel}><Icon name="facebook" /></ExternalLink>
      <ExternalLink href="https://instagram.com/weareknowit" aria-label={instagramLabel}><Icon name="instagram" /></ExternalLink>
      <ExternalLink href="https://twitter.com/knowitnorge" aria-label={twitterLabel}><Icon name="twitter" /></ExternalLink>
    </div>
  </footer>
)

export default PageFooter

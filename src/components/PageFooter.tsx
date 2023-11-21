import { FC } from "react"
import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaMedium, FaGithub } from "react-icons/fa"

import ExternalLink from "./ExternalLink"

const facebookLabel = "Besøk oss på Facebook"
const twitterLabel = "Følg oss på Twitter/X"
const githubLabel = "Se hva vi gjør på GitHub"
const mediumLabel = "Følg oss på Medium"
// TODO: Instagram?

const PageFooter: FC = () => (
  <footer className="md:mt-16 lg:mt-32 space-y-8 max-w-336 text-center p-16 md:p-4 m-auto">
    <div className="m-auto flex justify-between align-center">
      <Link className="underline" to="/about">Om kodekalenderen</Link>
      <Link className="underline" to="/gdpr">Personopplysninger</Link>
      <a className="underline" href="mailto:julekalender@knowit.no" title="Send oss en e-post!">Kontakt oss</a>
      <ExternalLink
        className="underline"
        href="https://careernorway.knowit.no/jobs/1480266-systemutvikler-backend-mobil-og-eller-frontend"
        title="Søk på stilling som Systemutvikler Backend, Mobil og/eller Frontend!"
      >
        Jobb i Knowit
      </ExternalLink>
    </div>

    {/* Hvordan få med denne? Den er morsom :) */}
    {/* <p>
      Dersom du ønsker å vite mer om Knowit må du gjerne ta kontakt med
      en av våre alver på <a className="underline" href="mailto:julenissen@knowit.no">julenissen@knowit.no</a>
      for en uformell prat.
    </p> */}

    <div className="m-auto flex justify-between align-center">
      <ExternalLink href="https://www.facebook.com/weareknowit" aria-label={facebookLabel}><FaFacebook /></ExternalLink>
      <ExternalLink href="https://twitter.com/knowitnorge" aria-label={twitterLabel}><FaTwitter /></ExternalLink>
      <ExternalLink href="https://github.com/knowit/" aria-label={githubLabel}><FaGithub /></ExternalLink>
      <ExternalLink href="https://knowitlabs.no/" aria-label={mediumLabel}><FaMedium /></ExternalLink>
    </div>
  </footer>
)

export default PageFooter

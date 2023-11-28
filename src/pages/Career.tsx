import Button from "../components/Button"
import ExternalLink from "../components/ExternalLink"

import BasicPage from "./BasicPage"

const Career = () => (
  <BasicPage title="Jobbe i Knowit?">
    <p>
      Dersom du ønsker å vite mer om Knowit må du gjerne ta kontakt med en av
      våre alver for en uformell prat!
    </p>

    <div className="flex justify-center gap-8">
      <ExternalLink
        className="underline"
        href="https://careernorway.knowit.no/jobs/1480266-systemutvikler-backend-mobil-og-eller-frontend"
        title="Søk på stilling som Systemutvikler Backend, Mobil og/eller Frontend!"
      >
        <Button icon="link">Jobb i Knowit</Button>
      </ExternalLink>
      <a href="mailto:julenissen@knowit.no">
        <Button icon="mail">Kontakt alvene</Button>
      </a>
    </div>
  </BasicPage>
)

export default Career

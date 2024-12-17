import { LinkButton } from "../components/LinkButton"

import BasicPage from "./BasicPage"

const Career = () => (
  <BasicPage title="Jobbe i Knowit?">
    <p>
      Dersom du ønsker å vite mer om Knowit må du gjerne ta kontakt med en av våre alver for en
      uformell prat!
    </p>

    <div className="flex flex-wrap justify-center gap-8">
      <LinkButton
        className="underline"
        to="https://careernorway.knowit.no/jobs/1480266-systemutvikler-backend-mobil-og-eller-frontend"
        title="Søk på stilling som Systemutvikler Backend, Mobil og/eller Frontend!"
        content="Jobb i Knowit"
        icon="link"
        external
      />
      <LinkButton to="mailto:julenissen@knowit.no" content="Kontakt alvene" icon="mail" />
    </div>
  </BasicPage>
)

export default Career

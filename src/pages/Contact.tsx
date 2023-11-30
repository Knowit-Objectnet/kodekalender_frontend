import { LinkButton } from "../components/LinkButton"

import BasicPage from "./BasicPage"

const Contact = () => (
  <BasicPage title="Kontakt oss">
    <p className="-mb-4 text-center">
      Følg utviklingen og kom med innspill eller Pull Requests på GitHub!
    </p>
    <div className="flex flex-wrap justify-center gap-8">
      <LinkButton
        name="link"
        external
        content="Knowit GitHub - Kodekalender"
        to="https://github.com/Knowit-Objectnet/kodekalender_frontend"
      />
      <LinkButton
        name="link"
        external
        content="Knowit GitHub - Kodekalender"
        to="https://github.com/Knowit-Objectnet"
      />
    </div>

    <p className="mt-8 -mb-4 text-center">
      Funnet en feil? Ris eller ros? Send oss en mail!
    </p>
    <LinkButton
      className="justify-self-center inline-flex w-fit"
      name="mail"
      to="mailto:julekalender@knowit.no"
      content="Kontakt oss"
    />
  </BasicPage>
)

export default Contact

import Button from "../components/Button"
import ExternalLink from "../components/ExternalLink"

import BasicPage from "./BasicPage"


const Contact = () => (
  <BasicPage title="Kontakt oss">
    <p className="-mb-4 text-center">Følg utviklingen og kom med innspill eller Pull Requests på GitHub!</p>
    <div className="flex flex-wrap justify-center gap-8">
      <ExternalLink href="https://github.com/Knowit-Objectnet/kodekalender_frontend">
        <Button icon="link">
          Knowit GitHub - Kodekalender
        </Button>
      </ExternalLink>

      <ExternalLink href="https://github.com/Knowit-Objectnet">
        <Button icon="link">
          Knowit GitHub
        </Button>
      </ExternalLink>
    </div>

    <p className="mt-8 -mb-4 text-center">Funnet en feil? Ris eller ros? Send oss en mail!</p>
    <a className="text-center" href="mailto:julekalender@knowit.no" title="Send oss en e-post!">
      <Button icon="mail">
        Kontakt oss
      </Button>
    </a>
  </BasicPage>
)

export default Contact

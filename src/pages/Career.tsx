import { LinkButton } from "../components/LinkButton"

import Divider from "../components/Divider"
import BasicPage from "./BasicPage"

const Career = () => (
  <BasicPage title="Jobbe i Knowit?" containerClassName="gap-24">
    <div className="grid gap-12">
      <p>
        Vi er alltid på jakt etter dyktige alver i våre rekker! Kanskje kan du hjelpe oss med neste
        års julekalender?
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        <LinkButton
          to="https://www.knowit.no/jobb-hos-oss/ledige-stillinger/?Sted=Oslo"
          title="Søk på stilling i Oslo: Systemutvikler Backend, Mobil og/eller Frontend!"
          content="Jobb i Oslo"
          icon="link"
          external
        />
        <LinkButton
          to="https://www.knowit.no/jobb-hos-oss/ledige-stillinger/?Sted=Bergen"
          title="Søk på stilling i Bergen: Du er utvikleren som utvikler oss!"
          content="Jobb i Bergen"
          icon="link"
          external
        />
        <LinkButton
          to="https://www.knowit.no/jobb-hos-oss/ledige-stillinger/?Sted=Trondheim"
          title="Søk på stilling i Trondheim: Bli med på Knowits eventyr i Trondheim!"
          content="Jobb i Trondheim"
          icon="link"
          external
        />
      </div>
    </div>

    <Divider />

    <div className="grid gap-12">
      <p>
        Om du ønsker å vite mer om å jobbe i Knowit kan du ta kontakt med julenissen for en prat.
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        <LinkButton to="mailto:julenissen@knowit.no" content="julenissen@knowit.no" icon="mail" />
      </div>
    </div>
  </BasicPage>
)

export default Career

import { FC } from "react"
import { Link } from "react-router-dom"

import Button from "../components/Button"

import BasicPage from "./BasicPage"

const Welcome: FC = () => (
  <BasicPage title="Velkommen!" containerClassName="text-center">
    <p>
      Så gøy at du blir med i kodekalenderen vår! Det er like moro å arrangere hvert år (tross noen
      sene kvelder for å dra det i land) og snart er vi i gang! Du vil motta en e-post når vi legger
      ut den første luken i tilfelle du glemmer at det er blitt desember allerede.
    </p>

    <p>
      Vi gleder oss til å se hva slags gøyale løsninger dere kommer på i år. Ses i kommentarfeltet!
      🧝‍♂🧝‍♀️️🧝🎄
    </p>

    <Link to="/" className="mx-auto">
      <Button primary content="Tilbake til forsiden" />
    </Link>
  </BasicPage>
)

export default Welcome

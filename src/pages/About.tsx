import { Link } from "react-router-dom"

import Button from "../components/Button"

import BasicPage from "./BasicPage"


const About = () => (
  <BasicPage title="Om kodekalenderen">
    <p>
      Kodekalenderen er høytidskalenderen for deg som er glad i
      programmering. Bak hver luke skjuler det seg en oppgave du må svare
      på i form av en enkel tekststreng eller et tall. Lukene varierer i
      vanskelighetsgrad og utforming, men felles for alle er at de er
      best egnet for å løses med kode.
    </p>
    <p>
      En ny luke åpnes hver dag klokken 04:00 helt fram til jul. For hver
      luke du løser får du et lodd i trekningen av en valgfri telefon eller
      nettbrett.
    </p>
    <p>
      Konkurransen stenges natt til andre juledag, så du får en dag ekstra i
      julefreden til å prøve på de lukene du mangler. Løs så mange luker som
      mulig for å øke vinnersjansene dine!
    </p>
    <p className="text-center">
      {/* TODO: Fix emoji accessibility (?) */}
      🎄 <em>Lykke til og god jul!</em> 🎄
    </p>

    {/* TODO: Hide if signed in */}
    <Link className="inline-block place-self-center" to="/users">
      <Button icon="edit">Registrer deg</Button>
    </Link>
  </BasicPage>
)

export default About

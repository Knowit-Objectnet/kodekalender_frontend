import { map } from "lodash-es"

import Divider from "../components/Divider"
import { getActiveYear, squish } from "../utils"
import { Header2, Header4 } from "../components/text"

import BasicPage from "./BasicPage"


const SECTIONS = [
  [
    "Behandlingsansvarlig",
    `Kristin Meyer Kristiansen er på vegne av Knowit Objectnet AS
    behandlingsansvarlig for selskapets behandling av personopplysninger.`
  ],
  [
    "Personopplysninger som lagres",
    `Vi lagrer følgende personopplysninger om våre brukere: e-post, brukernavn
    og eventuelt profilbilde lastet opp eller oppgitt ved URL. Brukernavn og
    profilbilde er synlig i løsningen.`
  ],
  [
    "Formål med behandlingen",
    "Påmelding/deltagelse i konkurranse."
  ],
  [
    "Grunnlaget for behandlingen",
    `Innhentede data er nødvendig for å delta i konkurranse og diskusjonsfelt,
    samt for å kontakte vinner og vise statistikk over løste oppgaver. Dine data
    kan brukes til rekrutteringsformål om du har gitt samtykke til dette.`
  ],
  [
    "Innhenting av personopplysninger",
    `Vi bruker informasjonskapsler/cookies på våre nettsider for å gi deg som
    besøker siden best brukeropplevelse.`
  ],
  [
    "Utlevering av opplysninger til tredjeparter",
    `Vi vil ikke dele, selge, overføre eller på annen måte utlevere
    personopplysninger til andre.`
  ],
  [
    "Sletting av personopplysninger",
    `Personopplysninger vi har mottatt i forbindelse med deltagelse vil lagres
    for at brukere skal kunne bruke samme konto om igjen neste gang
    julekalenderen arrangeres. Brukerdata kan slettes permanent via nettsiden
    eller ved å kontakte oss via en av e-postadressene under.`
  ],
  [
    "Rettigheter for den registrerte",
    `Vi behandler dine personopplysninger i henhold til personopplysningsloven
    og gjeldende forskrifter. Det gjøres oppmerksom på at du kan kreve innsyn i
    og flytting av egne personopplysninger, samt kreve retting eller sletting av
    opplysninger. Det kan klages til Datatilsynet på behandling i strid med
    reglene.`
  ],
  [
    "Personvernombud",
    `Vi har et personvernombud, Kristin Meyer Kristiansen, som påser at
    personopplysningslovens regler om behandling av personopplysninger blir
    fulgt.`
  ],
  [
    "Informasjonssikkerhet",
    `Vi sikrer dine personopplysninger ved både fysisk og virtuell adgangs- og
    tilgangskontroll, samt ved kryptering av sensitive deler av avgitte
    opplysninger.`
  ]
]

const PrivacySection = ({ header, content }: { header: string, content: string }) => (
  <>
    <li>
      <p className="font-bold mb-2">{header}</p>
      <p>{content}</p>
    </li>
  </>
)

const Privacy = () => (
  <BasicPage title="Personverkerklæring">
    <Header4 as={Header2} className="text-center"><em>TL;DR</em></Header4>
    <ul className="list-disc mx-8">
      <li>Vi bruker cookies for innlogging.</li>
      <li>Registrert e-postadresse kan brukes til å kontakte deg om du vinner, eller til rekrutteringsformål dersom du har tillat det.</li>
      <li>Registrert brukernavn og profilbilde er synlige i diskusjonsfeltet og ledertavlen.</li>
      <li>Dersom du vil slette brukerdataen din kan du gjøre dette på brukersiden din, eller ved å kontakte oss.</li>
    </ul>

    <Divider bgClasses="my-12 bg-purple-500" />

    <Header4>Personverkerklæring for Knowit Kodekalender {getActiveYear()}</Header4>

    <ol className="list-decimal mx-8 space-y-12">
      {map(SECTIONS, ([header, content], i) => <PrivacySection key={i} header={header} content={squish(content)} />)}
    </ol>

    <div className="mt-24 text-center">
      Henvendelser om hvilke opplysninger som er registrert, retting og
      sletting kan sendes til <a className="underline" href="mailto:julekalender@knowit.no">julekalender@knowit.no</a>{" "}
      eller <a className="underline" href="mailto:personvern@knowit.no">personvern@knowit.no</a>
    </div>
  </BasicPage>
)

export default Privacy

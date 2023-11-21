import { map } from "lodash"

import Header1 from "../components/text/Header1"
import Header2 from "../components/text/Header2"
import Header3 from "../components/text/Header3"

import Page from "./Page"
import { getActiveYear } from "../utils"


const GdprSection = ({ no, header, content }: { no: number, header: string, content: string }) => (
  <>
    <Header3 className="mt-12">{no}. {header}</Header3>
    <p className="mt-2 ml-8">{content}</p>
  </>
)

const Gdpr = () => {
  const sections = [
    [
      "Behandlingsansvarlig",
      "Kristin Meyer Kristiansen er på vegne av Knowit Objectnet AS behandlingsansvarlig for selskapets behandling av personopplysninger."
    ],
    [
      "Personopplysninger som lagres",
      "Vi lagrer følgende personopplysninger om våre brukere: e-post, brukernavn og eventuelt profilbilde lastet opp eller oppgitt ved URL. Brukernavn og profilbilde er synlig i løsningen."
    ],
    [
      "Formål med behandlingen",
      "Påmelding/deltagelse i konkurranse."
    ],
    [
      "Grunnlaget for behandlingen",
      "Innhentede data er nødvendig for å delta i konkurranse og diskusjonsfelt, samt for å kontakte vinner og vise statistikk over løste oppgaver."
    ],
    [
      "Innhenting av personopplysninger",
      "Vi bruker informasjonskapsler/cookies på våre nettsider for å gi deg som besøker siden best brukeropplevelse."
    ],
    [
      "Utlevering av opplysninger til tredjeparter",
      "Vi vil ikke dele, selge, overføre eller på annen måte utlevere personopplysninger til andre."
    ],
    [
      "Sletting av personopplysninger",
      "Personopplysninger vi har mottatt i forbindelse med deltagelse vil lagres for at brukere skal kunne bruke samme konto om igjen neste gang julekalenderen holdes. Brukerdata kan slettes permanent via nettsiden eller ved å kontakte oss via en av e-postadressene under."
    ],
    [
      "Rettigheter for den registrerte",
      "Vi behandler dine personopplysninger i henhold til personopplysningsloven og gjeldende forskrifter. Det gjøres oppmerksom på at du kan kreve innsyn i og flytting av egne personopplysninger, samt kreve retting eller sletting av opplysninger. Det kan klages til Datatilsynet på behandling i strid med reglene."
    ],
    [
      "Personvernombud",
      "Vi har et personvernombud, Kristin Meyer Kristiansen, som påser at personopplysningslovens regler om behandling av personopplysninger blir fulgt."
    ],
    [
      "Informasjonssikkerhet",
      "Vi sikrer dine personopplysninger ved både fysisk og virtuell adgangs- og tilgangskontroll, samt ved kryptering av sensitive deler av avgitte opplysninger."
    ]
  ]

  return (
    <Page className="py-24 px-16 md:px-24 mx-8 md:mx-16 bg-purple-700 rounded-md">
      <Header1 className="text-center">Personvernerklæring for Kodekalenderen {getActiveYear()}</Header1>
      <Header2 className="mt-16">
        <em>TL;DR</em>
      </Header2>
      <ul className="mt-4 ml-8 mb-24">
        <li>Vi bruker cookies for innlogging.</li>
        <li>Registrert e-postadresse kan brukes til å kontakte deg om du vinner.</li>
        <li>Registrert brukernavn og profilbilde er synlige i diskusjonsfeltet og ledertavlen.</li>
        <li>Dersom du vil slette brukerdataen din kan du gjøre dette på brukersiden din, eller ved å kontakte oss.</li>
      </ul>

      {map(sections, ([header, content], i) => <GdprSection key={i} no={i + 1} header={header} content={content} />)}

      <div className="mt-24">
        Henvendelser om hvilke opplysninger som er registrert, retting og
        sletting kan sendes til <a className="underline" href="mailto:julekalender@knowit.no">julekalender@knowit.no</a>{" "}
        eller <a className="underline" href="mailto:personvern@knowit.no">personvern@knowit.no</a>
      </div>
    </Page>
  )
}

export default Gdpr

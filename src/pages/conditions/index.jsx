import { Container } from '../../components/layout/index';
import { Heading, List } from '../../components/UI';

export default function Conditions() {
  return (
    <>
      <Container text>
        <Heading title="Voorwaarden Gentlestudent" level={1} marginTop />
        <p>
          Gentlestudent hecht veel belang aan een correct gebruik van het platform en formuleert
          daarom een aantal voorwaarden:
        </p>
        <Heading title="Geregistreerde organisaties" level={2} />
        <List>
          <li>
            De beheerders van Gentlestudent kunnen nagaan welke organisaties zich hebben
            geregistreerd om leerkansen te kunnen aanbieden.
          </li>
          <li>
            Gentlestudent kan registraties van organisaties accepteren of weigeren en zal in het
            geval van acceptatie of weigering gericht communiceren met de organisatie in kwestie.
          </li>
          <li>
            Organisaties die deel uitmaken van het Gentlestudent netwerk maken dit zichtbaar door
            een sticker op een zichtbare (te zien vanaf de straatkant) plaats op te hangen.
          </li>
        </List>
        <Heading title="Formuleren en indienen van leerkansen" level={2} />
        <List>
          <li>
            Geregistreerde organisaties kunnen op het platform leerkansen formuleren volgens de
            afspraken en richtlijnen die bij het formulier staan beschreven.
          </li>
          <li>
            De beheerders van Gentlestudent dienen deze leerkans te valideren alvorens een
            publicatie mogelijk is en kunnen de door de organisatie ingevulde velden bijsturen
            indien dit zou nodig zijn.
          </li>
        </List>
        <Heading title="Koppeling aan Beacons" level={2} />
        <List>
          <li>
            De koppeling van leerkansen aan de beacons gebeurt door de beheerders van Gentlestudent.
            Arteveldehogeschool is de eigenaar van de beacons en koppelt de locatie van de
            organisatie of de plek waar de leerkans doorgaat aan een Beacon zodat push notificaties
            via de app mogelijk zijn.
          </li>
          <li>
            Beacons en de daaraan gekoppelde leerkansen kunnen door Gentlestudent te allen tijde
            worden weggenomen zodra leerkansen niet langer relevant zouden zijn.
          </li>
          <li>
            De organisatie die een leerkans heeft geformuleerd en bijgevolg een beacon heeft hangen,
            brengt de beheerders van Gentlestudent onmiddellijk op de hoogte wanneer een leerkans
            niet langer van toepassing is zodat de databank kan aangepast worden.
          </li>
        </List>
        <Heading title="Registratie voor leerkansen" level={2} />
        <List>
          <li>
            Studenten dienen zich te registreren voor een leerkans door gebruik te maken van de app.
          </li>
          <li>
            Wanneer een student zich heeft geregistreerd voor een leerkans dan dient de organisatie
            deze registratie te accepteren zodat de student weet of hij al dan niet contact kan
            opnemen om de leerkans tot een goed einde te brengen en kans te maken op de Open Badge.
          </li>
        </List>
        <Heading title="Claimen van Open Badges" level={2} />
        <List>
          <li>
            De Open Badges van leerkansen die geformuleerd worden op beginnersniveau kunnen door
            studenten geclaimd worden nadat ze de reden hebben geformuleerd waarom ze denken over
            die skills te beschikken. De organisatie kan vervolgens die badge bevestigen.
          </li>
        </List>
        <Heading title="Uitreiken van Open Badges" level={2} />
        <List>
          <li>
            Open Badges die gekoppeld zijn aan leerkansen op intermediate en expert-niveau kunnen
            niet geclaimd worden en dus enkel door de organisatie zelf gegeven worden.
          </li>
          <li>
            De organisatie kan een Open Badge geven aan de student wanneer de student aan de slag is
            gegaan met die leerkans op een manier die voldeed aan de verwachtingen.
          </li>
        </List>
        <Heading title="Nog vragen of bedenkingen?" level={2} />
        <p>
          Aarzel niet om Gentlestudent te contacteren met vragen over het privacybeleid via
          gentlestudent@arteveldehs.be
        </p>
      </Container>
    </>
  );
}

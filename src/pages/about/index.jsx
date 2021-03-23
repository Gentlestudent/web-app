import { Container } from '../../components/layout/index';
import { Heading, List } from '../../components/UI';
import sticker from '../../assets/img/about/sticker.png';
import leerresultaten from '../../assets/img/about/leerresultaten.png';
import gentrepreneur from '../../assets/img/about/logo-gentrepreneur.jpg';
import gentsmileu from '../../assets/img/about/logo-gentsmileu.jpg';
import kompanjon from '../../assets/img/about/logo-kompanjon.jpg';
import oxfam from '../../assets/img/about/logo-oxfam.jpg';
import peerby from '../../assets/img/about/logo-peerby.jpg';
import rodekruisvlaanderen from '../../assets/img/about/logo-rodekruisvlaanderen.jpg';
import startersfabriek from '../../assets/img/about/logo-startersfabriek.jpg';
import thebox from '../../assets/img/about/logo-thebox.jpg';
import banner from '../../assets/img/about/banner.jpg';

export default () => {
  return (
    <>
      <Container text>
        <Heading title="Over Ons" level={1} marginTop />
        <p>
          Studenten zijn onlosmakelijk verbonden met het leven in een stad. De stad is niet alleen
          een belangrijke ‘leef’omgeving voor studenten maar kan ook gezien worden als een dynamisch
          leercentrum waar tal van leerkansen voor hen klaarliggen. Verschillende projecten tonen
          bovendien aan dat het inzetten van studenten in authentieke buurtprojecten niet alleen
          verrijkend is voor de stad, maar zeker ook voor de professionele ontwikkeling van
          studenten. Dergelijke projecten bevorderen bovendien ook diepgaand leren.
        </p>
        <Heading title="Wat is Gentlestudent?" level={2} />
        <p>
          Arteveldehogeschool stimuleert in eerste instantie haar studenten vanuit vertrouwen in hun
          groeikracht om professioneel te handelen, kritisch na te denken en de persoon in de wereld
          te worden die ze kunnen en willen zijn en brengt studenten en burgers via Gentlestudent
          dichter bij elkaar. Gentlestudent zet in op betekenisvol en diepgaand leren en doet dat in
          voortdurende dialoog met de studenten en de initiatieven in de stad zelf. Met
          Gentlestudent stelt Arteveldehogeschool een online platform ter beschikking waarop de
          buurt en studenten elkaar vinden via diverse leerkansen, verspreid in de stad. Op dit
          platform kunnen bewoners en organisaties uit de buurt heel concrete ideeën en noden
          posten. Voor de (Gentle)studenten is dit platform een kans om hun maatschappelijk
          engagement zichtbaar te maken. Ze kunnen ideeën en noden terugvinden en zich daarna
          aanbieden om een creatieve oplossing of actie te realiseren. Ze krijgen voor hun
          gerealiseerde leerkans ook een Open Badge.
        </p>
        <div className="video-wrapper">
          <iframe
            title="Gentlestudent"
            width="100%"
            height="500"
            align="“center”"
            src="https://www.youtube.com/embed/F9GbWQECcYw"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen=""
          />
        </div>
        <Heading title="Hoe werkt Gentlestudent?" level={2} />
        <List>
          <li>
            Via dit platform verzamelen we de ideeën en noden waar inwoners en Gentse organisaties
            van de verschillende wijken in Gent mee geconfronteerd worden.
          </li>
          <li>
            De inzendingen worden ingedeeld in verschillende categorieën: (1) digitale
            geletterdheid, (2) duurzaamheid, (3) wereldburgerschap, (4) ondernemerschap, (5)
            onderzoek
          </li>
          <li>
            Deze worden vervolgens gekoppeld aan beacons (kleine slimme toestelletjes die een
            signaal uitsturen naar een smartphone). Deze beacons worden op toegankelijke plaatsen
            opgehangen zodat studenten van de Arteveldehogeschool via de app op hun smartphone een
            melding krijgen van de initiatieven die in deze wijk lopen.
          </li>
          <li>
            Uit de verschillende leerkansen kiest de student waar hij op basis van zijn talenten en
            interesse een bijdrage wil en kan leveren.
          </li>
          <li>
            De student kan zich vervolgens via de Gentlestudent App aanmelden om aan dit initiatief
            te werken en zijn of haar kennis en talenten in te zetten.
          </li>

          <li>
            Wanneer een student een leerkans tot een goed einde heeft gebracht en voldaan heeft aan
            de verwachtingen van de persoon of organisatie die deze heeft geformuleerd, dan krijgt
            de student een Open Badge.
          </li>
          <li>
            Plaatsen waar een beacon en bijgevolg leerkansen beschikbaar zijn, zijn te herkennen aan
            dit icoon:
          </li>
        </List>
        <img className="sticker" src={sticker} alt="Sticker" />
        <Heading title="Open Badges" level={2} />
        <p>
          Een Open Badge is een micro-credential in de vorm van een afbeelding waarin heel wat
          informatie over de leerkans en de verworven skills, organisator en student samen wordt
          gebracht tot een uniek en gepersonaliseerde credential. De verzamelde badges, die
          gebruikmaken van open standaarden, kunnen vervolgens op diverse platformen worden gepost.{' '}
          <a target="_blank" rel="noreferrer" href="https://badgr.io/">
            Badgr
          </a>{' '}
          is een voorbeeld van een platform waarop dergelijke open badges kunnen verzameld worden om
          zo een overzicht te bewaren van de verworven vaardigheden in diverse settings. Ook de door
          Gentlestudent uitgereikte initiatieven kunnen aan een dergelijk platform worden toegevoegd
          dankzij het gebruik van open standaarden.
        </p>
        <Heading title="Bied zelf een Gentle-meerwaarde" level={3} />
        <List>
          <li>Versterk de sfeer en dynamiek in jouw wijk of buurt</li>
          <li>Maak via het platform ideeën en inspiratie uit de wijk of buurt zichtbaar</li>
          <li>Zoek zelf creatieve oplossingen bij de noden en behoeften van jouw wijk of buurt</li>
          <li>
            Zet je talenten en kennis in op een creatieve en sociale wijze en ontwikkel ze verder in
            een informele setting
          </li>
          <li>
            Zet in op talent van de toekomst: 21st century skills, denk duurzaam, ondernemend,
            digitaal geletterd, onderzoekend of als wereldburger.
          </li>
        </List>
        <Heading title="Wat leer je door Gentlestudent?" level={2} />
        <p>
          Via Gentlestudent leren bewoners en studenten uit de buurt elkaar beter kennen en ontstaat
          een positieve dynamiek . Vanuit Arteveldehogeschool geloven we in de groeikracht van onze
          studenten en weten we dat ze op veel manieren kunnen bijdragen aan de toekomst van onze
          leefwereld. Daarom vinden we het belangrijk om bij al onze studenten in te zetten op 21st
          century skills. De leerkansen die via Gentlestudent terug te vinden zijn, zijn ingedeeld
          volgens de door Arteveldehogeschool geformuleerde Arteveldebrede leerresultaten:
        </p>
        <img className="leerresultaten" src={leerresultaten} alt="Leerresultaten" />
        <List>
          <li>
            Digitale geletterdheid: ICT inzetten als professional, digitale toepassingen worden
            adequaat en efficiënt gehanteerd om te informeren en een opdracht efficiënt uit te
            voeren
          </li>
          <li>
            Duurzaamheid: bewuste keuzes maken voor een leefbare wereld, nu en in de toekomst, hier
            en elders op de planeet
          </li>
          <li>
            Wereldburgerschap: omgaan met diversiteit op psychosociaal, cultureel, economisch en
            levensbeschouwelijk vlak, zowel lokaal, nationaal als internationaal
          </li>
          <li>
            Ondernemingszin: verder ontwikkeling van een ondernemende houding waarmee zelfstanding
            en zelfbewust kan gewerkt worden aan een eigen project
          </li>
          <li>
            Onderzoeksvaardigheden: als (zelf-)kritische professional oplossings-en praktijkgericht
            handelen vanuit een onderzoekende, zelfsturende en analytische houding
          </li>
        </List>
        <p>
          Zo kunnen studenten op een innovatieve wijze via het online platform en de bijhorende
          elementen hun sociaal engagement en hun realisaties zichtbaar maken naar de buurt, naar
          hun opleiding en naar hun latere potentiële werkgevers toe.
        </p>

        <Heading title="Visuele voorstelling van Gentlestudent" level={2} />
        <img src={banner} alt="banner" className="banner" />
        <Heading title="Technische informatie omtrent Gentlestudent" level={2} />
        <p>
          Het grafische ontwerp van Gentlestudent werd ontwikkeld door laatstejaarsstudenten uit de
          opleiding Grafische en Digitale media van Arteveldehogeschool. Het technisch ontwerp werd
          uitgevoerd via een door{' '}
          <a target="_blank" rel="noreferrer" href="https://okfn.org/network/belgium/">
            Open Knowledge Belgium
          </a>{' '}
          jaarlijks georganiseerd initiatief:{' '}
          <a target="_blank" rel="noreferrer" href="https://2018.summerofcode.be/">
            Open Summer of Code
          </a>{' '}
          waar een team van studenten onder begeleiding van een coach gedurende één maand aan de
          slag zijn gegaan om het platform en de bijhorende app te ontwikkelen. Meer informatie over
          de gebruikte technologie achter Gentlestudent is terug te vinden via deze link.
        </p>
        <Heading title="Partners" level={2} />
        <div className="partners">
          <img src={gentrepreneur} alt="gentrepreneur" />
          <img src={kompanjon} alt="kompanjon" />
          <img src={oxfam} alt="oxfam" />
          <img src={peerby} alt="peerby" />
          <img src={rodekruisvlaanderen} alt="rode kruis vlaanderen" />
          <img src={startersfabriek} alt="startersfabriek" />
          <img src={thebox} alt="the box" />
          <img src={gentsmileu} alt="gents mileu" />
        </div>
        <Heading title="Meer weten?" level={2} />
        <p>
          Gentlestudent is een non-profit initiatief van Arteveldehogeschool. Bekijk hier alvast de
          presentatie over cities of learning en Gentlestudent Neem contact op met ons via
          gentlestudent@arteveldehs.be
        </p>
      </Container>
      <style jsx>
        {`
          img.banner {
            width: 100%;
          }
          img.sticker {
            height: 15rem;
            margin-bottom: 5rem;
          }

          img.leerresultaten {
            width: 100%;
            margin: 2rem 0;
          }

          .partners {
            padding: 4rem;
          }

          .partners img {
            height: 15rem;
            padding: 0 4rem 6rem 0;
          }

          .video-wrapper {
            margin: 5rem 0;
          }
        `}
      </style>
    </>
  );
};

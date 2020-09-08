import { useRouter } from 'next/router';
import { Heading, Button } from '../../components/UI';
import { colors, spacers } from '../../assets/styles/constants';

export default () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className="container">
        <div className="grid">
          <div>
            <p>Terug naar overzicht</p>
            <Heading title="Titel komt hier" level={1} />
            <div className="detail-description">
              <div>
                <Heading className="test" title="Beschrijving" level={2} />
                <p>
                  De Gentse burgercoöperatie Energent organiseert met steun van Het Gents
                  Milieufront (GMF), Natuurpunt Gent en Beweging.net een groepsaankoop van
                  zonnepanelen: Gent Zonnestad. Zonnepanelen zijn vandaag een rendabele investering,
                  ook nu er geen subsidies meer zijn. Voor ongeveer 4.000 euro heb je een
                  installatie op je dak die je volledige jaarverbruik opwekt en die bovendien tot
                  gemiddeld 8% financieel rendement oplevert... Dat is beter dan een spaarrekening!
                  Leg zonnepanelen op je dak draag zo je steentje bij aan een klimaatneutrale stad!
                </p>
                <Heading className="test" title="Wat wordt er verwacht?" level={2} />
                <p>
                  Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent,
                  en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het
                  presentatiemateriaal is reeds beschikbaar).
                </p>
                <Heading className="test" title="Meer weten?" level={2} />
                <Button text="Bekijk meer" icon="arrow-right" />
                <Button icon="arrow-right" text="Tekst" type="button" primary />
              </div>
            </div>
          </div>

          <div className="detail-side">
            <div>
              <Heading title="Info" level={2} />
              <div className="detail-info">
                <div>
                  <p className="info-label">Organisatie</p>
                  <p>Hoger Technisch Instituut Sint-Antonius</p>
                </div>
                <div>
                  <p className="info-label">Website</p>
                  <p>https://www.htisa.be</p>
                </div>
                <div>
                  <p className="info-label">Contact</p>
                  <p>roselien.vervaet@htisa.be</p>
                </div>
                <div>
                  <p className="info-label">Locatie</p>
                  <p>Holstraat 66, 9000 Gent</p>
                </div>
                <div>
                  <p className="info-label">Periode</p>
                  <p>2019-12-02 tot en met 2025-06-30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            max-width: 1400px;
            padding: 0 50px;
            margin: 0 auto;

            margin-top: 5rem;
          }

          .grid {
            display: grid;
            grid-template: 1fr / repeat(2, 1fr);
          }

          .test {
            margin-top: 2rem;
          }

          .detail-description div {
            padding: ${spacers.large} 8rem ${spacers.large} 0;
            margin-top: ${spacers.large};
          }

          .detail-description {
            position: relative;
          }

          .detail-description::before {
            background: ${colors.blueLight};
            content: '';
            position: absolute;
            height: 100%;
            width: calc(50vw + 10rem);
            z-index: -1;
            left: calc((100vw - 1300px) / -2);
          }

          .detail-side > div {
            margin-top: 60rem;
            padding-left: 18rem;
          }

          .detail-side::before {
            background: url('https://blog.top5gent.com/hs-fs/hubfs/Ghent-In-the-morning-streets-of-the-Ghent.-Ghent-is-a-city-and-a-municipality-in-the-Flemish-Region-of-Belgium..jpg?width=1000&name=Ghent-In-the-morning-streets-of-the-Ghent.-Ghent-is-a-city-and-a-municipality-in-the-Flemish-Region-of-Belgium..jpg');
            background-repeat: no-repeat;
            background-size: cover;
            content: '';
            position: absolute;
            height: 54rem;
            width: 50%;
            right: 0;
          }

          .detail-info div {
            display: flex;
          }

          .detail-info {
            margin-top: 2rem;
          }

          .info-label {
            width: 10rem;
            font-weight: bold;
          }

          .detail-info p {
            margin: 0.5rem;
          }

          .test {
            margin-top: 4rem !important;
          }
        `}
      </style>
    </>
  );
};

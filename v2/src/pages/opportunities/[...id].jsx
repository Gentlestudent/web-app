import { useRouter } from 'next/router';
import { Heading } from '../../components/UI';
import { colors, spacers } from '../../assets/styles/constants';

export default () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className="container">
        <div className="grid">
          <div>
            <p>Knopje terug</p>
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

                <Heading title="Wat wordt er verwacht?" level={2} />
                <p>
                  Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent,
                  en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het
                  presentatiemateriaal is reeds beschikbaar).
                </p>

                <Heading title="Meer weten?" level={2} />
                <p>Klik hier om meer te weten.</p>
              </div>
            </div>
          </div>

          <div className="detail-image">
            <img src="https://via.placeholder.com/500" alt="" />
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
            padding: ${spacers.large} ${spacers.large} 0 ${spacers.large};
            margin-top: ${spacers.large};
          }

          .detail-description::before {
            background: ${colors.blueLight};
            content: '';
            position: absolute;
            height: 60rem; // variabel maken!!
            width: calc(50% + 10rem);
            z-index: -1;
            left: 0;

            display: block;
          }
        `}
      </style>
    </>
  );
};

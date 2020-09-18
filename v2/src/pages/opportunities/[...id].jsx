import Router, { useRouter } from 'next/router';
import { Heading, Button } from '../../components/UI';
import { colors, spacers, breakpoints } from '../../assets/styles/constants';
import Container from '../../components/container';

export default () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Container>
        <div className="grid">
          <div className="detail-heading">
            <div>
              <Button
                onClick={() => Router.back()}
                text="Terug naar overzicht"
                icon="arrow-left"
                back
              />
              <Heading title="Titel komt hier lange titel lsdkfj sdfl" level={1} />
            </div>
          </div>

          <div className="detail-description">
            <div>
              <Heading title="Beschrijving" level={2} />
              <p>
                De Gentse burgercoöperatie Energent organiseert met steun van Het Gents Milieufront
                (GMF), Natuurpunt Gent en Beweging.net een groepsaankoop van zonnepanelen: Gent
                Zonnestad. Zonnepanelen zijn vandaag een rendabele investering, ook nu er geen
                subsidies meer zijn. Voor ongeveer 4.000 euro heb je een installatie op je dak die
                je volledige jaarverbruik opwekt en die bovendien tot gemiddeld 8% financieel
                rendement oplevert... Dat is beter dan een spaarrekening! Leg zonnepanelen op je dak
                draag zo je steentje bij aan een klimaatneutrale stad!
              </p>
              <Heading title="Wat wordt er verwacht?" level={2} />
              <p>
                Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent,
                en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het
                presentatiemateriaal is reeds beschikbaar).
              </p>
              <Heading title="Meer weten?" level={2} />
              <Button text="Bekijk meer" icon="arrow-right" />
              <div>
                <Button icon="arrow-right" text="Schrijf je in" type="button" primary />
              </div>
            </div>
          </div>

          <div className="detail-contact">
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
      </Container>

      <style jsx>
        {`
          .grid {
            display: grid;
            grid-template: 1fr auto / repeat(2, 1fr);

            grid-template-areas:
              'heading info'
              'description info';
          }

          .detail-heading {
            grid-area: heading;
            padding-right: ${spacers.large};
            display: flex;
          }

          .detail-heading > div {
            margin-top: ${spacers.small};
          }

          .detail-description {
            grid-area: description;
            position: relative;
          }

          .detail-description > div {
            padding: ${spacers.large} ${spacers.large} ${spacers.large} 0;
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

          .detail-contact > div {
            transform: translateY(60rem);
            padding-left: 18rem;
          }

          .detail-info div {
            display: flex;
          }

          .detail-info {
            margin-top: ${spacers.small};
            grid-area: info;
          }

          .info-label {
            width: 10rem;
            font-weight: bold;
          }

          .detail-info p {
            margin: 0.5rem;
          }

          .detail-heading::after {
            background: url('https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'),
              url('https://blog.top5gent.com/hs-fs/hubfs/Ghent-In-the-morning-streets-of-the-Ghent.-Ghent-is-a-city-and-a-municipality-in-the-Flemish-Region-of-Belgium..jpg?width=1000&name=Ghent-In-the-morning-streets-of-the-Ghent.-Ghent-is-a-city-and-a-municipality-in-the-Flemish-Region-of-Belgium..jpg');
            background-repeat: no-repeat;
            background-size: 12rem, cover;
            background-position: 2rem 0, center;
            content: '';
            position: absolute;
            height: 54rem;
            width: 50%;
            right: 0;
          }

          @media (max-width: ${breakpoints.large}) {
            .grid {
              grid-template: 1fr auto / 5fr 4fr;
              grid-template-areas:
                'heading info'
                'description info';
            }

            .detail-heading::after {
              width: 45%;
            }

            .detail-description::before {
              width: calc(60vw);
              left: -8rem;
            }

            .detail-contact > div {
              padding-left: 10rem;
            }
          }

          @media (max-width: 1400px) {
            .detail-description::before {
              left: -5rem;
            }
          }

          @media (max-width: ${breakpoints.medium}) {
            .grid {
              grid-template: 1fr auto / 5fr 4fr;
              grid-template-areas:
                'heading info'
                'description info';
            }

            .detail-description::before {
              width: 57vw;
            }

            .detail-heading::after {
              width: 46vw;
            }

            .detail-contact > div {
              padding-left: ${spacers.large};
            }
          }

          @media (max-width: 1080px) {
            .grid {
              grid-template: 1fr auto / 5fr 4fr;
              grid-template-areas:
                'heading heading'
                'description info';
            }

            .detail-heading {
              flex-direction: column;
              padding: 0;
            }

            .detail-heading::after {
              width: calc(100% + 5rem);
              position: inherit;
            }

            .detail-contact > div {
              transform: translateY(0);
              padding-top: ${spacers.large};
            }

            .detail-description::before {
              top: -${spacers.large};
              height: calc(100% + ${spacers.large});
            }

            .detail-info p {
              margin: 0;
            }

            .detail-info > div {
              flex-direction: column;
              margin-bottom: 1rem;
            }
          }

          @media (max-width: 900px) {
            .detail-heading::after {
              width: calc(100% + 6rem);
              transform: translateX(-${spacers.medium});
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .grid {
              grid-template: 1fr auto / 1fr;
              grid-template-areas:
                'heading'
                'description'
                'info';
            }

            .detail-heading::after {
              width: calc(100% + (${spacers.small} * 2));
              transform: translateX(-${spacers.small});
            }

            .detail-description > div {
              padding-right: 0;
            }

            .detail-description::before {
              width: calc(100% + (${spacers.small} * 2));
              left: -${spacers.small};
            }

            .detail-contact > div {
              padding: ${spacers.large} 0 0;
            }

            .detail-info > div {
              flex-direction: row;
            }
          }
        `}
      </style>
    </>
  );
};

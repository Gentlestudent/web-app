/* eslint-disable react/prop-types */
import { routes } from '../../constants';
import { Heading, Button, Participant } from '../../components/UI';
import { colors, spacers, breakpoints } from '../../assets/styles/constants';
import { Container } from '../../components/layout/index';
import { getOpportunities, getOpportunityById } from '../../api/opportunities';
import { getReadableDate } from '../../utils/index';

const Opportunity = ({ opportunity }) => {
  // TODO: get participants for opportunity detail (with certain roles only)
  const newParticipants = [
    {
      img: 'empty',
      date: '02/03/2021',
      email: 'john.doe@gmail.com',
      name: 'John Doe',
      institute: 'Arteveldehogeschool'
    },
    {
      img: 'empty',
      date: '02/03/2021',
      email: 'jane.doe@gmail.com',
      name: 'Jane Doe',
      institute: 'Arteveldehogeschool'
    }
  ];

  const acceptedParticipants = [
    {
      img: 'empty',
      date: '02/03/2021',
      email: 'john.doe@gmail.com',
      name: 'John Doe',
      institute: 'Arteveldehogeschool'
    },
    {
      img: 'empty',
      date: '02/03/2021',
      email: 'jane.doe@gmail.com',
      name: 'Jane Doe',
      institute: 'Arteveldehogeschool'
    }
  ];

  return (
    <>
      <Container>
        <div className="detail">
          <div className="detail__heading">
            <div>
              <Button
                href={routes.OPPORTUNITIES}
                text="Terug naar overzicht"
                icon="arrow-left"
                reverse
              />
              <Heading title={opportunity.title} level={1} />
            </div>
          </div>

          <div className="detail__description">
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
              <Button text="Bekijk meer" icon="arrow-right" href={opportunity.moreInfo} />
              <div>
                <Button icon="arrow-right" text="Schrijf je in" type="button" primary />
              </div>
            </div>
          </div>

          <div className="detail__contact">
            <div>
              <Heading title="Info" level={2} />
              <div className="detail__info">
                <div className="info__wrapper">
                  <p className="info__label">Organisatie</p>
                  <p className="info__detail">Hoger Technisch Instituut Sint-Antonius</p>
                </div>
                {opportunity.website && (
                  <div>
                    <p className="info__label">Website</p>
                    <p className="info__detail">{opportunity.website}</p>
                  </div>
                )}
                {opportunity.contact && (
                  <div>
                    <p className="info__label">Contact</p>
                    <p className="info__detail">{opportunity.contact}</p>
                  </div>
                )}
                <div>
                  <p className="info__label">Locatie</p>
                  <p className="info__detail">Holstraat 66, 9000 Gent</p>
                </div>

                <div>
                  <p className="info__label">Periode</p>
                  <p className="info__detail">2019-12-02 tot en met 2025-06-30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Heading title="Inschrijvingen" level={1} marginTop />
        <Heading title="Nieuwe inschrijvingen" level={2} />
        <div className="participants">
          {newParticipants.length > 0 ? (
            newParticipants.map((participant) => (
              <Participant key={participant.name} participant={participant} withButtons />
            ))
          ) : (
            <p className="participants__empty">Geen nieuwe inschrijvingen.</p>
          )}
        </div>

        <Heading title="Geaccepteerde inschrijvingen" level={2} marginTop />
        <div className="participants">
          {acceptedParticipants.length > 0 ? (
            acceptedParticipants.map((participant) => (
              <Participant key={participant.name} participant={participant} />
            ))
          ) : (
            <p className="participants__empty">Nog geen geaccepteerde inschrijvingen.</p>
          )}
        </div>
      </Container>

      <style jsx>
        {`
          .participants__empty {
            margin-top: 2rem;
          }

          .detail {
            display: grid;
            grid-template: 1fr auto / repeat(2, 1fr);

            grid-template-areas:
              'heading contact'
              'description contact';
          }

          .detail__heading {
            grid-area: heading;
            padding-right: ${spacers.large};
            display: flex;
          }

          .detail__heading > div {
            margin-top: ${spacers.small};
          }

          .detail__heading::after {
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

          .detail__description {
            grid-area: description;
            position: relative;
          }

          .detail__description > div {
            padding: ${spacers.large} ${spacers.large} ${spacers.large} 0;
          }

          .detail__description::before {
            background: ${colors.blueLight};
            content: '';
            position: absolute;
            height: 100%;
            width: calc(50vw + 10rem);
            z-index: -1;
            left: calc((100vw - 1300px) / -2);
          }

          .detail__contact {
            grid-area: contact;
          }

          .detail__contact > div {
            transform: translateY(60rem);
            padding-left: 18rem;
          }

          .detail__info {
            margin-top: ${spacers.small};
          }

          .detail__info div {
            display: flex;
          }

          .detail__info p {
            margin: 0.5rem;
          }

          .info__label {
            width: 10rem;
            font-weight: bold;
          }

          @media (max-width: ${breakpoints.large}) {
            .detail {
              grid-template: 1fr auto / 5fr 4fr;
              grid-template-areas:
                'heading contact'
                'description contact';
            }

            .detail__heading::after {
              width: 45%;
            }

            .detail__description::before {
              width: calc(60vw);
              left: -8rem;
            }

            .detail__contact > div {
              padding-left: 10rem;
            }
          }

          @media (max-width: 1400px) {
            .detail__description::before {
              left: -5rem;
            }
          }

          @media (max-width: ${breakpoints.medium}) {
            .detail {
              grid-template: 1fr auto / 5fr 4fr;
              grid-template-areas:
                'heading contact'
                'description contact';
            }

            .detail__description::before {
              width: 57vw;
            }

            .detail__heading::after {
              width: 46vw;
            }

            .detail__contact > div {
              padding-left: ${spacers.large};
            }
          }

          @media (max-width: 1080px) {
            .detail {
              grid-template: 1fr auto / 5fr 4fr;
              grid-template-areas:
                'heading heading'
                'description contact';
            }

            .detail__heading {
              flex-direction: column;
              padding: 0;
            }

            .detail__heading::after {
              width: calc(100% + 5rem);
              position: inherit;
            }

            .detail__contact > div {
              transform: translateY(0);
              padding-top: ${spacers.large};
            }

            .detail__description::before {
              top: -${spacers.large};
              height: calc(100% + ${spacers.large});
            }

            .info__label {
              width: 100%;
              margin: 1.5rem 0 0 0;
            }

            .info__detail {
              margin: 0;
            }

            .detail__info > div {
              flex-direction: column;
              margin-bottom: 1rem;
            }
          }

          @media (max-width: 900px) {
            .detail__heading::after {
              width: calc(100% + 6rem);
              transform: translateX(-${spacers.medium});
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .detail {
              grid-template: 1fr auto / 1fr;
              grid-template-areas:
                'heading'
                'description'
                'contact';
            }

            .detail__info div {
              flex-direction: column;
            }

            .detail__info p {
              margin: 0 !important;
            }

            .detail__heading::after {
              width: calc(100% + (${spacers.small} * 2));
              transform: translateX(-${spacers.small});
            }

            .detail__description > div {
              padding-right: 0;
            }

            .detail__description::before {
              width: calc(100% + (${spacers.small} * 2));
              left: -${spacers.small};
            }

            .detail__contact > div {
              padding: ${spacers.large} 0 0;
            }

            .detail__info > div {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  );
};

export const getStaticPaths = async () => {
  // Same query as in opportunities/index.js, would be nice if this could be
  // called globally somewhere? Avoid duplicate calls
  const paths = (await getOpportunities()).map((opp) => ({ params: { id: opp.id } }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  // Will be a call for EVERY opportunity, better to store data somewhere
  // globally and filter with the id
  const opportunity = await getOpportunityById(params.id);
  opportunity.beginDate = getReadableDate(opportunity.beginDate);
  opportunity.endDate = getReadableDate(opportunity.endDate);

  return {
    props: { opportunity: { ...opportunity } }
    // revalidate: 900
  };
};

export default Opportunity;

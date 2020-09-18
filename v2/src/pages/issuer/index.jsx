import { colors, breakpoints } from '../../assets/styles/constants';
import { Heading, Button, Banner } from '../../components/UI';
import { spacers } from '../../assets/styles';
import Container from '../../components/container';

import banner from '../../assets/img/home/banner.jpg';

const Issuer = () => {
  return (
    <>
      {/* <Banner image={banner} /> */}
      <div className="heading">
        <Container>
          <div className="heading-content">
            <div className="heading-image" />

            <div className="heading-text">
              <Heading title="Word vandaag nog een issuer!" level={1} color="white" />
              <div>
                <Heading title="Wat is een issuer" level={2} color="white" />
                <p>
                  Een Issuer formuleert een leerkans voor de student. Het kan gaan over het volgen
                  van een eenmalige activiteit tot een langdurig engagement binnen de organisatie.
                  Als issuer maak je de student(en) warm voor een maatschappelijk relevante
                  leerkans.
                </p>

                <Heading title="Jij bepaalt" level={2} color="white" />
                <p>
                  Wat kan de student doen voor jou of jouw organisatie waarmee hij kan bijleren op
                  vlak van duurzaamheid, ondernemingszin, digitale geletterdheid, onderzoek of
                  wereldburgerschap.
                </p>
                <Heading title="Waarom zou ik een issuer worden?" level={2} color="white" />
                <p>
                  Als issuer breng je de studenten dichter bij de buurt, je leert ze kennismaken met
                  een authentieke context en laat hen een bijdrage leveren aan de organisatie. Je
                  bent de brugfiguur tussen studenten en hun buurt/ jouw organisatie.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="info">
          <Heading title="Hoe word ik een issuer?" level={2} />

          <div className="steps">
            <div className="step step-one">
              <Heading title="Registreer als gebruiker" level={3} />
              <p>
                Jouw organisatie of jouw initiatief is op zoek naar studenten met een
                Gentle-engagement? Maak eerst een gebruikersprofiel aan.
              </p>
            </div>
            <div className="step step-two">
              <Heading title="Registreer als issuer" level={3} />
              <p>
                Zodra je als geregistreerde gebruiker ingelogd bent kan je klikken op de knop “word
                issuer” zodat je je als organisatie kan registreren op het platform.
              </p>
            </div>
            <div className="step step-three">
              <Heading title="Wacht op goedkeuring" level={3} />
              <p>
                De admin van Gentlestudent zal je aanvraag om issuer te worden goedkeuren. Je
                ontvangt een bevestigingsmail zodra je aan de slag kan gaan met het aanbieden van
                leerkansen.
              </p>
            </div>
          </div>
          <div className="button-wrapper">
            <Button text="Word issuer" icon="arrow-right" primary />
          </div>
        </div>
      </Container>

      <style jsx>
        {`
          .heading {
            position: relative;
          }

          .heading::before {
            content: '';
            position: absolute;
            height: 100%;
            width: calc((1300px + ((100% - 1300px) / 2)) - 10rem);
            right: 0;
            z-index: -1;
            background: ${colors.orange};
          }

          .heading-content {
            padding: 5rem 5rem 5rem 0;
            color: white;
            display: grid;
            grid-template-columns: 40rem 1fr;
            grid-gap: 6rem;
          }

          .heading-image {
            background-image: url(${banner});
          }

          .heading-text {
            margin-right: 5rem;
          }

          .info {
            margin-top: 7rem;
          }

          .steps {
            margin-top: ${spacers.medium};
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: ${spacers.medium};
          }

          .step {
            padding: ${spacers.medium};
            background: ${colors.blueLight};
            position: relative;
            overflow: hidden;
          }

          .step::before {
            content: '1';
            position: absolute;
            right: -1rem;
            bottom: 0;
            color: ${colors.blue};
            font-size: 15rem;
            font-weight: 600;
            line-height: 0.7;
            opacity: 0.15;
          }

          .step-two::before {
            content: '2';
          }

          .step-three::before {
            content: '3';
          }

          .button-wrapper {
            margin-top: ${spacers.large};
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};

Issuer.propTypes = {};

export default Issuer;

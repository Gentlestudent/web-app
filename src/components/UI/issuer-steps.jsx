import { colors, breakpoints } from '../../assets/styles/constants';
import Heading from './heading';
import Button from './button';
import { spacers } from '../../assets/styles';
import { Container } from '../layout/index';

const IssuerSteps = () => {
  return (
    <>
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

          @media (max-width: 900px) {
            .info {
              margin-top: 4rem;
            }

            .steps {
              grid-template-columns: repeat(1, 1fr);
            }

            .button-wrapper {
              margin-top: ${spacers.small};
            }
          }
        `}
      </style>
    </>
  );
};

IssuerSteps.propTypes = {};

export default IssuerSteps;

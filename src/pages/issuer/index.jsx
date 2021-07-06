import { colors } from '../../assets/styles/constants';
import { spacers } from '../../assets/styles';
import { Button, Heading, BannerSplit } from '../../components/UI';
import { Container } from '../../components/layout/index';
import { routes } from '../../constants';
import requiresMissingRole from '../../hoc/requiresMissingRole';

const Issuer = () => {
  return (
    <>
      <BannerSplit>
        <Heading title="Word vandaag nog een issuer!" level={1} color="white" />
        <div>
          <Heading title="Wat is een issuer" level={2} color="white" />
          <p>
            Een Issuer formuleert een leerkans voor de student. Het kan gaan over het volgen van een
            eenmalige activiteit tot een langdurig engagement binnen de organisatie. Als issuer maak
            je de student(en) warm voor een maatschappelijk relevante leerkans.
          </p>

          <Heading title="Jij bepaalt" level={2} color="white" />
          <p>
            Wat kan de student doen voor jou of jouw organisatie waarmee hij kan bijleren op vlak
            van duurzaamheid, ondernemingszin, digitale geletterdheid, onderzoek of
            wereldburgerschap.
          </p>
          <Heading title="Waarom zou ik een issuer worden?" level={2} color="white" />
          <p>
            Als issuer breng je de studenten dichter bij de buurt, je leert ze kennismaken met een
            authentieke context en laat hen een bijdrage leveren aan de organisatie. Je bent de
            brugfiguur tussen studenten en hun buurt/ jouw organisatie.
          </p>
        </div>
      </BannerSplit>
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
            <Button text="Word issuer" icon="arrow-right" primary href={routes.issuer.REGISTER} />
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

Issuer.propTypes = {};

export default requiresMissingRole(Issuer, 'issuer');

import { colors, breakpoints, spacers } from '../../assets/styles/constants';
import banner from '../../assets/img/home/banner.jpg';
import { Heading } from '../../components/UI';
import Container from '../../components/container';

const Header = () => {
  return (
    <>
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

          @media (max-width: ${breakpoints.medium}) {
            .heading::before {
              width: calc(100% - 5rem);
            }
            .heading-text {
              margin-right: 0rem;
            }
          }

          @media (max-width: 900px) {
            .heading-content {
              grid-template-columns: 1fr;
              grid-gap: 3rem;
            }

            .heading-image {
              height: 30rem;
              width: calc(100% + 3rem);
              top: 0;
              left: -3rem;
              position: absolute;
            }

            .heading-text {
              margin-top: 30rem;
            }

            .heading-content {
              padding: ${spacers.medium} 0;
            }

            .heading::before {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

Header.propTypes = {};

export default Header;

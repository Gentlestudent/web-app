import { colors, breakpoints } from '../../assets/styles/constants';
import banner from '../../assets/img/home/banner.jpg';
import { Heading, Button } from '../../components/UI';
import { spacers } from '../../assets/styles';
import Container from '../../components/container';

const Issuer = () => {
  return (
    <>
      <Container>
        <article className="heading">
          <div className="heading-content">
            <div>
              <div className="heading-text">
                <Heading level={1} title="Aan de slag met Gentlestudent" />
                <p className="heading-slogan">Verken je stad, help je buren.</p>
                <Button text="Bekijk meer" icon="arrow-right" primary />
              </div>
            </div>
          </div>
        </article>
      </Container>

      <style jsx>
        {`
          .heading {
            position: relative;
          }

          .heading::before {
            background: url(${banner});
            background-repeat: no-repeat;
            background-size: cover;
            content: '';
            position: absolute;
            height: 60rem;
            width: 100vw;
            z-index: -1;
            left: calc((100vw - 1300px) / -2);
            top: -25rem;
          }

          .heading-content {
            position: relative;
            height: 45rem;
            margin-top: 25rem;
          }

          .heading-content::before {
            content: '';
            position: absolute;
            height: 100%;
            width: calc(100% + ((100vw - 1300px) / 2));
            z-index: -1;
            background: ${colors.blueLight};
          }

          .heading-text {
            max-width: 90rem;
            padding-right: 8rem;
          }

          .heading-content > div {
            display: flex;
            align-items: center;
            height: 100%;
            padding: ${spacers.medium} 0 ${spacers.medium} 5rem;
          }

          .heading-video {
            width: 100%;
            height: 100%;
          }

          .heading-slogan {
            font-size: 2.2rem;
            margin: 0 0 1.5rem 0;
          }

          @media (max-width: 1400px) {
            .heading::before {
              display: flex;
              left: -5rem;
            }

            .heading-content::before {
              width: 100%;
            }

            .heading-content > div {
              padding: ${spacers.medium};
            }
          }

          @media (max-width: 900px) {
            .heading::before {
              height: 50rem;
              left: -${spacers.medium};
            }

            .heading-content {
              margin-top: 15rem;
            }

            .heading-text {
              padding-right: 5rem;
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .heading-content {
              height: 70rem;
            }

            .heading::before {
              left: -${spacers.small};
            }

            .heading-text {
              padding: 0;
              margin-bottom: 5rem;
            }

            .heading-content > div {
              flex-direction: column;
              align-items: flex-start;
            }
          }

          @media (max-width: ${breakpoints.extraSmall}) {
            .heading-content {
              height: 50rem;
            }

            .heading-content > div {
              flex-direction: column;
              align-items: flex-start;
              padding: ${spacers.small};
            }
          }
        `}
      </style>
    </>
  );
};

Issuer.propTypes = {};

export default Issuer;

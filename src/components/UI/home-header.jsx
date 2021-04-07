import { colors, breakpoints } from '../../assets/styles/constants';
import Heading from './heading';
import Button from './button';
import { spacers } from '../../assets/styles';
import { Container } from '../layout/index';

const HomeHeader = () => {
  return (
    <>
      <div className="heading">
        <Container>
          <div className="heading-content">
            <div className="heading-text">
              <Heading level={1} title="Aan de slag met Gentlestudent" />
              <p className="heading-slogan">Verken je stad, help je buren.</p>
              <Button text="Bekijk meer" icon="arrow-right" primary />
            </div>
            <div className="heading-video">
              <iframe
                title="Gentlestudent"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/F9GbWQECcYw"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen=""
              />
            </div>
          </div>
        </Container>
      </div>

      <style jsx>
        {`
          .heading {
            position: relative;
            height: 45rem;
            margin-top: 25rem;
          }

          .heading::before {
            content: '';
            position: absolute;
            height: 100%;
            width: calc(1300px + ((100% - 1300px) / 2));
            right: 0;
            z-index: -1;
            background: ${colors.blueLight};
          }

          .heading-text {
            max-width: 90rem;
            padding-right: 8rem;
          }

          .heading-content {
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
              width: calc(100% - 5rem);
              left: 5rem;
            }

            .heading-content {
              padding: ${spacers.medium};
            }
          }

          @media (max-width: 900px) {
            .heading::before {
              width: calc(100% - 6rem);
              left: 3rem;
            }

            .heading-text {
              padding-right: 5rem;
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .heading {
              height: 70rem;
            }

            .heading::before {
              width: calc(100% - 4rem);
              left: 2rem;
            }

            .heading-text {
              padding: 0;
              margin-bottom: 5rem;
            }

            .heading-content {
              flex-direction: column;
              align-items: flex-start;
            }
          }

          @media (max-width: ${breakpoints.extraSmall}) {
            .heading {
              height: 50rem;
            }

            .heading-content {
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

HomeHeader.propTypes = {};

export default HomeHeader;

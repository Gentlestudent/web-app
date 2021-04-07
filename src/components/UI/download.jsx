import { colors, breakpoints } from '../../assets/styles/constants';
import Heading from './heading';
import { Container } from '../layout/index';
import mockup from '../../assets/img/home/download-mobile-app.png';
import android from '../../assets/img/home/android.png';
import ios from '../../assets/img/home/ios.png';

const Download = () => {
  return (
    <>
      <article className="download">
        <Container>
          <div className="download-content">
            <img
              className="download-mockup"
              src={mockup}
              alt="Gentlestudent app being used on a smartphone"
            />
            <div className="download-text">
              <Heading level={2} title="Download de mobile app" />
              <p>
                Om als student zicht te krijgen op waar de leerkansen zich in Gent situeren, kan je
                de Gentlestudent app downloaden. Deze app zal je melden wanneer je in de buurt bent
                van een leerkans. Via de app kan je ook het overzicht bewaren van de leerkansen waar
                je je voor hebt ingeschreven.
              </p>
              <div className="btn-group">
                <a
                  href="https://apps.apple.com/be/app/gentlestudent/id1477161341"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ios} alt="iOS download button" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=gent.gentle.student"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={android} alt="Android download button" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </article>

      <style jsx>
        {`
          .download {
            background-color: ${colors.blueLight};
            margin-top: 15rem;
            margin-bottom: -12rem;
          }

          .download-content {
            display: flex;
            align-items: center;
          }

          .download-mockup {
            position: relative;
            margin: -8rem 6rem 0 0;
            bottom: 0;
          }

          @media (max-width: ${breakpoints.medium}) {
            .download-mockup {
              position: relative;
              margin: -8rem 3rem 0 0;
              bottom: 0;
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .download {
              margin-top: 5rem;
              padding: 4rem 0;
            }

            .download-content {
              flex-direction: column;
            }

            .download-mockup {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

Download.propTypes = {};

export default Download;

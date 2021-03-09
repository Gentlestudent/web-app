import Router from 'next/router';
import Container from '../../components/container';
import { Card, Heading, Button } from '../../components/UI';
import { routes } from '../../constants';
import { colors, breakpoints, spacers } from '../../assets/styles/constants';
import banner from '../../assets/img/home/banner.jpg';

export default () => {
  return (
    <>
      <div className="heading">
        <Container>
          <div className="heading__content">
            <div className="heading__image" />
            <div className="heading__text">
              <Heading title="Jane Doe" level={1} color="white" />
              <div>
                <div className="text__item">
                  <Heading title="Email" level={2} color="white" />
                  <p>john.doe@gmail.com</p>
                </div>
                <div className="text__item">
                  <Heading title="Organisatie/onderwijsinstelling" level={2} color="white" />
                  <p>Howest</p>
                </div>
                <div className="text__item">
                  <Heading title="Rollen" level={2} color="white" />
                  <p>Admin</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="badges__wrapper">
        <Container>
          <Heading title="Mijn badges" marginTop level={1} />
          <ul className="badges">
            <li className="badge">
              <img src="https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_2.png?alt=media" />
              <div>
                <Heading title="Titeltje" level={2} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut.
                </p>
              </div>
            </li>
            <li className="badge">
              <img src="https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_wereldburgerschap_1.png?alt=media" />
              <div>
                <Heading title="Titeltje" level={2} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut.
                </p>
              </div>
            </li>
            <li className="badge">
              <div>
                <Heading title="Verdien nog meer badges" level={2} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Button text="Bekijk leerkansen" icon="arrow-right" primary />
              </div>
            </li>
          </ul>
        </Container>
      </div>

      <style jsx>
        {`
          .badges {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 3rem;
          }

          .badge {
            background: ${colors.blueLight};
            display: flex;
            align-items: center;
            padding: 3rem;
          }

          .badge img {
            width: 12rem;
            height: auto;
            margin-right: 2rem;
          }

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
            background: ${colors.blue};
          }

          .heading__content {
            padding: 5rem 5rem 5rem 0;
            color: white;
            display: grid;
            grid-template-columns: 40rem 1fr;
            grid-gap: 6rem;
          }

          .heading__image {
            background-image: url('https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
            background-size: cover;
          }

          .heading__text {
            margin-right: 5rem;
          }

          .text__item p {
            margin-top: 0.2rem;
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

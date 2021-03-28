import { Container, Grid } from '../../components/layout/index';
import { Heading, Button, BannerSplit } from '../../components/UI';
import { colors, breakpoints } from '../../assets/styles/constants';
import { routes } from '../../constants';

export default () => {
  // TODO: get profile
  const profile = {
    email: 'john.doe@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    institution: 'Arteveldehogeschool',
    role: 'Admin'
  };

  // TODO: get badges from database (not sure where this can be found in the current structure)
  const badges = [
    {
      title: 'Title',
      img:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_2.png?alt=media',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'
    },
    {
      title: 'Title',
      img:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_wereldburgerschap_1.png?alt=media',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'
    }
  ];

  return (
    <>
      <BannerSplit>
        <div className="heading">
          <Heading title={`${profile.firstName} ${profile.lastName}`} level={1} color="white" />
          <Button href={routes.user.EDIT_PROFILE} text="Bewerk profiel" icon="edit" white />
        </div>
        <div>
          <div className="text__item">
            <Heading title="Email" level={2} color="white" />
            <p>{profile.email}</p>
          </div>
          <div className="text__item">
            <Heading title="Organisatie/onderwijsinstelling" level={2} color="white" />
            <p>{profile.institution}</p>
          </div>
          <div className="text__item">
            <Heading title="Rollen" level={2} color="white" />
            <p>{profile.role}</p>
          </div>
        </div>
      </BannerSplit>

      <div className="badges__wrapper">
        <Container>
          <Heading title="Mijn badges" marginTop level={1} />
          <Grid>
            {badges.map((badge) => (
              <>
                <div className="badge">
                  <img src={badge.img} alt={badge.title} />
                  <div>
                    <Heading title={badge.title} level={2} />
                    <p>{badge.description}</p>
                  </div>
                </div>
              </>
            ))}
            <div className="badge">
              <div>
                <Heading title="Verdien nog meer badges" level={2} />
                <p>Neem deel aan leerkansen en verdien nieuwe badges!</p>
                <Button
                  href={routes.OPPORTUNITIES}
                  text="Bekijk leerkansen"
                  icon="arrow-right"
                  primary
                />
              </div>
            </div>
          </Grid>
        </Container>
      </div>

      <style jsx>
        {`
          .heading {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .badge {
            background: ${colors.blueLight};
            display: flex;
            align-items: center;
            padding: 3rem;
            grid-column-end: span 4;
          }

          .badge img {
            width: 12rem;
            height: auto;
            margin-right: 2rem;
          }

          .text__item p {
            margin-top: 0.2rem;
          }

          @media (max-width: ${breakpoints.medium}) {
            .badge {
              grid-column-end: span 6;
            }

            .heading::before {
              width: calc(100% - 5rem);
            }
          }

          @media (max-width: 900px) {
            .badge {
              grid-column-end: span 12;
            }

            .heading::before {
              width: 100%;
            }
          }

          @media (max-width: ${breakpoints.extraSmall}) {
            .badge {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  );
};

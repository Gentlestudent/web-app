import { useMemo } from 'react';
import { Container, Grid } from '../../components/layout/index';
import { Heading, Button, BannerSplit } from '../../components/UI';
import { colors, breakpoints } from '../../assets/styles/constants';
import { routes, roles } from '../../constants';
import { useAuth, usePrivateRoute, useAssertions } from '../../hooks';
import { hasRole, getBase64AsDataUrl } from '../../utils';

const Profile = () => {
  const { currentUser } = useAuth();
  const options = useMemo(() => ({ searchParams: { recipient: currentUser?.id } }), [currentUser]);
  const [assertionsError, assertionsLoading, assertions] = useAssertions({}, options);
  usePrivateRoute();

  const isAdmin = hasRole(currentUser, roles.ADMIN);
  const isIssuer = !isAdmin && hasRole(currentUser, roles.ISSUER);

  return (
    <>
      <BannerSplit>
        <div className="heading">
          <Heading title={`${currentUser?.firstName} ${currentUser?.lastName}`} level={1} color="white" />
          <Button href={routes.user.EDIT_PROFILE} text="Bewerk profiel" icon="edit" white />
        </div>
        <div>
          <div className="text__item">
            <Heading title="Email" level={2} color="white" />
            <p>{currentUser?.email}</p>
          </div>
          <div className="text__item">
            <Heading title="Organisatie/onderwijsinstelling" level={2} color="white" />
            <p>{currentUser?.institute}</p>
          </div>

          {(hasRole(currentUser, roles.ISSUER)) && (
            <div className="text__item">
              <Heading title="Rollen" level={2} color="white" />
              <p>
                {isAdmin && 'Admin'}
                {isIssuer && currentUser.issuer?.validated && 'Gevalideerde issuer'}
                {isIssuer && !currentUser.issuer?.validated && 'Issuer status aangevraagd'}
              </p>
            </div>
          )}
        </div>
      </BannerSplit>

      <div className="badges__wrapper">
        <Container>
          <Heading title="Mijn badges" marginTop level={1} />
          <Grid>
            {(assertions?.data || []).map(assertion => (
              <div key={assertion.id} className="badge">
                <img src={getBase64AsDataUrl(assertion.badge.image)} alt={assertion.badge.name} />
                <div>
                  <Heading title={assertion.badge.name} level={2} />
                  <p>{assertion.badge.description}</p>
                </div>
              </div>
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

export default Profile;

import { useReducer } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { InputField, Panel } from '../../components/form';
import { Container, Grid } from '../../components/layout/index';
import { Heading, Button, ErrorMessage } from '../../components/UI';
import { updateProfile } from '../../connector/users';
// import { reauthenticate } from '../../connector/auth';
import { useAuth, usePrivateRoute } from '../../hooks';
import fetchStatusReducer from '../../reducers/fetchStatusReducer';
import { hasRole } from '../../utils';

const EditProfile = () => {
  const { currentUser, reload } = useAuth();
  usePrivateRoute();
  const router = useRouter();
  const [state, dispatch] = useReducer(fetchStatusReducer, { loading: false });

  const getNotifInfo = (user) => {
    if (hasRole(user, 'admin')) {
      return 'Bepaal hoe je meldingen krijgt wanneer organisaties een nieuwe leerkans aanmaken.';
    }
    if (hasRole(user, 'issuer')) {
      return 'Bepaal hoe je meldingen krijgt wanneer jouw leerkans werd goedgekeurd en wanneer studenten zich aanmelden aan een leerkans. ';
    }
    if (hasRole(user, 'participant')) {
      return 'Bepaal hoe je meldingen krijgt wanneer je aanvraag om deel te nemen aan een leerkans gereviewed werd.';
    }
    return 'Bepaal hoe je meldingen krijgt.';
  };

  const editProfile = async (values) => {
    dispatch(['INIT']);
    try {
      // // reauthenticate the user;
      // await reauthenticate(values);

      await updateProfile(values);
      reload();
      dispatch(['COMPLETE', {}]);
    } catch (err) {
      dispatch(['ERROR', err]);
    }
  };

  const editNotifications = async (values) => {
    dispatch(['INIT']);
    try {
      await updateProfile(values);
      reload();
      dispatch(['COMPLETE', {}]);
    } catch (err) {
      dispatch(['ERROR', err]);
    }
  };

  return (
    <>
      <Container>
        <Grid>
          <>
            <div className="edit__profile">
              <Panel>
                <>
                  <Button
                    onClick={() => router.back()}
                    text="Terug naar profiel"
                    icon="arrow-left"
                    reverse
                  />

                  <Heading title="Bewerk profiel" />
                  <ErrorMessage code={state.error?.code} />
                  <Formik
                    enableReinitialize
                    initialValues={{
                      email: currentUser?.email || '',
                      firstName: currentUser?.firstName || '',
                      lastName: currentUser?.lastName || '',
                      institute: currentUser?.institute || ''
                    }}
                    onSubmit={(values) => {
                      editProfile(values);
                    }}
                  >
                    <Form>
                      <InputField
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="E-mail adres"
                      />
                      <InputField
                        name="firstName"
                        type="text"
                        label="Voornaam"
                        placeholder="Voornaam"
                      />
                      <InputField
                        name="lastName"
                        type="text"
                        label="Familienaam"
                        placeholder="Familienaam"
                      />
                      <InputField
                        name="institute"
                        type="text"
                        label="Organisatie/Onderwijsinstelling"
                        placeholder="Organisatie/Onderwijsinstelling"
                      />
                      <Button text="Opslaan" type="submit" primary isLoading={state.loading} />
                    </Form>
                  </Formik>
                </>
              </Panel>
            </div>
            <div className="edit__preferences">
              <Heading marginTop title="Meldingsvoorkeuren" level={2} />
              <ErrorMessage code={state.error?.code} padTop />
              <p>{getNotifInfo(currentUser)}</p>
              <Formik
                initialValues={{
                  notifEmail: currentUser?.notifEmail || false,
                  notifApp: currentUser?.notifApp || false
                }}
                onSubmit={(values) => {
                  editNotifications(values);
                }}
              >
                <Form>
                  <InputField
                    name="notifEmail"
                    type="checkbox"
                    label="Ontvang meldingen via e-mail"
                  />
                  <InputField
                    name="notifApp"
                    type="checkbox"
                    label="Ontvang meldingen via de app"
                  />

                  <Button text="Opslaan" type="submit" primary isLoading={state.loading} />
                </Form>
              </Formik>
            </div>
          </>
        </Grid>
      </Container>

      <style jsx>
        {`
          .edit__profile {
            grid-column: 2 / span 6;
          }

          .edit__preferences {
            margin-top: 3rem;
            margin-left: 4rem;
            grid-column: 8 / span 4;
          }
        `}
      </style>
    </>
  );
};

export default EditProfile;

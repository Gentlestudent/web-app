import { useReducer } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { InputField, Panel } from '../../components/form';
import { Container, Grid } from '../../components/layout/index';
import { Heading, Button, ErrorMessage } from '../../components/UI';
import { updateProfile } from '../../api/users';
import { updateParticipant } from '../../api/participants';
import { reauthenticate } from '../../api/auth';
import { useAuth } from '../../hooks';
import usePrivateRoute from '../../hooks/usePrivateRoute';
import fetchStatusReducer from '../../reducers/fetchStatusReducer';

const EditProfile = () => {
  const { currentUser, reload } = useAuth();
  usePrivateRoute();
  const router = useRouter();
  const [state, dispatch] = useReducer(fetchStatusReducer, { loading: false });

  const getNotifInfo = (role) => {
    if (role) {
      if (role.admin)
        return 'Bepaal hoe je meldingen krijgt wanneer organisaties een nieuwe leerkans aanmaken.';
      if (role.participant)
        return 'Bepaal hoe je meldingen krijgt wanneer je aanvraag om deel te nemen aan een leerkans gereviewed werd.';
      if (role.issuer)
        return 'Bepaal hoe je meldingen krijgt wanneer jouw leerkans werd goedgekeurd en wanneer studenten zich aanmelden aan een leerkans. ';
    }
    return 'Bepaal hoe je meldingen krijgt.';
  };

  const editProfile = async (values) => {
    dispatch(['INIT']);
    try {
      // reauthenticate the user;
      await reauthenticate(values);

      // update firebase auth profile
      await updateProfile(values);

      // update participant document
      await updateParticipant(currentUser.id, values);
      reload();
      dispatch(['COMPLETE', {}]);
    } catch (err) {
      dispatch(['ERROR', err]);
    }
  };

  const editNotifications = async (values) => {
    dispatch(['INIT']);
    try {
      // update participant document
      await updateParticipant(currentUser.id, values);
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
                      email: currentUser?.participant?.email || '',
                      firstName: currentUser?.participant?.firstName || '',
                      lastName: currentUser?.participant?.lastName || '',
                      institute: currentUser?.participant?.institute || ''
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
              <p>{getNotifInfo(currentUser?.role)}</p>
              <Formik
                initialValues={{
                  notifEmail: currentUser?.participant?.notifEmail || false,
                  notifApp: currentUser?.participant?.notifApp || false
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

import Router from 'next/router';
import { Formik, Form } from 'formik';
import { InputField, Panel } from '../../components/form';
import { Container, Grid } from '../../components/layout/index';
import { Heading, Button } from '../../components/UI';

const EditProfile = () => {
  const profile = {
    email: 'john.doe@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    institution: 'Arteveldehogeschool'
  };
  return (
    <>
      <Container>
        <Grid>
          <div className="edit__profile">
            <Panel>
              <>
                <Button
                  onClick={() => Router.back()}
                  text="Terug naar profiel"
                  icon="arrow-left"
                  reverse
                />

                <Heading title="Bewerk profiel" />

                <Formik
                  initialValues={{
                    email: profile.email
                  }}
                  onSubmit={(values) => {
                    // ...
                  }}
                >
                  <Form>
                    <InputField
                      name="email"
                      type="email"
                      label="Email"
                      value={profile.email}
                      placeholder="E-mail adres"
                    />
                    <InputField
                      name="firstname"
                      type="text"
                      label="Voornaam"
                      value={profile.firstName}
                      placeholder="Voornaam"
                    />
                    <InputField
                      name="lastname"
                      type="text"
                      label="Familienaam"
                      value={profile.lastName}
                      placeholder="Familienaam"
                    />
                    <InputField
                      name="institution"
                      type="text"
                      label="Organisatie/Onderwijsinstelling"
                      value={profile.institution}
                      placeholder="Organisatie/Onderwijsinstelling"
                    />
                    <Button
                      // disabled={isSubmitting}
                      text="Opslaan"
                      type="submit"
                      primary
                    />
                  </Form>
                </Formik>
              </>
            </Panel>
          </div>
          <div className="edit__preferences">
            <Heading marginTop title="Notificatie voorkeuren" level="2" />
            <Formik
              initialValues={{
                email: profile.email
              }}
              onSubmit={(values) => {
                // ...
              }}
            >
              <Form>
                <InputField
                  name="institution"
                  type="checkbox"
                  label="Ontvang meldingen via e-mail"
                />
                <InputField
                  name="institution"
                  type="checkbox"
                  label="Ontvang meldingen via de app"
                />

                <Button text="Opslaan" type="submit" primary />
              </Form>
            </Formik>
          </div>
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

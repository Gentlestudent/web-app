import Head from 'next/head';
import { Formik, Field, Form } from 'formik';
import { useAuth } from '../../hooks';
import { Heading } from '../../components/UI';
import { registerWithEmailPassword } from '../../api/auth';
import Container from '../../components/container';
import { colors } from '../../assets/styles';

const Register = () => {
  const { isUserSignedIn } = useAuth();

  return (
    <>
      <Container>
        {/* TODO Sarah: create form-panel component */}
        <div className="form-panel">
          <Heading title="Register" />
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              organisation: ''
            }}
            onSubmit={(values, actions) => {
              console.log(values);
            }}
          >
            <Form>
              <label className="formik-label" htmlFor="email">
                E-mailadres
                <div className="field">
                  <Field id="email" name="email" placeholder="Email" type="email" />
                </div>
              </label>

              <label className="formik-label" htmlFor="firstName">
                Voornaam
                <div className="field">
                  <Field id="firstName" name="firstName" placeholder="Voornaam" type="text" />
                </div>
              </label>

              <label className="formik-label" htmlFor="lastName">
                Achternaam
                <div className="field">
                  <Field id="lastName" name="lastName" placeholder="Achternaam" type="text" />
                </div>
              </label>

              <label className="formik-label" htmlFor="organisation">
                Organisatie/onderwijsinstelling
                <div className="field">
                  <Field
                    id="organisation"
                    name="organisation"
                    placeholder="Organisatie/onderwijsinstelling"
                    type="text"
                  />
                </div>
              </label>

              <label className="formik-label" htmlFor="password">
                Wachtwoord
                <div className="field">
                  <Field id="password" name="password" placeholder="Wachtwoord" type="text" />
                </div>
              </label>

              <button type="submit">Registreer</button>
            </Form>
          </Formik>
        </div>
      </Container>
      <style jsx>
        {`
          .form-panel {
            background: ${colors.blueLight};
            margin: 4rem auto 0;
            padding: 4.5rem;
            max-width: 50%;
          }

          .formik-label {
            display: flex;
            flex-direction: column;
            margin-bottom: 3rem;
          }

          .field {
            display: flex;
            align-items: center;
            margin-top: 0.7rem;
          }

          .field-icon {
            margin-left: 1.5rem;
            position: absolute;
            z-index: 2;
            color: ${colors.blue};
          }
        `}
      </style>
    </>
  );
};

export default Register;

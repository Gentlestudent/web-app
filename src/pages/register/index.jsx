import { Formik, Field, Form } from 'formik';
import { useState } from 'react';

import { registerWithEmailPassword } from '../../api/auth';
import { Heading } from '../../components/UI';
import Container from '../../components/container';
import { colors } from '../../assets/styles';
import { useAuth } from '../../hooks';

const Register = () => {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (isSignedIn) {
    // redirect if needed or remove this block
  }

  if (loading) {
    console.log(loading);
  }

  if (error) {
    console.log(error);
  }

  const signup = async ({ email, password, institute, firstName, lastName }) => {
    setLoading(true);
    setError(null);
    try {
      await registerWithEmailPassword(email, password, firstName, lastName, institute);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

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
              institute: ''
            }}
            onSubmit={signup}
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
                    id="institute"
                    name="institute"
                    placeholder="Organisatie/onderwijsinstelling"
                    type="text"
                  />
                </div>
              </label>

              <label className="formik-label" htmlFor="password">
                Wachtwoord
                <div className="field">
                  <Field id="password" name="password" placeholder="Wachtwoord" type="password" />
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

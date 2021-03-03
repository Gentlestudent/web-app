import { Formik, Field, Form } from 'formik';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../api/firebase';
import { Heading } from '../../components/UI';
import Container from '../../components/container';
import { colors } from '../../assets/styles';

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(
    auth
  );

  if (user) {
    // redirect if needed or remove this block
  }

  if (loading) {
    console.log(loading);
  }

  if (error) {
    console.log(error);
  }

  const signup = ({ email, password, organisation, firstName, lastName }) => {
    createUserWithEmailAndPassword(email, password);
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
              organisation: ''
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

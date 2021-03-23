import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Formik, Field, Form } from 'formik';

import { auth } from '../api/firebase';
import { colors } from '../assets/styles';
import { Heading } from '../components/UI';
import { Container } from '../components/layout/index';

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  if (user) {
    // Implement redirect logic if needed or remove this
  }

  if (loading) {
    // May be useful to show a loading state on the button
    console.log('loading');
  }

  if (error) {
    // Todo something useful with these errors
    console.log(error);
  }

  const signup = ({ email, password }) => {
    signInWithEmailAndPassword(email, password);
  };

  return (
    <>
      <Container>
        <div className="form-panel">
          <Heading title="Login" />
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            // onSubmit={signup}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <label className="formik-label" htmlFor="email">
                E-mailadres
                <div className="field">
                  <Field id="email" name="email" placeholder="john.doe@gmail.com" type="email" />
                </div>
              </label>
              <label className="formik-label" htmlFor="info">
                Wachtwoord
                <div className="field">
                  <Field id="password" name="password" placeholder="wachtwoord" type="password" />
                </div>
              </label>
              <button type="submit">Login</button>
              {/* <Button icon="arrow-right" text="Submit" type="submit" primary /> */}
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

export default Login;

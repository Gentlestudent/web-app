import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useReducer } from 'react';

import { Heading, Button, ErrorMessage } from '../../components/UI';
import { Panel, InputField } from '../../components/form';
import { Container } from '../../components/layout/index';
import { usePublicRoute } from '../../hooks';
import fetchStatusReducer from '../../reducers/fetchStatusReducer';
import { sendAccountVerificationEmail } from '../../connector/auth';
import { getFirebaseAppForClient } from '../../utils/firebase';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Ongeldig e-mail adres').required('Vul een e-mail adres in'),
  password: Yup.string().required('Wachtwoord is vereist')
});

const Login = () => {
  const [state, dispatch] = useReducer(fetchStatusReducer, { loading: false });
  usePublicRoute();

  const signin = async ({ email, password }) => {
    dispatch(['INIT']);
    const app = getFirebaseAppForClient();
    const auth = app.auth();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      if (!userCredential.user.emailVerified) {
        try {
          await sendAccountVerificationEmail(userCredential.user.email);
        } catch {}
        await auth.signOut();
        throw new Error('not-verified');
      }
      dispatch(['COMPLETE']);
    } catch (error) {
      dispatch(['ERROR', error]);
    }
  };

  return (
    <>
      <Container>
        <Panel>
          <>
            <Heading title="Login" />
            <ErrorMessage code={state.error?.message} />
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={SigninSchema}
              onSubmit={signin}
            >
              <Form>
                <InputField
                  name="email"
                  type="email"
                  label="E-mail adres"
                  placeholder="john.doe@gmail.com"
                />
                <InputField
                  name="password"
                  type="password"
                  label="Wachtwoord"
                  placeholder="wachtwoord"
                />
                <Button text="Inloggen" type="submit" primary isLoading={state.loading} />
              </Form>
            </Formik>
          </>
        </Panel>
      </Container>
    </>
  );
};

export default Login;

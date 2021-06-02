import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';

import { Heading, Button, ErrorMessage } from '../../components/UI';
import { Panel, InputField } from '../../components/form';
import { Container } from '../../components/layout/index';
import { useAuth } from '../../hooks';
import fetchStatusReducer from '../../reducers/fetchStatusReducer';
import { sendAccountVerificationEmail } from '../../connector/auth';
import { routes } from '../../constants';
import { getFirebaseAppForClient } from '../../utils/firebase';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Ongeldig e-mail adres').required('Vul een e-mail adres in'),
  password: Yup.string().required('Wachtwoord is vereist')
});

const Login = () => {
  const { isUserSignedIn, currentUser } = useAuth();
  const router = useRouter();
  const [state, dispatch] = useReducer(fetchStatusReducer, { loading: false });

  useEffect(() => {
    if (isUserSignedIn && currentUser?.isVerified) {
      if (router.query.from) {
        router.push(router.query.from);
      } else {
        // TODO change this
        router.push(routes.HOME);
      }
    }
  }, [isUserSignedIn, currentUser, router]);

  const signin = async ({ email, password }) => {
    dispatch(['INIT']);
    const app = getFirebaseAppForClient();
    const auth = app.auth();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      if (!userCredential.user.emailVerified) {
        await sendAccountVerificationEmail();
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

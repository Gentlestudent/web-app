import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';

import { Heading, Button } from '../../components/UI';
import { Panel, InputField } from '../../components/form';
import { Container } from '../../components/layout/index';
import { useAuth } from '../../hooks';
import { signInWithEmailPassword, signOut } from '../../api/auth';
import fetchStatusReducer from '../../reducers/fetchStatusReducer';
import { sendAccountVerificationEmail } from '../../api/functions';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Ongeldig e-mail adres').required('Vul een e-mail adres in'),
  password: Yup.string().required('Wachtwoord is vereist')
});

const Login = () => {
  const { isUserSignedIn, currentUser } = useAuth();
  const router = useRouter();
  const [state, dispatch] = useReducer(fetchStatusReducer, {});

  useEffect(() => {
    if (isUserSignedIn && currentUser?.isVerified) {
      if (router.query.from) {
        router.push(router.query.from);
      } else {
        // TODO change this
        router.push('/');
      }
    }
  }, [isUserSignedIn, currentUser, router]);

  if (state.loading) {
    // May be useful to show a loading state on the button
    console.log('loading');
  }

  if (state.error) {
    // Todo something useful with these errors
    console.log(state.error);
  }

  const signin = async ({ email, password }) => {
    dispatch(['INIT']);
    try {
      const userCredential = await signInWithEmailPassword(email, password);

      if (!userCredential.user.emailVerified) {
        await sendAccountVerificationEmail();
        await signOut();
        // eslint-disable-next-line no-throw-literal
        throw { code: 'not-verified' };
      }
      dispatch(['COMPLETE']);
    } catch (error) {
      if (error.code !== 'not-verified') await signOut();

      dispatch(['ERROR', error]);
    }
  };

  return (
    <>
      <Container>
        <Panel>
          <>
            <Heading title="Login" />
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
                <Button text="Inloggen" type="submit" primary />
              </Form>
            </Formik>
          </>
        </Panel>
      </Container>
    </>
  );
};

export default Login;

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useReducer } from 'react';

import { Heading, Button, ErrorMessage } from '../../components/UI';
import { Panel, InputField } from '../../components/form';
import { Container } from '../../components/layout/index';
import { usePublicRoute } from '../../hooks';
import fetchStatusReducer from '../../reducers/fetchStatusReducer';
import { signIn, signOut, sendAccountVerificationEmail } from '../../connector/auth';
import { getProfile } from '../../connector/users';
import loginEvents from '../../utils/loginEvents';
import getErrorCode from '../../utils/getErrorCode';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Ongeldig e-mail adres').required('Vul een e-mail adres in'),
  password: Yup.string().required('Wachtwoord is vereist')
});

const Login = () => {
  const [state, dispatch] = useReducer(fetchStatusReducer, { loading: false });
  usePublicRoute();

  const signin = async ({ email, password }) => {
    dispatch(['INIT']);
    try {
      const tokenResponse = await signIn({ email, password });
      const token = await tokenResponse.text();
      window.localStorage.setItem('token', token);
      const { id } = JSON.parse(window.atob(token.split('.')[1]));
      const userResponse = await getProfile(id);
      const user = await userResponse.json();
      if (!user.emailVerified) {
        try {
          await sendAccountVerificationEmail(user.email);
        } catch {}
        await signOut();
        throw new Error('not-verified');
      }
      dispatch(['COMPLETE']);
      loginEvents.trigger('login');
    } catch (error) {
      console.log('error', error);
      const code = await getErrorCode(error);
      dispatch(['ERROR', code || error.message]);
    }
  };

  return (
    <>
      <Container>
        <Panel>
          <>
            <Heading title="Login" />
            <ErrorMessage code={state.error} />
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

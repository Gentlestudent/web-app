import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { auth } from '../../api/firebase';
import { Heading, Button } from '../../components/UI';
import { Panel, InputField } from '../../components/form';
import { Container } from '../../components/layout/index';
import { useAuth } from '../../hooks';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Ongeldig e-mail adres').required('Vul een e-mail adres in'),
  password: Yup.string().required('Wachtwoord is vereist')
});

const Login = () => {
  const [signInWithEmailAndPassword, _, loading, error] = useSignInWithEmailAndPassword(auth);
  const { isUserSignedIn } = useAuth();

  if (isUserSignedIn) {
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
        <Panel>
          <>
            <Heading title="Login" />
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={SignupSchema}
              // onSubmit={signup}
              onSubmit={signup}
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

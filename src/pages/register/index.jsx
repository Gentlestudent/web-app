import { Formik, Form } from 'formik';
import { useReducer } from 'react';
import * as Yup from 'yup';
import { Panel, InputField } from '../../components/form';

import { registerWithEmailPassword, signOut } from '../../api/auth';
import { Heading, Button } from '../../components/UI';
import { Container } from '../../components/layout/index';
import { useAuth } from '../../hooks';
import fetchStatusReducer from '../../reducers/fetchStatusReducer';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Ongeldig e-mail adres').required('Vul een e-mail adres in'),
  password: Yup.string().required('Wachtwoord is vereist'),
  firstName: Yup.string().required('Voornaam is vereist'),
  lastName: Yup.string().required('Familienaam is vereist'),
  institute: Yup.string().required('Voeg een organisatie of onderwijsinstelling toe')
});

const Register = () => {
  const { isSignedIn } = useAuth();
  const [state, dispatch] = useReducer(fetchStatusReducer, {});

  if (isSignedIn) {
    // redirect if needed or remove this block
  }

  if (state.loading) {
    console.log(state.loading);
  }

  if (state.error) {
    console.log(state.error);
  }

  const signup = async ({ email, password, institute, firstName, lastName }) => {
    dispatch(['INIT']);
    try {
      await registerWithEmailPassword(email, password, firstName, lastName, institute);

      // sign out user
      await signOut();

      dispatch(['COMPLETE']);
    } catch (err) {
      dispatch(['ERROR', err]);
    }
  };

  return (
    <>
      <Container>
        <Panel>
          <>
            <Heading title="Registreer" />
            <Formik
              initialValues={{
                email: '',
                firstname: '',
                lastname: '',
                institute: '',
                password: ''
              }}
              validationSchema={RegisterSchema}
              onSubmit={signup}
            >
              <Form>
                <InputField name="email" type="email" label="Email" placeholder="Email" />
                <InputField name="firstName" type="text" label="Voornaam" placeholder="Voornaam" />
                <InputField
                  name="lastName"
                  type="text"
                  label="Familienaam"
                  placeholder="Familienaam"
                />
                <InputField
                  name="institute"
                  type="text"
                  label="Organisatie/Onderwijsinstelling"
                  placeholder="Organisatie/Onderwijsinstelling"
                />
                <InputField
                  name="password"
                  type="password"
                  label="Wachtwoord"
                  placeholder="Wachtwoord"
                />

                {/* <button type="submit">Registreer</button> */}
                <Button text="Registreren" type="submit" primary />
              </Form>
            </Formik>
          </>
        </Panel>
      </Container>
    </>
  );
};

export default Register;

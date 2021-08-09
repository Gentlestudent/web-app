import { Formik, Form } from 'formik';
import { useReducer } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { Panel, InputField } from '../../components/form';
import { registerWithEmailPassword } from '../../connector/auth';
import { Heading, Button, ErrorMessage } from '../../components/UI';
import { Container } from '../../components/layout/index';
import { usePublicRoute } from '../../hooks';
import fetchStatusReducer from '../../reducers/fetchStatusReducer';
import { routes } from '../../constants';
import { getErrorResponse } from '../../utils';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Ongeldig e-mail adres').required('Vul een e-mail adres in'),
  password: Yup.string().required('Wachtwoord is vereist'),
  firstName: Yup.string().required('Voornaam is vereist'),
  lastName: Yup.string().required('Familienaam is vereist'),
  institute: Yup.string().required('Voeg een organisatie of onderwijsinstelling toe')
});

const Register = () => {
  usePublicRoute();
  const router = useRouter();
  const [state, dispatch] = useReducer(fetchStatusReducer, {});

  const signup = async ({ email, password, institute, firstName, lastName }) => {
    dispatch(['INIT']);
    try {
      await registerWithEmailPassword({ email, password, firstName, lastName, institute });
      dispatch(['COMPLETE']);
      router.push({
        pathname: routes.LOGIN
      });
    } catch (error) {
      console.error(error);
      const errorResponse = await getErrorResponse(error);
      dispatch(['ERROR', errorResponse?.code || error.message]);
    }
  };

  return (
    <>
      <Container>
        <Panel>
          <>
            <Heading title="Registreer" />
            <ErrorMessage code={state.error} />
            <Formik
              initialValues={{
                email: '',
                firstName: '',
                lastName: '',
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

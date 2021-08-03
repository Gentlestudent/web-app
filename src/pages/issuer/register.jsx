import { useState, useMemo } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container } from '../../components/layout/index';
import { Heading, Button } from '../../components/UI';
import { Panel, InputField } from '../../components/form';
import requiresMissingRole from '../../hoc/requiresMissingRole';
import { useAuth, usePrivateRoute, useIssuers } from '../../hooks';
import { routes, roles } from '../../constants';
import { registerIssuer } from '../../connector/issuers';

const RegisterSchema = Yup.object().shape({
  institute: Yup.string().required('Voeg een organisatie of onderwijsinstelling toe'),
  longName: Yup.string(),
  url: Yup.string(),
  phonenumber: Yup.string()
  // street: Yup.string(),
  // housenumber: Yup.string(),
  // bus: Yup.string(),
  // postalcode: Yup.string(),
  // city: Yup.string()
});

const Register = () => {
  usePrivateRoute(routes.REGISTER);
  const { currentUser } = useAuth();
  const options = useMemo(() => ({ searchParams: { userId: currentUser?.id } }), [currentUser]);
  const [errorIssuers, loadingIssuers, issuers] = useIssuers([], options);
  // TODO handle error & show loading icon
  const [registrationComplete, setRegistrationComplete] = useState(false);

  if (loadingIssuers) {
    return (
      <Container>
        <Panel>...</Panel>
      </Container>
    );
  }

  if (issuers.length) {
    return (
      <Container>
        <Panel>Issuer registratie goedkeuring in afwachting.</Panel>
      </Container>
    );
  }

  async function handleSubmit(values) {
    try {
      await registerIssuer({
        id: currentUser?.id,
        ...values
      });
      setRegistrationComplete(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Panel>
        <Heading title="Word issuer" level={1} color="black" />
        { registrationComplete
          ? <p>Registratie bevestigd.</p>
          : (
            <Formik
              initialValues={{
                institute: '',
                longName: '',
                url: '',
                phonenumber: ''
                // street: '',
                // housenumber: '',
                // bus: '',
                // postalcode: '',
                // city: ''
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="asd">
                  <InputField
                    name="institute"
                    type="text"
                    label="Organisatie/Onderwijsinstelling"
                    placeholder="Bedrijfsnaam voor op badge"
                  />
                  <InputField
                    name="longName"
                    type="text"
                    label="Volledige bedijfsnaam"
                    placeholder="Volledige bedijfsnaam"
                  />
                  <InputField name="url" type="text" label="Website" placeholder="URL bedrijf" />
                  <InputField
                    name="phonenumber"
                    type="text"
                    label="Telefoonnummer"
                    placeholder="Telefoonnummer"
                  />
                  {/* <InputField name="street" type="text" label="Straat" placeholder="Straat" />
                  <InputField name="housenumber" type="text" label="Huisnummer" placeholder="Huisnummer" />
                  <InputField name="bus" type="text" label="Bus" placeholder="Bus" />
                  <InputField name="postalcode" type="text" label="Postcode" placeholder="Postcode" />
                  <InputField name="city" type="text" label="Stad" placeholder="Stad" /> */}
                  <Button text="Word issuer" type="submit" primary />
                </div>
              </Form>
            </Formik>
            )
        }
      </Panel>
    </Container>
  );
};

export default requiresMissingRole(Register, roles.ISSUER);

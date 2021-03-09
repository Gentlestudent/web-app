import Router from 'next/router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { addOpportunity } from '../../api/opportunities';
import { Panel, InputField, SelectField, RichtextField } from '../../components/form';
import { Heading, Button } from '../../components/UI';
import Container from '../../components/container';
import FORM from './consts';

const CreateSchema = Yup.object().shape({
  title: Yup.string().required('Titel is vereist'),
  expectations: Yup.string()
    .min(5, 'Geef minstens 5 karakters in')
    .required('Schrijf de verwachtingen'),
  website: Yup.string().url('Geef een geldige URL mee'),
  email: Yup.string().email('Geef een geldig e-mail adres mee')
});

const Create = () => {
  const createOpportunity = (values) => {
    addOpportunity(values);
  };

  return (
    <>
      <Container>
        <Panel>
          <>
            <Button
              onClick={() => Router.back()}
              text="Terug naar overzicht"
              icon="arrow-left"
              back
            />

            <Heading title="Nieuwe leerkans" />

            <Formik
              initialValues={{
                title: '',
                domain: '',
                expectations: '',
                level: '',
                description: '',
                website: '',
                email: ''
              }}
              validationSchema={CreateSchema}
              onSubmit={(values) => {
                createOpportunity(values);
              }}
            >
              <Form>
                <InputField name="title" type="title" label="Titel" placeholder="Titel" />

                <SelectField as="select" name="domain" label="Selecteer een domein">
                  <>
                    {FORM.DOMAINS.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </>
                </SelectField>

                <RichtextField name="description" label="Beschrijving" />

                <InputField
                  name="expectations"
                  type="text"
                  label="Verwachtingen"
                  placeholder="Korte beschrijving van wat er verwacht wordt"
                />

                <SelectField as="select" name="level" label="Selecteer niveau">
                  <>
                    {FORM.LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </>
                </SelectField>

                <InputField name="website" type="text" label="Website" placeholder="Website url" />

                <InputField
                  name="email"
                  type="email"
                  label="Email contactpersoon"
                  placeholder="Emailadres contactpersoon"
                />

                <Button icon="arrow-right" text="Submit" type="submit" primary />
              </Form>
            </Formik>
          </>
        </Panel>
      </Container>
    </>
  );
};

export default Create;

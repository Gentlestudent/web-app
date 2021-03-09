import Router from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { EditorState } from 'draft-js';
import { Panel, InputField, SelectField, RichtextField } from '../../components/form';
import { colors, breakpoints } from '../../assets/styles';
// import FormWithSteps from '../../components/form-with-steps';

import { Heading, Icon, Button } from '../../components/UI';
import Container from '../../components/container';

// const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
//   ssr: false
// });

const CreateSchema = Yup.object().shape({
  title: Yup.string().required('Titel is vereist'),
  domain: Yup.string().required('Kies een domein'),
  description: Yup.string().required('Beschrijf de beschrijvingen'),
  expectations: Yup.string().required('Schrijf de verwachtingen')
});

export default () => {
  const createOpportunity = (opportunity) => console.log(opportunity);

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
                description: ''
              }}
              validationSchema={CreateSchema}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
              }}
            >
              <Form>
                <InputField name="title" type="title" label="Titel" placeholder="Titel" />

                <SelectField as="select" name="domain" label="Selecteer een domein">
                  <option value="red">Domein X</option>
                  <option value="green">Domen Y</option>
                  <option value="blue">Domein Z</option>
                </SelectField>

                <RichtextField label="Beschrijving" />

                <InputField
                  name="expectations"
                  type="expectations"
                  label="Verwachtingen"
                  placeholder="Korte beschrijving van wat er verwacht wordt"
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

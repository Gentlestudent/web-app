import Router from 'next/router';
import { Formik, Field, Form } from 'formik';
import { colors, breakpoints } from '../../assets/styles';
import FormWithSteps from '../../components/form-with-steps';
import { Heading, Icon, Button } from '../../components/UI';
import Container from '../../components/container';
import OPPORTUNITY_STEPS from './steps';

export default () => {
  const createOpportunity = (opportunity) => console.log(opportunity);

  return (
    <>
      <Container>
        <div className="form-panel">
          <Button
            onClick={() => Router.back()}
            text="Terug naar overzicht"
            icon="arrow-left"
            back
          />
          <Heading title="Nieuwe leerkans" />
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: ''
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form className="formik">
              <label className="formik-label" htmlFor="firstName">
                WYSIWYG
                <Field id="firstName" name="firstName" placeholder="Jane" />
              </label>

              <label className="formik-label" htmlFor="lastName">
                Titel
                <Field id="lastName" name="lastName" placeholder="Doe" />
              </label>

              <label className="formik-label" htmlFor="lastName">
                Domein
                <Field name="color" as="select">
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </Field>
              </label>

              <label className="formik-label" htmlFor="lastName">
                Beschrijving
                <Field id="lastName" name="lastName" placeholder="Doe" as="textarea" />
              </label>

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </Container>
      <style jsx>
        {`
          .form-panel {
            background: ${colors.blueLight};
            margin-top: 4rem;
            padding: 4.5rem;
            max-width: 50%;
          }

          .formik-label {
            display: flex;
            flex-direction: column;
            margin-bottom: 3rem;
          }
        `}
      </style>
    </>
  );
};

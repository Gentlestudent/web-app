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
              email: '',
              info: ''
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <label className="formik-label" htmlFor="title">
                Title
                <div className="field-test">
                  <i className="field-icon">
                    <Icon name="arrow-right" />
                  </i>
                  <Field id="title" name="title" placeholder="Jane" />
                </div>
              </label>

              <label className="formik-label" htmlFor="info">
                Beschrijving
                <Field id="info" name="info" placeholder="Doe" as="textarea" />
              </label>

              <label className="formik-label" htmlFor="lastName">
                E-mail adres
                <Field id="lastName" name="lastName" placeholder="john.doe@gmail.com" />
              </label>

              <label className="formik-label" htmlFor="lastName">
                Telefoon nummer
                <Field id="lastName" name="lastName" placeholder="" />
              </label>
              {/*
              <label className="formik-label" htmlFor="lastName">
                Domein
                <Field name="color" as="select">
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </Field>
              </label> */}

              <button type="submit" text="submit" />
              {/* <Button icon="arrow-right" text="Submit" type="submit" primary /> */}
            </Form>
          </Formik>
        </div>
      </Container>
      <style jsx>
        {`
          .form-panel {
            background: ${colors.blueLight};
            margin: 4rem auto 0;
            padding: 4.5rem;
            max-width: 50%;
          }

          .formik-label {
            display: flex;
            flex-direction: column;
            margin-bottom: 3rem;
          }

          .field-test {
            display: flex;
            align-items: center;
            margin-top: 0.7rem;
          }

          .field-icon {
            margin-left: 1.5rem;
            position: absolute;
            z-index: 2;
            color: ${colors.blue};
          }
        `}
      </style>
    </>
  );
};

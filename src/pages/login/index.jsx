import Router from 'next/router';
import { Formik, Field, Form } from 'formik';
import { colors } from '../../assets/styles';
import { Heading, Icon, Button } from '../../components/UI';
import Container from '../../components/container';

const Login = () => {
  const createOpportunity = (opportunity) => console.log(opportunity);

  return (
    <>
      <Container>
        <div className="form-panel">
          <Heading title="Login" />
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <label className="formik-label" htmlFor="email">
                E-mailadres
                <div className="field">
                  <Field id="email" name="email" placeholder="" type="email" />
                </div>
              </label>
              <label className="formik-label" htmlFor="info">
                Wachtwoord
                <div className="field">
                  <Field id="password" name="password" placeholder="" type="password" />
                </div>
              </label>
              <button type="submit">Login</button>
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

          .field {
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

export default Login;

import Router from 'next/router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useState } from 'react';

import StepOne from '../../components/opportunity-form-steps/step-one';
import StepTwo from '../../components/opportunity-form-steps/step-two';
import StepThree from '../../components/opportunity-form-steps/step-three';

import { addOpportunity } from '../../api/opportunities';
import { Panel } from '../../components/form';
import { Heading, Button } from '../../components/UI';
import { Container } from '../../components/layout/index';

const CreateSchema = [
  Yup.object().shape({
    // STEP ONE
    title: Yup.string().required('Titel is vereist'),
    // TODO: Domain
    // TODO: Description (if possible)
    expectations: Yup.string()
      .min(5, 'Geef minstens 5 karakters in')
      .required('Verwachtingen zijn vereist')
    // TODO: Level
  }),
  Yup.object().shape({
    // STEP TWO
    website: Yup.string().required('Website is vereist'),
    email: Yup.string()
      .email('Geef een geldig e-mail adres mee')
      .required('E-mail adres is vereist'),
    startDate: Yup.date().required('Start datum is vereist'),
    endDate: Yup.date().required('Eind datum is vereist')
  }),
  Yup.object().shape({
    // STEP THREE
    street: Yup.string().required('Straatnaam is vereist'),
    number: Yup.number('Geef een geldig straatnummer mee').required('Nummer is vereist'),
    city: Yup.string().required('Stad is vereist'),
    postal: Yup.number('Geef een geldig postcode mee').required('Postcode is vereist')
  })
];

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Basis informatie', 'Datum & Contact', 'Locatie'];
  // const currentValidationSchema = validationSchema[activeStep];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;

      default:
        return <div>Not Found</div>;
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const createOpportunity = (values, actions) => {
    if (activeStep === steps.length - 1) {
      console.log(values);
      // addOpportunity(values);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
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
              reverse
            />

            <Heading title="Nieuwe leerkans" />

            <Formik
              initialValues={{
                // STEP ONE
                title: '',
                domain: '',
                expectations: '',
                level: '',
                description: '',

                // STEP TWO
                website: '',
                email: '',

                // STEP THREE
                street: '',
                number: '',
                city: '',
                postal: ''
              }}
              validationSchema={CreateSchema[activeStep]}
              onSubmit={(values) => {
                createOpportunity(values);
              }}
            >
              <Form>
                {renderStepContent(activeStep)}

                <div className="buttons">
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleBack}
                      back
                      reverse
                      text="Vorige stap"
                      icon="arrow-left"
                      type="button"
                    />
                  )}

                  <Button
                    // disabled={isSubmitting}
                    icon="arrow-right"
                    text={activeStep === steps.length - 1 ? 'Project indienen' : 'Volgende stap'}
                    type="submit"
                    primary={activeStep === steps.length - 1}
                  />
                </div>
              </Form>
            </Formik>
          </>
        </Panel>
      </Container>

      <style jsx>
        {`
          .buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .buttons button {
            margin: 0 !important;
          }
        `}
      </style>
    </>
  );
};

export default Create;

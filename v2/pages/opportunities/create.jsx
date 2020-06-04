import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { useSteps, useForm } from '../../hooks';
import { colors, breakpoints } from '../../assets/styles/constants';
import { Heading, FormGroup, Icon, Button } from '../../components/UI';
import Layout from '../../components/layout';

import OPPORTUNITY_STEPS from './steps';

const GoBack = () => (
  <button type="button" onClick={() => Router.back()}>
    <Icon name="caret-left" />
    <span>Terug</span>
    <style jsx>
      {`
        button {
          display: flex;
          align-items: center;
          min-height: 4rem;
          margin-left: 1rem;
          background: none;
          border: none;
          font-weight: bold;
        }

        span {
          margin-left: 1rem;
          font-size: 1.8rem;
          color: ${colors.gray};
        }
      `}
    </style>
  </button>
);

const Form = ({ title, fields, children, errors, ...rest }) => {
  const error = (name) => errors.find((error) => Object.keys(error)[0] === name);

  console.log(error('title'));
  return (
    <form {...rest}>
      <div className="section-header">
        <Heading level={2} title={title} />
      </div>
      {fields &&
        fields.map((field, i) => {
          const { name } = field;
          return <FormGroup key={name} error={errors[i]} {...field} />;
        })}
      {children}
      <style jsx>
        {`
          form {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 2rem;
            border-radius: 2rem;
            box-shadow: 0 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
          }

          .section-header {
            border-radius: 2rem 2rem 0 0;
            padding: 2rem;
          }
        `}
      </style>
    </form>
  );
};

const Stepper = ({ currentStep, previousStep, nextStep, onSubmit }) => {
  const { formProps, values } = useForm(currentStep.fields);
  return (
    <Form {...currentStep} {...formProps} values={values} onSubmit={onSubmit}>
      <div className="stepper">
        <Button type="button" onClick={previousStep}>
          Stap terug
        </Button>
        <Button type="submit" onClick={(e) => nextStep(e)}>
          Ga door
        </Button>
        <style jsx>
          {`
            .stepper {
              padding: 1rem;
              display: flex;
              justify-content: space-between;
              position: fixed;
              left: 0;
              right: 0;
              bottom: 0;
              background: ${colors.white};
              box-shadow: 0 0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.2);
              margin: 0 calc(15vw - 4.5rem);
            }

            @media (max-width: ${breakpoints.medium}) {
              .stepper {
                margin: 0;
              }
            }
          `}
        </style>
      </div>
    </Form>
  );
};

export default () => {
  const steps = useSteps(OPPORTUNITY_STEPS);
  return (
    <Layout>
      <GoBack />
      <div className="page">
        <div className="page-header">
          <Heading title="Nieuwe leerkans" />
          <Stepper {...steps} onSubmit={(e) => console.log(e)} />
        </div>
      </div>
      <style jsx>
        {`
          .page {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin: 0 15vw;
          }

          .page-header {
            padding: 3.2rem;
          }

          @media (max-width: ${breakpoints.medium}) {
            .page {
              margin: 0;
            }
          }
        `}
      </style>
    </Layout>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.element
};

Stepper.propTypes = {
  currentStep: PropTypes.object,
  previousStep: PropTypes.func,
  nextStep: PropTypes.func
};

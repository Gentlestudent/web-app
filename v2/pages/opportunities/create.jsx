import PropTypes from 'prop-types';
import Router from 'next/router';

import { useSteps } from '../../hooks';
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

const Form = ({ title, fields, children }) => {
  return (
    <form>
      <div className="section-header">
        <Heading level={2} title={title} />
      </div>
      {children}
      {fields && fields.map((field) => <FormGroup {...field} />)}
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

export default () => {
  const { currentStep, nextStep, previousStep } = useSteps(OPPORTUNITY_STEPS);
  return (
    <Layout>
      <GoBack />
      <div className="page">
        <Heading title="Nieuwe leerkans" />
        <Form {...currentStep} next={nextStep} />
        <div className="stepper">
          <Button type="button" onClick={previousStep}>
            Stap terug
          </Button>
          <Button type="button" onClick={nextStep}>
            Ga door
          </Button>
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

          .stepper {
            position: relative;
            padding: 2rem;
            display: flex;
            margin-top: auto;
            justify-content: space-between;
          }

          @media (max-width: ${breakpoints.medium}) {
            .page {
              margin: 0;
            }

            .stepper {
              position: fixed;
              left: 0;
              right: 0;
              bottom: 0;
              background: ${colors.white};
              box-shadow: 0 0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.2);
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

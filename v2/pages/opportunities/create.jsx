import PropTypes from 'prop-types';
import Router from 'next/router';

import { useSteps } from '../../hooks';
import OPPORTUNITY_STEPS from './steps';
import { colors } from '../../assets/styles/constants';
import { Heading, FormGroup, Icon } from '../../components/UI';

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
            margin: 2rem 0;
            padding: 2rem;
            border-radius: 2rem;
            box-shadow: 0 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
            max-width: 90rem;
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
    <div>
      <GoBack />
      <Heading title="Nieuwe leerkans" />
      <Form {...currentStep} />
      <button type="button" onClick={previousStep}>
        Terug
      </button>
      <button type="button" onClick={nextStep}>
        Ga door
      </button>
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.element
};

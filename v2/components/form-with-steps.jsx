import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSteps } from '../hooks';
import { colors, breakpoints } from '../assets/styles/constants';
import { Button } from './UI';
import Form from './form';

const FormWithSteps = ({ steps, onCompleteAll }) => {
  const { currentStep, doNext, doPrevious } = useSteps(steps.length);

  const flattenedFields = steps.reduce((all, step) => {
    return all.concat(step.fields);
  }, []);

  const [allFields, setFields] = useState(flattenedFields);

  const submitStep = (formFields) => {
    setFields([...allFields, ...formFields]);
  };

  const submitAll = () => {
    onCompleteAll(allFields);
  };

  const $forms = steps.map((s) => <Form onSubmit={submitStep} title={s.title} fields={s.fields} />);

  return (
    <div>
      {$forms}
      <Button type="button" onClick={doPrevious}>
        Stap terug
      </Button>
      <Button type="submit" onClick={doNext}>
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
  );
};

FormWithSteps.propTypes = {
  steps: PropTypes.shape({}),
  onCompleteAll: PropTypes.func
};

export default FormWithSteps;

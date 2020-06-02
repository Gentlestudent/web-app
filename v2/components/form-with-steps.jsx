import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSteps } from '../hooks';
import { colors, breakpoints } from '../assets/styles/constants';
import { Button } from './UI';
import Form from './form';

const FormWithSteps = ({ steps, onCompleteAll }) => {
  const { currentStep, isFinalStep, stepForward, stepBack, stepTo } = useSteps(steps.length);

  const flattenedFields = steps.reduce((all, step) => all.concat(step.fields), []);
  const stepTitles = steps.reduce((all, step) => all.concat(step.title), []);

  const [allFields, setFields] = useState(flattenedFields);

  const submitStep = (formFields) => {
    console.log(formFields);
    setFields([...allFields, ...formFields]);
  };

  const submitAll = () => {
    onCompleteAll(allFields);
  };

  const $forms = steps.map((s) => (
    <Form key={s.name} onSubmit={submitStep} title={s.title} fields={s.fields} />
  ));

  return (
    <div>
      {$forms}
      <div className="stepper">
        <Button type="button" onClick={stepBack}>
          Stap terug
        </Button>
        {stepTitles.map((title, index) => (
          <Button key={index} onClick={() => stepTo(index)}>
            {`${index}. ${title}`}
          </Button>
        ))}
        {!isFinalStep ? (
          <Button type="submit" onClick={stepForward}>
            Ga door
          </Button>
        ) : (
          <Button type="submit" onClick={submitAll}>
            Bevestig
          </Button>
        )}
      </div>
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

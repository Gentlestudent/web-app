import { useState } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';

import { addOpportunity } from '../../../api/opportunities';

import { useInput } from '../../../hooks';
import { validate } from '../../../validate';
import { colors } from '../../../assets/styles';
import { Heading, FormField, Button, Icon } from '../../../components/UI';

import { OPPORTUNITY_FORM } from './constants';

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

const FormStep = ({ title, children }) => (
  <section>
    <div className="section-header">
      <Heading title={title} level={2} />
    </div>
    {children}
    <style jsx>
      {`
        section {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin: 2rem 0;
          padding: 2rem;
          border-radius: 2rem;
          box-shadow: 0 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
        }

        .section-header {
          margin-bottom: 3rem;
          padding: 1rem 0;
          border-bottom: 1px solid ${colors.primary};
        }
      `}
    </style>
  </section>
);

export default () => {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState([]);

  const validateCurrentStep = () => {
    let errors = [...steps[step].props.children.map((field) => field.props.error)];
    errors = errors.filter((err) => err !== null);
    setErrors(errors);
    return !(errors.length > 0);
  };

  const validateAllSteps = () => {
    const errors = [
      ...steps.map((step) => step.props.children.map((field) => field.props.error))
    ].filter((err) => err !== null);
    setErrors(errors);
  };

  /**
   * Go to next form step if not on last step and values are valid
   */
  const nextStep = () => step < steps.length - 1 && validateCurrentStep() && setStep(step + 1);

  /*
   * Go to previous for step if not on first step
   */
  const previousStep = () => step > 0 && setStep(step - 1);

  /*
   * Checks if errors on all fields in form step
   */

  /*
   * Form values state
   * Optional validation function
   */
  const { value: title, bind: bindTitle } = useInput('', (e) => validate(e).isRequired());
  const { value: domain, bind: bindDomain } = useInput('', (e) => validate(e).isRequired());
  const { value: description, bind: bindAbout } = useInput('', (e) => validate(e).isRequired());
  const { value: expectations, bind: bindExpected } = useInput('');
  const { value: level, bind: bindLevel } = useInput('');
  const { value: infoUrl, bind: bindInfoUrl } = useInput('', (e) => validate(e).isUrl());
  const { value: email, bind: bindEmail } = useInput('', (e) => validate(e).isEmail());

  const handleSubmit = (e) => {
    e.preventDefault();

    const opportunity = {
      title,
      domain,
      description,
      expectations,
      level,
      infoUrl,
      email
    };

    if (validateAllSteps()) {
      addOpportunity(opportunity);
    }
  };

  const {
    TITLE_INPUT,
    DOMAIN_INPUT,
    ABOUT_INPUT,
    EXPECTED_INPUT,
    LEVELS_INPUT,
    URL_INPUT,
    EMAIL_INPUT
  } = OPPORTUNITY_FORM;

  const steps = [
    <FormStep title="Algemeen">
      <FormField {...TITLE_INPUT} type="text" name="title" {...bindTitle} />
      <FormField {...DOMAIN_INPUT} type="dropdown" name="domain" {...bindDomain} />
      <FormField {...ABOUT_INPUT} type="textarea" name="about" {...bindAbout} />
    </FormStep>,
    <FormStep title="Verwachtingen & niveau">
      <FormField {...EXPECTED_INPUT} type="textarea" name="expected" {...bindExpected} />
      <FormField {...LEVELS_INPUT} type="dropdown" name="level" {...bindLevel} />
    </FormStep>,
    <FormStep title="Leerkans details">
      <FormField {...URL_INPUT} type="text" name="info-url" {...bindInfoUrl} />
      <FormField {...EMAIL_INPUT} type="email" name="email" {...bindEmail} />
    </FormStep>
  ];

  return (
    <div className="page">
      <GoBack />
      <Heading title="Nieuwe leerkans" />
      {steps[step]}
      <form className="steps">
        {step > 0 && (
          <Button onClick={previousStep} className="back">
            Terug
          </Button>
        )}
        {steps.map((s, i) => (
          <div className={`step button-container ${step === i ? 'step--active' : ''}`}>
            <a
              className={`step_number ${step === i ? 'step_number--active' : ''}`}
              onClick={() => setStep(i)}
            >
              {i + 1}
            </a>
            <span>{steps[i].props.title}</span>
          </div>
        ))}
        {step < steps.length - 1 ? (
          <Button onClick={nextStep}>Ga door</Button>
        ) : (
          <Button onClick={handleSubmit}>Bevestig</Button>
        )}
      </form>
      <style jsx>
        {`
          .page {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .steps {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 2rem;
          }

          .step {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .step_number {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 4rem;
            height: 4rem;
            margin-right: 1rem;
            border-radius: 1rem;
            background: ${colors.white};
            color: ${colors.primary};
            border: 1px solid ${colors.primary};
          }

          .step--active {
            color: ${colors.primary};
            font-weight: bold;
          }

          .step_number--active {
            background: ${colors.primary};
            color: ${colors.white};
          }
        `}
      </style>
    </div>
  );
};

FormStep.propTypes = { title: PropTypes.string, children: PropTypes.element };

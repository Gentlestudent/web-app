import { useState } from 'react';

import Router from 'next/router';

import { useInput } from '../../../hooks';
import { validate } from '../../../validate';
import { colors } from '../../../assets/styles/constants';
import { Heading, FormGroup, Button, Icon } from '../../../components/UI';

import { OPPORTUNITY_FORM } from '../../../constants';

const GoBack = () => (
  <div>
    <Icon name="caret-left" />
    <a onClick={() => Router.back()}>Terug</a>
    <style jsx>
      {`
        div {
          display: flex;
          align-items: center;
          min-height: 4rem;
          cursor: pointer;
        }

        a {
          margin-left: 1rem;
          font-weight: bold;
        }
      `}
    </style>
  </div>
);

const FormStep = ({ title, children }) => (
  <section>
    <div className="section-header">
      <Heading title={title} level={2} />
    </div>
    {children}
    <style jsx>{`
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
    `}</style>
  </section>
);

export default () => {
  const [step, setStep] = useState(0);

  /*
   * TODO: Validate inputs for current step
   */
  const validateStep = () => email && validate.email(email);

  const nextStep = () => step < steps.length - 1 && validateStep() && setStep(step + 1);
  const previousStep = () => step > 0 && setStep(step - 1);

  const { value: title, bind: bindTitle } = useInput('');
  const { value: domain, bind: bindDomain } = useInput('');
  const { value: description, bind: bindAbout } = useInput('');
  const { value: expectations, bind: bindExpected } = useInput('');
  const { value: level, bind: bindLevel } = useInput('');
  const { value: infoUrl, bind: bindInfoUrl } = useInput('');
  const { value: email, bind: bindEmail } = useInput('');

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

    /*
     * TODO:
     * Add firebase "create opportunity" helper & pass in opportunity
     */
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
      <FormGroup {...TITLE_INPUT} type="text" name="title" required {...bindTitle} />
      <FormGroup {...DOMAIN_INPUT} type="dropdown" name="domain" required {...bindDomain} />
      <FormGroup {...ABOUT_INPUT} type="textarea" name="about" required {...bindAbout} />
    </FormStep>,
    <FormStep title="Verwachtingen & niveau">
      <FormGroup {...EXPECTED_INPUT} type="textarea" name="expected" required {...bindExpected} />
      <FormGroup {...LEVELS_INPUT} type="dropdown" name="level" required {...bindLevel} />
    </FormStep>,
    <FormStep title="Leerkans details">
      <FormGroup {...URL_INPUT} type="text" name="info-url" {...bindInfoUrl} />
      <FormGroup {...EMAIL_INPUT} type="email" name="email" {...bindEmail} />
    </FormStep>
  ];

  return (
    <div className="page">
      <GoBack />
      <Heading title="Nieuwe leerkans" />
      {steps[step]}
      <div className="steps">
        {step > 0 && (
          <Button onClick={previousStep} className="back">
            Terug
          </Button>
        )}
        {steps.map((s, i) => (
          <div className="step button-container">
            <a className={`step_number ${step === i ? 'active' : ''}`} onClick={() => setStep(i)}>
              {i + 1}
            </a>
            <span>Algemeen</span>
          </div>
        ))}
        {step < steps.length - 1 ? (
          <Button onClick={nextStep}>Ga door</Button>
        ) : (
          <Button onClick={handleSubmit}>Bevestig</Button>
        )}
      </div>
      <style jsx>{`
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

        .active {
          background: ${colors.primary};
          color: ${colors.white};
        }
      `}</style>
    </div>
  );
};

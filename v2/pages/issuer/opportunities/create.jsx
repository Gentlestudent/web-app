import { useState } from 'react';

import Router from 'next/router';

import { useInput } from '../../../hooks';
import { colors } from '../../../assets/styles/constants';
import { Heading, FormGroup, Button, Icon } from '../../../components/UI';

import { dropdownOptions } from '../../../constants';

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
  const validateStep = () => typeof title === 'string';

  const nextStep = () => step < steps.length - 1 && validateStep() && setStep(step + 1);
  const previousStep = () => step > 0 && setStep(step - 1);

  const { value: title, bind: bindTitle } = useInput('');
  const { value: domain, bind: bindDomain } = useInput('');
  const { value: description, bind: bindDescription } = useInput('');
  const { value: expectations, bind: bindExpectations } = useInput('');
  const { value: level, bind: bindLevel } = useInput('');

  const { DOMAINS, LEVELS } = dropdownOptions;

  const handleSubmit = (e) => {
    e.preventDefault();

    const opportunity = {
      title,
      domain,
      description,
      expectations,
      level
    };

    /*
     * TODO:
     * Add firebase "create opportunity" helper & pass in opportunity
     */
  };

  const steps = [
    <FormStep title="Algemeen">
      <FormGroup
        label="Titel"
        info="Schrijf hier een motiverende en uitdagende titel voor jouw leerkans"
        type="text"
        name="title"
        placeholder="Titel"
        required
        {...bindTitle}
      />
      <FormGroup
        label="Domein"
        info={
          <>
            Duid aan binnen welk domein je leerkans valt.
            {` `}
            <a
              href="https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Formopportunity%2Fpdf%2FDomeinen.pdf?alt=media"
              target="_blank"
            >
              Hier
            </a>
            {` `}
            vind je een uitgebreide omschrijving van de verschillende categorieën.
          </>
        }
        type="dropdown"
        name="title"
        options={DOMAINS}
        placeholder="Selecteer domein"
        required
        {...bindDomain}
      />
      <FormGroup
        label="Beschrijving"
        info="Algemene beschrijving van de leerkans die je organisatie biedt. 
          Geef ook achtergrondinformatie over je instelling om de leerkans binnen je algemene werking te kaderen."
        type="textarea"
        name="description"
        placeholder="Volledige beschrijving van de leerkans"
        required
        {...bindDescription}
      />
    </FormStep>,

    <FormStep title="Verwachtingen & niveau">
      <FormGroup
        label="Verwachtingen"
        info="Verwachtingen van student voor jouw organisatie. Kennen, kunnen of nodige acties van de student voor voltooiing van deze leerkans? 
          Stem deze goed af met het niveau."
        type="textarea"
        name="expectations"
        placeholder="Korte beschrijving van wat er verwacht wordt"
        required
        {...bindExpectations}
      />
      <FormGroup
        label="Niveau"
        info={
          <>
            Selecteer moeilijkheidsgraad van de leerkans.{' '}
            <a
              href="https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Formopportunity%2Fpdf%2FNiveaus.pdf?alt=media"
              target="_blank"
            >
              Zie verschillende moeilijkheidsgraden
            </a>{' '}
          </>
        }
        type="dropdown"
        name="level"
        options={LEVELS}
        placeholder="Selecteer niveau"
        required
        {...bindLevel}
      />
    </FormStep>,
    <FormStep title="Leerkans details">
      <FormGroup
        type="text"
        label="Website"
        info="Weblink binnen de organisatie met info over dit initiatief"
        placeholder="Website url"
      />
      <FormGroup
        type="email"
        label="Email contactpersoon"
        info="Emailadres van de contactpersoon binnen de organisatie"
        placeholder="Emailadres contactpersoon"
      />
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

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

export default () => {
  /*
   * TODO: Convert to multi-step form
   *
   * 1. Current step number
   * 2. Current step validation
   * 3. Current step "save"
   */

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

  return (
    <div>
      <GoBack />
      <Heading title="Maak opportunity" />
      <section>
        <div className="section-header">
          <Heading title="Leerkans algemeen" level={2} />
        </div>
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
      </section>
      <section>
        <div className="section-header">
          <Heading title="Leerkans details" level={2} />
        </div>
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
      </section>
      <Button onClick={handleSubmit}>Maak leerkans</Button>
      <style jsx>{`
        section {
          max-width: 60rem;
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
    </div>
  );
};

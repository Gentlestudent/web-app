import { useInput } from '../../../hooks';
import { Heading, FormGroup, Button } from '../../../components/UI';

export default () => {
  const { value: title, bind: bindTitle } = useInput('');
  const { value: domain, bind: bindDomain } = useInput('');
  const { value: description, bind: bindDescription } = useInput('');
  const { value: expectations, bind: bindExpectations } = useInput('');
  const { value: level, bind: bindLevel } = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const opportunity = {
      title,
      domain,
      description,
      expectations,
      level
    };

    console.log(opportunity);
  };

  return (
    <div>
      <Heading title="Maak opportunity" />
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
        options={['01', '02', '03']}
        placeholder="Selecteer domein"
        required
        {...bindDomain}
      />
      <FormGroup
        label="Beschrijving"
        info="Vul hier de algemene beschrijving in over de leerkans die je als organisatie wil aanbieden. Geef in deze omschrijving ook wat achtergrondinformatie over je instelling mee om zo de leerkans te kunnen kaderen binnen de algemene werking van je organisatie."
        type="textarea"
        name="description"
        placeholder="Volledige beschrijving van de leerkans"
        required
        {...bindDescription}
      />
      <FormGroup
        label="Verwachtingen"
        info="In dit veld vul je in wat je verwacht dat de student voor jouw organisatie kan betekenen. Wat moet de student kennen, kunnen of doen om de leerkans tot een goed einde te brengen? Stem deze verwachtingen en criteria zeker goed af met het niveau (zie verder)."
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
            Duid aan binnen welke moeilijkheidsgraad de leerkans valt.{' '}
            <a
              href="https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Formopportunity%2Fpdf%2FNiveaus.pdf?alt=media"
              target="_blank"
            >
              Hier
            </a>{' '}
            vind je een uitgebreide omschrijving van de verschillende moeilijkheidsgraden."
          </>
        }
        type="dropdown"
        name="level"
        options={['01', '02', '03']}
        placeholder="Selecteer niveau"
        required
        {...bindLevel}
      />
      <FormGroup
        type="text"
        label="Website"
        info="Indien je binnen je organisatie een weblink naar meer informatie hebt over dit initiatief dan kan je die link hier toevoegen"
        placeholder="Website url"
      />
      <FormGroup
        type="email"
        label="Email contactpersoon"
        info="Emailadres van de contactpersoon binnen de organisatie"
        placeholder="Emailadres contactpersoon"
      />
      <Button onClick={handleSubmit}>Maak leerkans</Button>
    </div>
  );
};

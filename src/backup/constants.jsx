export const OPPORTUNITY_FORM = {
  TITLE_INPUT: {
    label: 'Titel',
    info: 'Schrijf hier een motiverende en uitdagende titel voor jouw leerkans',
    placeholder: 'Titel van de leerkans',
    required: true
  },
  DOMAIN_INPUT: {
    label: 'Domein',
    info: (
      <>
        Duid aan binnen welk domein je leerkans valt.
        {` `}
        <a
          href="https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Formopportunity%2Fpdf%2FDomeinen.pdf?alt=media"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hier
        </a>
        {` `}
        vind je een uitgebreide omschrijving van de verschillende categorieën.
      </>
    ),
    placeholder: 'Selecteer domein',
    options: [
      'Digitale geletterdheid',
      'Duurzaamheid',
      'Ondernemingszin',
      'Onderzoek',
      'Wereldburgerschap'
    ],
    required: true
  },
  ABOUT_INPUT: {
    label: 'Beschrijving',
    info:
      'Algemene beschrijving van de leerkans die je organisatie biedt. Geef ook achtergrondinformatie over je instelling om de leerkans binnen je algemene werking te kaderen.',
    placeholder: 'Volledige beschrijving van de leerkans',
    required: true
  },
  EXPECTED_INPUT: {
    label: 'Verwachtingen',
    info:
      'Verwachtingen van student voor jouw organisatie. Kennen, kunnen of nodige acties van de student voor voltooiing van deze leerkans? Stem deze goed af met het niveau.',
    placeholder: 'Korte beschrijving van wat er verwacht wordt'
  },
  LEVELS_INPUT: {
    label: 'Niveau',
    info: (
      <>
        Selecteer moeilijkheidsgraad van de leerkans.{' '}
        <a
          href="https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Formopportunity%2Fpdf%2FNiveaus.pdf?alt=media"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zie verschillende moeilijkheidsgraden
        </a>{' '}
      </>
    ),
    placeholder: 'Selecteer niveau',
    options: ['Beginner', 'Gevorderd', 'Expert']
  },
  URL_INPUT: {
    label: 'Website',
    info: 'Weblink binnen de organisatie met info over dit initiatief',
    placeholder: 'Website url'
  },
  EMAIL_INPUT: {
    label: 'Email contactpersoon',
    info: 'Emailadres van de contactpersoon binnen de organisatie',
    placeholder: 'Emailadres contactpersoon'
  }
};

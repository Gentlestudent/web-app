export default [
  {
    title: 'Algemeen',
    fields: [
      {
        label: 'Titel',
        name: 'title',
        type: 'text',
        info: 'Schrijf hier een motiverende en uitdagende titel voor jouw leerkans',
        placeholder: 'Titel van de leerkans',
        required: true
      },
      {
        label: 'Domein',
        name: 'domain',
        type: 'dropdown',
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
      {
        label: 'Beschrijving',
        name: 'description',
        type: 'textarea',
        info:
          'Algemene beschrijving van de leerkans die je organisatie biedt. Geef ook achtergrondinformatie over je instelling om de leerkans binnen je algemene werking te kaderen.',
        placeholder: 'Volledige beschrijving van de leerkans',
        required: true
      }
    ]
  },
  {
    title: 'Verwachtingen & niveau',
    fields: [
      {
        label: 'Verwachtingen',
        name: 'expectations',
        type: 'textarea',
        info:
          'Verwachtingen van student voor jouw organisatie. Kennen, kunnen of nodige acties van de student voor voltooiing van deze leerkans? Stem deze goed af met het niveau.',
        placeholder: 'Korte beschrijving van wat er verwacht wordt'
      },
      {
        label: 'Niveau',
        name: 'level',
        type: 'dropdown',
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
      }
    ]
  },
  {
    title: 'Leerkans details',
    fields: [
      {
        label: 'Website',
        name: 'website',
        type: 'url',
        info: 'Weblink binnen de organisatie met info over dit initiatief',
        placeholder: 'Website url'
      },
      {
        label: 'Email contactpersoon',
        name: 'email',
        type: 'email',
        info: 'Emailadres van de contactpersoon binnen de organisatie',
        placeholder: 'Emailadres contactpersoon'
      }
    ]
  }
];

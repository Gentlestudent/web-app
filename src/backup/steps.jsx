import { inputTypes } from '../constants';

const { TEXT, CONTENT, TEXTAREA, DROPDOWN, EMAIL, URL } = inputTypes;

export default [
  {
    title: 'Algemeen',
    fields: [
      {
        label: 'Wysiwyg',
        name: 'wysiwyg',
        type: CONTENT,
        info: 'Wysiwyg test',
        placeholder: 'Wysiwyg test',
        required: true
      },
      {
        label: 'Titel',
        name: 'title',
        type: TEXT,
        info: 'Schrijf hier een motiverende en uitdagende titel voor jouw leerkans',
        placeholder: 'Titel van de leerkans',
        required: true
      },
      {
        label: 'Domein',
        name: 'domain',
        type: DROPDOWN,
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
        type: TEXTAREA,
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
        type: TEXTAREA,
        info:
          'Verwachtingen van student voor jouw organisatie. Kennen, kunnen of nodige acties van de student voor voltooiing van deze leerkans? Stem deze goed af met het niveau.',
        placeholder: 'Korte beschrijving van wat er verwacht wordt',
        required: true
      },
      {
        label: 'Niveau',
        name: 'level',
        type: DROPDOWN,
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
        options: ['Beginner', 'Gevorderd', 'Expert'],
        required: true
      }
    ]
  },
  {
    title: 'Leerkans details',
    fields: [
      {
        label: 'Website',
        name: 'website',
        type: URL,
        info: 'Weblink binnen de organisatie met info over dit initiatief',
        placeholder: 'Website url'
      },
      {
        label: 'Email contactpersoon',
        name: 'email',
        type: EMAIL,
        info: 'Emailadres van de contactpersoon binnen de organisatie',
        placeholder: 'Emailadres contactpersoon'
      }
    ]
  }
];

import { Heading, Input } from '../../../components/UI';

export default () => (
  <div>
    <Heading title="Maak opportunity" />
    <Input
      label="Titel"
      info="Schrijf hier een motiverende en uitdagende titel voor jouw leerkans"
      type="text"
      name="title"
      placeholder="Titel"
      required
    />
    <Input
      label="Domein"
      info="Duid aan binnen welk domein je leerkans valt. <a href='https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Formopportunity%2Fpdf%2FDomeinen.pdf?alt=media' target='_blank'>Hier</a> vind je een uitgebreide omschrijving van de verschillende categorieën."
      type="dropdown"
      name="title"
      placeholder="Titel"
      required
    />
  </div>
);

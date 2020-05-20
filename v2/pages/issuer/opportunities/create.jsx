import { Heading, FormGroup } from '../../../components/UI';

export default () => (
  <div>
    <Heading title="Maak opportunity" />
    <FormGroup
      label="Titel"
      info="Schrijf hier een motiverende en uitdagende titel voor jouw leerkans"
      type="text"
      name="title"
      placeholder="Titel"
      required
    />
    <FormGroup
      label="Titel"
      info="Schrijf hier een motiverende en uitdagende titel voor jouw leerkans"
      type="dropdown"
      name="title"
      options={['01', '02', '03']}
      placeholder="Selecteer domein"
      required
    />
    <FormGroup
      label="Beschrijving"
      info="Schrijf hier een motiverende en uitdagende titel voor jouw leerkans"
      type="textarea"
      name="title"
      placeholder="Beschrijving"
      required
    />
  </div>
);

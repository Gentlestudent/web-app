import { Heading, Input, Dropdown } from '../../../components/UI';

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
    <Dropdown
      label="Domein"
      placeholder="Selecteer domein"
      label="Domein"
      options={['01', '02', '03']}
      name="domain"
      required
    />
  </div>
);

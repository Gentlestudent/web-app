import { useInput } from '../../../hooks';
import { Heading, FormGroup } from '../../../components/UI';

export default () => {
  const { value: title, bind: bindTitle } = useInput('');
  const { value: domain, bind: bindDomain } = useInput('');
  const { value: description, bind: bindDescription } = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const opportunity = {
      title,
      domain,
      description
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
        label="Titel"
        info="Schrijf hier een motiverende en uitdagende titel voor jouw leerkans"
        type="dropdown"
        name="title"
        options={['01', '02', '03']}
        placeholder="Selecteer domein"
        required
        {...bindDomain}
      />
      <FormGroup
        label="Beschrijving"
        info="Schrijf hier een motiverende en uitdagende titel voor jouw leerkans"
        type="textarea"
        name="description"
        placeholder="Beschrijving"
        required
        {...bindDescription}
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

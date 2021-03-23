import { InputField, SelectField, RichtextField } from '../form';

const StepOne = ({ FORM }) => {
  return (
    <>
      <InputField name="title" type="text" label="Titel" placeholder="Titel" />

      <SelectField as="select" name="domain" label="Selecteer een domein">
        <>
          {FORM.DOMAINS.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </>
      </SelectField>

      <RichtextField name="description" label="Beschrijving" />

      <InputField
        name="expectations"
        type="text"
        label="Verwachtingen"
        placeholder="Korte beschrijving van wat er verwacht wordt"
      />

      <SelectField as="select" name="level" label="Selecteer niveau">
        <>
          {FORM.LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </>
      </SelectField>
    </>
  );
};

export default StepOne;

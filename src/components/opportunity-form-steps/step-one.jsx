import { InputField, SelectField, RichtextField } from '../form';
import { categoryValues, categoryLabels, difficultyValues, difficultyLabels } from '../../constants';

const StepOne = () => {
  return (
    <>
      <InputField name="title" type="text" label="Titel" placeholder="Titel" />

      <SelectField as="select" name="domain" label="Selecteer een domein">
        <>
          {Object.entries(categoryValues).map(([name, value]) => (
            <option key={name} value={value}>
              {categoryLabels[name]}
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
          {Object.entries(difficultyValues).map(([name, value]) => (
            <option key={name} value={value}>
              {difficultyLabels[name]}
            </option>
          ))}
        </>
      </SelectField>
    </>
  );
};

export default StepOne;

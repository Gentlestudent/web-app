import { useFormikContext } from 'formik';
import { InputField } from '../form';

const StepTwo = () => {
  const { values } = useFormikContext();

  return (
    <>
      <InputField name="startDate" type="date" label="Start datum" max={values.endDate || ''} />

      <InputField name="endDate" type="date" label="Eind datum" min={values.startDate || ''} />

      <InputField name="website" type="text" label="Website" placeholder="Website url" />

      <InputField
        name="email"
        type="email"
        label="Email contactpersoon"
        placeholder="Emailadres contactpersoon"
      />
    </>
  );
};

export default StepTwo;

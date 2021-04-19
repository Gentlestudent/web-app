import { InputField } from '../form';

const StepTwo = () => {
  return (
    <>
      <InputField name="startDate" type="date" label="Start datum" />

      <InputField name="endDate" type="date" label="Eind datum" />

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

import { InputField } from '../form';
import { spacers, breakpoints } from '../../assets/styles/constants';

const StepOne = () => {
  return (
    <>
      <div className="step-three__address">
        <InputField name="street" type="text" label="Straat" placeholder="Straatnaam" />
        <InputField name="number" type="number" label="Straatnummer" placeholder="Nr" />
      </div>

      <div className="step-three__city">
        <InputField name="city" type="text" label="Stad" placeholder="Stad" />

        <InputField name="postal" type="number" label="Postcode" placeholder="Postcode" />
      </div>

      <style jsx>
        {`
          .step-three__address,
          .step-three__city {
            display: grid;
            grid-template-columns: 2fr 1fr;
            grid-gap: ${spacers.medium};
          }

          @media (max-width: ${breakpoints.small}) {
            .step-three__address,
            .step-three__city {
              display: inherit;
            }
          }
        `}
      </style>
    </>
  );
};

export default StepOne;

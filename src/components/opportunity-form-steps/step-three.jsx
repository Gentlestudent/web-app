import { InputField } from '../form';
import { spacers, colors, breakpoints } from '../../assets/styles/constants';
import Map from '../map/mapMarkerPicker';

const StepOne = ({ formik, setLatLng }) => {
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

      <div className="step-three__map">
        <Map onChange={setLatLng} />
      </div>

      <style jsx>
        {`
          .step-three__address,
          .step-three__city {
            display: grid;
            grid-template-columns: 2fr 1fr;
            grid-gap: ${spacers.medium};
          }

          .step-three__map {
            background: ${colors.blueLight};
            height: 50rem;
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

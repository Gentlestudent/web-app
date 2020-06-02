import PropTypes from 'prop-types';
import { useForm } from '../hooks';
import { Heading, FormGroup, Button } from './UI';

const Form = ({ title, fields, onSubmit }) => {
  const { values, setValues } = useForm(fields);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const setField = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {title && (
        <div className="section-header">
          <Heading level={2} title={title} />
        </div>
      )}
      {fields &&
        fields.map((field, i) => {
          const { name } = field;
          return <FormGroup key={name} {...field} setField={setField} />;
        })}
      <Button type="submit">Submit</Button>
      <style jsx>
        {`
          form {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 2rem;
            border-radius: 2rem;
            box-shadow: 0 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
          }

          .section-header {
            border-radius: 2rem 2rem 0 0;
            padding: 2rem;
          }
        `}
      </style>
    </form>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form;
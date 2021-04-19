import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Label from './label';

const RichTextField = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Teksteditor laden</p>
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video']
  ],
  clipboard: {
    matchVisual: false
  }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video'
];

const RichtextField = ({ label, name }) => (
  <>
    <Label name={name} label={label} />
    <div className="field">
      <RichTextField modules={modules} formats={formats} theme="snow" />
    </div>

    <style jsx>
      {`
        .field {
          display: flex;
          flex-direction: column;
          margin-bottom: 2.5rem;
        }
      `}
    </style>
  </>
);

RichtextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
};

export default RichtextField;

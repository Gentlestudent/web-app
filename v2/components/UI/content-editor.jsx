import { useState } from 'react';
import dynamic from 'next/dynamic';
import { colors } from '../../assets/styles';
import { EditorState } from 'draft-js';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false
});

const ContentEditor = ({ placeholder, required, onChange }) => {
  const [content, setContent] = useState(EditorState.createEmpty());

  const handleEditorStateChange = (values) => setContent(values);

  return (
    <>
      <Editor
        placeholder={placeholder}
        required={required}
        editorState={content}
        wrapperClassName="content-editor"
        toolbarClassName="content-editor_toolbar"
        editorClassName="content-editor_editor"
        onEditorStateChange={handleEditorStateChange}
        onChange={onChange}
      />
      <style global>
        {`
        .content-editor {
          border: 1px solid ${colors.gray};
          border-radius: 0 0 1rem 1rem;
          background: ${colors.grayLight};
        }

        .content-editor_toolbar {
          padding: 1.2rem;
          margin: 0;
        }

        .content-editor_editor {
          box-shadow: inset 0 0 0.8rem rgba(0, 0, 0, 0.2);
          background: ${colors.grayLight};
          color: ${colors.grayDark};
          border-radius: 0 0 1rem 1rem;
          padding: 0 2rem;
          margin: 0;
          min-height: 16rem;
        }
      `}
      </style>
    </>
  );
};

export default ContentEditor;

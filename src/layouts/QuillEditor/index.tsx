import React, { useMemo, forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Define the ref type to include ReactQuill and custom methods
export interface QuillEditorRef {
  focus: () => void;
}

const QuillEditor = forwardRef<QuillEditorRef, QuillEditorProps>(({ value, onChange }, ref) => {
  const quillRef = useRef<ReactQuill>(null);

  // Expose methods using useImperativeHandle
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (quillRef.current) {
        // Use the Quill instance to focus
        const editor = quillRef.current.getEditor();
        editor.focus();
      }
    },
  }));

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
        ],
      },
    };
  }, []);

  return (
    <ReactQuill
      ref={quillRef} // 연결된 ref
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
    />
  );
});

export default QuillEditor;

import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';

import './CodeEditor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => onChange(getValue()));
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormat = () => {
    // get current value
    console.log(editorRef.current);
    const raw = editorRef.current.getModel().getValue();

    // format value
    const formatted = prettier
      .format(raw, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
        jsxSingleQuote: true,
      })
      .replace(/\n$/, ''); // remove new-line at the end

    // set value back
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormat}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language='javascript'
        height={'100%'}
        theme='dark'
        options={{
          minimap: { enabled: false },
          wordWrap: 'on',
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 2,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
export default CodeEditor;

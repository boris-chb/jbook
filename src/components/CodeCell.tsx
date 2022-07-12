import { useState } from 'react';

import CodeEditor from './CodeEditor';
import Preview from './Preview';

import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue={"'initial value from index.tsx'"}
        onChange={value => {
          setInput(value);
        }}
      />
      <div>
        <button onClick={onClick}>Run</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;

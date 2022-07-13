import { useState } from 'react';

import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';

import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction='vertical'>
      <div
        className=''
        style={{ height: '100%', display: 'flex', flexDirection: 'row' }}
      >
        <CodeEditor
          initialValue={"'initial value from index.tsx'"}
          onChange={value => {
            setInput(value);
          }}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

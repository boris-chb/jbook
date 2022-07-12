import { useState } from 'react';
import ReactDOM from 'react-dom';

import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';

import bundle from './bundler';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
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

ReactDOM.render(<App />, document.getElementById('root'));

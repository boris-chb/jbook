import ReactDOM from 'react-dom';

import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  return (
    <>
      <TextEditor />
      {/* <CodeCell /> */}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

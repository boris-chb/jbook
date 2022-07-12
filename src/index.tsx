import ReactDOM from 'react-dom';

import CodeCell from './components/CodeCell';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  return (
    <>
      <CodeCell />
      <CodeCell />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

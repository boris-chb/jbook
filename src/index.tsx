import ReactDOM from 'react-dom';

import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';

import { store } from './state';
import { Provider } from 'react-redux';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <>
        <TextEditor />
        <CodeCell />
      </>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

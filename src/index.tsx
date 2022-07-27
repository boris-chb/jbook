import ReactDOM from 'react-dom';

import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';
import CellList from './components/CellList';

import { store } from './state';
import { Provider } from 'react-redux';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

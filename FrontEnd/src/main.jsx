import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Counter from './Redux/Counter';
import Counter2 from './Redux/Counter2';
import Todo from './Redux/Todo';
import { Provider } from 'react-redux';
import store from './Redux/Store/Store.js'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      {/* <App /> */}
      <Counter />
      <br />
      <Todo />
    </Provider>
  </StrictMode>,
);

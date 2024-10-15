import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Counter from './Redux/Counter';
import Counter2 from "./Redux/Counter2";
import Todo from './Redux/Todo';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Counter/>
    <Counter2/>
    <Todo/>
  </StrictMode>,
)

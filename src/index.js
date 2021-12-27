import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import AppClass from './AppClass';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // COMMENTED OUT the React.StrictMode there's an issue with react 'findDOMNode' and yet fix
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// polyfills for IE11
import 'whatwg-fetch';

ReactDOM.render(
  <App />,
  document.body
);
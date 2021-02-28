import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import Model from './model/Model';

import App from './components/app';

const model = new Model();

ReactDOM.render(
  <React.StrictMode>
    <App model={model} />
  </React.StrictMode>,
  document.getElementById('root')
);

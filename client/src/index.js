import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { TourProvider } from '@reactour/tour';

const steps = [
  {
    selector: '[data-tour="step-1"]',
    content: 'This is my first Step',
  },
  {
    selector: '[data-tour="step-2"]',
    content: 'This is my second Step',
  },
  // ...
];

ReactDOM.render(
  <TourProvider steps={steps}>
    <App />
  </TourProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

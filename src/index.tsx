import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
// import { Chart } from './components/Chart';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Chart data={data} /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

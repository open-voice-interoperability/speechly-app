import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from "@speechly/react-client";

import './index.css';
import App from './App';

const appId = process.env.REACT_APP_APP_ID;
if (appId === undefined) {
    throw Error("Missing Speechly app ID!");
}

ReactDOM.render(
  <React.StrictMode>
      <SpeechProvider appId={appId}>
          <App />
      </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
